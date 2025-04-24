import express from "express";
import * as authRepository from "../data/auth.mjs";

// 유저생성
export async function create(req, res, next) {
  const { userid, password, name, email } = req.body;
  const users = await authRepository.createUser(userid, password, name, email);
  res.status(201).json(users);
}

// 로그인
export async function login(req, res, next) {
  const { userid, password } = req.body;
  const user = await authRepository.longin(userid, password);
  if (user) {
    res.status(200).json(`${userid}님 로그인 완료!`);
  } else {
    res.status(404).json("로그인 실패(아이디 비번을 확인하세요)");
  }
}
