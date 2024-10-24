import React, { FC } from "react";
import { IconType } from "@app/imgs/icon.type";
import classNames from "classnames";

const ArrowsLeftRigth: FC<IconType> = (props) => {
  const { size, className } = props;
  return (
    <div className={classNames(className)}>
      <svg width={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_383_1775)">
          <path d="M13.5 8.25H4.5" stroke="#A6ABBA" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 13.25L4.5 11.75L6 10.25" stroke="#A6ABBA" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.5 11.75H13.5" stroke="#A6ABBA" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12.75 9.75L14.25 8.25L12.75 6.75" stroke="#A6ABBA" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
          <clipPath id="clip0_383_1775">
            <rect width="18" height="18" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default ArrowsLeftRigth;