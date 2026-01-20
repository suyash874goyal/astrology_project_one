import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      {/* IMPORTANT: padding-top for fixed navbar */}
      <main className="min-h-screen pt-16">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;
