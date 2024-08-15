import React from "react";
import toast from "react-hot-toast";
import AlarmToast from "./AlarmToast"; // AlarmToast 컴포넌트 임포트

const MyComponent = () => {
  const handleClick = () => {
    const comment = {
      message: "새로운 알림이 도착했습니다!",
      content: "댓글이 달렸습니다: '이 게시글 너무 좋아요!'",
      createdAt: new Date().toISOString(),
    };

    toast.custom((t) => <AlarmToast t={t} comment={comment} />);
  };

  return (
    <div>
      <button onClick={handleClick}>알림 띄우기</button>
    </div>
  );
};

export default MyComponent;
