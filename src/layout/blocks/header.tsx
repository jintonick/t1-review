import React, { useState, useRef, useEffect } from "react";
import { Progress } from "antd";
import logo from "@app/imgs/logo.svg";
import { useAuthContext } from "@app/utils/auth-provider";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "@app/layout/blocks/dropdown-menu";
import SubscriptionModal from "@app/pages/subscription/subscription.modal";

export const Header = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    auth?.logout();
    setIsMenuOpen(false);
  };

  const handleClick = () => {
    navigate("/");
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !avatarRef.current?.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-[67px] bg-white flex items-center justify-between relative">
      <div className="ml-[50px]">
        <button onClick={handleClick}><img src={logo} alt="logo" /></button>
      </div>
      <div className="flex mr-[34px] items-center gap-[66px]">
        <div className='w-[260px]' onClick={handleOpenModal}>
          <div className="flex justify-between items-center">
            <h1 className="text-[14px] text-[#598BF2]">1450 credits used</h1>
            <h1 className="text-[14px]">3550 credits left</h1>
          </div>
          <Progress percent={30} showInfo={false} />
        </div>
        <div className="relative">
          <div
            className="w-[36px] h-[36px] rounded-full bg-[#C55F5F] flex items-center justify-center text-white cursor-pointer"
            onClick={handleMenuToggle}
            ref={avatarRef}
          >
              AA
          </div>
          {isMenuOpen && (
            <div ref={menuRef}>
              <DropdownMenu onLogout={handleLogout} />
            </div>
          )}
        </div>
      </div>
      <SubscriptionModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};
