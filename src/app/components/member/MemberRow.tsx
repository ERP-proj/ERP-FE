export default function MemberRow({ member }: { member: any }) {
  return (
    <div className="flex items-center justify-between p-4 bg-[#c7e3b3] border border-gray-300 rounded-lg shadow-sm">
      {/* 프로필 사진 및 기본 정보 */}
      <div className="flex items-center gap-4 flex-1">
        <div className="w-16 h-16 bg-[#f8d4a6] rounded-full flex justify-center items-center text-white text-lg">
          {member.photoUrl ? (
            <img
              src={member.photoUrl}
              alt={`${member.name}의 프로필`}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            "홍길동"
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div className="text-gray-800 font-bold text-lg">{member.name}</div>
            <div
              className={`px-2 py-1 text-sm rounded ${
                member.gender === "남"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-pink-100 text-pink-600"
              }`}
            >
              {member.gender}
            </div>
            <div className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-700">
              {member.planType}
            </div>
          </div>
          <div className="text-gray-600 text-sm">{member.phone}</div>
        </div>
      </div>

      {/* 이용권 종류 */}
      <div className="flex items-center justify-center flex-1">
        <div className="text-sm bg-gray-100 px-4 py-2 rounded text-gray-700">
          이용권 종류
        </div>
      </div>

      {/* 남은 시간 */}
      <div className="flex flex-col items-center flex-1">
        <div className="text-red-600 font-semibold text-lg">
          {member.remainingTime}
        </div>
        <div className="text-sm text-gray-600">{member.usage}</div>
      </div>

      {/* 지각/결석 */}
      <div className="flex flex-col items-center flex-1">
        <div className="text-gray-800 bg-white px-4 py-2 rounded shadow-md">
          {member.tardiness}/{member.absence}
        </div>
      </div>

      {/* 등록일 및 기타 결제 */}
      <div className="flex flex-col items-end flex-1">
        <div className="text-gray-500 text-sm">{member.registrationDate}</div>
        <div
          className={`text-sm font-bold ${
            member.payment > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {member.payment > 0 ? `+${member.payment}` : member.payment}
        </div>
      </div>
    </div>
  );
}
