import incheon from "../assets/region/metropolitanCity/incheon.png";
import seoul from "../assets/region/metropolitanCity/seoulGgido.png";
import gangwan from "../assets/region/metropolitanCity/gangwon.png";
import daegu from "../assets/region/metropolitanCity/daegu.png";
import daejeon from "../assets/region/metropolitanCity/daejeon.png";
import busan from "../assets/region/metropolitanCity/busan.png";
import gyeonggi from "../assets/region/metropolitanCity/gyeonggi.png";
import gwangju from "../assets/region/metropolitanCity/gwangju.png";

const region = [
    [
        { name: "인천", img: incheon ,subRegions :""},
        { name: "서울", img: seoul, subRegions :"" },
        { name: "경기", img: gyeonggi,subRegions :""},
        { name: "강원", img: gangwan,subRegions :""},
      ],
      [ { name: "광주", img: gwangju,subRegions : ""},
        { name: "대구", img: daegu,subRegions :"" },
        { name: "대전", img: daejeon, subRegions :""  },
        { name: "부산", img: busan ,subRegions :"" },
        
      ],

];

export default region