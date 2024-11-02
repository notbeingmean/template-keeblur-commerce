import { client } from "@/server/client";
import Image from "next/image";

export default async function Home() {
  const { data } = await client.api.hi.get();
  const arr = [1, 2, 3, 4, 5];
  return (
    <>
      <div className="grid md:grid-cols-3 gap-2">
        {/* Large Image */}
        <div className="col-span-2">
          <Image
            src="/placeholder/1200x800.svg"
            width={1200}
            height={800}
            alt=""
            className="object-cover w-full h-full rounded"
          />
        </div>

        {/* Small Images Container */}
        <div className="md:flex flex-col md:space-x-0 md:gap-2 space-x-2 grid grid-cols-2 ">
          <Image
            src="/placeholder/400x400.svg"
            width={400}
            height={400}
            alt=""
            className="object-cover w-full h-full rounded"
          />
          <Image
            src="/placeholder/400x400.svg"
            width={400}
            height={400}
            alt=""
            className="object-cover w-full h-full rounded"
          />
        </div>
      </div>
    </>
  );
}
