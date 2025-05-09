import { db } from "../db/database.mjs";

const [users] = await db.query("SELECT * FROM users");

//export async function createUser(userid, password, name, email, url) {

export async function createUser(user) {
  const { userid, password, name, email, url } = user;
  return db
    .execute(
      "INSERT INTO users (userid, password, name, email, url) VALUES (?, ?, ?, ?, ?)",
      [userid, password, name, email, url]
    )
    .then((result) => result[0].insertId);
  /*
  const [result] = await db.query(
    "INSERT INTO users (userid, password, name, email, url) VALUES (?, ?, ?, ?, ?)",
    [userid, password, name, email, url]
  );
  return result.insertId;
  */
}

export async function longin(userid, password) {
  const user = users.find(
    (user) => user.userid === userid && user.password === password
  );
  return user;
}

//유저ID 찾기
export async function findByUserid(userid) {
  return db
    .execute("select * from users where userid=?", [userid])
    .then((result) => result[0][0]);
  /*
    const user = users.find((user) => user.userid === userid);
  return user;
  */
}

//id 찾기
export async function findByid(idx) {
  return db
    .execute("select * from users where idx=?", [idx])
    .then((result) => result[0][0]);
  // return users.find((user) => user.idx === idx);
}
