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
import {
  bootcampUploadPreset,
  cloudinaryApiKey,
  cloudinaryBaseUrl,
  cloudinaryThumbnailUrl,
} from "../../../cloudinary-config";
import toast from "react-hot-toast";
import axios from "axios";
import { FieldPath, FieldPathValue, useForm } from "react-hook-form";
import { ImageFormValues } from "@/lib/types";
import { uploadImages } from "@/actions/listing/upload-images";
import * as z from "zod";

type Props = {
  listingId: string;
};

const UploadPhotoDialog = ({ listingId }: Props) => {
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
    maxFiles: 20,
    maxSize: 2048 * 1000,
    accept: {
      "image/*": [],
    },
  });
  const removeImageFromPreview = (index: number) => {
    setFiles((prevImages) => prevImages.filter((image, i) => i !== index));
  };

  const form = useForm<ImageFormValues>({
    defaultValues: {
      images: [],
      //   advertId: advert.id,
    },
  });

  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  const setCustomValue = <TField extends FieldPath<ImageFormValues>>(
    id: TField,
    value: FieldPathValue<ImageFormValues, TField>,
  ) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const images = watch("images");

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const url = `${cloudinaryBaseUrl}/image/upload`;
    const formData = new FormData();
    let counter = 0;

    files.forEach((file: File) => {
      counter++;
      formData.append("file", file);
      formData.append("upload_preset", bootcampUploadPreset as string);
      formData.append("api_key", cloudinaryApiKey as string);
      toast.promise(
        axios
          .post(url, formData)
          .then((res) => {
            const {
              secure_url: url,
              public_id: publicId,
              signature: signature,
              created_at: createdAt,
            } = res.data;

            images.push({
              url: url,
              publicId: publicId,
              signature: signature,
              thumbnail: `${cloudinaryThumbnailUrl}/${publicId}`,
            });
          })
          .then(() => {
            if (counter === files.length) {
              setCustomValue("images", images);
              if (images.length === files.length) {
                uploadImages(images, listingId).then(() => {
                  setCustomValue("images", []);
                });
              }
            }
          }),
        {
          loading: `${file.name} is uploading`,
          success: `${file.name} uploaded successfully`,
          error: ` ${file.name} not uploaded`,
        },
        // ToastSuccessStyle,
      );
    });

    setFiles([]);
    setRejectedFiles([]);
    close();
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

        <div className="grid grid-cols-2 gap-3 mb-3 mt-3 max-h-112 overflow-y-auto">
          {files.length > 0 &&
            files.map((file, index) => (
              <div key={index}>
                <div key={index} className="aspect-square relative">
                  <Image
                    src={URL.createObjectURL(file)}
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
        {/* {rejectedFiles && (
          <ul className="mb-5">
            {rejectedFiles.map(({ file, index, errors }) => (
              <li key={index} className="flex items-start justify-between">
                <div>
                  <p className="mt-2 text-neutral-500 text-sm font-medium">
                    {file.name}
                  </p>
                  <ul className="text-[12px] text-red-400">
                    {errors.map((error) => (
                      <li key={error.code}>{error.message}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )} */}

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
            disabled={files.length === 0}
            // onClick={handleContinue}
            onClick={onSubmit}
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
