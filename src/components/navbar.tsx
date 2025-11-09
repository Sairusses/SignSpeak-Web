import { useState } from "react";
import { Button } from "@heroui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-sm bg-white/70 backdrop-blur-md sticky top-0 z-50">
      {/* Brand */}
      <Link to="/">
        <h1 className="text-2xl font-bold text-blue-600">SignSpeak</h1>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex space-x-4">
        <Link to="/about">
          <Button variant="light">About</Button>
        </Link>
        <Link to="/download">
          <Button color="primary" variant="solid">
            Download App
          </Button>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-700 hover:text-blue-600 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-[64px] left-0 w-full bg-white shadow-md flex flex-col items-center gap-3 py-4 md:hidden z-40">
          <Link to="/about" onClick={() => setIsOpen(false)}>
            <Button variant="light" fullWidth>
              About
            </Button>
          </Link>
          <Link to="/download" onClick={() => setIsOpen(false)}>
            <Button color="primary" variant="solid" fullWidth>
              Download App
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};