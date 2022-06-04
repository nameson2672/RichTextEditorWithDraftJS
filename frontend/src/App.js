import logo from './logo.svg';
import './App.css';
import ThemedToolbarEditor from './Components/RichTextEditor';
import RenderDraftJsData from './Components/RenderJsonFromDraftJS';
import {useState} from "react";
import jsonData from "./data.json";

function App() {
  const [draftjsData, setDraftjsData] = useState(jsonData);
  return (
    <div className="App">
       
      <ThemedToolbarEditor  setDraftjsData={setDraftjsData} draftjsData={draftjsData}/>
      <RenderDraftJsData JsonData={draftjsData} />
      
     
    </div>
  );
}

export default App;
