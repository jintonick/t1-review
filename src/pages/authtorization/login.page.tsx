import React, { useState } from "react";
import { Input, Checkbox, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import loginLogo from "@app/imgs/logo.svg";
import { useAuthContext } from "@app/utils/auth-provider";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isSuccess = await auth?.login(email, password);
    if (isSuccess) {
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <img className="mb-[48px]" src={loginLogo} alt="Logo" />
      <div className="w-full max-w-[1440px] flex flex-col justify-center items-center mb-[48px]">
        <form
          onSubmit={handleSubmit}
          className="w-[390px] h-[382px] px-[32px] py-[29px] bg-white rounded-[10px] shadow-stone-100 flex flex-col items-center"
        >
          <div className="w-full flex justify-center items-center mb-[18px]">
            <h1 className="text-[24px] font-bold">Authorization</h1>
          </div>
          <div className="w-full mb-[18px]">
            <label className="ml-[6px] text-[15px]">Login</label>
            <Input
              className="h-[38px] rounded-[10px] mt-[2px]  border-[#DCE0E5] text-[14px] text-[#3D4858]"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full mt-[2px] mb-[10px]">
            <label className="ml-[6px] text-[15px] pb-[1px]">Password</label>
            <Input
              className="h-[38px] mt-[2px] rounded-[10px]  border-[#DCE0E5] text-[14px] text-[#3D4858]"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-[8px]">
              <Checkbox className="h-[16px] w-[16px] mt-[2px]" />
              <h1 className="font-medium text-[14px]">Remember me</h1>
            </div>
            <div>
              <Link
                to="/forgot-email"
                className="font-medium text-[14px] text-[#588BF2] mt-[4px]"
              >
                  Forgot your password?
              </Link>
            </div>
          </div>
          <Button
            htmlType="submit"
            className="border-none shadow-none h-[38px] w-full rounded-[10px] my-[12px] bg-[#588BF2] text-white font-bold text-[15px]"
          >
              Sign in
          </Button>
          <Link
            to="/register"
            className="font-medium text-[14px] text-[#588BF2] mr-[24px]"
          >
              Don&apos;t have an account? Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;


