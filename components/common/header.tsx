import React from "react";
import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import NavLink from "./navlink";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

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
            <NavLink href="/upload">Upload a PDF</NavLink>
            <div className="text-white">Pro</div>
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

// import React from "react";
// import { FileText } from "lucide-react";
// import { Button } from "../ui/button";
// import NavLink from "./navlink";
// const Header = () => {
//   const isLoggedIn = false;
//   return (
//     <nav className="container flex item-center justify-between py-4 lg:px-8 px-2">
//       <div className="flex lg:flex-1">
//         <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
//           <FileText className="w-5 h-5 lg:w-8 lg:h-8 textigray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
//           <span className="font-extrabold lg:text-xl text-gray-900">
//             DocDigest
//           </span>
//         </NavLink>
//       </div>

//       <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
//         <NavLink href="/#pricing">Pricing</NavLink>
//         {isLoggedIn && <NavLink href="/dashboard">Your Summaries</NavLink>}
//       </div>
//       <div className="flex lg:justify-end lg:flex-1">
//         {isLoggedIn ? (
//           <div className="flex gap-2 items-center">
//             <NavLink href="/upload">Upload a PDF</NavLink>
//             <div>Pro</div>
//             <Button>User</Button>
//           </div>
//         ) : (
//           <div>
//             <NavLink href="/sign-in">Sign In</NavLink>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Header;
