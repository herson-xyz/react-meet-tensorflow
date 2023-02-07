// Install dependencies       - DONE
// Import dependencies        - DONE
// Setup webcam and canvas    - DONE
// Define references to those - DONE
// Load facemesh              - DONE
// Detect function
// Drawing utilities
// Load triangulation
// Setup triangle path
// Setup point drawing
// Add drawMesh to detech function

import { useRef } from 'react'
import * as tf from "@tensorflow/tfjs"
import * as facemesh from "@tensorflow-models/facemesh"
import Webcam from "react-webcam"

export default function App() {

  const webcamRef = useRef(null)
  const canvasRef = useRef(null)

  const runFacemesh = async () =>
  { 
    const net = await facemesh.load(
      {
        inputResolution:{width:640, height:480}, scale:0.8
      })
    
    setInterval(() => {
      detect(net)
    }, 100)
  }

  // Detect function
  const detect = async (net) =>
  { 
    if (
      typeof webcamRef.current !== "undefined" && // Check webcam is not undefined
      webcamRef.current !== null &&               // Check webcam is not null
      webcamRef.current.video.readyState === 4)    // Check webcam is receiving data
    { 
      // Get Video Properties (Webcam)
      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth
      const videoHeight = webcamRef.current.video.videoHeight
      // Set video width
      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.height = videoHeight
      // Set canvas width
      canvasRef.current.width = videoWidth
      canvasRef.current.height = videoHeight
      // Make detections
      const face = await net.estimateFaces(video)
      console.log(face)
      // Get canvas context for drawing
    }
  }

  runFacemesh()
  return <>
    <header className="App-header">
    <Webcam ref={webcamRef} style={
      {
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 9,
        width: 640,
        height:480
      }
    } />
    <canvas ref={canvasRef} style={
      {
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 9,
        width: 640,
        height:480
      }
    } />
    </header>
    </>
}