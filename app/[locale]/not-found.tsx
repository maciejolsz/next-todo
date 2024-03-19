import Image from "next/image";
import MyButton from "@/app/ui/my-button";
import Link from "next/link";

export default function NotFound() {
  return <main className={"flex flex-col w-[300px] h-[300px] pt-12 m-auto mt-64"}>
    <Image className="rounded-full mx-auto mb-8" src={"/img.png"} alt={"Page not found."} width={120} height={120}/>
    <div>
      <p className={"text-center leading-snug"}>
        Nothing to see here,<br />
      </p>
      <div className={"flex justify-center mt-2"}>
        <Link href={"/workshop"}><MyButton title={"move along"} /></Link>
      </div>
    </div>
  </main>
}
