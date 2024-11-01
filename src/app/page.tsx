import { client } from "@/server/client";

export default async function Home() {
  const { data } = await client.api.hi.get();
  const arr = [1, 2, 3, 4, 5];
  return (
    <div className="h-screen">
      {arr.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
}
