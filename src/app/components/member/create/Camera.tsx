"use client";
import React, { useRef, useState } from "react";
import { CiCamera } from "react-icons/ci";
import BasicButton from "../../ui/BasicButton";

interface CameraProps {
  onCapture: (imageData: string) => void; // 캡처된 이미지를 상위 컴포넌트에 전달
}

const Camera: React.FC<CameraProps> = ({ onCapture }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleOpenCamera = async () => {
    setIsModalOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("카메라 접근 실패:", error);
      alert("카메라 접근 권한을 허용해주세요.");
      setIsModalOpen(false);
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const imageData = canvasRef.current.toDataURL("image/png");
        setImageSrc(imageData);
        onCapture(imageData);
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        setIsModalOpen(false); // 모달 닫기
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 이미지 미리보기 */}
      <div className="image-selector relative w-32 h-32 rounded-full flex items-center justify-center">
        <div className="image-selector-background absolute inset-0 z-0 rounded-full"></div>
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Captured"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <CiCamera size={48} className="text-gray-500" />
          )}
        </div>
      </div>

      {/* 촬영 버튼 */}
      <BasicButton
        size="small"
        color="primary"
        border={false}
        onClick={handleOpenCamera}
      >
        촬영
      </BasicButton>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-lg shadow-lg p-0 w-[90%] max-w-md flex items-center justify-center">
            <video
              ref={videoRef}
              className="w-full h-auto rounded-lg bg-black"
              autoPlay
              muted
            />
            <div className="absolute bottom-4 flex justify-center w-full">
              <button
                className="bg-gray-200 p-4 rounded-full shadow-lg hover:bg-gray-300"
                onClick={handleCapture}
              >
                <CiCamera size={36} className="text-black" />
              </button>
            </div>
            <button
              className="absolute top-2 right-2 text-white rounded-full p-1.5"
              onClick={handleCloseModal}
            >
              ✕
            </button>
          </div>
          <div className="hidden">
            <canvas ref={canvasRef} width="320" height="240" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Camera;
