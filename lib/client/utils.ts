export function cls(...classnames: string[]) {
  // 배열로 저장된 클래스 이름들을 공백으로 연결시킴
  return classnames.join(" ");
}
