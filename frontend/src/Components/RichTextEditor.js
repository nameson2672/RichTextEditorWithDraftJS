import React, { useRef, useEffect, useState, useCallback } from "react";
import mockUpload from "../Components/MockUpload";
import mentions from "../mention";
import jsonData from "../data.json";


import Editor, { composeDecorators } from "@draft-js-plugins/editor";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import "@draft-js-plugins/alignment/lib/plugin.css";
import "@draft-js-plugins/linkify/lib/plugin.css";
import "@draft-js-plugins/mention/lib/plugin.css";
import "@draft-js-plugins/text-alignment/lib/plugin.css"
import mentionsStyles from "../Css/MentionsStyles.module.css";

import createBlockDndPlugin from "@draft-js-plugins/drag-n-drop";
import createImagePlugin from "@draft-js-plugins/image";
import createDragNDropUploadPlugin from "@draft-js-plugins/drag-n-drop-upload";
import createAlignmentPlugin from "@draft-js-plugins/alignment";
import createFocusPlugin from "@draft-js-plugins/focus";
import createResizeablePlugin from "@draft-js-plugins/resizeable";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import createEmojiPlugin from "@draft-js-plugins/emoji";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "@draft-js-plugins/mention";
import createToolbarPlugin from "@draft-js-plugins/static-toolbar";
import  createTextAlignmentPlugin from '@draft-js-plugins/text-alignment';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  AlignTextCenterButton,
  AlignTextLeftButton, 
  AlignTextRightButton,
  SubButton,
  
} from "@draft-js-plugins/buttons";
// AlignBlockCenterButton, AlignBlockDefaultButton, AlignBlockLeftButton, AlignBlockRightButton, AlignTextCenterButton, AlignTextLeftButton, AlignTextRightButton, BlockquoteButton, BoldButton, CodeBlockButton, CodeButton, HeadlineOneButton, HeadlineThreeButton, HeadlineTwoButton, ItalicButton, OrderedListButton, SubButton, SupButton, UnderlineButton, UnorderedListButton, createBlockAlignmentButton, createBlockStyleButton, createInlineStyleButton, createTextAlignmentButton

import editorStyles from "../Css/editorStyle.module.css";
import buttonStyles from "../Css/buttonStyle.module.css";
import toolbarStyles from "../Css/toolbarStyle.module.css";
import "@draft-js-plugins/image/lib/plugin.css";
import "@draft-js-plugins/emoji/lib/plugin.css";
import "@draft-js-plugins/mention/lib/plugin.css";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;
const linkifyPlugin = createLinkifyPlugin({
  component(props) {
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

const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
  handleUpload: mockUpload,
  addImage: imagePlugin.addImage,
});

const emojiPlugin = createEmojiPlugin({
  allowImageCache: true,
  useNativeArt: true,
});
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const mentionPlugin = createMentionPlugin();
const { MentionSuggestions } = mentionPlugin;
const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;
const textAlignmentPlugin = createTextAlignmentPlugin();

const plugins = [
  dragNDropFileUploadPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin,
  linkifyPlugin,
  emojiPlugin,
  mentionPlugin,
  toolbarPlugin,
  textAlignmentPlugin
];

const ThemedToolbarEditor = ({ setDraftjsData, draftjsData }) => {
  const contentState = convertFromRaw(jsonData);

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentState)
  );
  const editor = useRef(null);

  const onChange = (editorState) => {
    setEditorState(editorState);
    
  const content = editorState.getCurrentContent();
    //setDraftjsData(convertToRaw(content));
    console.log(content);
    
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
      <Toolbar>
          {(externalProps) => (
            <div>
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <CodeButton {...externalProps} />
              <HeadlineOneButton {...externalProps} />
              <HeadlineTwoButton {...externalProps} />
              <HeadlineThreeButton {...externalProps} />
              <UnorderedListButton {...externalProps} />
              <OrderedListButton {...externalProps} />
              <BlockquoteButton {...externalProps} />
              <CodeBlockButton {...externalProps} />
              <textAlignmentPlugin.TextAlignment {...externalProps} />
             
            </div>
          )}
        </Toolbar>
      <div className={editorStyles.editor}>
        
        <Editor
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
          ref={editor}
        />
        <AlignmentTool />
        <EmojiSuggestions />
        <EmojiSelect />
        <MentionSuggestions
          open={open}
          onOpenChange={onOpenChange}
          suggestions={suggestions}
          onSearchChange={onSearchChange}
          onAddMention={(e) => {
            console.log(e);
            // get the mention object selected
          }}
        />
      </div>
      <button className="setRenderJsonValueButton" onClick={logMe}>Render Content To JSON</button>
    </div>
  );
};

export default ThemedToolbarEditor;
