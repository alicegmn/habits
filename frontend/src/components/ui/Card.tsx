import type { PropsWithChildren, HTMLAttributes, ReactNode } from "react";

export function Card({
  className = "",
  children,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={["card", className].join(" ")} {...rest}>
      {children}
    </div>
  );
}

export function CardTitle({ children }: PropsWithChildren) {
  return <h3 className="card-title">{children}</h3>;
}

export function CardSubtle({ children }: PropsWithChildren) {
  return <p className="card-subtle">{children}</p>;
}

export function CardActions({ children }: { children: ReactNode }) {
  return <div className="mt-4 flex gap-2">{children}</div>;
}
