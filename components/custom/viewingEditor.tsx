'use client'
import { Plate, usePlateEditor } from "platejs/react";
import { ViewingKit } from "./viewingKit";
import {  EditorContainer, EditorView } from "../ui/editor";

const ViewingEditor = (post: any) => {

     const editor = usePlateEditor({
    plugins: ViewingKit,
    value: [{ children: [{ text: post.content || "dsdssds" }], type: "p" }],
  });
    return (
            <div className="relative h-full">
              <Plate editor={editor} >
                <EditorContainer className="w-[50rem] h-full" variant="demo">
                  {/* <Editor  variant="demo" /> */}
                  <EditorView editor={editor}/>
                </EditorContainer>
              </Plate>
            </div>
    );
}
 
export default ViewingEditor;