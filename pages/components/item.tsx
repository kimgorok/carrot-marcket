import Link from "next/link";

interface ItemProps {
  id: number;
  text?: string;
  userName: string;
  createdAt: string;
  favs: number;
  phone: string;
  OddImg: boolean;
}

export default function Item({
  id,
  text,
  userName,
  createdAt,
  favs,
  phone,
  OddImg,
}: ItemProps) {
  // 날짜를 출력하기 위해
  const dateTime = new Date(createdAt);
  const month = String(dateTime.getMonth() + 1);
  const day = String(dateTime.getDate());
  const dateString = `${month}월${day}일`;

  // 두 이미지
  const SansImg = "sans.png";
  const FrogImg = "frog.png";

  return (
    <Link href={`/tweet/${id}`} legacyBehavior>
      <a className="flex flex-col px-4 pt-5 cursor-pointer justify-between ">
        <div>
          <div className="pt-2 flex items-center border-t border-blue-400">
            <img src={OddImg ? SansImg : FrogImg} width="40" alt="프로필" />
            <div className="flex flex-col pl-3">
              <div className="flex items-center m-1">
                <h3 className="text-xl font-bold text-white">{userName}</h3>
                <div className="pl-2 text-sm text-gray-400">@ {phone}</div>
                <div className="pl-2 text-sm text-gray-400">
                  ㆍ {dateString}
                </div>
              </div>
              <span className="font-medium pl-4 mt-2 text-white">
                {text && text.length > 40 ? text.slice(0, 40) + "..." : text}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end ">
          <div className="flex space-x-0.5 items-center text-sm  text-white">
            <svg
              className="w-5 h-5"
              fill="none"
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
            <span>{favs}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}
