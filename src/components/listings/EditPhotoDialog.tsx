"use client";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import useEditPhotoDialogStore from "@/hooks/use-edit-photo-dialog";
import useEditPhotoStore from "@/hooks/use-edit-photo-store";
import { deletePhoto } from "@/actions/listing/delete-photo";
import toast from "react-hot-toast";
import { updatePhotoCaption } from "@/actions/listing/update-photo-caption";

type Props = {
  listingId: string;
};

const EditPhotoDialog = ({ listingId }: Props) => {
  const { isOpen, close } = useEditPhotoDialogStore();
  const { photoId, photoUrl, photoCaption, photoPublicId, setPhotoCaption } =
    useEditPhotoStore();

  const handleDialogClose = () => {
    close();
  };

  const handleSave = () => {
    toast.promise(updatePhotoCaption(listingId, photoCaption, photoId), {
      loading: "Updating photo caption",
      error: "Photo caption not updated",
      success: "Photo caption updated",
    });

    close();
  };

  const isDisabled = () => {
    if (!photoCaption) return true;
    if (photoCaption !== undefined && photoCaption) {
      return photoCaption.length === 0;
    }
    return false;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPhotoCaption(e.target.value);
  };

  const removeImageFromDatabaseAndCloudinary = (
    publicId: string,
    photoId: string,
  ) => {
    toast.promise(deletePhoto(publicId, listingId, photoId), {
      loading: "Deleting photo",
      error: "Photo not deleted",
      success: "Photo deleted",
    });
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="rounded-3xl  md:min-w-6xl">
        <DialogTitle className="text-center">Edit Photo</DialogTitle>
        <hr />
        <div className="flex flex-col md:flex-row  gap-5 h-[400px] p-6">
          <div className="w-full md:w-3/4 h-full bg-[#F6f6f6] flex items-center justify-center  overflow-hidden">
            <Image
              src={photoUrl}
              width={300}
              height={300}
              alt="coverPicture"
              className="object-cover h-full"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/4 gap-2">
            <div className="text-lg">Caption</div>
            <div className="text-xs text-muted-foreground">
              Mention what is special about this space like comfortable
              furniture or favorite details
            </div>

            <Textarea
              maxLength={500}
              className="w-full rounded-lg border border-gray-800 bg-white px-3 py-2 text-base shadow-sm focus-visible:ring-2 focus-visible:ring-black min-h-32"
              onChange={handleChange}
              value={photoCaption ?? ""}
              rows={10}
            />
          </div>
        </div>
        <hr />
        <div className="flex justify-between">
          <Button
            onClick={() =>
              removeImageFromDatabaseAndCloudinary(photoPublicId, photoId)
            }
            size="lg"
            className="hover:cursor-pointer text-md"
            variant="ghost"
          >
            Delete Photo
          </Button>
          <Button
            disabled={isDisabled()}
            onClick={handleSave}
            size="lg"
            className="hover:cursor-pointer text-md"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPhotoDialog;
