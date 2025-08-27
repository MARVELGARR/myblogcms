import * as React from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import type {
  ClientUploadedFileData,
  UploadFilesOptions,
} from 'uploadthing/types';
import { generateReactHelpers } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';

export const { uploadFiles, useUploadThing } =
  generateReactHelpers<OurFileRouter>();

export type UploadedFile<T = unknown> = ClientUploadedFileData<T>;

interface UseUploadFileProps
  extends Pick<
    UploadFilesOptions<OurFileRouter['editorUploader']>,
    'headers' | 'onUploadBegin' | 'onUploadProgress' | 'skipPolling'
  > {
  onUploadComplete?: (file: UploadedFile) => void;
  onUploadError?: (error: unknown) => void;
}

export function useUploadFile({
  onUploadComplete,
  onUploadError,
  ...props
}: UseUploadFileProps = {}) {
  const [uploadedFile, setUploadedFile] = React.useState<UploadedFile>();
  const [uploadingFile, setUploadingFile] = React.useState<File>();
  const [progress, setProgress] = React.useState<number>(0);
  const [isUploading, setIsUploading] = React.useState(false);

  async function uploadThing(file: File) {
    setIsUploading(true);
    setUploadingFile(file);

    try {
      const res = await uploadFiles('editorUploader', {
        ...props,
        files: [file],
        onUploadProgress: ({ progress }) => {
          setProgress(Math.min(progress, 100));
        },
      });

      setUploadedFile(res[0]);
      onUploadComplete?.(res[0]);

      return res[0];
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage || 'Something went wrong, please try again later.');
      onUploadError?.(error);

      // // Mock fallback
      // const mockUploadedFile: UploadedFile = {
      //   key: 'mock-key-0',
      //   appUrl: `https://mock-app-url.com/${file.name}`,
      //   name: file.name,
      //   size: file.size,
      //   type: file.type,
      //   url: URL.createObjectURL(file),
      //   serverData: undefined,
      //   customId: null,
      //   ufsUrl: '',
      //   fileHash: ''
      // };

      // // Simulate progress for mock
      // let progressValue = 0;
      // while (progressValue < 100) {
      //   await new Promise((resolve) => setTimeout(resolve, 50));
      //   progressValue += 2;
      //   setProgress(Math.min(progressValue, 100));
      // }

      // setUploadedFile(mockUploadedFile);
      // return mockUploadedFile;
    } finally {
      setProgress(0);
      setIsUploading(false);
      setUploadingFile(undefined);
    }
  }

  return {
    isUploading,
    progress,
    uploadedFile,
    uploadFile: uploadThing,
    uploadingFile,
  };
}

export function getErrorMessage(err: unknown) {
  if (err instanceof z.ZodError) {
    return err.issues.map((issue) => issue.message).join('\n');
  } else if (err instanceof Error) {
    return err.message;
  }
  return 'Something went wrong, please try again later.';
}

export function showErrorToast(err: unknown) {
  toast.error(getErrorMessage(err));
}
