import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="font-bold text-lg">How big is your club?</div>

        {/* Nav */}
        <NavigationMenu>
          <NavigationMenuList className="flex gap-6">
            <NavigationMenuItem>
                <Link to="/">Home</Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/About">About</Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/contact">Contact</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
