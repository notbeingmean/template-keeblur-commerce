"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { AddressType } from "@/lib/fetch";

type DistrictType = {
  id: number;
  provinceCode: number;
  provinceNameEn: string;
  provinceNameTh: string;
};

const addressSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  address: z.string(),
  province: z.string(),
  postalCode: z.string(),
  phoneNumber: z.string().max(10),
  type: z.string(),
});

function EditAddressForm() {
  const [data, setData] = useState<DistrictType[]>([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/thailand-geography-data/thailand-geography-json/refs/heads/main/src/provinces.json"
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      province: "",
      postalCode: "",
      phoneNumber: "",
      type: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof addressSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ประเภทที่อยู่</FormLabel>
                <FormControl>
                  <Input placeholder="บ้าน, ที่ทำงาน" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ชื่อ</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>นามสกุล</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ที่อยู่</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>จังหวัด</FormLabel>
                <FormControl>
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? data.find(
                                  (d) => d.provinceNameTh === field.value
                                )?.provinceNameTh
                              : "เลือกจังหวัด"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="เลือกจังหวัด" />
                          <CommandList>
                            <CommandEmpty>ไม่มีจังหวัด</CommandEmpty>
                            <CommandGroup>
                              {data.map((d) => (
                                <CommandItem
                                  value={d.provinceNameTh}
                                  key={d.id}
                                  onSelect={() => {
                                    form.setValue("province", d.provinceNameTh);
                                  }}
                                >
                                  {d.provinceNameTh}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      d.provinceNameTh === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>รหัสไปรษณีย์</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>เบอร์โทร</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          แก้ไขที่อยู่
        </Button>
      </form>
    </Form>
  );
}

export default EditAddressForm;
