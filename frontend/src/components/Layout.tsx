import type { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-full">
      <Navbar />
      <main className="container py-8">{children ?? <Outlet />}</main>
      <Footer />
    </div>
  );
}
