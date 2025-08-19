"use client"

import { useState } from "react"



import { X, FileIcon, ImageIcon, VideoIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { UploadDropzone } from "@/utils/uploadthings"
import { Button } from "../ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card"


interface UploadedFile {
  url: string
  name: string
  size: number
  type: string
}

interface FileUploaderProps {
  endpoint: "imageUploader" 
  title?: string
  description?: string
  maxFiles?: number
  onUploadComplete?: (files: UploadedFile[]) => void
  className?: string
}

export function FileUploader({
  endpoint,
  title = "Upload Files",
  description = "Drag and drop files here or click to browse",
  maxFiles = 4,
  onUploadComplete,
  className,
}: FileUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const handleUploadComplete = (res: any) => {
    const newFiles = res.map((file: any) => ({
      url: file.url,
      name: file.name,
      size: file.size,
      type: file.type,
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])
    setIsUploading(false)
    onUploadComplete?.(newFiles)
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
    if (type.startsWith("video/")) return <VideoIcon className="h-4 w-4" />
    return <FileIcon className="h-4 w-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Card className={cn("w-full max-w-2xl", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {uploadedFiles.length < maxFiles && (
          <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={handleUploadComplete}
            onUploadError={(error: Error) => {
              console.error("Upload error:", error)
              setIsUploading(false)
            }}
            onUploadBegin={() => {
              setIsUploading(true)
            }}
            className="ut-button:bg-primary ut-button:ut-readying:bg-primary/50 ut-label:text-primary ut-allowed-content:ut-uploading:text-red-300"
          />
        )}

        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Uploaded Files</h4>
            <div className="grid gap-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => window.open(file.url, "_blank")}>
                      View
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isUploading && <div className="text-center text-sm text-muted-foreground">Uploading files...</div>}
      </CardContent>
    </Card>
  )
}
