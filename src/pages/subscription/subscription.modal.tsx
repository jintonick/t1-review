import React from "react";
import Modal from "@app/components/modal/modal";
import { Switch} from "antd";
import SubscribtionElement from "@app/pages/subscription/blocks/subscribtion-element";


const SubscriptionModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="973px">
      <div className="h-full min-h-[599px] p-[32px] text-[14px] text-[#21272A]">
        <div className="w-full">
          <div className="flex flex-col justify-center items-center mb-[10px]">
            <h1 className="font-bold text-[#598BF2]">Subscription</h1>
            <h1 className="font-bold text-[32px]">Want more? We have an offer</h1>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="px-[0px] bg-[#F2F4F8] w-[110px] h-[24px] rounded-[10px] flex justify-center items-center">
              <h1 className="font-medium">20% discount</h1>
            </div>
            <div className="flex justify-center items-center gap-[16px] text-[18px]">
              <h1>Year</h1>
              <Switch size="small" className="w-[32px]" />
              <h1>Month</h1>
            </div>
          </div>
          <div>
            <div>
              <SubscribtionElement />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SubscriptionModal;