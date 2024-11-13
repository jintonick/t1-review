import React from "react";
import { useAuthContext } from "@app/utils/auth-provider";
import CalendarBox from "@app/components/calendar/EventCalendar";
import { Reviewer } from "@app/interfaces/user.type";

const MyMeet = () => {
  const auth = useAuthContext();
  const userId = Number(auth?.userId);
  const userType = auth?.userType;
  const userName = auth?.sub;

  const currentReviewer: Reviewer = {
    expertId: userId,
    name: userName || "",
    specialization: userType || "",
  };

  return (
    <div className="w-full">
      <div className="flex flex-col justify-start">
        <div className="flex justify-center p-[40px_20px_0px_20px]">
          <h1 className="text-[32px] font-bold">Мои встречи</h1>
        </div>
        <CalendarBox
          selectedReviewer={currentReviewer}
          userId={userId}
          mode="meetings"
        />
      </div>
    </div>
  );
};

export default MyMeet;



