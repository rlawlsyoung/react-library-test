import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();
// 쿼리 클라이언트는 쿼리와 서버의 데이터 캐시를 관리하는 클라이언트이다.

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

// 마지막으로 자녀 컴포넌트에 캐시와 클라이언트 구성을 제공할 QueryClientProvider를 적용한다.
// queryClient가 가지고 있는 캐시와 모든 기본 옵션을 QueryClientProvider의 자녀 컴포넌트도 사용할 수 있게된다.
