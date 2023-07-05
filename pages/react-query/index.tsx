// 참고 링크 : https://velog.io/@tkdals0978/React-Query-개요

import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useQueryClient } from "react-query";

import PostDetail from "@/components/post-detail";

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const maxPostPage = 10;

// 쿼리(Query)란 쉽게 이야기해서 데이터베이스에 정보를 요청하는 것입니다.
// 쿼리(Query)는 웹 서버에 특정한 정보를 보여달라는 웹 클라이언트 요청(주로 문자열을 기반으로 한 요청)에 의한 처리입니다.
// 쿼리(Query)는 대개 데이터베이스로부터 특정한 주제어나 어귀를 찾기 위해 사용됩니다.

function ReactQueryPage() {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

  useEffect(() => {
    if (currentPage <= maxPostPage - 1) {
      // 마지막 페이지가 10이므로 9페이지까지만 다음페이지 데이터를 받음
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["posts", nextPage], () =>
        fetchPosts(nextPage)
      );
    }
  }, [currentPage, queryClient]);
  // 데이터 prefetching을 언제할 것이냐면 현재페이지 상태가 변경될 때 다음페이지를 prefetching할 것이다
  // useEffect 훅을 사용해서 currentPage가 변경될 때 queryClient의 prefetchQuery 메소드를 사용하여 다음페이지의 post들을 미리 캐시에 저장할 것이다

  // pageNum을 인자로 받아서 해당 페이지의 포스트를 fetch함
  async function fetchPosts(pageNum: number) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
    );
    return response.json();
  }

  // replace with useQuery
  const { data, isLoading, error } = useQuery<IPost[]>(
    ["posts", currentPage], // 쿼리키를 페이지마다 지정
    () => fetchPosts(currentPage)
  );
  // react query에서 단순한 조회, get 요청을 보내기 위해서는 useQuery를 사용한다.
  // 반면, 데이터의 수정이 일어나는 Post, Delete, Patch(Put) 요청을 위해서는 useMutation을 사용해야 한다.

  if (isLoading) return "Loading...";
  if (error) return `An error has occurred ${error}`;

  return (
    <>
      <ul>
        {data?.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1} // 현재페이지가 0 이하면 previous 버튼 비활성화
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage} // 현재페이지가 9 이상이면 next 버튼 비활성화
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}

export default ReactQueryPage;
