import { useRef, useState, useEffect, useCallback } from "react";
import '@mediapipe/face_detection';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';// Register WebGL backend.
import * as faceDetection from '@tensorflow-models/face-detection';
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

export default function WebcamComponent() {
    const webcamRef = useRef(null)
    const modelRef = useRef(null)
    const predictionsRef = useRef(null);
    const requestRef = useRef(null);
    const [ready, setReady] = useState(false);

    const capture = useCallback(async () =>
    {
      if (webcamRef.current && modelRef.current) {
        const predictions = await modelRef.current.estimateFaces(
          webcamRef.current.getCanvas()
        );

        if (predictions) {
          console.log(predictionsRef)
          predictionsRef.current = predictions;
        }

        if (!ready) {
          setReady(true);
        }
      }

      // requestRef.current = requestAnimationFrame(capture);
    }, [webcamRef, ready])
  
    useEffect(() =>
    {
        const load = async () => {
          const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
          const detectorConfig = {
            runtime: 'tfjs', // or 'tfjs'
          }
          modelRef.current = await faceDetection.createDetector(model, detectorConfig);
      };

      load();
    }, [capture]);
    
    return<>
        <Webcam
            audio={false}
            height={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
        />
        <button
            onClick={() => {
              requestRef.current = requestAnimationFrame(capture);
            }}
        >
          Start face tracking{" "}
          <span role="img" aria-label="Start">
            🖐
          </span>
        </button>
    </>
}