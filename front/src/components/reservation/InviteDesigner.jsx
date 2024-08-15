import styled from "styled-components";
import { useState } from "react";
import ButtonSmall from "../common/ButtonSmall";
import axios from "axios";
import { BASE_URL } from "../../util/commonFunction";
import { headers } from "next/headers";

const ButtonContainer = styled.div`
  display: flex;
  padding-top: 1rem;
  justify-content: space-around;
`;

const InputBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InputBox = styled.input`
  border-radius: 0.25rem;
  margin-top: 0.5rem;
  width: 30%;
  min-width: 125px;
  height: 100%;
`;

const DescriptionContainer = styled.div`
  font-size: 14px;
  text-align: center;
`;

export default function InviteDesigner({ shopNickname, setIsModalOpen }) {
  const [nickname, setNickname] = useState("");
  const [role, setRole] = useState("");

  async function sendInvite() {
    console.log({
      a: shopNickname,
      b: nickname,
      c: role,
    });
    await axios
      .post(
        `${BASE_URL}/api/profiles/shops/${shopNickname}/invite-employees`,
        {
          employeeNickname: nickname,
          role: role,
        },
        {
          headers: {
            "Content-Type": "application/json",
            access: `${localStorage.getItem("access")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.code.substr(0, 1) === "1") {
          alert("요청이 전송되었습니다.");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("전송에 실패했습니다.");
      });
  }

  const Button1 = {
    id: 1,
    title: "전송",
    onClick: () => {
      if (role === "" || nickname === "") {
        window.alert("닉네임과 직급을 모두 입력해주세요");
      } else {
        setIsModalOpen(false);
        setNickname("");
        setRole("");
        sendInvite();
      }
    },
    highlight: true,
  };

  const Button2 = {
    id: 2,
    title: "취소",
    onClick: () => {
      setIsModalOpen(false);
      setNickname("");
      setRole("");
    },
    highlight: false,
  };

  function handleNickname(e) {
    setNickname(e.target.value);
  }
  function handleRole(e) {
    setRole(e.target.value);
  }
  return (
    <>
      <DescriptionContainer>
        초대를 받을 디자이너의 닉네임과 직급을 입력해주세요
      </DescriptionContainer>
      <InputBoxContainer>
        <InputBox
          placeholder="닉네임"
          value={nickname}
          onChange={handleNickname}
        />
        <InputBox placeholder="직급" value={role} onChange={handleRole} />
      </InputBoxContainer>
      <ButtonContainer>
        <ButtonSmall button={Button1}></ButtonSmall>
        <ButtonSmall button={Button2}></ButtonSmall>
      </ButtonContainer>
    </>
  );
}
