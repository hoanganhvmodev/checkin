"use client";

import { CompleteProfile } from "@/interfaces/profile";
import { useRouter } from "next/navigation";
import apiCompleteProfile from "@/api/complete-profile";

import FormCompleteProfile from "@/components/FormCompleteProfile/FormCompleteProfile";
import { useAppSelector } from "@/redux/store";

const CompleteProfile = () => {
  const user = useAppSelector((state) => state.authReducer.value);
  const router = useRouter();
  console.log(12345, user);

  const completeProfile = async (data: CompleteProfile) => {
    try {
      const response = await apiCompleteProfile.updateProfile(data);
      if (response.status === 200) {
        alert("Complete profile success");
        router.push("/checkin");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between p-12 h-[calc(100vh-228px)]">
      <FormCompleteProfile handleForm={completeProfile} />
    </div>
  );
};

export default CompleteProfile;
