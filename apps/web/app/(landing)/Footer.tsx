import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#1a202c] via-[#2d3748] to-[#1a202c] text-[#F5F0E6] pt-18 py-8 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 flex items-center justify-center text-[#F5F0E6] font-bold text-2xl relative">
                <img
                  src="lexelo-icon.png"
                  alt="Lexelo Logo"
                  className="w-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
              </div>

              <span className="text-2xl font-bold text-[#F5F0E6]">Lexelo</span>
            </div>
            <p className="text-[rgba(245,240,230,0.7)] leading-relaxed">
              Making Latin accessible through modern technology and proven
              learning methods that ensure lasting comprehension and retention.
            </p>
          </div>

          <div>
            <h4 className="text-[#F5F0E6] font-semibold mb-6">Product</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                >
                  Download
                </a>
              </li>
              <li>
                <a
                  href="#languages"
                  className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                >
                  Contribute
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                >
                  Updates
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#F5F0E6] font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Bunnygamezsc/lexelo"
                  className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#F5F0E6] font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[rgba(245,240,230,0.1)] text-center text-[rgba(245,240,230,0.5)]">
          <p>&copy; 2025 Lexelo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
