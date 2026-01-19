import useUploadPhotoDialogStore from "@/hooks/use-upload-photo-dialog";
import React, { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { IoMdImages } from "react-icons/io";
import { FileRejection, FileWithPath, useDropzone } from "react-dropzone";
import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";

type Props = {};

const UploadPhotoDialog = (props: Props) => {
  const { isOpen, close } = useUploadPhotoDialogStore();
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], fileRejections: FileRejection[]) => {
      acceptedFiles.forEach((file) => {
        setFiles((prevState) => [...prevState, file]);
      });
      fileRejections.forEach((file) => {
        setRejectedFiles((prevState) => [...prevState, file]);
      });
    },
    [],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  const removeImageFromPreview = (index: number) => {
    setFiles((prevImages) => prevImages.filter((image, i) => i !== index));
  };
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="rounded-3xl ">
        <DialogTitle className="text-center ">Upload Photos</DialogTitle>
        <DialogDescription className="text-center">
          {files.length === 0
            ? `No items selected`
            : files.length === 1
              ? `1 item selected`
              : files.length > 1
                ? `${files.length} items selected`
                : null}
        </DialogDescription>

        {files.length > 0 ? null : (
          <div
            {...getRootProps()}
            className="flex flex-col p-8 gap-6 justify-center items-center rounded-lg border-dashed border-2 border-gray-300"
          >
            <input {...getInputProps()} />
            <IoMdImages size={60} />
            {isDragActive ? (
              <div>Drop files here </div>
            ) : (
              <>
                <div className="text-2xl font-bold">Drag and drop</div>
                <div className="">or browse for photos</div>
              </>
            )}

            <Button className="p-6">Browse</Button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mb-3 mt-3 max-h-96 overflow-y-auto">
          {files.length > 0 &&
            files.map((image, index) => (
              <div key={index}>
                <div key={index} className="aspect-square relative">
                  <Image
                    src={URL.createObjectURL(image)}
                    key={index}
                    alt=""
                    height={300}
                    width={300}
                    onLoad={(e) => {
                      URL.revokeObjectURL(e.currentTarget.src);
                    }}
                    className="object-cover rounded-lg w-full h-full  transition"
                  />
                  <div className="absolute top-1 right-1  md:top-2 md:right-2  hover:cursor-pointer bg-black rounded-full p-2 ">
                    <RiDeleteBinLine
                      size={20}
                      color="#FFFFFF"
                      onClick={() => {
                        removeImageFromPreview(index);
                      }}
                    />
                    {/* <FaCircleXmark
                        size={20}
                        className="text-destructive   "
                        onClick={() => {
                          removeImageFromPreview(index);
                        }}
                      /> */}

                    {/* <DropdownMenu>
                            <DropdownMenuTrigger>
                              <HiDotsCircleHorizontal className="text-secondary" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => {
                                  removeImageFromPreview(index);
                                }}
                              >
                                Remove Picture
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu> */}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <hr />
        <div className="flex justify-between">
          {files.length > 0 ? (
            <Button
              onClick={close}
              size="lg"
              className="hover:cursor-pointer text-md"
              variant="ghost"
            >
              Cancel
            </Button>
          ) : (
            <Button
              disabled
              // onClick={handleContinue}
              size="lg"
              className="hover:cursor-pointer text-md"
              variant="ghost"
            >
              Done
            </Button>
          )}

          <Button
            disabled
            // onClick={handleContinue}
            size="lg"
            className="hover:cursor-pointer text-md"
          >
            Upload
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPhotoDialog;
