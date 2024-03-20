import Image from "next/image";
import ObjectIdentify from "@/components/object-identify";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-32">
      <h1 className="gradient-title font-extrabold text-3xl md:text-4xl lg:text-7xl tracking-tighter md:px-7 text-center">Thief detection Alarm</h1>
      <ObjectIdentify />
    </main>
  );
}
