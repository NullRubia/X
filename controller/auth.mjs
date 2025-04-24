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
    req.session.user = { userid };
    res.status(200).json(`${userid}님 로그인 완료!`);
  } else {
    res.status(404).json("로그인 실패(아이디 비번을 확인하세요)");
  }
}

export async function checkSession(req, res, next) {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
}

export async function logout(req, res, next) {
  req.session.destroy(() => {
    res.send("로그아웃 되었습니다");
  });
}
