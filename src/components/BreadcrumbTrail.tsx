
import { ChevronRight } from "lucide-react";

const BreadcrumbTrail = () => {
  const breadcrumbs = [
    { name: "Sports, Fitness & Outdoors", href: "#" },
    { name: "Cricket", href: "#" },
    { name: "Bats", href: "#" },
    { name: "English Willow", href: "#" },
  ];

  return (
    <nav className="flex">
      <ol className="flex items-center space-x-1 text-sm text-gray-600">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <ChevronRight size={12} className="mx-1 text-gray-400" />}
            <a href={breadcrumb.href} className="hover:text-[#FF9900] hover:underline">
              {breadcrumb.name}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbTrail;
