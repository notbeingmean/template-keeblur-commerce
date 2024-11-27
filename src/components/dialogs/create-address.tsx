import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "@/components/ui/button";
import CreateAddressForm from "../forms/create-address";

function CreateAddressDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full">
          เพิ่มที่อยู่ใหม่
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>เพิ่มที่อยู่ใหม่</DialogTitle>
        </DialogHeader>
        <CreateAddressForm />
      </DialogContent>
    </Dialog>
  );
}

export default CreateAddressDialog;
