import axios from "axios";
import { BASE_URL } from "./views/Signup";

export const loginPost = async (loginParam) => {
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const form = new FormData();
};
