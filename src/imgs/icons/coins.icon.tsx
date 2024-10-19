import React, { FC } from "react";
import { IconType } from "@app/imgs/icon.type";
import classNames from "classnames";

const CoinsIcon: FC<IconType> = (props) => {
  const { size, className } = props;
  return (
    <div className={classNames(className)}>
      <svg width={size} viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.88845 6.33333C11.8158 6.33333 14.9996 5.13943 14.9996 3.66667C14.9996 2.19391 11.8158 1 7.88845 1C3.9611 1 0.777344 2.19391 0.777344 3.66667C0.777344 5.13943 3.9611 6.33333 7.88845 6.33333Z" stroke="#598BF2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M0.777344 3.66667V9C0.777344 9.70725 1.52655 10.3855 2.86014 10.8856C4.19373 11.3857 6.00247 11.6667 7.88845 11.6667C9.77444 11.6667 11.5832 11.3857 12.9168 10.8856C14.2504 10.3855 14.9996 9.70725 14.9996 9V3.66667" stroke="#598BF2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M0.777344 9V14.3333C0.777344 15.0406 1.52655 15.7189 2.86014 16.219C4.19373 16.719 6.00247 17 7.88845 17C9.77444 17 11.5832 16.719 12.9168 16.219C14.2504 15.7189 14.9996 15.0406 14.9996 14.3333V9" stroke="#598BF2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

export default CoinsIcon;