"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import useExitDialogStore from "@/hooks/use-exit-dialog";

const ExitDialog = () => {
  const { isOpen, close } = useExitDialogStore();

  const router = useRouter();

  const handleExit = () => {
    close();
    router.push("/hosting/listings");
  };

  const handleKeepWorking = () => {
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="rounded-xl flex flex-col gap-5 ">
        <DialogTitle className="text-center">
          Are you sure you want to exit?
        </DialogTitle>
        <DialogDescription>
          Your progress up until now has been saved
        </DialogDescription>

        <div className="flex flex-col-reverse md:flex-row md:justify-between ">
          <Button
            className="flex items-center gap-2 hover:cursor-pointer"
            onClick={handleExit}
            variant="ghost"
          >
            Exit
          </Button>

          <Button className="hover:cursor-pointer" onClick={handleKeepWorking}>
            Keep working
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitDialog;
