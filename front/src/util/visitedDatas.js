import Img from "../assets/images/img.webp";

export const designerData = [
  {
    nickname: "yuseong",
    workingName: "유승",
    role: "원장",
    workingIntroduction:
      `[맨즈헤어/레이어드펌/셋팅펌 전문]\n` +
      `편안하고 자연스러운 디자인을 찾아드리겠습니다.`,
    gender: true,
    review: 12,
  },
  {
    nickname: "seunghyeon",
    workingName: "승현",
    role: "실장",
    workingIntroduction: "[맨즈헤어/애즈펌/열펌 전문]",
    gender: true,
    review: 10,
  },
  {
    nickname: "jiwon",
    workingName: "지원",
    role: "실장",
    workingIntroduction: "[여성헤어/S컬, C컬 펌/셋팅펌 전문]",
    gender: false,
    review: 17,
  },
  {
    nickname: "jinseo",
    workingName: "진서",
    role: "디자이너",
    workingIntroduction: "[여성헤어/레이어드 컷 /염색 전문]",
    gender: false,
    review: 14,
  },
];

export const menuData = [
  {
    menuId: 1,
    nickname: "yuseong",
    img: Img,
    title: "시그니처 세팅펌",
    description:
      "프리미엄 세팅펌 기계로 손상은 최대한 줄이고 자연스러운 펌이 가능합니다.",
    duration: 210,
    cost: "110,000",
  },
  {
    menuId: 2,
    nickname: "yuseong",
    img: Img,
    title: "시그니처 S컬펌",
    description:
      "프리미엄 세팅펌 기계로 손상은 최대한 줄이고 자연스러운 펌이 가능합니다.",
    duration: 180,
    cost: "100,000",
  },
  {
    menuId: 3,
    nickname: "jinseo",
    img: Img,
    title: "밀크브라운 염색",
    description:
      "프리미엄 세팅펌 기계로 손상은 최대한 줄이고 자연스러운 펌이 가능합니다.",
    duration: 120,
    cost: "80,000",
  },
  {
    menuId: 4,
    nickname: "jiwon",
    img: Img,
    title: "밀크브라운 염색",
    description:
      "프리미엄 세팅펌 기계로 손상은 최대한 줄이고 자연스러운 펌이 가능합니다.",
    duration: 120,
    cost: "80,000",
  },
  {
    menuId: 5,
    nickname: "seunghyeon",
    img: Img,
    title: "밀크브라운 염색",
    description:
      "프리미엄 세팅펌 기계로 손상은 최대한 줄이고 자연스러운 펌이 가능합니다.",
    duration: 120,
    cost: "80,000",
  },
  {
    menuId: 6,
    nickname: "yuseong",
    img: Img,
    title: "밀크브라운 염색",
    description:
      "프리미엄 세팅펌 기계로 손상은 최대한 줄이고 자연스러운 펌이 가능합니다.",
    duration: 120,
    cost: "80,000",
  },
  {
    menuId: 7,
    nickname: "jinseo",
    img: Img,
    title: "밀크브라운 염색",
    description:
      "프리미엄 세팅펌 기계로 손상은 최대한 줄이고 자연스러운 펌이 가능합니다.",
    duration: 120,
    cost: "80,000",
  },
  {
    menuId: 8,
    nickname: "kyuhyeon",
    img: Img,
    title: "밀크브라운 염색",
    description:
      "프리미엄 세팅펌 기계로 손상은 최대한 줄이고 자연스러운 펌이 가능합니다.",
    duration: 120,
    cost: "80,000",
  },
  {
    menuId: 9,
    nickname: "jiwon",
    img: Img,
    title: "시그니처 세팅펌",
    description:
      "프리미엄 세팅펌 기계로 손상은 최대한 줄이고 자연스러운 펌이 가능합니다.",
    duration: "3h 30",
    cost: "120,000",
  },
];

export const visitedCards = [
  {
    id: 1,
    img: Img,
    title: "싸피 네일샵",
    menu: "그라데이션 핸드(회원)",
    date: "2024년 07월 01일 오후 3시 15분",
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
    menu: "여성 컷트",
    date: "2024년 07월 01일 오후 6시",
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
    menu: "여성 프리미엄 염색",
    date: "2024년 06월 02일 오후 4시",
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
    menu: "엄청 엄청 엄청 엄청 긴 이름의 시술",
    date: "2024년 07월 01일 오후 3시 15분",
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
    menu: "그라데이션 핸드(회원)",
    date: "2024년 07월 01일 오후 3시 15분",
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
