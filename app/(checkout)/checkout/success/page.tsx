import Link from "next/link";
import { Container, HeadTitle } from "@/shared/components/shared";
import { Button } from "@/shared/components/ui";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { stripe } from "@/shared/lib/stripe";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>;
}) {
  const { session_id } = await searchParams;
  const session = await stripe.checkout.sessions.retrieve(session_id);
  console.log("session", session);
  return (
    <Container className="mt-10 mb-20 flex flex-col items-center p-3 sm:px-6 md: py-6">
      <div
        className={cn(
          "w-full max-w-md rounded-3xl bg-white px-8 py-10 shadow-sm",
          "animate-in fade-in slide-in-from-bottom-4 duration-500",
        )}
      >
        <div
          className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-green-500/10"
          aria-hidden
        >
          <CheckCircle2 className="size-9 text-green-500" strokeWidth={2} />
        </div>
        <HeadTitle
          text="Payment successful"
          size="lg"
          className="mb-3 text-center font-extrabold text-foreground"
        />
        <p className="mb-8 text-center text-[15px] leading-relaxed text-muted-foreground">
          Thank you for your order. We will prepare your order and deliver it as soon as possible.
        </p>
        <Button variant="default" size="lg" className="w-full" asChild>
          <Link href="/" className="inline-flex items-center justify-center gap-2">
            Back to menu
          </Link>
        </Button>
      </div>
    </Container>
  );
}
