"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import apiAttendences from "@/api/attendances";

const CheckinList = () => {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    getListAttendencesUser();
  }, []);

  const getListAttendencesUser = async () => {
    try {
      const response = await apiAttendences.getAttendencesUser();
      if (response.status === 200) {
        setAttendances(response.data.attendances || []);
      }
    } catch (error: any) {
      console.log("error", error.response);
    }
  };

  const addTime = (date: string, format: string | undefined) => {
    return dayjs(date)
      .add(7, "hour")
      .format(format || "HH:mm:ss");
  };

  const convertDate = (date: string, format: string | undefined) => {
    if (!format) return dayjs(date).format("DD/MM/YYYY");
    return dayjs(date).format(format);
  };

  return (
    <div className="w-[90%] mx-auto mb-10 relative max-h-[600px] overflow-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {/* <th scope="col" className="p-4">
            <div className="flex items-center">
              <input
                id="checkbox-all-search"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="checkbox-all-search" className="sr-only">
                checkbox
              </label>
            </div>
          </th> */}
            <th scope="col" className="px-6 py-3">
              Ngày
            </th>
            <th scope="col" className="px-6 py-3">
              Tên nhân viên
            </th>
            <th scope="col" className="px-6 py-3">
              ID nhân viên
            </th>
            <th scope="col" className="px-6 py-3">
              Giờ vào
            </th>
            <th scope="col" className="px-6 py-3">
              Địa điểm vào
            </th>
            <th scope="col" className="px-6 py-3">
              Giờ ra
            </th>
            <th scope="col" className="px-6 py-3">
              Địa điểm ra
            </th>
            <th scope="col" className="px-6 py-3">
              Tổng giờ làm việc
            </th>
            <th scope="col" className="px-6 py-3">
              Trạng thái
            </th>
          </tr>
        </thead>
        <tbody>
          {attendances.length > 0 &&
            attendances.map((item: any) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={item.id}
              >
                {/* <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="checkbox-table-search-1"
                    className="sr-only"
                  >
                    checkbox
                  </label>
                </div>
              </td> */}
                <td className="px-6 py-4">
                  {addTime(item.check_in_time, "DD/MM/YYYY")}
                </td>
                <td className="px-6 py-4">{item.user?.full_name}</td>
                <td className="px-6 py-4">{item.user?.code}</td>
                <td className="px-6 py-4">{addTime(item.check_in_time, "")}</td>
                <td className="px-6 py-4">{item.check_in_location}</td>
                <td className="px-6 py-4">
                  {addTime(item.check_out_time, "")}
                </td>
                <td className="px-6 py-4">{item.check_out_location}</td>
                <td className="px-6 py-4">{item.working_time}</td>
                <td className="flex items-center px-6 py-4 space-x-3">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Remove
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CheckinList;
