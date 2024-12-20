export default function MemberRow({ member }: { member: any }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-300 border border-gray-400 rounded-lg">
      {/* 프로필 사진 */}
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 bg-gray-500 rounded-full flex justify-center items-center text-white">
          {member.photoUrl ? (
            <img
              src={member.photoUrl}
              alt={`${member.name}의 프로필`}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            "프로필 사진"
          )}
        </div>
      </div>

      {/* 이름 및 성별 */}
      <div className="flex flex-col items-center">
        <div className="flex gap-4">
          <div className="w-20 h-8 bg-gray-400 flex items-center justify-center rounded text-white">
            {member.name}
          </div>
          <div className="w-20 h-8 bg-gray-400 flex items-center justify-center rounded text-white">
            {member.gender === "MALE" ? "남성" : "여성"}
          </div>
        </div>
        <div className="w-48 h-8 bg-gray-400 flex items-center justify-center rounded text-white mt-2">
          {member.phone}
        </div>
      </div>

      {/* 이용권 정보 */}
      <div className="flex flex-col items-center">
        <div className="w-20 h-8 bg-gray-400 flex items-center justify-center rounded text-white">
          {member.plans}
        </div>
        <div className="w-48 h-8 bg-gray-400 flex items-center justify-center rounded text-white mt-2">
          남은 시간: {member.remainingTime}시간 / 사용한 시간: {member.usedTime}
          시간
        </div>
      </div>

      {/* 등록일 및 기타 정보 */}
      <div className="flex flex-col items-center">
        <div className="w-48 h-8 bg-gray-400 flex items-center justify-center rounded text-white">
          {new Date(member.registrationDate).toLocaleDateString()}
        </div>
        <div className="flex gap-2 mt-2">
          <div className="w-20 h-8 bg-gray-400 flex items-center justify-center rounded text-white">
            지각: {member.tardinessCount}회
          </div>
          <div className="w-20 h-8 bg-gray-400 flex items-center justify-center rounded text-white">
            결석: {member.absenceCount}회
          </div>
        </div>
      </div>
    </div>
  );
}
