"use client";

import { useEffect, useState } from "react";
import apiAttendences from "@/api/attendances";
import TableAttendances from "@/components/table/Attendances";

const CheckinManagement = () => {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    getListAttendencesManagementForAdmin();
  }, []);

  const getListAttendencesManagementForAdmin = async () => {
    try {
      const response = await apiAttendences.getAttendencesManagementForAdmin();
      if (response.status === 200) {
        setAttendances(response.data.attendances || []);
      }
    } catch (error: any) {
      console.log("error", error.response);
    }
  };

  return (
    <div>
      <TableAttendances attendances={attendances} />
    </div>
  );
};

export default CheckinManagement;
