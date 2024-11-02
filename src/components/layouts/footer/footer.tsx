import { Button } from "@/components/ui/button";
import { customizeColors, info } from "@/data/info";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  const {
    companyName,
    companyFooterDescription,
    companyEmail,
    companyPhone,
    companyAddress,
    companySocials,
  } = info;

  const { bg } = customizeColors;

  return (
    <>
      <div className={cn(" text-zinc-300 py-8", bg)}>
        <div className="container text-center text-white text-sm">
          ลูกค้าใหม่รับส่วนลด 10% ทันที สำหรับการสั่งซื้อครั้งแรก รับส่วนได้ที่
          Line @shop{" "}
          <Button className="ml-2 bg-green-500 hover:bg-green-300">
            เพิ่มเพื่อนเลย
          </Button>
        </div>
      </div>
      <footer className="bg-zinc-800 text-zinc-300 py-8">
        <div className="container mx-auto grid gap-6 text-center md:text-left md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="font-bold text-lg">{companyName}</h2>
            <p className="text-xs mt-2">{companyFooterDescription}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm">เกี่ยวกับเรา</h3>
            <div className="flex flex-col space-y-1 text-xs mt-2">
              <Link href="/products">ติดต่อเรา</Link>
              <Link href="/products">เกี่ยวกับเรา</Link>
              <Link href="/products">ข้อกำหนดและเงื่อนไข</Link>
              <Link href="/products">นโยบายความเป็นส่วนตัว</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sm">บริการลูกค้า</h3>
            <div className="flex flex-col space-y-1 text-xs mt-2">
              <a href="/services">บริการจัดส่งสินค้า</a>
              <a href="/services">การยกเลิกการสั่งซื้อสินค้า</a>
              <a href="/services">การรับประกันสินค้า</a>
              <a href="/services">การคืนสินค้าและการคืนเงิน</a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sm">ติดต่อเรา</h3>
            <address className="text-xs mt-2 not-italic space-y-1">
              <p>{companyAddress}</p>
              <Link href={`tel:${companyPhone}`}>{companyPhone}</Link>
              <Link href={`mailto:${companyEmail}`}>{companyEmail}</Link>
              <div className="flex justify-center md:justify-start space-x-2 mt-2">
                {companySocials.map((social, index) => (
                  <Link
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    key={index}
                    aria-label={social.icon}
                  >
                    <Image
                      src={`/socialmedia/${social.icon}`}
                      width={20}
                      height={20}
                      alt={social.icon}
                    />
                  </Link>
                ))}
              </div>
            </address>
          </div>
        </div>
        <div className="text-center text-xs mt-6 text-zinc-400">
          <div className="space-x-4">
            <Link href="/services">ข้อกำหนดและเงื่อนไข</Link>
            <Link href="/privacy">นโยบายความเป็นส่วนตัว</Link>
            <Link href="/privacy">การจัดการ Cookies</Link>
          </div>
          <p className="mt-2">© 2021 {companyName} All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
