import React, { FC } from "react";
import { IconType } from "@app/imgs/icon.type";
import classNames from "classnames";

const LogOutIcon: FC<IconType> = (props) => {
  const { size, className } = props;
  return (
    <div className={classNames(className)}>
      <svg width={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.4435 8.53924C14.189 8.28603 13.7774 8.28706 13.5242 8.54153C13.271 8.796 13.2721 9.20756 13.5265 9.46076L14.4435 8.53924ZM16.5415 12.4608C16.796 12.714 17.2076 12.7129 17.4608 12.4585C17.714 12.204 17.7129 11.7924 17.4585 11.5392L16.5415 12.4608ZM17.4585 12.4608C17.7129 12.2076 17.714 11.796 17.4608 11.5415C17.2076 11.2871 16.796 11.286 16.5415 11.5392L17.4585 12.4608ZM13.5265 14.5392C13.2721 14.7924 13.271 15.204 13.5242 15.4585C13.7774 15.7129 14.189 15.714 14.4435 15.4608L13.5265 14.5392ZM17 12.65C17.359 12.65 17.65 12.359 17.65 12C17.65 11.641 17.359 11.35 17 11.35V12.65ZM3 11.35C2.64101 11.35 2.35 11.641 2.35 12C2.35 12.359 2.64101 12.65 3 12.65V11.35ZM13.5265 9.46076L16.5415 12.4608L17.4585 11.5392L14.4435 8.53924L13.5265 9.46076ZM16.5415 11.5392L13.5265 14.5392L14.4435 15.4608L17.4585 12.4608L16.5415 11.5392ZM17 11.35H3V12.65H17V11.35Z" fill="#E92E5D"/>
        <path d="M9 15C9 17.2091 10.7909 19 13 19H17C19.2091 19 21 17.2091 21 15V9C21 6.79086 19.2091 5 17 5H13C10.7909 5 9 6.79086 9 9" stroke="#E92E5D" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.4435 8.53924C14.189 8.28603 13.7774 8.28706 13.5242 8.54153C13.271 8.796 13.2721 9.20756 13.5265 9.46076L14.4435 8.53924ZM16.5415 12.4608C16.796 12.714 17.2076 12.7129 17.4608 12.4585C17.714 12.204 17.7129 11.7924 17.4585 11.5392L16.5415 12.4608ZM17.4585 12.4608C17.7129 12.2076 17.714 11.796 17.4608 11.5415C17.2076 11.2871 16.796 11.286 16.5415 11.5392L17.4585 12.4608ZM13.5265 14.5392C13.2721 14.7924 13.271 15.204 13.5242 15.4585C13.7774 15.7129 14.189 15.714 14.4435 15.4608L13.5265 14.5392ZM17 12.65C17.359 12.65 17.65 12.359 17.65 12C17.65 11.641 17.359 11.35 17 11.35V12.65ZM3 11.35C2.64101 11.35 2.35 11.641 2.35 12C2.35 12.359 2.64101 12.65 3 12.65V11.35ZM13.5265 9.46076L16.5415 12.4608L17.4585 11.5392L14.4435 8.53924L13.5265 9.46076ZM16.5415 11.5392L13.5265 14.5392L14.4435 15.4608L17.4585 12.4608L16.5415 11.5392ZM17 11.35H3V12.65H17V11.35Z" fill="#E92E5D"/>
        <path d="M9 15C9 17.2091 10.7909 19 13 19H17C19.2091 19 21 17.2091 21 15V9C21 6.79086 19.2091 5 17 5H13C10.7909 5 9 6.79086 9 9" stroke="#E92E5D" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

export default LogOutIcon;