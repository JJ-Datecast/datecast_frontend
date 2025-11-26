import { create } from "zustand";
import apiClient from "../networks/apis/axios";

export const useProfileStore = create((set, get) => ({
  userId: null,
  email: null,
  nickname: "",
  profileImageUrl: null,

  setProfileFromServer: (user) => {
    set((state) => ({
      ...state,
      ...user,
    }));
  },

  resetProfile: () =>
    set({
      userId: null,
      email: null,
      nickname: "",
      profileImageUrl: null,
    }),

  updateNickname: async (newNickname) => {
    const prevNickname = get().nickname;

    // ✅ 1️⃣ UI 먼저 업데이트 (즉시 반영)
    set((state) => ({
      ...state,
      nickname: newNickname,
    }));

    try {
      // ✅ 2️⃣ 서버에 요청
      const res = await apiClient.patch("/api/users/me", {
        nickname: newNickname,
      });

      // ✅ 3️⃣ 서버에서 다른 필드도 주면 병합
      set((state) => ({
        ...state,
        ...res.data,
      }));

      return res.data;
    } catch (err) {
      console.error("닉네임 수정 실패", err);

      // ⛔ 실패 시 이전 닉네임으로 롤백할 수도 있음
      set((state) => ({
        ...state,
        nickname: prevNickname,
      }));

      throw err;
    }
  },
}));
