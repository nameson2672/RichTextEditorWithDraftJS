import logo from './logo.svg';
import './App.css';
import ThemedToolbarEditor from './Components/RichTextEditor';
import RenderDraftJsData from './Components/RenderJsonFromDraftJS';
import {useEffect, useState} from "react";
import jsonData from "./data.json";
import ReactJson from 'react-json-view';

function App() {
  const [draftjsData, setDraftjsData] = useState(jsonData);
  return (
    <div className="App">
       
      <ThemedToolbarEditor  setDraftjsData={setDraftjsData} draftjsData={draftjsData}/>
      <div className='jsonRenderBox'>
      <ReactJson src={draftjsData} />
      </div>
      
     
    </div>
  );
}

export default App;
