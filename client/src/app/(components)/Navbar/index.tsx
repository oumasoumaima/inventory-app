"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { Bell, Menu, Moon, Settings, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <div className="flex justify-between items-center w-full mb-7 gap-4">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-dark-surface rounded-full hover:bg-primary-700 text-gray-200"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-50 md:w-60 border border-dark-border bg-dark-surface rounded-lg focus:outline-none focus:border-primary-500 text-white placeholder-gray-500"
          />

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bell className="text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <button onClick={toggleDarkMode}>
              {isDarkMode ? (
                <Sun className="cursor-pointer text-gray-400 hover:text-white" size={24} />
              ) : (
                <Moon className="cursor-pointer text-gray-400 hover:text-white" size={24} />
              )}
            </button>
          </div>
          <div className="relative">
            <Bell className="cursor-pointer text-gray-400 hover:text-white" size={24} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-white bg-red-500 rounded-full">
              3
            </span>
          </div>
          <hr className="w-0 h-7 border border-solid border-l border-gray-600 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 relative">
              <Image
                src="https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/profile.jpg"
                alt="Profile"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span className="font-semibold text-gray-200">Ed Roh</span>
          </div>
        </div>
        <Link href="/settings">
          <Settings className="cursor-pointer text-gray-400 hover:text-white" size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
