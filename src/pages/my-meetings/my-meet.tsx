import React from "react";
import CalendarBox from "@app/components/calendar/EventCalendar";
import {Button} from "antd";
import {useAuthContext} from "@app/utils/auth-provider";

const MyMeet = () => {
  const auth = useAuthContext();
  console.log(auth?.userType);

  return (
    <div className="w-full">
      <div className="flex flex-col justify-start ">
        <div className="flex justify-between p-[40px_20px_0px_20px]">
          <div className='w-[50px]'></div>
          <h1 className="text-[32px] font-bold">Мои встречи</h1>
          {auth?.userType == "expert" ? ( <Button className="border-none shadow-none h-[38px] rounded-[10px] bg-[#588BF2] text-white font-normal text-[15px]">Добавить встречу</Button>):(<div></div>)}
        </div>
        <CalendarBox />
      </div>
    </div>
  );
};

export default MyMeet;