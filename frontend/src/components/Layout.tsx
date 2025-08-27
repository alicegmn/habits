import type { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-full">
      <Navbar />
      <main className="container py-8">{children}</main>
      <Footer />
    </div>
  );
}
