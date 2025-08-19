
import { FileUploader } from "@/components/custom/fileUploader"
import { PostMetadataForm } from "@/components/custom/post-metadata-form"
import { PlateEditor } from "@/components/plate-editor"
import React, { Children } from "react"

export default  function Home() {


  return (
    <div className="w-full h-full gap-6 flex ">
      <PlateEditor/>
      <div className="flexe flex-col">
        <FileUploader endpoint={"imageUploader"}/>
        <PostMetadataForm/>
      </div>
    </div>
  )
}
