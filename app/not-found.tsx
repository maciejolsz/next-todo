import Image from "next/image";
import NavButton from "@/app/ui/nav-button";

export default function NotFound() {
  return <main className={"flex flex-col w-[300px] h-[300px] pt-12 m-auto mt-64"}>
    {/*<div className={"text-center font-bold"}>Page not found.</div>*/}
    <Image className="rounded-full mx-auto mb-8" src={"/img.png"} alt={"Page not found."} width={120} height={120}/>
    <div>
      <p className={"text-center leading-snug"}>
        Nothing to see here,<br />
      </p>
      <div className={"flex justify-center mt-2"}>
        <NavButton title={"move along"} url={"/workshop"} />
      </div>
    </div>
  </main>;
}
