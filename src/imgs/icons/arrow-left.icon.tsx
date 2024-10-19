import React, { FC } from "react";
import { IconType } from "@app/imgs/icon.type";
import classNames from "classnames";

const ArrowLeftIcon: FC<IconType> = (props) => {
  const { size, className } = props;
  return (
    <div className={classNames(className)}>
      <svg width={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 7L10 12L15 17" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

export default ArrowLeftIcon;