import express from "express";
import * as authController from "../controller/auth.mjs";

const router = express.Router();

//회원가입(post)
//http://127.0.0.1:8080/auth/singup
router.post("/singup", authController.create);
//로그인
//http://127.0.0.1:8080/auth/login
router.post("/login", authController.login);
//로그인 유지(세션 확인, 로그아웃)
router.get("/me", authController.checkSession);
router.get("/logout", authController.logout);
export default router;
