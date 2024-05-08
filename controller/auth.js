import * as authRepository from '../data/auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

function createJwtToken(id){
    return jwt.sign({id}, config.jwt.secretKey, {expiresIn: config.jwt.expiresInSec});
}

export async function signup(req, res, next){
    const {username, password, name, email, url} = req.body;
    const found = await authRepository.findByUsername(username);
    if(found){
        return res.status(409).json({message:`${username}이 이미 있습니다`});
    }
    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const userId = await authRepository.createUser({username, hashed, name, email, url});
    const token = createJwtToken(userId);
    res.status(201).json({token, username});
}

export async function login(req, res, next){
    const {username, password} = req.body;
    // const user = await authRepository.login(username);
    const user = await authRepository.findByUsername(username);
    console.log(user);
    if(!user){
        return res.status(401).json({message: `아이디를 찾을 수 없음`});
    }
    const isValidpassword = await bcrypt.compareSync(password, user.password);
    if(!isValidpassword){
        return res.status(401).json({message: `비밀번호가 틀렸음`});
    }
    const token = createJwtToken(user.id);
    res.status(200).json({token, username});
}

// export async function verify(req, res, next){
//     const token = req.header['Token'];
//     if(token){
//         res.status(200).json(token);
//     }
// }

export async function me(req, res, next){
    const user = await authRepository.findById(req.userId);
    console.log(user);
    if(!user){
        return res.status(404).json({message: `일치하는 사용자가 없음`});
    }
    res.status(200).json({token: req.token, username: user.username});
}