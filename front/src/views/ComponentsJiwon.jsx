import React, { useState } from "react";
import Switch from "../components/common/Switch";
import Checkbox from "../components/common/Checkbox";
import SliderBar from "../components/common/SliderBar";
import Select from "../components/common/Select";

const ComponentsPage = () => {
  const [options] = useState([
    { value: "컷", title: "컷" },
    { value: "펌", title: "펌" },
  ]);

  return (
    <>
      <Checkbox label="약관에 동의합니다." checkValue="agree" />
      <Switch />
      {/* <Grid /> */}
      {/* <Slider /> */}
      <SliderBar />
      <Select options={options} />
    </>
  );
};

export default ComponentsPage;
