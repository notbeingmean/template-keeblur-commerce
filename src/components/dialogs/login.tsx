import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "@/components/ui/button";
import LoginForm from "../forms/login-form";

function LoginDialog() {
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
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
