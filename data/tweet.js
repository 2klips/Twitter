import Mongogoose from 'mongoose';
import { useVirtualId } from '../db/database.js';
import * as authRepository from './auth.js';
import { config } from 'dotenv';

const tweetSchema = new Mongogoose.Schema({
    text: {type: String, require: true},
    userId: {type: String, require: true},
    name: {type: String, require: true},
    username: { type: String, require: true},
    url: String
}, {timestamps: true})

useVirtualId(tweetSchema);
const Tweet = Mongogoose.model('Tweet', tweetSchema);

// 모든 트윗을 리턴
export async function getAll(){
    return Tweet.find().sort({createAt: -1});
}

// id에 해당하는 트윗을 리턴
export async function getAllByUsername(username){
    return Tweet.find({username}).sort({createAt: -1});
}

// 글번호에 대한 트윗을 리턴
export async function getById(id){
    return Tweet.findById(id);
}

// 트윗을 작성
export async function create(text, userId){
    return authRepository.findById(userId).then((user) => new Tweet({
        text, userId, name: user.username, username: user.username, url: user.url
    }).save());
}

// 트윗을 변경
export async function update(id, text){
    return Tweet.findByIdAndUpdate(id, {text}, {returnDocument: 'after'});
}

// 트윗을 삭제
export async function remove(id){
    return Tweet.findByIdAndDelete(id);
}

