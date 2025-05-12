import express from "express";
import * as authRepository from "../data/auth.mjs";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config.mjs";

const secretKey = config.jwt.secretKey;
const bcryptSaltRounds = config.bcrypt.saltRounds;
const jwtExpiresInDays = config.jwt.expiresInSec;

async function createJwtToken(id) {
  return jwt.sign({ id }, secretKey, { expiresIn: jwtExpiresInDays });
}

// 유저생성
export async function create(req, res, next) {
  const { userid, password, name, email, url } = req.body;

  //유저중복 체크
  const found = await authRepository.findByUserid(userid);
  if (found) {
    return res.status(400).json({ mesage: `${userid}이 이미 있습니다` });
  }

  //해시값으로 체크&토큰
  const hashed = bcrypt.hashSync(password, bcryptSaltRounds);
  const users = await authRepository.createUser({
    userid,
    password: hashed,
    name,
    email,
    url,
  });
  const token = await createJwtToken(users.id);
  if (users) {
    res.status(201).json({ token, userid });
  }
}

// 로그인
export async function login(req, res, next) {
  const { userid, password } = req.body;
  const user = await authRepository.findByUserid(userid);
  if (!user) {
    res.status(401).json("아이디를 확인할 수 없음");
  }
  //비밀번호 확인
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ massage: "아이디 또는 비밀번호 확인" });
  }

  //토큰 생성 및 토큰 보내기
  const token = await createJwtToken(user.id);
  res.status(200).json({ token, userid });
}

//사용자 인증
export async function verify(req, res, next) {
  const id = req.id;
  if (id) {
    res.status(200).json(id);
  } else {
    res.status(401).json({ message: "사용자 인증 실패" });
  }
}
export async function me(req, res, next) {
  const user = await authRepository.findByid(req.id);
  if (!user) {
    return res.status(404).json({ message: "일치하는 사용자가 없음" });
  }
  res.status(200).json({ token: req.token, userid: user.userid });
}
