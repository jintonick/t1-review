import React, { FC } from "react";
import { IconType } from "@app/imgs/icon.type";
import classNames from "classnames";

const UpIcon: FC<IconType> = (props) => {
  const { size, className } = props;
  return (
    <div className={classNames(className)}>
      <svg width={size} viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.48755 5L4.74377 1L1 5" stroke="#598BF2" strokeLinecap="round"/>
      </svg>
    </div>
  );
};

export default UpIcon;