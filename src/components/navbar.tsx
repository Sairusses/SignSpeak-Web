import { Button } from "@heroui/button";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-sm bg-white/70 backdrop-blur-md sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-blue-600">SignSpeak</h1>
      <div className="space-x-4">
        <Button variant="light">About</Button>
        <Button variant="light">Features</Button>
        <Button color="primary" variant="solid">
          Get Started
        </Button>
      </div>
    </nav>
  );
};
