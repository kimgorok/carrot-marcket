import { Tweet, User } from "@prisma/client";
import React from "react";
import useSWR from "swr";
import FloatingButton from "./components/floating-button";
import Item from "./components/item";
import Layout from "./components/layout";
import useUser from "../lib/client/useUser";

interface IFavs extends Tweet {
  user: User;
  _count: {
    favs: number;
  };
}

interface WriteTweet {
  status: string;
  tweets: IFavs[];
}

export default function Home() {
  // useUser로 유저의 데이터와 로딩 상태를 가져옴
  const { user, isLoading } = useUser();

  // useSWR로 API의 데이터를 가져옴
  const { data } = useSWR<WriteTweet>("/api/tweets");

  return (
    <div className="p-2">
      <div className="flex justify-center absolute">
        <svg
          className="h-9 w-9 "
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          stroke="currentColor"
        >
          <path d="M161.014,464.013c193.208,0 298.885,-160.071 298.885,-298.885c0,-4.546 0,-9.072 -0.307,-13.578c20.558,-14.871 38.305,-33.282 52.408,-54.374c-19.171,8.495 -39.51,14.065 -60.334,16.527c21.924,-13.124 38.343,-33.782 46.182,-58.102c-20.619,12.235 -43.18,20.859 -66.703,25.498c-19.862,-21.121 -47.602,-33.112 -76.593,-33.112c-57.682,0 -105.145,47.464 -105.145,105.144c0,8.002 0.914,15.979 2.722,23.773c-84.418,-4.231 -163.18,-44.161 -216.494,-109.752c-27.724,47.726 -13.379,109.576 32.522,140.226c-16.715,-0.495 -33.071,-5.005 -47.677,-13.148l0,1.331c0.014,49.814 35.447,93.111 84.275,102.974c-15.464,4.217 -31.693,4.833 -47.431,1.802c13.727,42.685 53.311,72.108 98.14,72.95c-37.19,29.227 -83.157,45.103 -130.458,45.056c-8.358,-0.016 -16.708,-0.522 -25.006,-1.516c48.034,30.825 103.94,47.18 161.014,47.104" />
        </svg>
      </div>
      {user && !isLoading && (
        <Layout title="마이트위터">
          <div>
            {data?.tweets?.map((tweet, index) => (
              <Item
                key={tweet.id}
                id={tweet.id}
                text={tweet.message!}
                userName={tweet.user.name}
                phone={tweet.user.phone}
                favs={tweet._count.favs}
                createdAt={tweet.user.createdAt + ""}
                OddImg={index % 2 === 0}
              />
            ))}
            <FloatingButton href="/tweet/upload">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeWidth="4"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </FloatingButton>
          </div>
        </Layout>
      )}
    </div>
  );
}
