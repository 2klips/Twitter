import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './auth.js';

const DataTypes = SQ.DataTypes;
const Sequelize = sequelize;

const INCLUDE_USER = {
    arrtibutes: [
        'id',
        'text',
        'createAt',
        'userId',
        [Sequelize.col('user.name'), 'name'],
        [Sequelize.col('user.username'), 'username'],
        [Sequelize.col('user.url'), 'url']
    ],
    include: {
        model: User,
        arrtibutes: {},
    }
}

const ORDER_DESC = {
    order: [['createdAt', 'DESC']]
}

const Tweet = sequelize.define('tweet', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, { timestamps: false });

Tweet.belongsTo(User);

// 모든 트윗을 리턴
export async function getAll(){
    return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC});
}

// id에 해당하는 트윗을 리턴
export async function getAllByUsername(username){
    return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC, include: {
        ...INCLUDE_USER.include, where: {username}
    } });
}

// 글번호에 대한 트윗을 리턴
export async function getById(id){
    return Tweet.findOne({ where: {id}, ...INCLUDE_USER});
}

// 트윗을 작성
export async function create(text, userId){
    return Tweet.create({text, userId}).then((data) => this.getById(data.dataValues.id));
}

// 트윗을 변경
export async function update(id, text){
    return Tweet.findByPk(id, INCLUDE_USER).then((tweet) => {
        tweet.text = text;
        return tweet.save();
    });
}

// 트윗을 삭제
export async function remove(id){
    return Tweet.findByPk(id).then((tweet) =>{
        tweet.destroy();
    });
}