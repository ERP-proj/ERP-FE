// "use client";

// import React, { useState } from "react";
// import Modal from "../ui/Modal";

// const CreateMember = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <div>
//       {/* 회원 등록 버튼 */}
//       <button
//         onClick={openModal}
//         className="bg-[#3C6229] text-white px-4 py-2 rounded-lg"
//       >
//         회원 등록
//       </button>

//       {/* 모달 컴포넌트 */}
//       <Modal isOpen={isModalOpen} onClose={closeModal}>
//         {/* 모달 내용 */}
//         <div>
//           <form className="space-y-4">
//             <div className="flex items-center gap-4">
//               <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
//                 이미지 선택
//               </div>
//               <button className="bg-[#3C6229] text-white px-4 py-2 rounded-lg">
//                 준비
//               </button>
//               <button className="bg-gray-300 text-black px-4 py-2 rounded-lg">
//                 촬영
//               </button>
//             </div>
//             <input
//               type="text"
//               placeholder="이름"
//               className="w-full border px-3 py-2 rounded"
//             />
//             <input
//               type="text"
//               placeholder="전화번호"
//               className="w-full border px-3 py-2 rounded"
//             />
//             <textarea
//               placeholder="주소"
//               className="w-full border px-3 py-2 rounded resize-none"
//               rows={3}
//             />
//             <textarea
//               placeholder="방문 경로"
//               className="w-full border px-3 py-2 rounded resize-none"
//               rows={3}
//             />
//             <div className="flex justify-between">
//               <button
//                 type="button"
//                 className="bg-gray-300 text-black px-4 py-2 rounded-lg"
//                 onClick={closeModal}
//               >
//                 취소
//               </button>
//               <button
//                 type="submit"
//                 className="bg-[#3C6229] text-white px-4 py-2 rounded-lg"
//               >
//                 저장
//               </button>
//             </div>
//           </form>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default CreateMember;
