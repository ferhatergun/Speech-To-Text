import { useState , useEffect } from "react"
import 'regenerator-runtime'
import SpeechRecognition,{useSpeechRecognition} from "react-speech-recognition"

function App() {
  const { transcript ,browserSupportsSpeechRecognition ,resetTranscript,listening} = useSpeechRecognition()
  const [language, setLanguage] = useState('en-US')

  const listenContinuously = () => SpeechRecognition.startListening({
    continuous: true,
    language:language

  })
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="container">
      <div className="content">
        <h3>Speech To Text React Libary</h3>
        <h5>Active Language {language} </h5>
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
        <div style={{display:"flex",gap:"10px",marginTop:"10px"}}>
        <button className="start"
          onClick={
            () => {
              setLanguage("de-DE")
            }
          }>
            German
          </button>
          <button className="start"
          onClick={
            () => {
              setLanguage("es-ES")
            }
          }>
            Spanish
          </button>
          <button className="start"
          onClick={
            () => {
              setLanguage("fr-FR")
            }
          }>
            French
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
