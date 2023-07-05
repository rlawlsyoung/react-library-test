import { useQuery, useMutation } from "react-query";
import { IPost } from "../pages/react-query";
import axios from "axios";

interface IPostDetailProps {
  post: IPost;
}
interface IComments {
  id: number;
  email: string;
  body: string;
}

// 쿼리(Query)란 쉽게 이야기해서 데이터베이스에 정보를 요청하는 것입니다.
// 쿼리(Query)는 웹 서버에 특정한 정보를 보여달라는 웹 클라이언트 요청(주로 문자열을 기반으로 한 요청)에 의한 처리입니다.
// 쿼리(Query)는 대개 데이터베이스로부터 특정한 주제어나 어귀를 찾기 위해 사용됩니다.

// useQuery는 CRUD의 C, useMutation은 RUD를 맡는다.

async function fetchComments(postId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ title: "REACT QUERY FOREVER!!!!" }),
    }
  );
  return response.json();
}

const PostDetail = ({ post }: IPostDetailProps) => {
  // replace with useQuery
  const { data, isLoading, isError } = useQuery<IComments[]>(
    ["comments", post.id], // 이렇게하면 쿼리 키를 쿼리에 대한 의존성 배열로 취급하게되어 모든 comments 쿼리가 같은 쿼리로 간주되는 상황을 막고 각기 다른 쿼리로 다뤄질 것임.
    () => fetchComments(post.id)
  );
  // fetchComments는 postId를 인자로 받기 때문에 익명함수로 감싸서 작성한다

  const deleteMutation = useMutation((postId: number) => deletePost(postId));
  const updateMutation = useMutation((postId: number) => updatePost(postId));
  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      <button onClick={() => updateMutation.mutate(post.id)}>
        Update title
      </button>
      {deleteMutation.isError && <div style={{ color: "red" }}>ERROR</div>}
      {deleteMutation.isLoading && (
        <div style={{ color: "blue" }}>deleting post...</div>
      )}
      {deleteMutation.isSuccess && (
        <div style={{ color: "green" }}>success delete post</div>
      )}
      {updateMutation.isError && <div style={{ color: "red" }}>ERROR</div>}
      {updateMutation.isLoading && (
        <div style={{ color: "blue" }}>updating post...</div>
      )}
      {updateMutation.isSuccess && (
        <div style={{ color: "green" }}>success update post</div>
      )}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {isError && <div>ERROR!</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data?.map((comment) => (
          <li key={comment.id}>
            {comment.email}: {comment.body}
          </li>
        ))
      )}
    </>
  );
};

export default PostDetail;
