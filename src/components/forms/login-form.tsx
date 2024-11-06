"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { handleError, HttpError } from "@/lib/error";
import useCartItem from "@/hooks/useCart";
import { usePathname } from "next/navigation";

function LoginForm() {
  const path = usePathname();
  console.log(path);
  const { fetchItems } = useCartItem();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        callbackURL: path,
      });

      if (error) {
        throw handleError(error.status, error.message);
      }
      toast("เข้าสู่ระบบสำเร็จ");
    } catch (error) {
      if (error instanceof HttpError) {
        toast.error(error.message);
      }
    }
  }

  async function handleGoogleLogin() {
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: path,
      });
      if (error) {
        throw handleError(error.status, error.message);
      }

      await fetchItems();
      toast.success("เข้าสู่ระบบสำเร็จ");
    } catch (error) {
      if (error instanceof HttpError) {
        toast.error(error.message);
      }
    }
  }

  async function handleGithubLogin() {
    try {
      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: path,
      });
      if (error) {
        throw handleError(error.status, error.message);
      }

      await fetchItems();
      toast.success("เข้าสู่ระบบสำเร็จ");
    } catch (error) {
      if (error instanceof HttpError) {
        toast.error(error.message);
      }
    }
  }
  return (
    <>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 max-w-3xl mx-auto "
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>อีเมล์</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@keeblur.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>รหัสผ่าน</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="รหัสผ่าน" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              เข้าสู่ระบบ
            </Button>
          </form>
        </Form>
      </div>
      <Link href="/forgot-password" className="text-center text-xs underline">
        ลืมรหัสผ่าน?
      </Link>
      <div className="space-y-2">
        <div className="text-sm text-zinc-500 text-center my-8 relative">
          <Separator />
          <p className="p-2 absolute top-[-1.1rem] left-1/2 transform -translate-x-1/2 text-center w-full max-w-36 bg-white">
            {" "}
            หรือเข้าสู่ระบบด้วย
          </p>
        </div>

        <div className="space-y-3">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-400"
            onClick={handleGoogleLogin}
          >
            <div className="p-1 rounded-full bg-white">
              <Image
                src="/socialmedia/google.svg"
                width={15}
                height={15}
                alt="google"
              />
            </div>
            เข้าสู่ระบบด้วย Google
          </Button>
          <Button className="w-full" onClick={handleGithubLogin}>
            <div className="p-1 rounded-full bg-white">
              <Image
                src="/socialmedia/github.svg"
                width={15}
                height={15}
                alt="github"
              />
            </div>
            เข้าสู่ระบบด้วย Github
          </Button>
          <div className="text-center text-xs">
            ยังไม่มีบัญชีผู้ใช้?
            <Link href="/register" className="ml-1 underline">
              สมัครสมาชิก
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
