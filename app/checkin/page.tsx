"use client";

import { useLocation } from "@/hook/useLocation";
import { useGetDateTime } from "@/hook/useCurrentDate";
import { AppDispatch, useAppSelector } from "@/redux/store";
import apiCheckIn from "@/api/checkin";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserCheckin } from "@/redux/features/auth-slice";

const Checkin = () => {
  const { display_name, lat, lon } = useLocation();
  const [date, setDate] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  let statusCheck: number = 0;

  useEffect(() => {
    setInterval(() => {
      const getDate = useGetDateTime(new Date());
      setDate(getDate);
    }, 1000);
  }, []);

  const user = useAppSelector((state) => state.authReducer.value);

  const handleCheckIn = async () => {
    const formCheckIn = {
      check: {
        user_id: user?.user?.id,
        check_in_time: date,
        check_in_lat: lat,
        check_in_lng: lon,
        check_in_location: display_name,
      },
    };

    try {
      const res = await apiCheckIn.checkIn(formCheckIn);
      if (res.status === 200) {
        statusCheck = res.data.status;
        if (statusCheck === 1) {
          alert("CheckOut Success");
        } else alert("CheckIn Success");
        dispatch(updateUserCheckin());
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-[calc(100vh-228px)] py-12 dark:bg-gray-800 flex items-center">
      <div className="container mx-auto flex flex-row justify-between items-center">
        <div className="flex flex-col border p-16 rounded-lg shadow-md bg-[#FFF3E0]">
          <p className="font-bold text-[#FF9800] text-2xl mb-6">CheckIn Now</p>
          <div className="flex flex-row items-center mb-5">
            <svg
              className="h-8 w-8 text-yellow-500 mr-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <circle cx="12" cy="12" r="10" />{" "}
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="font-bold text-[#555540] text-xl">
              {date ? date : ""}
            </span>
          </div>
          <div className="flex flex-row items-center">
            <svg
              className="h-8 w-8 text-red-500 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            <span className="font-bold text-[#555540] text-xl">
              {display_name ? `${display_name}` : ""}
            </span>
          </div>
        </div>
        <div>
          <button
            className="linear flex flex-row items-center rounded-xl bg-green-500 px-10 py-6 text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200 font-bold text-xl mr-20"
            data-ripple-light
            onClick={() => handleCheckIn()}
          >
            {user.user?.is_checkin_today ? "Check Out" : "Check In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkin;
