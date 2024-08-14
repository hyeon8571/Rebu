export default function LoadingModal() {
  return (
    <>
      <DescriptionContainer>리뷰를 업로드하시겠습니까?</DescriptionContainer>
      <ButtonContainer>
        <ButtonSmall button={Button1}></ButtonSmall>
        <ButtonSmall button={Button2}></ButtonSmall>
      </ButtonContainer>
    </>
  );
}
