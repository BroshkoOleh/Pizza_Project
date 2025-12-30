import { cn } from "@/shared/lib/utils";
import { Container } from "./Container";
import Image from "next/image";
import { Button } from "../ui/index";
import { ShoppingCart, User, ArrowRight } from "lucide-react";
import { SearchInput } from "./index";
interface Props {
  className?: string;
}

function Header({ className }: Props) {
  return (
    <header className={cn("border border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="logo" width={35} height={35} />

          <div>
            <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
            <p className="text-sm text-gray-400 leading-3">Can&apos;t be teaster</p>
          </div>
        </div>

        <div className="mx-10 flex-1">
          <SearchInput />
        </div>

        {/* Right Side */}

        <div className="flex items-center gap-1">
          <Button variant="outline" className="flex items-center gap-3">
            <User size={16} />
            Enter
          </Button>
          <div>
            <Button className="group relative">
              <b>520$</b>
              <span className="h-full w-px bg-white/30 mx-3 "></span>
              <div className="flex items-center gap-1 trasition duration-300 group-hover:opacity-0">
                <ShoppingCart size={16} className=" relative" strokeWidth={2} />
                <b>3</b>
              </div>
              <ArrowRight
                size={20}
                className=" absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
              />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}

export { Header };
