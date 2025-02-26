import React from "react";
import Table from "../../ui/Table";

const storeColumns = [
  { name: "매장명", width: "70%" },
  { name: "영업시간", width: "40%" },
];

const storeData = [
  { 매장명: "매장 1", 영업시간: "08:00 ~ 22:00" },
  { 매장명: "매장 2", 영업시간: "08:00 ~ 22:00" },
  { 매장명: "매장 3", 영업시간: "08:00 ~ 22:00" },
];

const MainTable: React.FC = ({}) => {
  return (
    <div className="flex w-full max-w-6xl min-h-screen">
      <div className="w-full ">
        <Table columns={storeColumns} data={storeData} selectable />
      </div>
    </div>
  );
};

export default MainTable;
