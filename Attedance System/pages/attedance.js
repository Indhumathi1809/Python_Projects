// pages/attendance.js

import { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

export default function AttendancePage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  let intervalId = null;

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    const detectFace = async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);

      intervalId = setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      }, 100);
    };

    const loadFaceAPI = async () => {
      const script = document.createElement('script');
      script.src = '/models/face-api.min.js';
      script.async = true;
      script.onload = () => {
        loadModels(); // Load face-api.js models
        startCamera(); // Start camera after script is loaded
        detectFace(); // Start face detection
      };
      document.body.appendChild(script);
    };

    loadFaceAPI(); // Load face-api.js
    return () => {
      clearInterval(intervalId); // Cleanup interval on unmount
    };
  }, []);

  return (
    <div>
      <h1>Face Recognition Attendance System</h1>
      <video ref={videoRef} autoPlay playsInline muted width="640" height="480"></video>
      <canvas ref={canvasRef} width="640" height="480"></canvas>
    </div>
  );
}
