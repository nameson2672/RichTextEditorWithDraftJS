import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import mockUpload from '../Components/MockUpload';
import mentions from "../mention";

import Editor, { composeDecorators } from "@draft-js-plugins/editor";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import '@draft-js-plugins/alignment/lib/plugin.css';
import '@draft-js-plugins/linkify/lib/plugin.css';
import '@draft-js-plugins/mention/lib/plugin.css';
import mentionsStyles from '../Css/MentionsStyles.module.css';

import createToolbarPlugin from "@draft-js-plugins/static-toolbar";
import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop';
import createImagePlugin from '@draft-js-plugins/image';
import createDragNDropUploadPlugin from '@draft-js-plugins/drag-n-drop-upload';
import createAlignmentPlugin from '@draft-js-plugins/alignment';
import createFocusPlugin from '@draft-js-plugins/focus';
import createResizeablePlugin from '@draft-js-plugins/resizeable'
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import createEmojiPlugin from '@draft-js-plugins/emoji';
import createMentionPlugin, { defaultSuggestionsFilter} from '@draft-js-plugins/mention';

import editorStyles from "../Css/editorStyle.module.css";
import buttonStyles from "../Css/buttonStyle.module.css";
import toolbarStyles from "../Css/toolbarStyle.module.css";
import '@draft-js-plugins/image/lib/plugin.css';
import '@draft-js-plugins/emoji/lib/plugin.css';
import "@draft-js-plugins/mention/lib/plugin.css";

const toolbarPlugin = createToolbarPlugin({
  theme: { buttonStyles, toolbarStyles },
});
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;
const linkifyPlugin = createLinkifyPlugin( { component(props) {
  return <a {...props} onClick={() =>   window.open(
    props.href, "_blank")} />
}});

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

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const mentionPlugin = createMentionPlugin();
const { MentionSuggestions } = mentionPlugin;

const plugins = [
  toolbarPlugin,
  dragNDropFileUploadPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin,
  linkifyPlugin,
  emojiPlugin,
  mentionPlugin
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
    setDraftjsData(data);
    console.log(editorState.getCurrentContent());
    console.log(JSON.stringify(data));
  };

  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState(mentions);


  const onOpenChange = useCallback((_open) => {
    setOpen(_open);
  }, []);
  const onSearchChange = useCallback(({ value }) => {
    setOpen(true);
    setTimeout(() => {
      setSuggestions(defaultSuggestionsFilter(value, mentions));
    }, 200);
  }, []);
  


  useEffect(() => {
    console.log("hey");
  }, []);

  return (
    <div>
      <div className={editorStyles.editor} >
        <Editor
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
          ref={editor}
        />
        <AlignmentTool />
        {/* <Toolbar /> */}
        <EmojiSuggestions />
        <EmojiSelect />
        <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
        onAddMention={() => {
          // get the mention object selected
        }}
      />  
      </div>
      <button onClick={logMe}>Click Me</button>
    </div>
  );
};

export default ThemedToolbarEditor;
