import { loadReservation } from "@/api/reservation/loadReservation";
import SelectedEventModal from "@/app/main/SelectedEventModal";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Calendar } from "@fullcalendar/core";
import { useEffect, useMemo } from "react";

interface ReservationModalProps {
  selectedEvent: any;
  onClose: () => void;
  calendarInstance: React.MutableRefObject<Calendar | null>;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  selectedEvent,
  onClose,
  calendarInstance,
}) => {
  const { position } = selectedEvent || {};

  useEffect(() => {
    console.log("🤖 selectedEvent 변경", selectedEvent);
  }, [selectedEvent]);

  const eventDate = useMemo(() => {
    if (!selectedEvent || !selectedEvent.startStr) return null;
    return selectedEvent.startStr.split("T")[0];
  }, [selectedEvent]);

  const refreshReservations = async () => {
    if (!eventDate) {
      console.error("❌ 이벤트 날짜가 없어 refreshReservations 실행 불가!");
      return;
    }

    if (!calendarInstance.current) {
      console.error("❌ calendarInstance.current가 존재하지 않음!");
      return;
    }

    try {
      await loadReservation(eventDate, calendarInstance);
      console.log("✅ loadReservation 실행 완료!");
    } catch (error) {
      console.error("❌ loadReservation 실행 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    console.log(
      "✅ ReservationModal에서 calendarInstance 확인:",
      calendarInstance.current
    );
  }, [calendarInstance]);

  return (
    <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      <DialogContent
        className="absolute z-50 bg-white p-6 rounded-xl shadow-lg border-0 flex max-w-auto"
        style={{
          top: position?.top || "50%",
          left: position?.left - 400 || "50%",
          transform: position ? "none" : "translate(-50%, -50%)",
        }}
      >
        <DialogTitle>
          <VisuallyHidden>숨겨진 제목</VisuallyHidden>
        </DialogTitle>
        <SelectedEventModal
          event={selectedEvent}
          onClose={() => {
            onClose();
            refreshReservations();
          }}
          refreshReservations={refreshReservations}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;
