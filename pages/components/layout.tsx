import React from "react";
import { useRouter } from "next/router";
import { cls } from "../../lib/client/utils";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) {
  const router = useRouter();
  // 뒤로가기 버튼을 누르면 홈으로 이동
  const onClick = () => {
    router.push("/");
  };
  return (
    <div className="flex justify-center">
      <div className="w-full p-4 ">
        <div className="flex items-center">
          {canGoBack ? (
            <button onClick={onClick} className=" pr-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeWidth="4" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
          ) : null}

          <div className="w-full text-2xl font-bold">
            {title ? (
              <span className={cls(canGoBack ? "mx-auto" : "", "")}>
                {title}
              </span>
            ) : null}
          </div>
        </div>

        <div className={cls("pt-12", hasTabBar ? "pb-24" : "")}>{children}</div>
      </div>
    </div>
  );
}
