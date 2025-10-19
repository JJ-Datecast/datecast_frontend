import incheon from "../assets/region/incheon.png";
import seoulGgido from "../assets/region/seoulGgido.png";
import gangwan from "../assets/region/gangwon.png";
import daegu from "../assets/region/daegu.png";
import daejeon from "../assets/region/daejeon.png";
import busan from "../assets/region/busan.png";
import jeju from "../assets/region/jeju.png";
import gwangju from "../assets/region/gwangju.png";

const region = [
    [
        { name: "인천", img: incheon ,subRegions :""},
        { name: "서울 경기", img: seoulGgido, subRegions :"" },
        { name: "강원", img: gangwan,subRegions :""},
        { name: "광주", img: gwangju,subRegions : ""},
      ],
      [
        { name: "대구", img: daegu,subRegions :"" },
        { name: "대전", img: daejeon, subRegions :""  },
        { name: "부산", img: busan ,subRegions :"" },
        { name: "제주", img: jeju , subRegions :"" },
      ],

];

export default region