import "./App.css";
import { Routes, Route, Router } from "react-router-dom";
import Notfound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import CalendarAddEvent from "./features/\bcalendar/calendarAddEvent/CalendarAddEvent";
import CalendarView from "./features/\bcalendar/calendarView/CalendarView";
import LocationDetail from "./pages/location/LocationDetail";
import LocationList from "./pages/location/LocationList";
import LocationReview from "./pages/location/LocationReview";
import LoveConnect from "./pages/mypage/LoveConnect";
import MyReview from "./pages/mypage/MyReview";
import PreLove from "./pages/mypage/PreLove";
import Profile from "./pages/mypage/Profile";
import ReviewDetail from "./pages/mypage/ReviewDetail";
import ReceiptCheck from "./pages/receipt/ReceiptCheck";
import MainView from "./views/MainView";
import CalendarEventModal from "./features/\bcalendar/component/CalendarEventModal";
function App() {
  // localStorage.clear();
  return (
    <>
      <Routes>
        <Route path="/modal" element={<CalendarEventModal />} />
        <Route path="/" element={<MainView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/mainView" element={<MainView />} />
        <Route path="/calendarAddEvent" element={<CalendarAddEvent />} />
        <Route path="/calendarView" element={<CalendarView />} />
        <Route path="/locationDetail" element={<LocationDetail />} />
        <Route path="locationList" element={<LocationList />} />
        <Route path="locationReview" element={<LocationReview />} />
        <Route path="/loveConnect" element={<LoveConnect />} />
        <Route path="myReivew" element={<MyReview />} />
        <Route path="preLove" element={<PreLove />} />
        <Route path="profile" element={<Profile />} />
        <Route path="reviewDetail" element={<ReviewDetail />} />
        <Route path="receiptCheck" element={<ReceiptCheck />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
