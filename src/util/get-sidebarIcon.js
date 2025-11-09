import profile from "../assets/mypage/profileIcon.png";
import couple from "../assets/mypage/coupleIcon.png";
import review from "../assets/mypage/reviewIcon.png";
import location from "../assets/mypage/locationIcon.png"; 

export const sidebarIcon = [
    {
      title: "내 정보",
      icon:profile,
      items: [
        { label: "기본 정보", key: "basic" },
      ],
    },
    {
      title: "커플 연결",
      icon: couple,
      items: [
        { label: "커플 현황", key: "status" },
      ],
    },
    {
      title: "작성 후기",
      icon: review,
      items: [
        { label: "후기 보기", key: "review" },
      ],
    },
    {
      title: "저장된 장소",
      icon: location,
      items: [
        { label: "장소 보기", key: "place" },
      ],
    },
  ];
  