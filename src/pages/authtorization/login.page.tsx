// login.page.tsx

import React, { useState } from "react";
import { Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import loginLogo from "@app/imgs/logo.svg";
import { useAuthContext } from "@app/utils/auth-provider";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"expert" | "client" | "user" | null>(null);
  const [error, setError] = useState("");
  const auth = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userType) {
      setError("Please select a user type");
      return;
    }
    const isSuccess = await auth?.login(email, password, userType);
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
          className="w-[390px] h-[342px] px-[32px] py-[29px] bg-white rounded-[10px] shadow-stone-100 flex flex-col items-center"
        >
          <div className="w-full flex justify-center items-center mb-[18px]">
            <h1 className="text-[24px] font-bold">Авторизация</h1>
          </div>
          <div className="w-full mb-[18px]">
            <label className="ml-[6px] text-[15px]">Логин</label>
            <Input
              className="h-[38px] rounded-[10px] mt-[2px]  border-[#DCE0E5] text-[14px] text-[#3D4858]"
              placeholder="Введите ваш логин"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full mt-[2px] mb-[10px]">
            <label className="ml-[6px] text-[15px] pb-[1px]">Пароль</label>
            <Input
              className="h-[38px] mt-[2px] rounded-[10px]  border-[#DCE0E5] text-[14px] text-[#3D4858]"
              placeholder="Введите ваш пароль"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <Button
            htmlType="submit"
            disabled={!userType}
            className="border-none shadow-none h-[38px] w-full rounded-[10px] my-[12px] bg-[#588BF2] text-white font-bold text-[15px]"
          >
              Войти
          </Button>
          <div className="flex justify-between w-full">
            <button
              type="button"
              onClick={() => setUserType("expert")}
              className={`px-4 py-2 ${
                userType === "expert" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
                Эксперт
            </button>
            <button
              type="button"
              onClick={() => setUserType("client")}
              className={`px-4 py-2 ${
                userType === "client" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
                Заказчик
            </button>
            <button
              type="button"
              onClick={() => setUserType("user")}
              className={`px-4 py-2 ${
                userType === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
                Пользователь
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;



