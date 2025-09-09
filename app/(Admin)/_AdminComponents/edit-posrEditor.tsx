"use client";
import { Plate, usePlateEditor } from "platejs/react";
import { Editor, EditorContainer } from "@/components/ui/editor";
import { EditorKit } from "@/components/editor-kit";
import { Prisma } from "@prisma/client";
import { PostDetailsDrawer } from "@/components/AdminPostComponent/postUI/post-details-drawer";
import EditButtonForDrawer from "./edit-button-for-drawer";

export type EditorPostProp = {
  post: Prisma.PostGetPayload<{
    include: {
      author: {
        select: {
          name: true;
        };
      };
      category: {
        select: {
          name: true;
        };
      };
    };
  }>;
};
const EditPostEditor = ({ post }: EditorPostProp) => {
  const editor = usePlateEditor({
    plugins: EditorKit,
    value: [{ children: [{ text: post.content }], type: "p" }],
  });
  return (
    <div className="relative h-full">
      <Plate editor={editor}>
        <EditorContainer className="w-[50rem] h-full" variant="default">
          <Editor  variant="fullWidth" />
        </EditorContainer>
      </Plate>
      <PostDetailsDrawer post={post} />
      <EditButtonForDrawer/>
    </div>
  );
};

export default EditPostEditor;
