"use client";
import React, { useRef, useState } from "react";
import { CiCamera } from "react-icons/ci";
import BasicButton from "../../ui/BasicButton";

interface CameraProps {
  onCapture: (imageData: string) => void; // 캡처된 이미지를 상위 컴포넌트에 전달
}

const Camera: React.FC<CameraProps> = ({ onCapture }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleOpenCamera = async () => {
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
        onCapture(imageData); // 상위 컴포넌트로 이미지 전달
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="image-selector">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Captured"
            className="w-full h-full rounded object-cover"
          />
        ) : (
          <div className="image-selector-background">
            <CiCamera size={48} />
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <BasicButton
          size="small"
          color="gray"
          border={false}
          onClick={handleOpenCamera}
        >
          준비
        </BasicButton>
        <BasicButton
          size="small"
          color="primary"
          border={false}
          onClick={handleCapture}
        >
          촬영
        </BasicButton>
      </div>
      <div className="hidden">
        <video ref={videoRef} width="320" height="240" />
        <canvas ref={canvasRef} width="320" height="240" />
      </div>
    </div>
  );
};

export default Camera;
