const MemberRowSkeleton = () => {
  return (
    <div className="flex flex-wrap items-center justify-between p-4 bg-[#F2F8ED] rounded-lg gap-4 w-full max-h-[200px] mx-auto animate-pulse">
      {/* 프로필 + 기본 정보 */}
      <div className="flex items-center gap-4 min-w-[250px]">
        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-300 rounded-full" />
        <div className="flex flex-col gap-2">
          <div className="w-24 h-4 bg-gray-300 rounded" />
          <div className="flex gap-2">
            <div className="w-8 h-4 bg-gray-200 rounded" />
            <div className="w-10 h-4 bg-gray-200 rounded" />
          </div>
          <div className="w-12 h-4 bg-gray-200 rounded" />
        </div>
      </div>

      {/* 이용권 종류 */}
      <div className="flex items-center justify-center flex-1 min-w-[130px]">
        <div className="w-24 h-6 bg-gray-200 rounded-full" />
      </div>

      {/* 남은 시간 */}
      <div className="flex flex-1 items-center justify-center gap-4 min-w-[200px]">
        <div className="w-16 h-12 bg-gray-200 rounded" />
        <div className="w-16 h-12 bg-gray-200 rounded" />
        <div className="w-16 h-12 bg-gray-200 rounded" />
        <div className="w-16 h-12 bg-gray-200 rounded" />
      </div>

      {/* 등록일 및 기타 결제 */}
      <div className="flex flex-col items-end flex-1 min-w-[150px] gap-1">
        <div className="w-20 h-4 bg-gray-200 rounded" />
        <div className="w-16 h-4 bg-gray-200 rounded" />
        <div className="w-20 h-6 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default MemberRowSkeleton;
