// "use client";

// import React, { useState } from "react";
// import { FileText, Menu, X } from "lucide-react";
// import { Button } from "../ui/button";
// import NavLink from "./navlink";
// import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// const Header = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <nav className="container mt-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
//       <div className="flex items-center justify-between px-4 lg:px-8 py-4">
//         {/* Logo Section */}
//         <div className="flex lg:flex-1">
//           <NavLink
//             href="/"
//             className="flex items-center gap-1 lg:gap-2 shrink-0 group"
//             onClick={closeMobileMenu}
//           >
//             <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 group-hover:text-rose-500 transition duration-300 ease-in-out transform group-hover:rotate-6" />
//             <span className="font-extrabold lg:text-xl text-gray-900 group-hover:text-rose-500 transition-colors duration-300">
//               DocDigest
//             </span>
//           </NavLink>
//         </div>

//         {/* Desktop & Medium Nav Items */}
//         <div className="hidden md:flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
//           <NavLink
//             href="/#pricing"
//             className="text-gray-700 hover:text-rose-500 transition-all duration-300 font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-rose-400 after:transition-all after:duration-300"
//           >
//             Pricing
//           </NavLink>
//           <SignedIn>
//             <NavLink
//               href="/dashboard"
//               className="text-gray-700 hover:text-rose-500 transition-all duration-300 font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-rose-400 after:transition-all after:duration-300"
//             >
//               Your Summaries
//             </NavLink>
//           </SignedIn>
//         </div>

//         {/* Desktop & Medium Right Side Auth Buttons */}
//         <div className="hidden md:flex lg:justify-end lg:flex-1">
//           <SignedIn>
//             <div className="flex gap-2 items-center">
//               <NavLink
//                 href="/upload"
//                 className="text-gray-700 hover:text-rose-500 transition-all duration-300 font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-rose-400 after:transition-all after:duration-300"
//               >
//                 Upload a PDF
//               </NavLink>
//               <div className="text-white">Pro</div>
//               <UserButton />
//             </div>
//           </SignedIn>

//           <SignedOut>
//             <NavLink
//               href="/sign-in"
//               className="text-gray-700 hover:text-rose-500 transition-all duration-300 font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-rose-400 after:transition-all after:duration-300"
//             >
//               Sign In
//             </NavLink>
//           </SignedOut>
//         </div>

//         {/* Mobile Hamburger Button - Only on Small Devices */}
//         <div className="md:hidden">
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={toggleMobileMenu}
//             className="p-2 text-white bg-gradient-to-r from-rose-300 to-rose-600 hover:from-rose-500 hover:to-rose-700 rounded-lg transition-all duration-300"
//           >
//             {isMobileMenuOpen ? (
//               <X className="w-6 h-6" />
//             ) : (
//               <Menu className="w-6 h-6" />
//             )}
//           </Button>
//         </div>
//       </div>

//       {/* Mobile Menu - Only on Small Devices */}
//       <div
//         className={`md:hidden border-t border-white/20 bg-white/5 backdrop-blur-md rounded-b-3xl overflow-hidden transition-all duration-300 ease-in-out ${
//           isMobileMenuOpen
//             ? "max-h-96 opacity-100 translate-y-0"
//             : "max-h-0 opacity-0 -translate-y-4"
//         }`}
//       >
//         <div className="px-6 py-6 space-y-1">
//           <NavLink
//             href="/#pricing"
//             className="flex items-center justify-center text-gray-700 hover:text-rose-500 hover:bg-white/10 transition-all duration-300 font-medium py-3 px-4 rounded-lg text-center"
//             onClick={closeMobileMenu}
//           >
//             Pricing
//           </NavLink>

//           <SignedIn>
//             <NavLink
//               href="/dashboard"
//               className="flex items-center justify-center text-gray-700 hover:text-rose-500 hover:bg-white/10 transition-all duration-300 font-medium py-3 px-4 rounded-lg text-center"
//               onClick={closeMobileMenu}
//             >
//               Your Summaries
//             </NavLink>
//             <NavLink
//               href="/upload"
//               className="flex items-center justify-center text-gray-700 hover:text-rose-500 hover:bg-white/10 transition-all duration-300 font-medium py-3 px-4 rounded-lg text-center"
//               onClick={closeMobileMenu}
//             >
//               Upload a PDF
//             </NavLink>

//             {/* User section with better spacing and centered */}
//             <div className="flex flex-col items-center justify-center py-4 mt-4 border-t border-white/10 space-y-2">
//               <UserButton />
//               <span className="text-white text-sm font-medium">Pro</span>
//             </div>
//           </SignedIn>

//           <SignedOut>
//             <NavLink
//               href="/sign-in"
//               className="flex items-center justify-center text-gray-700 hover:text-rose-500 hover:bg-white/10 transition-all duration-300 font-medium py-3 px-4 rounded-lg text-center"
//               onClick={closeMobileMenu}
//             >
//               Sign In
//             </NavLink>
//           </SignedOut>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;

import React from "react";
import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import NavLink from "./navlink";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import PlanBadge from "./plan-badge";

const Header = () => {
  return (
    <nav className="container mt-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-between px-4 lg:px-8 py-4">
      {/* Logo Section */}
      <div className="flex lg:flex-1">
        <NavLink
          href="/"
          className="flex items-center gap-1 lg:gap-2 shrink-0 group"
        >
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 group-hover:text-rose-500  transition duration-300 ease-in-out transform group-hover:rotate-6" />
          <span className="font-extrabold lg:text-xl text-gray-900 group-hover:text-rose-500 transition-colors duration-300">
            DocDigest
          </span>
        </NavLink>
      </div>

      {/* Center Nav Items */}
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink
          href="/#pricing"
          className="text-gray-700 hover:text-rose-500 transition-all duration-300 font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-rose-400 after:transition-all after:duration-300"
        >
          Pricing
        </NavLink>
        <SignedIn>
          <NavLink
            href="/dashboard"
            className="text-gray-700 hover:text-rose-500 transition-all duration-300 font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-rose-400 after:transition-all after:duration-300"
          >
            Your Summaries
          </NavLink>
        </SignedIn>
      </div>

      {/* Right Side Auth Buttons */}
      <div className="flex lg:justify-end lg:flex-1">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <NavLink
              href="/upload"
              className="text-gray-700 hover:text-rose-500 transition-all duration-300 font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-rose-400 after:transition-all after:duration-300"
            >
              Upload a PDF
            </NavLink>
            <PlanBadge />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>

        <SignedOut>
          <NavLink
            href="/sign-in"
            className="text-gray-700 hover:text-rose-500 transition-all duration-300 font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-rose-400 after:transition-all after:duration-300"
          >
            Sign In
          </NavLink>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Header;
