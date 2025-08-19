"use client";

import * as React from "react";

import { Plate, usePlateEditor } from "platejs/react";

import { EditorKit } from "@/components/editor-kit";
import { SettingsDialog } from "@/components/settings-dialog";
import { Editor, EditorContainer } from "@/components/ui/editor";
import { Button } from "./ui/button";

export function PlateEditor() {
  const [value, setValue] = React.useState<any>([]);
  const editor = usePlateEditor({
    plugins: EditorKit,
    value: value,
  });

  const markdown = editor.api.markdown.serialize();
  const handleSubmit = () => {
    alert(markdown)

  };

  return (
    <div className="">
      <Plate onChange={setValue} editor={editor}>
        <EditorContainer className="w-[50rem]">
          <Editor variant="fullWidth" />
        </EditorContainer>
        <SettingsDialog />
      </Plate>

      <button className="cursor-pointer" onClick={handleSubmit}>
        
        submit
      </button>
    </div>
  );
}

