import SideBar from "@/components/main/SideBar";
import { ReservationInfo } from "@/components/main/ReservationInfo";
import TimeTable from "@/components/main/TimeTable";

export default function Home() {
  return (
    <div className="flex  gap-4">
      <div className="flex-[2_0_0] max-w-96">
        <SideBar />
      </div>
      <div className="flex-[9_0_0]">
        <TimeTable />
      </div>
      <div className="flex-[4_0_0] max-w-96 flex-col">
        <ReservationInfo />
      </div>
    </div>
  );
}
