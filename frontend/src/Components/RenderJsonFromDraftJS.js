import Editor, { composeDecorators } from "@draft-js-plugins/editor";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";


import createToolbarPlugin from "@draft-js-plugins/static-toolbar";
import createBlockDndPlugin from "@draft-js-plugins/drag-n-drop";
import createImagePlugin from "@draft-js-plugins/image";
import createAlignmentPlugin from "@draft-js-plugins/alignment";
import createFocusPlugin from "@draft-js-plugins/focus";
import createResizeablePlugin from "@draft-js-plugins/resizeable";
import createLinkifyPlugin from "@draft-js-plugins/linkify";

import editorStyles from "../Css/editorStyle.module.css";
import buttonStyles from "../Css/buttonStyle.module.css";
import toolbarStyles from "../Css/toolbarStyle.module.css";
import "@draft-js-plugins/image/lib/plugin.css";
import { useEffect, useRef, useState } from "react";
import "@draft-js-plugins/alignment/lib/plugin.css";
import "@draft-js-plugins/linkify/lib/plugin.css";

const toolbarPlugin = createToolbarPlugin({
  theme: { buttonStyles, toolbarStyles },
});
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const linkifyPlugin = createLinkifyPlugin({
  component(props) {
    // eslint-disable-next-line no-alert, jsx-a11y/anchor-has-content
    return <a {...props} onClick={() => window.open(props.href, "_blank")} />;
  },
});

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });

const { Toolbar } = toolbarPlugin;

const plugins = [
    linkifyPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin
];

const RenderDraftJsData = (draftjsData) => {
  const data = draftjsData.JsonData;
  const contentState = convertFromRaw(data);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));
  const editorref = useRef(null);

  const onChange = (editorState) => {
    setEditorState(editorState);
    
  };
  
  useEffect(()=>{
    const dataRefreshFromRichtext = draftjsData.JsonData;
    const contentStateRfreshFromRichText = convertFromRaw(dataRefreshFromRichtext);
    setEditorState(EditorState.createWithContent(contentStateRfreshFromRichText));
  },[draftjsData])
  
 

  return (
    <div>
      <div className={editorStyles.editor}>
        <Editor
        onChange={onChange}
          editorState={editorState}
          plugins={plugins}
          ref={editorref}
        />
      </div>
    </div>
  );
};

export default RenderDraftJsData;
