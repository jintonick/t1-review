import React, { FC } from "react";
import { IconType } from "@app/imgs/icon.type";
import classNames from "classnames";

const InboxOutlined: FC<IconType> = (props) => {
  const { size, className } = props;
  return (
    <div className={classNames(className)}>
      <svg width={size} viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.76825 4.0107H2.9073C1.85393 4.0107 1 4.90932 1 6.01783V15.0499C1 16.1584 1.85393 17.057 2.9073 17.057H16.2584C17.3118 17.057 18.1657 16.1584 18.1657 15.0499V6.01783C18.1657 4.90932 17.3118 4.0107 16.2584 4.0107H13.3975M12.4438 8.02496L9.58285 11.0357M9.58285 11.0357L6.7219 8.02496M9.58285 11.0357L9.58285 1" stroke="#598BF2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

export default InboxOutlined;