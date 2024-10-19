import React, { FC } from "react";
import { IconType } from "@app/imgs/icon.type";
import classNames from "classnames";

const DownIcon: FC<IconType> = (props) => {
  const { size, className } = props;
  return (
    <div className={classNames(className)}>
      <svg width={size} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.0498 1L4.79358 5L8.53735 1" stroke="#598BF2" strokeLinecap="round"/>
      </svg>
    </div>
  );
};

export default DownIcon;