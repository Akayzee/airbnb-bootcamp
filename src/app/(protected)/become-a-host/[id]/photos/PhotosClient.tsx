"use client";

import CreateListingFooter from "@/components/listings/CreateListingFooter";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateListing } from "@/actions/listing/update-listing";
import { updatePhotoOrder } from "@/actions/listing/update-photo-order";
import { useCallback, useState, useEffect, useRef } from "react";
import useCreateListingStore from "@/hooks/use-create-listing-store";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import UploadPhotoDialog from "@/components/listings/UploadPhotoDialog";
import useUploadPhotoDialogStore from "@/hooks/use-upload-photo-dialog";
import { ListingWithPhotos } from "@/lib/types";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import toast from "react-hot-toast";
import { deletePhoto } from "@/actions/listing/delete-photo";
import EditPhotoDialog from "@/components/listings/EditPhotoDialog";
import useEditPhotoStore from "@/hooks/use-edit-photo-store";
import useEditPhotoDialogStore from "@/hooks/use-edit-photo-dialog";

type Props = {
  listing: ListingWithPhotos;
};

function SortablePhoto({
  photo,
  index,
  totalPhotos,
  onMoveBackward,
  onMoveForward,
  onMakeCoverPhoto,
  onDelete,
  onEdit,
  isBeingDragged,
  isDropTarget,
}: {
  photo: ListingWithPhotos["photos"][0];
  index: number;
  totalPhotos: number;
  onMoveBackward: () => void;
  onMoveForward: () => void;
  onMakeCoverPhoto: () => void;
  onDelete: () => void;
  onEdit: () => void;
  isBeingDragged: boolean;
  isDropTarget: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: photo.id,
  });

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition: transition || undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  const isFirst = index === 0;
  const isLast = index === totalPhotos - 1;
  const isCover = index === 0;

  // Determine border classes based on drag state
  const borderClasses = isBeingDragged
    ? "border-2 border-solid border-green-500"
    : isDropTarget
      ? "border-2 border-dashed border-blue-500"
      : "";

  return (
    <div ref={setNodeRef} style={style}>
      <div
        className={`${
          isCover ? "aspect-video relative" : "aspect-square relative"
        } ${borderClasses} rounded-lg`}
      >
        <div
          {...attributes}
          {...listeners}
          className="absolute inset-0 cursor-grab active:cursor-grabbing z-10 "
        />
        <Image
          src={photo.url}
          alt=""
          height={300}
          width={300}
          className="object-cover rounded-lg w-full h-full transition"
        />
        {isFirst && (
          <div className="absolute top-1 left-1 md:top-2 md:left-2 bg-white px-2 py-1 rounded-md text-xs font-semibold z-20">
            Cover Photo
          </div>
        )}
        <div className="absolute top-1 right-1 md:top-2 md:right-2 hover:cursor-pointer rounded-full opacity-75 hover:opacity-100 z-20">
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
              <HiDotsCircleHorizontal
                className="text-secondary hover:cursor-pointer outline-none"
                size={30}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
              <DropdownMenuItem disabled={isFirst} onClick={onMoveBackward}>
                Move backward
              </DropdownMenuItem>
              <DropdownMenuItem disabled={isLast} onClick={onMoveForward}>
                Move forward
              </DropdownMenuItem>
              <DropdownMenuItem disabled={isFirst} onClick={onMakeCoverPhoto}>
                Make cover photo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

const MIN_PHOTOS = 5;
const PhotosClient = ({ listing }: Props) => {
  const { updateDraft, draft, reset } = useCreateListingStore();
  const router = useRouter();
  const { open } = useUploadPhotoDialogStore();
  const { open: openEditDialog } = useEditPhotoDialogStore();
  const [photos, setPhotos] = useState(listing.photos);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const { setPhotoId, setPhotoUrl, setPhotoCaption, setPhotoPublicId } =
    useEditPhotoStore();

  const removeImageFromDatabaseAndCloudinary = (
    publicId: string,
    photoId: string,
  ) => {
    toast.promise(deletePhoto(publicId, listing.id, photoId), {
      loading: "Deleting photo",
      error: "Photo not deleted",
      success: "Photo deleted",
    });
  };

  // Configure sensors for better drag experience
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required to start dragging
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    setOverId(event.over?.id as string | null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setPhotos((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const reorderedPhotos = arrayMove(items, oldIndex, newIndex);

        // Debounce the backend update to avoid too many requests
        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
        }

        saveTimeoutRef.current = setTimeout(() => {
          const photoIds = reorderedPhotos.map((photo) => photo.id);
          toast.promise(updatePhotoOrder(listing.id, photoIds), {
            success: "Photo order updated",
            loading: "Updating photo order",
            error: "Photo order not updated",
          });
        }, 500);

        return reorderedPhotos;
      });
    }

    // Clear drag states
    setActiveId(null);
    setOverId(null);
  };

  const savePhotoOrder = (reorderedPhotos: typeof photos) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      const photoIds = reorderedPhotos.map((photo) => photo.id);
      toast.promise(updatePhotoOrder(listing.id, photoIds), {
        success: "Photo order updated",
        loading: "Updating photo order",
        error: "Photo order not updated",
      });
    }, 500);
  };

  const handleMoveBackward = (index: number) => {
    if (index === 0) return;

    setPhotos((items) => {
      const reorderedPhotos = arrayMove(items, index, index - 1);
      savePhotoOrder(reorderedPhotos);
      return reorderedPhotos;
    });
  };

  const handleMoveForward = (index: number) => {
    if (index === photos.length - 1) return;

    setPhotos((items) => {
      const reorderedPhotos = arrayMove(items, index, index + 1);
      savePhotoOrder(reorderedPhotos);
      return reorderedPhotos;
    });
  };

  const handleMakeCoverPhoto = (index: number) => {
    if (index === 0) return;

    setPhotos((items) => {
      const reorderedPhotos = arrayMove(items, index, 0);
      savePhotoOrder(reorderedPhotos);
      return reorderedPhotos;
    });
  };

  const handleEditPhoto = (
    photoId: string,
    photoUrl: string,
    photoCaption: string | null,
    photoPublicId: string,
  ) => {
    setPhotoId(photoId);
    setPhotoUrl(photoUrl);
    setPhotoCaption(photoCaption);
    setPhotoPublicId(photoPublicId);
    openEditDialog();
  };

  useEffect(() => {
    setPhotos(listing.photos);
    updateDraft({
      step: "photos",
      id: listing.id,
    });
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [listing.photos, updateDraft, listing.id]);

  const handleNext = useCallback(() => {
    updateListing(draft, listing.id).then((res) => {
      if (res.success) {
        router.push(`/become-a-host/${listing.id}/title`);
        reset();
      }
    });
  }, [draft, listing.id, router, reset]);

  return (
    <div className="flex min-h-[120vh] md:min-h-[100vh] flex-col bg-background ">
      <div className="mx-auto flex w-full max-w-2xl items-center flex-1 flex-col px-2 md:px-6 pt-8 pb-12">
        {photos.length === 0 ? (
          <div className="flex flex-col space-y-3 w-full">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Add Some photos of your apartment
            </h1>
            <p className="text-sm text-muted-foreground">
              You&apos;ll need 5 photos to get started. You can add more or or
              make changes later.
            </p>
          </div>
        ) : photos.length !== 0 && photos.length < MIN_PHOTOS ? (
          <div className="flex justify-between w-full items-center">
            <div className="flex flex-col space-y-3 w-full">
              <h1 className="text-xl font-semibold tracking-tight sm:text-4xl">
                Choose at least {MIN_PHOTOS} photos
              </h1>
              <p className="text-sm text-muted-foreground">Drag to reorder</p>
            </div>
            <div className="bg-[#F6f6f6] rounded-full p-4">
              <Plus onClick={open} size={20} className="hover:cursor-pointer" />
            </div>
          </div>
        ) : photos.length >= MIN_PHOTOS ? (
          <div className="flex justify-between w-full items-center">
            <div className="flex flex-col space-y-3 w-full">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Ta-da! How does this look?
              </h1>
              <p className="text-sm text-muted-foreground">Drag to reorder</p>
            </div>
            <div className="bg-[#F6f6f6] rounded-full p-4">
              <Plus onClick={open} size={20} className="hover:cursor-pointer" />
            </div>
          </div>
        ) : null}

        {photos && photos.length > 0 ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToWindowEdges]}
          >
            <SortableContext items={photos} strategy={rectSortingStrategy}>
              <div className="flex flex-col gap-3 mb-3 mt-3 ">
                {/* Cover Photo - Full Width */}
                {photos.length > 0 && (
                  <div className="w-full md:min-w-2xl px-2 md:px-6">
                    <SortablePhoto
                      key={photos[0].id}
                      photo={photos[0]}
                      index={0}
                      totalPhotos={photos.length}
                      onMoveBackward={() => handleMoveBackward(0)}
                      onMoveForward={() => handleMoveForward(0)}
                      onMakeCoverPhoto={() => handleMakeCoverPhoto(0)}
                      onDelete={() =>
                        removeImageFromDatabaseAndCloudinary(
                          photos[0].publicId,
                          photos[0].id,
                        )
                      }
                      onEdit={() =>
                        handleEditPhoto(
                          photos[0].id,
                          photos[0].url,
                          photos[0].caption,
                          photos[0].publicId,
                        )
                      }
                      isBeingDragged={activeId === photos[0].id}
                      isDropTarget={overId === photos[0].id}
                    />
                  </div>
                )}
                {/* Rest of Photos - Grid Layout */}
                {photos.length > 1 && (
                  <div className="grid grid-cols-3 gap-3 px-2 md:px-6">
                    {photos.slice(1).map((photo, index) => (
                      <SortablePhoto
                        key={photo.id}
                        photo={photo}
                        index={index + 1}
                        totalPhotos={photos.length}
                        onMoveBackward={() => handleMoveBackward(index + 1)}
                        onMoveForward={() => handleMoveForward(index + 1)}
                        onMakeCoverPhoto={() => handleMakeCoverPhoto(index + 1)}
                        onDelete={() =>
                          removeImageFromDatabaseAndCloudinary(
                            photo.publicId,
                            photo.id,
                          )
                        }
                        onEdit={() =>
                          handleEditPhoto(
                            photo.id,
                            photo.url,
                            photo.caption,
                            photo.publicId,
                          )
                        }
                        isBeingDragged={activeId === photo.id}
                        isDropTarget={overId === photo.id}
                      />
                    ))}
                  </div>
                )}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <div className="mt-4 flex flex-1 p-10  flex-col w-full justify-center items-center  gap-6 border-dashed border-2 border-gray-300 rounded-lg bg-[#F6f6f6]">
            <Image
              src="/images/camera.jpeg"
              width={250}
              height={250}
              alt="camera"
            />
            <Button
              variant="outline"
              className="bg-white border-black w-1/3 hover:cursor-pointer"
              onClick={open}
            >
              Add photos
            </Button>
          </div>
        )}
      </div>
      <UploadPhotoDialog listingId={listing.id} />
      <EditPhotoDialog listingId={listing.id} />
      <CreateListingFooter
        nextHref={`/become-a-host/${listing.id}/title`}
        backHref={`/become-a-host/${listing.id}/amenities`}
        prevProgress={45}
        nextProgress={54}
        handleNext={handleNext}
        options={{
          isPhotosEmpty: listing.photos.length === 0,
          isPhotosMinLength: listing.photos.length < MIN_PHOTOS,
        }}
        // options={{
        //   hasNoDiscountErrors: Object.keys(errors).length === 0,
        // }}
      />
    </div>
  );
};

export default PhotosClient;
