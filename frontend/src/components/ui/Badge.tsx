import type { HTMLAttributes, PropsWithChildren } from "react";

type Variant = "default" | "primary";

export default function Badge({
  className = "",
  children,
  variant = "default",
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLSpanElement> & { variant?: Variant }>) {
  const base = "badge";
  const v = variant === "primary" ? "badge-primary" : "";
  return (
    <span className={[base, v, className].join(" ")} {...rest}>
      {children}
    </span>
  );
}
