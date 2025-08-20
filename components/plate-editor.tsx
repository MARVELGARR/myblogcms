"use client";

import * as React from "react";

import { Plate, usePlateEditor } from "platejs/react";

import { EditorKit } from "@/components/editor-kit";
import { SettingsDialog } from "@/components/settings-dialog";
import { Editor, EditorContainer } from "@/components/ui/editor";
import { Button } from "./ui/button";
import { usePostStore } from "@/zustand/post-store";

export function PlateEditor() {
  const [value, setValue] = React.useState<any>([]);

  const setMarkdown= usePostStore((state)=> state.setMarkdown)
  const editor = usePlateEditor({
    plugins: EditorKit,
    value: value,
  });

  const markdown = editor.api.markdown.serialize();
  setMarkdown(markdown)


  return (
    <div className="">
      <Plate onChange={setValue} editor={editor}>
        <EditorContainer className="w-[50rem]">
          <Editor variant="fullWidth" />
        </EditorContainer>
        <SettingsDialog />
      </Plate>

     
    </div>
  );
}

