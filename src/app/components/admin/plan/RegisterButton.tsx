import BasicButton from "../../ui/BasicButton";
import React from "react";
import { useState } from "react";
import RegisterModal from "./RegisterModal";

export const RegisterButton = () => {
  const [isModalOpen, SetIsModalOpen] = useState(false);

  return (
    <>
      <BasicButton color="primary" onClick={() => SetIsModalOpen(true)}>
        이용권 등록
      </BasicButton>

      {isModalOpen && (
        <RegisterModal
          isOpen={isModalOpen}
          onClose={() => SetIsModalOpen(false)}
        />
      )}
    </>
  );
};
