import BasicButton from "../../ui/BasicButton";
import React from "react";
import { useState } from "react";
import OwnerRegisterModal from "./OwnerRegisterModal";

export const OwnerRegisterButton = () => {
  const [isModalOpen, SetIsModalOpen] = useState(false);

  return (
    <>
      <BasicButton color="primary" onClick={() => SetIsModalOpen(true)}>
        점주 등록
      </BasicButton>

      {isModalOpen && (
        <OwnerRegisterModal
          isOpen={isModalOpen}
          onClose={() => SetIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default OwnerRegisterButton;
