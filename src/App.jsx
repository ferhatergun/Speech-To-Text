import { useState , useEffect } from "react"
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

  const [transcriptBrowser, setTranscriptBrowser] = useState('');
  const [listeningBrowser, setListeningBrowser] = useState(false); // Dinleme durumu
  const [recognition, setRecognition] = useState(null);

  const startRecognition = () => {
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    setRecognition(recognitionInstance);

    recognitionInstance.onresult = (event) => {
      const result = event.results[0][0].transcript;
      console.log("onresult",event);
      setTranscriptBrowser(result);
    };
    recognitionInstance.onstart = (event) => {
      console.log("başladı",event);
    
    }
    recognitionInstance.onspeechstart = (event) => {
      console.log("konuşma başladı",event);
    
    }
    recognitionInstance.onspeechend = (event) => {
      console.log("konuşma bitti",event);
    }
    recognitionInstance.onsoundend = (event) => {
      console.log("ses bitti",event);
    
    }

    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognitionInstance.onend = (event) => {
      console.log("durdu",event);
      setListeningBrowser(false);
    };

    recognitionInstance.start();
    setListeningBrowser(true);
  }

  const stopRecognition = () => {
    console.log("stop fonksiyonu");
    if (recognition) {
      recognition.stop();
      setListeningBrowser(false);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <h3>Speech To Text React Libary</h3>
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
      <div className="content">
        <h3>Speech To Text Browser Libary</h3>
        <div className="btn-container">
          <button className="start"
          onClick={
            () => {
              startRecognition()
            }
          }>
            Start Listening
          </button>
          <button className="stop"
          onClick={
            () => {
              stopRecognition()
            }
          }>
            Stop Listening
          </button>
          <button className="stop"
          onClick={
            () => {
              setTranscriptBrowser('')
            }
          }>
            Reset
          </button>
        </div>
        <div>
          {
            listeningBrowser ? <span>🎙️</span> : <span>🛑</span>
          }
        </div>
        {
          transcriptBrowser
        }
      </div>
    </div>
  )
}

export default App
