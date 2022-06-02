import logo from './logo.svg';
import './App.css';
import ThemedToolbarEditor from './Components/RichTextEditor';
import RenderDraftJsData from './Components/RenderJsonFromDraftJS';
import CustomImageEditor from './Components/ImagePlugin';
import {useState} from "react";
import jsonData from "./data.json";


function App() {
  const initialState = {
    entityMap: {
      0: {
        type: 'IMAGE',
        mutability: 'IMMUTABLE',
        data: {
          src: '/logo192.png',
        },
      },
    },
    blocks: [
      {
        key: '9gm3s',
        text:
          'You can have images in your text field. This is a very rudimentary example, but you can enhance the image plugin with resizing, focus or alignment plugins.',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: 'ov7r',
        text: ' ',
        type: 'atomic',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 0,
          },
        ],
        data: {},
      },
      {
        key: 'e23a8',
        text: 'See advanced examples further down …',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
  };
  const [draftjsData, setDraftjsData] = useState(jsonData);
  return (
    <div className="App">
      <ThemedToolbarEditor  setDraftjsData={setDraftjsData} draftjsData={draftjsData}/>
      <RenderDraftJsData JsonData={draftjsData} />
      {/* <CustomImageEditor /> */}
    </div>
  );
}

export default App;
