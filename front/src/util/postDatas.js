import Img from "../assets/images/img.webp";
import ChaImg from "../assets/images/cha.png";
import nail3Img from "../assets/images/nail3.png";
import hairImg from "../assets/images/hair.png";

export const postCards = [
  {
    id: 1,
    img: ChaImg,
    nickname: "Cha_Cha",
    userimg: ChaImg,
    shop: "싸피 헤어샵",
    isLiked: true,
    rank: "4.9",
    content: "이번 스타일 대만족!",
    created_at: "2024-07-27 12:00:04",
    likes: 100,
    comment: [{
      id: 1,
      writer: "jiwon",
      img: Img,
      content: "너무 잘생겼어요",
      created_at: "2024-07-29 12:39:04",
    }, {
      id: 2,
      writer: "jiwon",
      img: Img,
      content: "멋져요",
      created_at: "2024-07-30 13:00:04",
    }, {
      id: 3,
      writer: "jiwon",
      img: Img,
      content: "와우",
      created_at: "2024-07-30 14:39:04",
    }]
  },
  {
    id: 2,
    img: nail3Img,
    nickname: "Cha_Cha",
    userimg: ChaImg,
    shop: "싸피 네일샵",
    isLiked: true,
    rank: "4.8",
    content: "네일 관리는 싸피 네일샵에서~",
    created_at: "2024-07-29 12:36:04",
    likes: 80,
    comment: [{
      id: 1,
      writer: "jiwon",
      img: Img,
      content: "손이 이쁘네요",
      created_at: "2024-07-29 13:39:04",
    }, {
      id: 2,
      writer: "jiwon",
      img: Img,
      content: "손이 이쁘네요",
      created_at: "2024-07-29 14:39:04",
    }, {
      id: 3,
      writer: "jiwon",
      img: Img,
      content: "손이 이쁘네요",
      created_at: "2024-07-29 15:39:04",
    }]
  },
  {
    id: 3,
    img: hairImg,
    nickname: "Cha_Cha",
    userimg: ChaImg,
    shop: "싸피 헤어샵",
    isLiked: false,
    rank: "4.8",
    content: "가르마펌 잘됐다:)",
    created_at: "2024-07-30 14:39:04",
    likes: 40,
    comment: [{
      id: 1,
      writer: "jiwon",
      img: Img,
      content: "이쁘네요",
      created_at: "2024-07-30 12:39:04",
    }, {
      id: 2,
      writer: "jiwon",
      img: Img,
      content: "이쁘네요",
      created_at: "2024-07-30 12:39:04",
    }, {
      id: 3,
      writer: "jiwon",
      img: Img,
      content: "이쁘네요",
      created_at: "2024-07-30 12:39:04",
    }]
  }
];
