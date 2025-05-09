import * as postRepository from "../data/post.mjs";

// 모든 포스트 / 해당 아이디에 대한 포스트를 가져오는 함수
export async function getPosts(req, res, next) {
  const userid = req.query.userid;
  const data = await (userid
    ? postRepository.getAllByUserid(userid)
    : postRepository.getAll());
  res.status(200).json(data);
}

// id를 받아 하나의 포스트를 가져오는 함수
export async function getPostById(req, res, next) {
  const id = req.params.id;
  const post = await postRepository.getById(id);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(200).json(`${id}의 게시글이 없습니다`);
  }
}

//포스트를 생성하는 함수
export async function createPost(req, res, next) {
  const { userid, name, text } = req.body;
  const posts = await postRepository.create(userid, name, text);
  res.status(201).json(posts);
}

// 포스트를 업데이트 하는 함수
export async function updatePost(req, res, next) {
  const id = req.params.id;
  const text = req.body;
  const posts = await postRepository.update(id, text);
  res.status(201).json(posts);
}

// 포스트 삭제 함수
export async function deletePost(req, res, next) {
  const id = req.params.id;
  const posts = await postRepository.remove(id);
  res.status(201).json(posts);
}
