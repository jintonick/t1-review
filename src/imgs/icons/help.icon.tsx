import React, { FC } from "react";
import { IconType } from "@app/imgs/icon.type";
import classNames from "classnames";

const HelpIcon: FC<IconType> = (props) => {
  const { size, className } = props;
  return (
    <div className={classNames(className)}>
      <svg width={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M5 11V13C5 16.3137 7.68629 19 11 19H13C16.3137 19 19 16.3137 19 13V11C19 7.68629 16.3137 5 13 5H11C7.68629 5 5 7.68629 5 11Z" stroke="black" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12V16" stroke="black" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M12 9.5C11.7243 9.5 11.5 9.2757 11.5 9C11.5 8.7243 11.7243 8.5 12 8.5C12.2757 8.5 12.5 8.7243 12.5 9C12.5 9.2757 12.2757 9.5 12 9.5Z" fill="black"/>
        <path d="M12 8C12.5523 8 13 8.44772 13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8Z" fill="black"/>
      </svg>
    </div>
  );
};

export default HelpIcon;