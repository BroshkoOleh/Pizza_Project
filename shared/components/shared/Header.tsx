import { cn } from "@/shared/lib/utils";
import { Container } from "./Container";
import Image from "next/image";
import { Button } from "../ui/index";
import { User } from "lucide-react";
import { CartButton, SearchInput } from "./index";
import Link from "next/link";
interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

function Header({ hasSearch = true, hasCart = true, className }: Props) {
  return (
    <header className={cn(" border-b", className)}>
      <Container className="flex flex-wrap items-center gap-3 p-3 sm:px-6 md:flex-nowrap md:py-6">
        {/* Left Side */}
        <Link href="/" className="shrink-0">
          <div className="flex items-center gap-1 sm:gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-lg uppercase font-black leading-5 sm:text-2xl">Next Pizza</h1>
              <p className="hidden text-sm text-gray-400 leading-3 min-[390px]:block pt-1">Can&apos;t be teaster</p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="order-3 w-full md:order-2 md:mx-6 md:flex-1">
            <SearchInput />
          </div>
        )}

        {/* Right Side */}

        <div className="order-2 ml-auto flex items-center gap-1 md:order-3 md:gap-2">
          <Button variant="outline" className="flex h-10 items-center gap-2 px-2.5 sm:gap-3 sm:px-4">
            <User size={16} />
            <span className="hidden sm:inline">Enter</span>
          </Button>
          {hasCart && <CartButton className="h-10 px-3 sm:px-4" />}
        </div>
      </Container>
    </header>
  );
}

export { Header };
