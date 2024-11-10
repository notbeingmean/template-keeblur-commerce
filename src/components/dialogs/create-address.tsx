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
        <Button size="sm" className="hidden md:block">
          เข้าสู่ระบบ
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>เข้าสู่ระบบ</DialogTitle>
        </DialogHeader>
        <CreateAddressForm />
      </DialogContent>
    </Dialog>
  );
}

export default CreateAddressDialog;
