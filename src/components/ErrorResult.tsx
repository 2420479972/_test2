
import type { ReactNode } from "react";

interface Props {
  readonly children: ReactNode;
}

export default function ErrorResult({ children }: Props) {
  return (
    <section className="px-[0.75em] mt-[1em] text-center">
      <div className="py-[1.5em] px-[1em]">{children}</div>
    </section>
  );
}
