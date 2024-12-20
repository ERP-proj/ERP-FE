import MemberRow from "./MemberRow";

export default function MemberList({ members }: { members: any[] }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {members.map((member, index) => (
        <MemberRow key={index} member={member} />
      ))}
    </div>
  );
}
