import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "@/components/ui/button";
import EditAddressForm from "../forms/edit-address";
import { Pencil } from "lucide-react";

function EditAddressDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Pencil size={16} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>แก้ไขที่อยู่</DialogTitle>
        </DialogHeader>
        <EditAddressForm />
      </DialogContent>
    </Dialog>
  );
}

export default EditAddressDialog;
