import MemberRow from "./MemberRow";

export default function MemberList({ members }: { members: any[] }) {
  return (
    <div className="grid grid-cols-1 rounded-xl gap-4 p-4 border border-gray-300  h-full overflow-y-auto">
      {members.map((member, index) => (
        <MemberRow key={index} member={member} />
      ))}
    </div>
  );
}
