import React from "react";
import  Editor from "@draft-js-plugins/editor";
import { convertFromRaw, EditorState } from 'draft-js';
import createImagePlugin from '@draft-js-plugins/image';
import editorStyles from "../Css/editorStyle.module.css";


const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

const RenderDraftJsData = (draftjsData) => {
    const data =  draftjsData.JsonData;
    const contentState = convertFromRaw(data);
    const editorState = EditorState.createWithContent(contentState);
    

    return (
        <div>
            <div className={editorStyles.editor} >
                <Editor
                    editorState={editorState}
                    readOnly={true}
                    plugins={plugins}
                />
            </div>
        </div>
    );
};

export default RenderDraftJsData;