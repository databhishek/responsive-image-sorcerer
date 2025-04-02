
import { useState } from "react";
import { Search, MapPin, ChevronDown, ShoppingCart, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const NavigationHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();

  return (
    <header className="bg-[#131921] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between py-2 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center">
            {isMobile && (
              <button className="mr-2">
                <Menu size={24} />
              </button>
            )}
            <a href="/" className="block">
              <h1 className="text-xl font-bold tracking-tight">
                <span className="text-white">amazon</span>
                <span className="text-[#FF9900]">.in</span>
              </h1>
            </a>
          </div>

          {/* Location selector */}
          <div className="hidden sm:flex items-center ml-4">
            <MapPin size={16} className="text-gray-300" />
            <div className="ml-1">
              <div className="text-xs text-gray-300">Delivering to Mumbai 400017</div>
              <div className="text-sm font-bold flex items-center">
                Update location
                <ChevronDown size={14} className="ml-1" />
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-3xl mx-4">
            <div className="relative">
              <div className="flex">
                <div className="hidden sm:flex items-center bg-slate-100 text-black rounded-l-md px-3 py-2 text-sm">
                  All
                  <ChevronDown size={14} className="ml-1" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Amazon.in"
                  className="px-4 py-2 w-full border-0 outline-none focus:ring-0"
                />
                <button className="bg-[#FF9900] hover:bg-[#ffac33] p-2 rounded-r-md flex items-center justify-center">
                  <Search size={24} className="text-black" />
                </button>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="hidden sm:flex items-center space-x-4">
            <div className="cursor-pointer group">
              <div className="text-xs">Hello, sign in</div>
              <div className="text-sm font-bold flex items-center">
                Account & Lists
                <ChevronDown size={14} className="ml-1" />
              </div>
            </div>

            <div className="cursor-pointer">
              <div className="text-xs">Returns</div>
              <div className="text-sm font-bold flex items-center">
                & Orders
              </div>
            </div>

            <div className="relative cursor-pointer">
              <ShoppingCart size={32} className="text-white" />
              <span className="absolute top-0 right-0 bg-[#FF9900] text-black rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                0
              </span>
              <span className="absolute bottom-0 text-xs font-bold">Cart</span>
            </div>
          </div>

          {isMobile && (
            <div className="relative cursor-pointer">
              <ShoppingCart size={28} className="text-white" />
              <span className="absolute -top-1 -right-1 bg-[#FF9900] text-black rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                0
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;
