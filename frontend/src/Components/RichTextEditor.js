import React, { useRef, useEffect, useState } from "react";
//import mockUpload from '../Components/MockUpload';
import { readFile } from "@draft-js-plugins/drag-n-drop-upload";

import Editor, { composeDecorators } from "@draft-js-plugins/editor";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import '@draft-js-plugins/alignment/lib/plugin.css';

import createToolbarPlugin from "@draft-js-plugins/static-toolbar";
import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop';
import createImagePlugin from '@draft-js-plugins/image';
import createDragNDropUploadPlugin from '@draft-js-plugins/drag-n-drop-upload';
import createAlignmentPlugin from '@draft-js-plugins/alignment';
import createFocusPlugin from '@draft-js-plugins/focus';
import createResizeablePlugin from '@draft-js-plugins/resizeable'

import editorStyles from "../Css/editorStyle.module.css";
import buttonStyles from "../Css/buttonStyle.module.css";
import toolbarStyles from "../Css/toolbarStyle.module.css";

const toolbarPlugin = createToolbarPlugin({
  theme: { buttonStyles, toolbarStyles },
});
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
   resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });

const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
  handleUpload: mockUpload,
  addImage: imagePlugin.addImage,
});
const { Toolbar } = toolbarPlugin;

const plugins = [
  toolbarPlugin,
  dragNDropFileUploadPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin,
];


const ThemedToolbarEditor = ({ setDraftjsData, draftjsData }) => {
    
  const contentState = convertFromRaw(draftjsData);

  const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));
  const editor = useRef(null)

  const onChange = (editorState) => {
    setEditorState(editorState);
    console.log(editorState);
    setDraftjsData(convertToRaw(editorState.getCurrentContent()));
  };


  const logMe = () => {
    const data = convertToRaw(editorState.getCurrentContent());
    //setDraftjsData(data);
    console.log(editorState.getCurrentContent());
    console.log(data);
  };
  const focus = () => {
    editor.focus();
  };
  useEffect(() => {
    //setEditorState(createEditorStateWithText(text));
  }, []);

  return (
    <div>
      <div className={editorStyles.editor} onClick={focus}>
        <Editor
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
          ref={editor}
        />
        <AlignmentTool />
        <Toolbar />
      </div>
      <button onClick={logMe}>Click Me</button>
    </div>
  );
};

export default ThemedToolbarEditor;

function mockUpload(data, success, failed, progress) {
  function doProgress(percent) {
    progress(percent);
    if (percent === 100) {
      // Start reading the file
      Promise.all(data.files.map(readFile)).then((files) =>
      success(files, { retainSrc: true })
      );
    } else {
      setTimeout(doProgress, 250, (percent || 0) + 10);
    }
  }
  data.files[0].src = "/logo192.png"
  console.log(data);
  success(data.files, { retainSrc: true });
  //doProgress(100);
}