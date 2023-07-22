import type { NextPage } from "next";
import { Tweet, User } from "@prisma/client";
import Layout from "../components/layout";
import useSWR from "swr";
import { useRouter } from "next/router";
import useMutation from "../../lib/client/useMutation";

// 트윗 정보와 사용자 정보를 포함하는 인터페이스
interface IUser extends Tweet {
  user: User;
}

// 트윗의 status, 트윗 정보, 좋아요 여부가 있는 인터페이스
interface ITweetUpload {
  status: string;
  tweet: IUser;
  isLiked: boolean;
}

const UploadTweet: NextPage = () => {
  const router = useRouter();
  // 트윗의 정보를 얻고 mutate하기 위해 useSWR사용
  // 해당하는 id의 트윗의 정보를 얻기 위해 API 호출
  const { data, mutate } = useSWR<ITweetUpload>(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );

  // 해당하는 id의 트윗의 좋아요 상태를 토글하는 mutation 함수
  const [toggleFavs] = useMutation(`/api/tweets/${router.query.id}/fav`);

  // 좋아요 버튼 클릭 시
  const favClick = () => {
    if (!data) return;
    // 좋아요 상태를 반전하고, SWR 캐시를 갱신
    mutate({ ...data, isLiked: !data.isLiked }, false);
    toggleFavs({});
  };

  return (
    <Layout canGoBack title="홈">
      <div className="flex flex-col">
        <div className="p-4 flex">
          <svg
            className="w-16 h-16 mb-8 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <div>
            <div className="text-2xl font-bold">{data?.tweet.user.name}</div>
            <div className="p-4 text-lg break-all">{data?.tweet.message}</div>
          </div>
        </div>

        <div className="flex justify-end mr-8 mb-8">
          <button onClick={favClick}>
            <svg
              className="w-7 h-7"
              fill={data?.isLiked ? "red" : "none"}
              stroke="red"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default UploadTweet;
