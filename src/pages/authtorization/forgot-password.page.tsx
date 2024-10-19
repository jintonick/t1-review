import React, { useState } from "react";
import { Input, Button } from "antd";
import login from "@app/imgs/logo.svg";

const ForgotPasswordPage = () => {
  const [password, setPassword] = useState("");

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <img className="mb-[48px]" src={login}/>
      <div className="w-full max-w-[1440px] flex flex-col justify-center items-center mb-[48px]">
        <form className="w-[390px] h-[328px] px-[32px] py-[29px] bg-white rounded-[10px] shadow-stone-100 flex flex-col items-center">
          <div className="w-full flex justify-center items-center mb-[18px]">
            <h1 className="text-[24px] font-bold">Enter a new password</h1>
          </div>
          <div className="w-full mb-[18px]">
            <label className="ml-[6px] text-[15px] pb-[1px]">Password</label>
            <Input className="h-[39px] mt-[2px] rounded-[10px]  border-[#DCE0E5] text-[14px] text-[#3D4858]" placeholder="Enter your password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="w-full mt-[2px] mb-[10px]">
            <label className="ml-[6px] text-[15px] pb-[1px]">Confirm password</label>
            <Input className="h-[39px] mt-[2px] rounded-[10px]  border-[#DCE0E5] text-[14px] text-[#3D4858]" placeholder="Enter your password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button className="border-none shadow-none h-[38px] w-full rounded-[10px] mt-[14px] bg-[#588BF2] text-white font-bold text-[15px]">Send</Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;