import dayjs from "dayjs";
import { User } from "@/interfaces/user";

interface Props {
  attendances: AttendancesUser<User>[];
}

interface AttendancesUser<T> {
  check_in_lat?: string;
  check_in_lng?: string;
  check_in_location?: string;
  check_in_time?: string;
  check_out_lat?: string;
  check_out_lng?: string;
  check_out_location?: string;
  check_out_time?: string;
  id: number;
  user: T;
  user_id: number;
  working_time?: string;
}

const TableAttendances = (props: Props) => {
  const { attendances } = props;

  const convertDateTime = (date?: string, format?: string) => {
    if (!date) return "";

    return dayjs(date).format(format || "HH:mm:ss");
  };

  return (
    <div className="w-[90%] mx-auto mb-10 relative min-h-[600px] max-h-[600px] overflow-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
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
          {attendances.length > 0
            ? attendances.map((item) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={item.id}
                >
                  <td className="px-6 py-4">
                    {convertDateTime(item.check_in_time, "DD/MM/YYYY")}
                  </td>
                  <td className="px-6 py-4">{item.user?.full_name}</td>
                  <td className="px-6 py-4">{item.user?.code}</td>
                  <td className="px-6 py-4">
                    {convertDateTime(item.check_in_time, "")}
                  </td>
                  <td className="px-6 py-4">{item.check_in_location}</td>
                  <td className="px-6 py-4">
                    {convertDateTime(item.check_out_time, "")}
                  </td>
                  <td className="px-6 py-4">{item.check_out_location}</td>
                  <td className="px-6 py-4">{item.working_time}</td>
                  <td className="flex items-center px-6 py-4 space-x-3">
                    {/* <a
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
                    </a> */}
                  </td>
                </tr>
              ))
            : "Không có dữ liệu nào"}
        </tbody>
      </table>
    </div>
  );
};

export default TableAttendances;
