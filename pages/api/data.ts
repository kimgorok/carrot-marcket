export const getRandomId = () => {
  // 무작위 id값을 생성
  const randomId = Math.floor(Math.random() * 100) + 1;
  // 그 id값을 리턴함
  return randomId.toString();
};

export const fetchData = async (id: any) => {
  // url에는 주어진 id가 끝에 들어간 url주소가 들어감
  const url = `https://dogs-api.nomadcoders.workers.dev/${id}`;
  // fetch함수로 url로 데이터를 요청
  // response.json()으로 JSON데이터 추출.
  const data = await fetch(url).then((response) => response.json());

  // 기본 값으로 설정할 값. isLiked는 기본적으로 false
  const initialData = {
    url: data.url,
    isLiked: false,
  };
  // fetchData함수는 initailData를 return함
  return initialData;
};
