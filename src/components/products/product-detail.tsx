"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductDetailType } from "@/lib/fetch";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import useCartItem from "@/hooks/useCart";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Markdown from "react-markdown";
import MDEditor from "@uiw/react-md-editor";
import { toast } from "sonner";

type ProductDetailProps = {
  product: ProductDetailType;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem, items, updateItem } = useCartItem();
  const router = useRouter();
  const [value, setValue] = useState(product?.productDetail?.value);
  const { data } = authClient.useSession();

  if (!product) return null;

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  const hasSameItem = items.find(
    (item) => item.product_id === product.product_id
  );

  console.log(value);
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="p-4 border rounded">
          <div className="relative aspect-square group ">
            {product.images.length > 0 ? (
              <>
                <Image
                  src={product.images[selectedImage].imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full hidden group-hover:flex"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full  hidden group-hover:flex"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Image
                src="/placeholder/400x400.svg"
                alt="No Image"
                fill
                className="object-cover rounded-lg"
              />
            )}
          </div>
        </div>

        <div className="flex space-x-2  pb-2">
          {product.images.map((image, index) => (
            <Image
              key={image.image_id}
              src={image.imageUrl}
              alt={image.altText || image.image_id}
              width={100}
              height={100}
              onClick={() => setSelectedImage(index)}
              className={`cursor-pointer rounded-md ${
                selectedImage === index ? "ring-2 ring-blue-500" : ""
              }`}
            />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
        </div>
        <Badge variant="secondary" className="text-lg font-semibold">
          {formatPrice(product.price)}
        </Badge>

        <Separator />
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </Button>
            <span className="text-xl font-semibold">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </Button>
          </div>
          <div className="flex space-x-4">
            <Button
              className="flex-1"
              onClick={() => {
                if (hasSameItem) {
                  updateItem(
                    items[0].cart_id,
                    items[0].cart_item_id,
                    product.product_id,
                    items[0].quantity + quantity
                  );
                  return;
                }
                if (!data) {
                  toast.error("กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อ");
                  return;
                }
                addItem(product.product_id, quantity);
              }}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              เพิ่มลงตะกร้า
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => {
                addItem(product.product_id, quantity);
                router.push("/cart");
              }}
            >
              ซื้อเลย
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold">รายละเอียด</h2>
          <div>
            <div className="prose dark:prose-invert max-w-none my-4">
              <Markdown>
                {product.productDetail?.value || "ไม่มีข้อมูล"}
              </Markdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
