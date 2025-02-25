import Image from "next/image";

import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="hidden h-20 w-full border-t-2 border-slate-200 p-2 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
       

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/manu.svg"
            alt="samkrutham"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          samkrutham
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/Sloka.svg"
            alt="Slokas"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Slokas
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/book.svg"
            alt="pustakāni Books"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          pustakāni (Books)
        </Button>

      </div>
    </div>
  );
};
