import MongoDB from 'mongodb';
import { getTweets, getUsers } from '../db/database.js';
import * as authRepository from './auth.js';

const ObjectID = MongoDB.ObjectId;

// 모든 트윗을 리턴
export async function getAll(){
    return getTweets().find().sort({ createdAt: -1 }).toArray().then(mapTweets);
}

// id에 해당하는 트윗을 리턴
export async function getAllByUsername(username){
    return getTweets().find({username}).sort({ createdAt: -1 }).toArray().then(mapTweets);
}

// 글번호에 대한 트윗을 리턴
export async function getById(id){
    return getTweets().find({_id: new ObjectID(id)}).next().then(mapOptionalTweet);
}

// 트윗을 작성
export async function create(text, userId){
    return authRepository.findById(userId).then((user) => getTweets().insertOne({
        text,
        userId,
        username: user.username,
        url: user.url
    })).then((result) => getById(result.insertedId)).then(mapOptionalTweet);
}

// 트윗을 변경
export async function update(id, text){
    return getTweets().findOneAndUpdate({_id: new ObjectID(id)}, {$set: {text}}, {returnDocument: 'after'}).then((result) => result).then(mapOptionalTweet);
}

// 트윗을 삭제
export async function remove(id){
    return getTweets().deleteOne({_id: new ObjectID(id)});
}

function mapTweets(tweets){
    return tweets.map(mapOptionalTweet);
}

function mapOptionalTweet(tweet){
    return tweet ? { ...tweet, id: tweet.insertedId } : tweet;
}