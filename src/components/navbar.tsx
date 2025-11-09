import { Button } from "@heroui/button";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-sm bg-white/70 backdrop-blur-md sticky top-0 z-50">
      <Link to="/">
        <h1 className="text-2xl font-bold text-blue-600">SignSpeak</h1>
      </Link>
      <div className="space-x-4">
        <Link to="/about">
          <Button variant="light">About</Button>
        </Link>
        <Link to="/download">
          <Button color="primary" variant="solid">
            Download App
          </Button>
        </Link>
      </div>
    </nav>
  );
};
