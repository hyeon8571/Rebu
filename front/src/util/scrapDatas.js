import Img from "../assets/images/img.webp";
import manImg from "../assets/images/man.png";
import nail2Img from "../assets/images/nail2.png";
import nailartImg from "../assets/images/nailart.png";
import nail1Img from "../assets/images/nail1.png";

export const scrapCards = [
  {
    id: 1,
    img: manImg,
    nickname: "you_seung",
    userimg: Img,
    shop: "싸피 헤어샵",
    isScrapped: true,
    isLiked: true,
    rank: "4.9",
    content: "이번 스타일 대만족!",
    created_at: "2024-07-07 12:00:04",
    likes: 100,
    comment: [{
      id: 1,
      writer: "jiwon",
      img: Img,
      content: "너무 잘생겼어요",
      created_at: "2024-07-07 12:39:04",
    }, {
      id: 2,
      writer: "jiwon",
      img: Img,
      content: "멋져요",
      created_at: "2024-07-07 13:00:04",
    }, {
      id: 3,
      writer: "jiwon",
      img: Img,
      content: "와우",
      created_at: "2024-07-07 14:39:04",
    }]
  },
  {
    id: 2,
    img: nail1Img,
    nickname: "jiwon",
    userimg: Img,
    shop: "싸피 네일샵",
    isScrapped: true,
    isLiked: true,
    rank: "4.8",
    content: "이달의 아트 너무 이쁘다~",
    created_at: "2024-07-07 12:36:04",
    likes: 48,
    comment: [{
      id: 1,
      writer: "jiwon",
      img: Img,
      content: "손이 이쁘네요",
      created_at: "2024-07-07 12:39:04",
    }, {
      id: 2,
      writer: "jiwon",
      img: Img,
      content: "손이 이쁘네요",
      created_at: "2024-07-07 12:39:04",
    }, {
      id: 3,
      writer: "jiwon",
      img: Img,
      content: "손이 이쁘네요",
      created_at: "2024-07-07 12:39:04",
    }]
  },
  {
    id: 3,
    img: nail2Img,
    nickname: "jin",
    userimg: Img,
    shop: "싸피 네일샵",
    isScrapped: true,
    isLiked: true,
    rank: "4.8",
    content: "네일 관리는 싸피 네일!",
    created_at: "2024-07-07 14:39:04",
    likes: 84,
    comment: [{
      id: 1,
      writer: "jiwon",
      img: Img,
      content: "이쁘네요",
      created_at: "2024-07-07 15:39:04",
    }, {
      id: 2,
      writer: "jiwon",
      img: Img,
      content: "이쁘네요",
      created_at: "2024-07-07 16:39:04",
    }, {
      id: 3,
      writer: "jiwon",
      img: Img,
      content: "이쁘네요",
      created_at: "2024-07-07 17:39:04",
    }]
  },
  {
    id: 4,
    img: nailartImg,
    nickname: "ssafy_nail",
    userimg: Img,
    shop: "싸피 네일샵",
    isScrapped: true,
    isLiked: true,
    rank: "",
    content: "이달의 아트입니다:)",
    created_at: "2024-07-07 12:36:04",
    likes: 76,
    comment: [{
      id: 1,
      writer: "jiwon",
      img: Img,
      content: "이쁘네요",
      created_at: "2024-07-07 12:39:04",
    }, {
      id: 2,
      writer: "jiwon",
      img: Img,
      content: "이쁘네요",
      created_at: "2024-07-07 12:39:04",
    }, {
      id: 3,
      writer: "jiwon",
      img: Img,
      content: "이쁘네요",
      created_at: "2024-07-07 12:39:04",
    }]
  }
];
