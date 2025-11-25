import "./App.css";
import { Routes, Route, Router } from "react-router-dom";
import Notfound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import CalendarAddEvent from "./features/\bcalendar/calendarAddEvent/CalendarAddEvent";
import CalendarView from "./features/\bcalendar/calendarView/CalendarView";
import LocationDetail from "./pages/place/LocationDetail";
import LocationList from "./pages/place/LocationList";
import LocationReview from "./pages/place/LocationReview";
import MainView from "./views/MainView";

import MyPageView from "./views/MyPageView";

import DistrictView from "./views/DistrictView";
import AuthCallback from "./pages/auth/AuthCallback";
function App() {
  // localStorage.clear();
  return (
    <>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/oauth/callback" element={<AuthCallback />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/mainView" element={<MainView />} />

        <Route path="/calendarAddEvent" element={<CalendarAddEvent />} />
        <Route path="/calendarView" element={<CalendarView />} />
        <Route path="/mypageView" element={<MyPageView />} />
        <Route path="/district/:region" element={<DistrictView />} />
        <Route path="/locationDetail" element={<LocationDetail />} />
        <Route path="locationList" element={<LocationList />} />
        <Route path="locationReview" element={<LocationReview />} />

        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
