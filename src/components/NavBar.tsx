import { Link, useLocation } from "react-router-dom";
import LangOption from "./LangOption";
import { words } from "../config/text";
import { useState } from "react";
import { ModeToggle } from "./mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import {
  InfoIcon,
  LayoutDashboard,
  Menu,
  FileText,
  FolderKanban,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const navLinks = [
    { path: "/", icon: LayoutDashboard, label: words.dashboard },
    { path: "/about", icon: InfoIcon, label: words.about },
    { path: "/blog", icon: FileText, label: words.blog },
    { path: "/project", icon: FolderKanban, label: words.project },
    { path: "/contact", icon: Mail, label: words.contact },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-14 px-6 md:px-12 flex items-center justify-center backdrop-blur-md z-50 border-b">
      <img src="/logo.png" alt="logo" height={40} width={40} className="mx-2"/>
      <div className="hidden md:flex md:flex-row items-center gap-6 relative">
        {navLinks.map(({ path, label, icon: Icon }) => {
          const isActive = pathname === path;
          return (
            <div key={path} className="relative">
              <Link
                to={path}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-1 text-base px-2 py-1 transition hover:bg-gray-600 rounded-md"
              >
                <Icon size={16} />
                {label}
              </Link>
              {isActive && (
                <motion.div
                  layoutId="active-underline"
                  className="absolute left-0 -bottom-1 h-[2px] w-full bg-blue-500 rounded"
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          );
        })}

        <div className="ml-12 flex items-center gap-4">
          <ModeToggle />
          <LangOption />
        </div>
      </div>

      {/* Mobile Left: Name */}
      <div className="md:hidden text-xl font-semibold tracking-tight">
        GlassCube i/o
      </div>

      {/* Mobile Right: Menu */}
      <div className="md:hidden">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="mx-2">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>{words.menu}</SheetTitle>
              <SheetDescription className="mx-2">
                Navigation for smaller screens
              </SheetDescription>
            </SheetHeader>

            <div className="flex flex-col space-y-4 p-4">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  className={`flex items-center gap-2 text-base px-2 py-1 rounded-md transition hover:bg-gray-600 ${
                    pathname === path ? "font-semibold" : ""
                  }`}
                  key={path}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex justify-center mt-6 space-x-4">
              <LangOption />
              <ModeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default NavBar;
