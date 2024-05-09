import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
const DataTypes = SQ.DataTypes;

export const User = sequelize.define(
    'user',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        url: DataTypes.STRING(1000)
    },
    { timestamps: false }
);

// 아이디(username) 중복검사
export async function findByUsername(username){
    return User.findOne({where: {username}});
}

// id 중복검사
export async function findById(id){
    return User.findByPk(id);
}

export async function createUser(user){
    return User.create(user).then((data) => data.dataValues.id)
}

// export async function login(username){
//     const user = users.find((user) => user.username === username)
//     return user;
// }