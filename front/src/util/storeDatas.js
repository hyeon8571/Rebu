import Img from "../assets/images/img.webp";

export const storeCards = [
  {
    id: 1,
    img: Img,
    title: "싸피 네일샵",
    rank: "4.8",
    introduce: "싸피 앞 메가박스 건물에 위치하고 있습니다:)",
    post: 30,
    reviews: 20,
    reservation: 50,
    button: {
      id: 1,
      onClick: () => {
        window.alert("버튼 클릭!");
      },
      title: "예약하기",
      highlight: true,
    },
  },
  {
    id: 2,
    img: Img,
    title: "싸피 헤어샵",
    rank: "4.75",
    introduce: "자신에게 어울리는 헤어를 찾아드리겠습니다:)",
    post: 20,
    reviews: 30,
    reservation: 40,
    button: {
      id: 2,
      onClick: () => {
        window.alert("버튼 클릭!");
      },
      title: "예약하기",
      highlight: true,
    },
  },
  {
    id: 3,
    img: Img,
    title: "글로리 미용실",
    rank: "4.6",
    introduce: "글로리 더 글로리~ 미용실입니당",
    post: 10,
    reviews: 10,
    reservation: 20,
    button: {
      id: 3,
      onClick: () => {
        window.alert("버튼 클릭!");
      },
      title: "예약하기",
      highlight: true,
    },
  },
  {
    id: 4,
    img: Img,
    title: "엄청 엄청 엄청 긴 이름의 미용실",
    rank: "4.7",
    introduce: "고객에게 만족을 주는 서비스를 제공합니다:)",
    post: 20,
    reviews: 10,
    reservation:150,
    button: {
      id: 4,
      onClick: () => {
        window.alert("버튼 클릭!");
      },
      title: "예약하기",
      highlight: true,
    },
  },
  {
    id: 5,
    img: Img,
    title: "싸피 네일샵",
    rank: "4.8",
    introduce: "이달의 아트 구경오세요~",
    post: 20,
    reviews: 30,
    reservation: 30,
    button: {
      id: 5,
      onClick: () => {
        window.alert("버튼 클릭!");
      },
      title: "예약하기",
      highlight: true,
    },
  },
];
