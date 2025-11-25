import { create } from "zustand";

export const useProfileStore = create((set) => ({
  userId: null,
  email: null,
  nickname: "",
  profileImageUrl: null,


  setProfileFromServer: (user) => {
    set({
      userId: user.userId,
      email: user.email,
      nickname: user.nickname,
      profileImageUrl: user.profileImageUrl,
    });
    console.log("🚀 Zustand 저장된 프로필:", useProfileStore.getState());

  },
  

  resetProfile: () =>
    set({
      userId: null,
      email: null,
      nickname: "",
      profileImageUrl: "",
    }),
}));
