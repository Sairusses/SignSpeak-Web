import { useState } from "react";
import { Button } from "@heroui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/30 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link className="flex items-center gap-2" to="/">
          <img
            alt="SignSpeak Logo"
            className="w-8 h-8 md:w-10 md:h-10 object-contain"
            src="/logo.svg"
          />
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent tracking-tight">
            SignSpeak
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/sign-in">
            <Button
              className="font-medium text-gray-700 hover:text-blue-600 transition"
              radius="sm"
              variant="light"
            >
              Sign In
            </Button>
          </Link>
          <Link to="/download">
            <Button
              className="font-semibold shadow-sm hover:shadow-md transition-transform hover:scale-105"
              color="primary"
              radius="sm"
              variant="solid"
            >
              Download App
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-blue-100/60 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="text-blue-600" size={24} />
          ) : (
            <Menu className="text-blue-600" size={24} />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-3 pb-4 bg-white/70 backdrop-blur-lg border-t border-blue-100 shadow-inner">
          <Link className="w-4/5" to="/about" onClick={() => setIsOpen(false)}>
            <Button fullWidth radius="sm" variant="light">
              About
            </Button>
          </Link>
          <Link
            className="w-4/5"
            to="/download"
            onClick={() => setIsOpen(false)}
          >
            <Button fullWidth color="primary" radius="sm" variant="solid">
              Download App
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
