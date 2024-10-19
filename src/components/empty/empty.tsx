import React, { FC } from "react";
import { EmptyIcon } from "@app/imgs/icons/index";

const Empty: FC<{ title?: string }> = (props) => {
  const { title } = props;
  return (
    <div className="inline-flex w-full flex-col items-center justify-center">
      <EmptyIcon size={30} className="text-0color" />
      <div className="text-0color text-center">{title || ("title")}</div>
    </div>
  );
};

export default Empty;
