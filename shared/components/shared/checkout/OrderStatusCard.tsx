import Link from "next/link";
import { XCircle } from "lucide-react";
import { HeadTitle } from "@/shared/components/shared";
import { Button } from "@/shared/components/ui";
import { cn } from "@/shared/lib/utils";


export function OrderStatusCard({ title, description }: { title: string; description: string }) {
    return (
      <section className="mt-10 mb-20 flex flex-col items-center">
        <div
          className={cn(
            "w-full max-w-md rounded-3xl bg-white px-8 py-10 shadow-sm",
            "animate-in fade-in slide-in-from-bottom-4 duration-500"
          )}
        >
          <div
            className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-destructive/10"
            aria-hidden
          >
            <XCircle className="size-9 text-destructive" strokeWidth={2} />
          </div>
          <HeadTitle
            text={title}
            size="lg"
            className="mb-3 text-center font-extrabold text-foreground"
          />
          <p className="mb-8 text-center text-[15px] leading-relaxed text-muted-foreground">
            {description}
          </p>
          <Button variant="default" size="lg" className="w-full" asChild>
            <Link href="/checkout" className="inline-flex items-center justify-center gap-2">
              Back to checkout
            </Link>
          </Button>
        </div>
      </section>
    );
  }