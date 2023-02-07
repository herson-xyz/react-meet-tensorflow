// Install dependencies       - DONE
// Import dependencies        - DONE
// Setup webcam and canvas    - DONE
// Define references to those - DONE
// Load facemesh
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
  }

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