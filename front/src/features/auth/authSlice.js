import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 초기 상태 정의
const initialState = {
  email: "",
  password: "",
  isLoading: false,
  error: null,
};

// 비동기 로그인 작업 정의
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:80/api/auths/login", {
        email,
        password,
      });
      return response.data; // 성공 시 데이터 반환
    } catch (error) {
      return rejectWithValue(error.response.data); // 실패 시 에러 데이터 반환
    }
  }
);

const authSlice = createSlice({
  name: "auth", // slice 이름 정의
  initialState, //슬라이스의 초기 상태
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = ""; // 로그인 후 email 초기화
        state.password = ""; // 로그인 후 password 초기화
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error || "로그인 실패. 다시 시도해 주세요.";
      });
  },
});

export const { setEmail, setPassword } = authSlice.actions;
export default authSlice.reducer;
