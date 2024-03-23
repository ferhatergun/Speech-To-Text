import { useState } from "react"
import 'regenerator-runtime'
import SpeechRecognition,{useSpeechRecognition} from "react-speech-recognition"

function App() {
  const { transcript ,browserSupportsSpeechRecognition ,resetTranscript,listening} = useSpeechRecognition()

  const listenContinuously = () => SpeechRecognition.startListening({
    continuous: true,
  })
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  console.log(transcript)
  
  return (
    <div className="container">
      <div className="content">
        <h2>Speech To Text</h2>
        <div className="btn-container">
          <button className="start"
          onClick={
            () => {
              listenContinuously()
            }
          }>
            Start Listening
          </button>
          <button className="stop"
          onClick={
            () => {
              SpeechRecognition.stopListening()
            }
          }>
            Stop Listening
          </button>
          <button className="stop"
          onClick={
            () => {
              resetTranscript()
            }
          }>
            Reset
          </button>
        </div>
        <div>
          {
            listening ? <span>🎙️</span> : <span>🛑</span>
          }
        </div>
        {
          transcript
        }
      </div>
    </div>
  )
}

export default App
