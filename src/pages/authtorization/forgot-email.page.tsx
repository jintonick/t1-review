import React, { useState } from "react";
import { Input, Button } from "antd";
import login from "@app/imgs/logo.svg";
import {Link} from "react-router-dom";

const ForgotEmailPage = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <img className="mb-[48px]" src={login}/>
      <div className="w-full max-w-[1440px] flex flex-col justify-center items-center mb-[48px]">
        <form className="w-[390px] h-[240px] px-[32px] py-[28px] bg-white rounded-[10px] shadow-stone-100 flex flex-col items-center">
          <div className="w-full flex justify-center items-center mb-[18px]">
            <h1 className="text-[24px] font-bold">Enter your email</h1>
          </div>
          <div className="w-full mb-[19px]">
            <label className="ml-[6px] text-[15px]">Login</label>
            <Input className="h-[38px] rounded-[10px] mt-[2px]  border-[#DCE0E5] text-[14px] text-[#3D4858]" placeholder="Enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <Button className="border-none shadow-none h-[38px] w-full rounded-[10px] mt-[6px] bg-[#588BF2] text-white font-bold text-[15px]"><Link to={"/forgot-password"}>Send</Link></Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotEmailPage;