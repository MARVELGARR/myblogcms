
import { FileUploader } from "@/components/custom/fileUploader"
import { PostMetadataForm } from "@/components/custom/post-metadata-form"
import { PostSummary } from "@/components/custom/post-summary"
import { PlateEditor } from "@/components/plate-editor"
import React, { Children } from "react"

export default  function CreatePost() {


  return (
    <div className="w-full h-full gap-6 flex ">
      <PlateEditor/>
      <div className="flex flex-col h-full scrollbar no-scrollbar overflow-y-auto">
        <FileUploader className="" endpoint={"imageUploader"}/>
        <PostMetadataForm/>
        <PostSummary className=""/>
      </div>
    </div>
  )
}
