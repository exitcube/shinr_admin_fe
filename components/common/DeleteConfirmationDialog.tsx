import React from "react";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";

export const DeleteConfirmationDialog: React.FC<IProps> = ({
  open,
  title,
  description,
  confirmButtonLabel,
  cancelButtonLabel,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onCancel} variant={"outline"}>
            {cancelButtonLabel || "Cancel"}
          </Button>
          <Button
            onClick={onConfirm}
            variant={"outline"}
            className="text-red-500 border-red-500"
          >
            {confirmButtonLabel || "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface IProps {
  open: boolean;
  title: string;
  description?: string;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}
