import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';

export default function Test() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const isPlayingRef = useRef(false);
  const [countdown, setCountdown] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [keypointsData, setKeypointsData] = useState([]);
  let detectionInterval;
  let countdownInterval;

  useEffect(() => {
    async function setupCamera() {
      const video = videoRef.current;
      const stream = await navigator.mediaDevices.getUserMedia({ 'video': true });
      video.srcObject = stream;
      video.play();
    }
    setupCamera();
  }, []);

  const drawKeypoints = (keypoints) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Define the keypoint connections
    const adjacentKeyPoints = posenet.getAdjacentKeyPoints(keypoints, 0.5);

    // Draw the keypoints
    keypoints.forEach(keypoint => {
        ctx.beginPath();
        ctx.arc(keypoint.position.x, keypoint.position.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
    });

    // Draw the lines
    adjacentKeyPoints.forEach(points => {
        ctx.beginPath();
        ctx.moveTo(points[0].position.x, points[0].position.y);
        ctx.lineTo(points[1].position.x, points[1].position.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'aqua';
        ctx.stroke();
    });
};

  const startVideoAndDetection = async () => {
    setIsPlaying(true);
    isPlayingRef.current = true;

    const net = await posenet.load();

    detectionInterval = setInterval(async () => {
      if (!isPlayingRef.current) {
        return;
      }

      const pose = await net.estimateSinglePose(videoRef.current);
      console.log(pose.keypoints);
      drawKeypoints(pose.keypoints);
      setKeypointsData(prevData => [...prevData, pose.keypoints]);
    }, 1000/30);

    countdownInterval = setInterval(() => {
      if (countdown <= 0 || !isPlayingRef.current) {
        clearInterval(countdownInterval);
        return;
      }
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);
  };

  const pauseRecording = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    clearInterval(detectionInterval);
    clearInterval(countdownInterval);
  };

  const downloadCSV = () => {

    let csvContent = "data:text/csv;charset=utf-8,";
    keypointsData.forEach(keypoints => {
      keypoints.forEach(keypoint => {
        const row = [keypoint.part, keypoint.position.x, keypoint.position.y];
        csvContent += row.join(",") + "\n";
      });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "keypoints.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        <video ref={videoRef} width="640" height="480" playsInline></video>
        <canvas ref={canvasRef} width="640" height="480"></canvas>
      </div>
      <div>
        {isPlaying ? (
          <button onClick={pauseRecording}>Stop</button>
        ) : (
          <button onClick={startVideoAndDetection}>Play</button>
        )}
        <button onClick={downloadCSV}>Download CSV</button>
        <span>Time Remaining: {countdown >= 0 ? countdown : 0} seconds</span>
      </div>
    </div>
  );
}
