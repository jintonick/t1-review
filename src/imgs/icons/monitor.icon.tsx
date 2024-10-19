import React, { FC } from "react";
import { IconType } from "@app/imgs/icon.type";
import classNames from "classnames";

const MonitorIcon: FC<IconType> = (props) => {
  const { size, className } = props;
  return (
    <div className={classNames(className)}>
      <svg width={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 3H4C2.89543 3 2 3.89543 2 5V15C2 16.1046 2.89543 17 4 17H20C21.1046 17 22 16.1046 22 15V5C22 3.89543 21.1046 3 20 3Z" stroke="#598BF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 21H16" stroke="#598BF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 17V21" stroke="#598BF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

export default MonitorIcon;