import { db } from '../db/database.js';

const SELECT_JOIN = `SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw join users as us on tw.userId = us.id`;

const ORDER_DESC = 'order by tw.createdAt desc'

// 모든 트윗을 리턴
export async function getAll(){
    return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => {
        console.log(result);
        return result;
    });
}

// id에 해당하는 트윗을 리턴
export async function getAllByUsername(username){
    return db.execute(`${SELECT_JOIN} where username = ? ${ORDER_DESC}`, [username]).then((result) => {
        console.log(result);
        return result;
    });
}

// 글번호에 대한 트윗을 리턴
export async function getById(id){
    return db.execute(`${SELECT_JOIN} where tw.id = ? ${ORDER_DESC}`, [id]).then((result) => {
        console.log(result);
        return result;
    });
}

// 트윗을 작성
export async function create(text, userId){
    return db.execute('insert into tweets (text, userId) values (?, ?)', [text, userId]).then((result) => {
        console.log(result);
        return getById(result[0].insertId);
    });
}

// 트윗을 변경
export async function update(id, text){
    return db.execute('update tweets set text = ? where id = ?', [text, id]).then((result) => {
        console.log(result);
        return getById(id);
    });
}

// 트윗을 삭제
export async function remove(id){
    return db.execute('delete from tweets where id = ?', [id]);
}