// src/components/camera/Camera.jsx
import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import './Camera.scss';

const Camera = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const runCoco = async () => {
      console.log("Loading COCO-SSD model...");
      const net = await cocoSsd.load();
      console.log("Model loaded.");
      setInterval(() => {
        detect(net);
      }, 1000);
    };

    const detect = async (net) => {
      if (
        webcamRef.current &&
        webcamRef.current.video.readyState === 4
      ) {
        console.log("Video ready.");
        const video = webcamRef.current.video;
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;

        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        const obj = await net.detect(video);

        const ctx = canvasRef.current.getContext('2d');
        drawRect(obj, ctx, videoWidth, videoHeight);
      } else {
        console.log("Video not ready yet.");
      }
    };

    runCoco();
  }, []);

  const drawRect = (detections, ctx, videoWidth, videoHeight) => {
    ctx.clearRect(0, 0, videoWidth, videoHeight);

    detections.forEach((prediction) => {
      const [x, y, width, height] = prediction['bbox'];
      const text = prediction['class'];

      const color = 'red';
      ctx.strokeStyle = color;
      ctx.font = '18px Arial';

      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
      ctx.rect(x, y, width, height);
      ctx.stroke();
    });
  };

  return (
    <div className="camera">
      <Webcam
        ref={webcamRef}
        muted={true}
        className="camera__webcam"
        videoConstraints={{
          facingMode: "environment" 
        }}
        onUserMedia={() => console.log("Camera feed started.")}
      />
      <canvas
        ref={canvasRef}
        className="camera__canvas"
      />
    </div>
  );
};

export default Camera;
