import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Variant = "default" | "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type Props = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: Size;
  }
>;

const mapVariant: Record<Variant, string> = {
  default: "btn",
  primary: "btn btn-primary",
  outline: "btn btn-outline",
  ghost: "btn btn-ghost",
};

const mapSize: Record<Size, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

export default function Button({
  variant = "default",
  size = "md",
  className = "",
  children,
  ...rest
}: Props) {
  const cls = [mapVariant[variant], mapSize[size], className]
    .filter(Boolean)
    .join(" ");
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
