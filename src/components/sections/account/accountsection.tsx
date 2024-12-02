"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateAddressDialog from "@/components/dialogs/create-address";
import { cn } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";
import { AddressType } from "@/lib/fetch";
import EditAddressDialog from "@/components/dialogs/edit-address";
import { authClient } from "@/lib/auth-client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { auth } from "@/lib/auth";
import { toast } from "sonner";

type AccountSectionProps = {
  addresses: AddressType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
};

function AccountSection({ addresses }: AccountSectionProps) {
  const { data } = authClient.useSession();

  if (!data) return null;
  return (
    <main className="flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-medium">ข้อมูลส่วนตัว</h3>
        <p className="text-sm text-muted-foreground">
          ข้อมูลส่วนบุคคลและตั้งค่าเลือกในการจัดการ
        </p>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between border-b py-4">
          <div className="flex space-x-12">
            <h1 className="font-bold text-sm w-40">ชื่อโปรไฟล์</h1>
            <div className=" text-sm">
              {data.user.name ? data.user.name : "-"}
            </div>
          </div>
          <EditNameDialog />
        </div>
        <div className="flex items-center justify-between border-b py-4">
          <div className="flex space-x-12">
            <h1 className="font-bold text-sm w-40">อีเมล์</h1>
            <div className=" text-sm">
              {data.user.email ? data.user.email : "-"}
            </div>
          </div>
          {/* <Button variant="outline">แก้ไข</Button> */}
        </div>
        <div className="flex items-center justify-between border-b py-4">
          <div className="flex space-x-12">
            <h1 className="font-bold text-sm w-40">รหัสผ่าน</h1>
            <div className=" text-sm">********</div>
          </div>
          {/* <Button variant="outline">แก้ไข</Button> */}
        </div>
        {/* <div className="flex items-center border-b py-4">
          <h1 className="font-bold text-sm w-40">การเชื่อมต่อของฉัน</h1>
          <div className="flex space-x-4">
            <div>
              <Image
                src="/socialmedia/facebook.svg"
                alt="facebook"
                width={24}
                height={24}
              />
            </div>
            <Image
              src="/socialmedia/google.svg"
              alt="google"
              width={24}
              height={24}
            />
          </div>
        </div> */}
      </div>
      <div className="my-2">
        <h1 className="font-bold text-sm mb-4">ที่อยู่ของฉัน</h1>
        <div className="space-y-4">
          {addresses?.map((address, index) => (
            <div className={cn("border rounded p-4 text-sm")} key={index}>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">{address.type}</h3>
                <div className="flex items-center space-x-2 ">
                  <EditAddressDialog />
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Trash2 size={16} />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          คุณแน่ใจหรือไม่ว่าต้องการลบที่อยู่นี้?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          การกระทำนี้ไม่สามารถย้อนกลับได้
                          คุณแน่ใจหรือไม่ว่าต้องการลบที่อยู่นี้?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                        <AlertDialogAction>ตกลง</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              <p>{address.name}</p>
              <p>{address.address}</p>
              <p>{address.province}</p>
              <p>{address.postalCode}</p>
              <div
                className={cn(
                  "mt-4 p-1 border rounded w-full max-w-[80px] text-center",
                  address.priority === 0 ? "block" : "hidden"
                )}
              >
                ค่าเริ่มต้น
              </div>
            </div>
          ))}

          {addresses?.length === 0 && (
            <div className="flex items-center justify-center border rounded p-4 text-sm h-60">
              ไม่พบที่อยู่
            </div>
          )}

          <CreateAddressDialog />
        </div>
      </div>
    </main>
  );
}

export default AccountSection;

function EditNameDialog() {
  const [name, setName] = React.useState("");

  async function handleSave(name: string) {
    const { data, error } = await authClient.updateUser({
      name: name,
    });

    if (error) {
      toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }

    toast.success("บันทึกข้อมูลสำเร็จ");
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">แก้ไข</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>แก้ไขชื่อ</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Label>ชื่อ</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ชื่อ"
          />
          <Button className="w-full" onClick={() => handleSave(name)}>
            บันทึก
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function EditEmailDialog() {}
