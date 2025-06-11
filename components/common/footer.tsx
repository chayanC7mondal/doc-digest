import React from "react";
import {
  Instagram,
  Linkedin,
  Github,
  MessageCircle,
  FileText,
} from "lucide-react";
// import { Button } from './ui/button';
import { Button } from "../ui/button";
import NavLink from "./navlink";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-pink-50 to-rose-100 overflow-hidden h-85">
      {/* Wave Animation - Full Coverage */}
      <div className="absolute inset-0 w-full h-full">
        {/* Wave Layer 1 */}
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-200 via-rose-200 to-pink-300 opacity-80"
          style={{
            clipPath:
              "polygon(0% 20%, 25% 10%, 50% 15%, 75% 5%, 100% 10%, 100% 100%, 0% 100%)",
            animation: "wave1 8s ease-in-out infinite",
          }}
        />
        {/* Wave Layer 2 */}
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-rose-200 via-pink-300 to-rose-300 opacity-70"
          style={{
            clipPath:
              "polygon(0% 30%, 25% 20%, 50% 25%, 75% 15%, 100% 20%, 100% 100%, 0% 100%)",
            animation: "wave2 10s ease-in-out infinite reverse",
          }}
        />
        {/* Wave Layer 3 */}
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-300 via-rose-300 to-pink-200 opacity-60"
          style={{
            clipPath:
              "polygon(0% 25%, 25% 15%, 50% 20%, 75% 10%, 100% 15%, 100% 100%, 0% 100%)",
            animation: "wave3 12s ease-in-out infinite",
          }}
        />
      </div>

      {/* Footer Content */}
      <div className="relative z-10 pt-16.5 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered Content */}
          <div className="text-center space-y-6">
            {/* Company Name */}
            <div className="flex items-center justify-center gap-2">
              <NavLink
                href="/"
                className="flex items-center gap-1 lg:gap-2 shrink-0 group"
              >
                <FileText className="w-6 h-6 md:w-8 md:h-8 text-pink-700 transition duration-300 ease-in-out transform group-hover:rotate-6 group-hover:text-rose-500" />
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-700 bg-clip-text text-transparent group-hover:brightness-110">
                  DocDigest
                </h2>
              </NavLink>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center gap-3">
              <a
                href="#"
                className="p-2.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110"
              >
                <Instagram className="w-4 h-4 text-gray-700" />
              </a>
              <a
                href="#"
                className="p-2.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110"
              >
                <Linkedin className="w-4 h-4 text-gray-700" />
              </a>
              <a
                href="#"
                className="p-2.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110"
              >
                <Github className="w-4 h-4 text-gray-700" />
              </a>
              <a
                href="#"
                className="p-2.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110"
              >
                <MessageCircle className="w-4 h-4 text-gray-700" />
              </a>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <a
                href="#"
                className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-700 hover:bg-white/20 hover:text-pink-600 transition-all duration-200 font-medium"
              >
                Testimonials
              </a>
              <a
                href="#"
                className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-700 hover:bg-white/20 hover:text-pink-600 transition-all duration-200 font-medium"
              >
                Documentation
              </a>
              <a
                href="#"
                className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-700 hover:bg-white/20 hover:text-pink-600 transition-all duration-200 font-medium"
              >
                Help Center
              </a>
              <a
                href="#"
                className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-700 hover:bg-white/20 hover:text-pink-600 transition-all duration-200 font-medium"
              >
                Community
              </a>
              <a
                href="#"
                className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-700 hover:bg-white/20 hover:text-pink-600 transition-all duration-200 font-medium"
              >
                Terms of Service
              </a>
            </div>

            {/* Support Button */}
            <div>
              <Button
                variant="outline"
                className="bg-white/20 backdrop-blur-sm border-white/30 text-gray-700 hover:bg-white/30 px-6 py-2 text-sm"
              >
                Support
              </Button>
            </div>

            {/* Bottom Copyright */}
            <div className="pt-4 mt-4 border-t border-pink-200/50">
              <div className="text-center text-gray-600 text-xs">
                Design By -{" "}
                <span className="text-pink-600 font-medium">DocDigest</span> ©
                {new Date().getFullYear()} DocDigest. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Keyframe Animations */}
      <style>{`
        @keyframes wave1 {
          0%, 100% {
            clip-path: polygon(0% 20%, 25% 10%, 50% 15%, 75% 5%, 100% 10%, 100% 100%, 0% 100%);
          }
          25% {
            clip-path: polygon(0% 15%, 25% 5%, 50% 10%, 75% 0%, 100% 5%, 100% 100%, 0% 100%);
          }
          50% {
            clip-path: polygon(0% 25%, 25% 15%, 50% 20%, 75% 10%, 100% 15%, 100% 100%, 0% 100%);
          }
          75% {
            clip-path: polygon(0% 10%, 25% 20%, 50% 5%, 75% 15%, 100% 20%, 100% 100%, 0% 100%);
          }
        }

        @keyframes wave2 {
          0%, 100% {
            clip-path: polygon(0% 30%, 25% 20%, 50% 25%, 75% 15%, 100% 20%, 100% 100%, 0% 100%);
          }
          33% {
            clip-path: polygon(0% 25%, 25% 15%, 50% 20%, 75% 10%, 100% 15%, 100% 100%, 0% 100%);
          }
          66% {
            clip-path: polygon(0% 35%, 25% 25%, 50% 30%, 75% 20%, 100% 25%, 100% 100%, 0% 100%);
          }
        }

        @keyframes wave3 {
          0%, 100% {
            clip-path: polygon(0% 25%, 25% 15%, 50% 20%, 75% 10%, 100% 15%, 100% 100%, 0% 100%);
          }
          20% {
            clip-path: polygon(0% 20%, 25% 10%, 50% 15%, 75% 5%, 100% 10%, 100% 100%, 0% 100%);
          }
          40% {
            clip-path: polygon(0% 30%, 25% 20%, 50% 25%, 75% 15%, 100% 20%, 100% 100%, 0% 100%);
          }
          60% {
            clip-path: polygon(0% 15%, 25% 25%, 50% 10%, 75% 20%, 100% 25%, 100% 100%, 0% 100%);
          }
          80% {
            clip-path: polygon(0% 27%, 25% 12%, 50% 22%, 75% 8%, 100% 12%, 100% 100%, 0% 100%);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
