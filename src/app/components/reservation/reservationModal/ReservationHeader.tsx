import Image from "next/image";
import { Button } from "../../ui/button";

interface Props {
  mode: "add" | "edit";
  onClose: () => void;
}

export default function ReservationHeader({ mode, onClose }: Props) {
  return (
    <div className="flex justify-between items-center mb-2">
      {/* Modal title */}
      <div className="text-xl font-semibold">
        {mode === "add" ? "예약 추가" : "예약 수정"}
      </div>
      {/* Modal close button */}
      <Button className="size-12" onClick={onClose}>
        <Image
          src="/reservationModal/closeIcon.png"
          width={100}
          height={100}
          alt="closeIcon"
        />
      </Button>
    </div>
  );
}
