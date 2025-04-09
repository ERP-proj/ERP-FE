import { Button } from "../../ui/button";

interface Props {
  event: any;
  handleAddSubmit: any;
  handleDelete: any;
  handleEditSubmit: any;
}

export default function ReservationFooter({
  event,
  handleAddSubmit,
  handleDelete,
  handleEditSubmit,
}: Props) {
  return (
    <>
      {event?.mode === "add" && (
        <Button
          className="flex flex-1 font-light bg-[#D1D1D1] border-0 rounded-lg text-[#FFFFFF] p-2 mt-4 mr-2 hover:bg-[#3C6229] hover:text-[#FFFFFF]"
          onClick={handleAddSubmit}
        >
          저장
        </Button>
      )}
      {event?.mode === "edit" && (
        <div className="flex flex-1 gap-4">
          <Button
            className="flex flex-1 font-light bg-[#FFFFFF] border-2 border-[#DB5461] rounded-lg text-[#DB5461] p-2 mt-4"
            onClick={handleDelete}
          >
            삭제
          </Button>
          <Button
            className="flex flex-1 font-light bg-[#D1D1D1] border-0 rounded-lg text-[#FFFFFF] p-2 mt-4 mr-2 hover:bg-[#3C6229] hover:text-[#FFFFFF]"
            onClick={handleEditSubmit}
          >
            수정 완료
          </Button>
        </div>
      )}
    </>
  );
}
