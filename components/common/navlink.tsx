"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(
      pathname === href || (href !== "/" && pathname?.startsWith(href))
    );
  }, [pathname, href]);

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors text-sm duration-200 hover:text-rose-500",
        className,
        isActive && href !== "/" && "text-rose-500"
      )}
    >
      {children}
    </Link>
  );
}
