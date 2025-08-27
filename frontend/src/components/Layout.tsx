import type { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-full">
      <Navbar />
      <main className="container py-8">
        {/* Om du skickar children funkar det, annars renderar Outlet dina routes */}
        {children ?? <Outlet />}
      </main>
      <Footer />
    </div>
  );
}
