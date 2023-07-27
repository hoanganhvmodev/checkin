"use client";

import { useLocation } from "@/hook/useLocation";
import FormCompleteProfile from "@/components/FormCompleteProfile/FormCompleteProfile";

const CompleteProfile = () => {
  const { address, lat, lon } = useLocation();
  const test = (data: any) => {
    console.log(123, data);
  };

  return (
    <div className="flex flex-col items-center justify-between p-12">
      <div>home page</div>
      <div>
        {lat} {lon} {address?.city}
      </div>
      <FormCompleteProfile handleForm={test} />
    </div>
  );
};

export default CompleteProfile;
