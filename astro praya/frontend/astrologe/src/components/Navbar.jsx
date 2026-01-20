import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "/favicon.png"


const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#3a332b] text-[#F5EFE7] shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* ================= LOGO + NAME ================= */}
          <div className="flex items-center gap-3">

            {/* LOGO (optional – add later) */}
            
            <img
              src={logo}
              alt="Shree Jyotish Kendra Logo"
              className="w-10 h-10 object-contain"
            /> 
            

            {/* WEBSITE NAME */}
            <span className="text-xl font-bold tracking-wide">
              Shree<span className="text-[#E6B17E]">Jyotish</span>Kendra
            </span>
          </div>

          {/* ================= DESKTOP MENU ================= */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `font-medium transition pb-1 ${
                    isActive
                      ? "text-[#E6B17E] border-b-2 border-[#E6B17E]"
                      : "hover:text-[#E6B17E]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {open && (
          <div className="md:hidden pb-4 space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className="block px-2 py-1 hover:text-[#E6B17E]"
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
