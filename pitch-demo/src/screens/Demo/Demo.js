import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';

export default function Test() {
  const videoRef = useRef(null);
  const [keypointsData, setKeypointsData] = useState([]);
  const [countdown, setCountdown] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  let detectionInterval;

  useEffect(() => {
    async function setupCamera() {
      const video = videoRef.current;
      const stream = await navigator.mediaDevices.getUserMedia({ 'video': true });
      video.srcObject = stream;

      // Set the video's height to window's inner height
      video.height = window.innerHeight;

      // Adjust the width based on the video's aspect ratio
      video.onloadedmetadata = function(e) {
        video.width = video.videoWidth * (window.innerHeight / video.videoHeight);
      };

      video.play();
    }
    setupCamera();
  }, []);

  const startVideoAndDetection = async () => {
    setIsPlaying(true);

    const net = await posenet.load();

    detectionInterval = setInterval(async () => {
      const pose = await net.estimateSinglePose(videoRef.current);
      setKeypointsData(prevData => [...prevData, pose.keypoints]);
    }, 1000/30);

    const countdownInterval = setInterval(() => {
      if (countdown <= 0) {
        pauseVideo();
        clearInterval(countdownInterval);
      }
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);
  };

  const pauseVideo = () => {
    setIsPlaying(false);
    clearInterval(detectionInterval);
  };

  const saveCSVToLocalDir = async () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    keypointsData.forEach(keypoints => {
      keypoints.forEach(keypoint => {
        const row = [keypoint.part, keypoint.position.x, keypoint.position.y];
        csvContent += row.join(",") + "\n";
      });
    });

    try {
      const response = await fetch('/api/saveCSV', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ csvData: csvContent }),
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error saving CSV:', error);
    }
  };

  const fetchCSVData = async () => {
    try {
      const response = await fetch('/api/saveCSV', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ csvData: csvContent }),
      });
      const csvData = await response.text();
      console.log(csvData);
    } catch (error) {
      console.error('Error fetching CSV:', error);
    }
  };

  useEffect(() => {
    if (countdown <= 0) {
      saveCSVToLocalDir();
    }
  }, [countdown]);

  return (
    <div className="App">
      <video ref={videoRef} width="640" height="1200" playsInline></video>
      <div>
        {isPlaying ? (
          <button onClick={pauseVideo}>Pause</button>
        ) : (
          <button onClick={startVideoAndDetection}>Play</button>
        )}
        <button onClick={fetchCSVData}>Fetch CSV Data</button>
        <span>Time Remaining: {countdown >= 0 ? countdown : 0} seconds</span>
      </div>
    </div>
  );
}
