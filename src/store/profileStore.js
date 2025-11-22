// src/store/profileStore.js
import { create } from "zustand";
import defaultProfileIMG from "../assets/mypage/defaultProfile.png";

export const useProfileStore = create((set) => ({
  profileImage: localStorage.getItem("profileImage") || defaultProfileIMG,
  nickname: localStorage.getItem("nickname") || "나는야 아무개", // 로컬스토리지에서 불러오기

  setProfileImage: (newImage) => {
    set({ profileImage: newImage });
    localStorage.setItem("profileImage", newImage);
  },

  setNickname: (newName) => {
    set({ nickname: newName });
    localStorage.setItem("nickname", newName); // 로컬스토리지 저장
  },
}));
