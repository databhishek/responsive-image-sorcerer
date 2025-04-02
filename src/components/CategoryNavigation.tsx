
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const categories = [
  { name: "All", href: "#" },
  { name: "Fresh", href: "#" },
  { name: "MX Player", href: "#" },
  { name: "Sell", href: "#" },
  { name: "Bestsellers", href: "#" },
  { name: "Today's Deals", href: "#" },
  { name: "Mobiles", href: "#" },
  { name: "Prime", href: "#" },
  { name: "Customer Service", href: "#" },
  { name: "New Releases", href: "#" },
  { name: "Electronics", href: "#" },
  { name: "Fashion", href: "#" },
  { name: "Amazon Pay", href: "#" },
  { name: "Home & Kitchen", href: "#" },
  { name: "Computers", href: "#" },
  { name: "Books", href: "#" },
  { name: "Car & Motorbike", href: "#" },
];

const sportsCategories = [
  { name: "Sports, Fitness & Outdoors", href: "#", active: true },
  { name: "Exercise & Fitness", href: "#" },
  { name: "Cricket", href: "#", active: true },
  { name: "Badminton", href: "#" },
  { name: "Cycling", href: "#" },
  { name: "Football", href: "#" },
  { name: "Running", href: "#" },
  { name: "Camping & Hiking", href: "#" },
  { name: "Swimming", href: "#" },
  { name: "Volleyball", href: "#" },
  { name: "Basketball", href: "#" },
  { name: "Table Tennis", href: "#" },
  { name: "Sportswear", href: "#" },
];

const CategoryNavigation = () => {
  const isMobile = useIsMobile();

  return (
    <div className="bg-[#232f3e] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Main categories */}
        <div className="overflow-x-auto hide-scrollbar">
          <div className="flex items-center py-2 px-4 sm:px-6 lg:px-8 space-x-4 whitespace-nowrap">
            {!isMobile && (
              <div className="flex items-center font-bold">
                <Menu size={18} className="mr-1" />
                All
              </div>
            )}
            
            {categories.map((category, index) => (
              <a
                key={index}
                href={category.href}
                className={cn(
                  "text-sm hover:text-white",
                  isMobile && index > 6 ? "hidden" : ""
                )}
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>

        {/* Sports subcategories */}
        <div className="bg-[#f5f5f5] text-black overflow-x-auto hide-scrollbar">
          <div className="flex items-center py-2 px-4 sm:px-6 lg:px-8 space-x-4 whitespace-nowrap">
            {sportsCategories.map((category, index) => (
              <a
                key={index}
                href={category.href}
                className={cn(
                  "text-sm hover:underline",
                  category.active ? "font-medium" : "",
                  isMobile && index > 6 ? "hidden" : ""
                )}
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryNavigation;
