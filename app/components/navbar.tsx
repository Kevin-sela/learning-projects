"use client";

import Link from "next/link";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { useState } from "react";

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("Home");

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex flex-col gap-2 p-3 text-sm">
        <div className="flex justify-between items-center">
          <Link href="/" className="font-bold text-lg" legacyBehavior>
            My App
          </Link>

        </div>
        
        <div className="w-full">
          <Breadcrumbs underline="hover" className="text-black-500">

          <BreadcrumbItem 
            onClick={() => setActiveItem("Home")}
            isCurrent={activeItem === "Home"}
            className={`font-medium ${activeItem === "Home" ? "text-primary" : "text-black-400"}`}
          >
            Home
          </BreadcrumbItem>
          <BreadcrumbItem 
            onClick={() => setActiveItem("Music")}
            isCurrent={activeItem === "Music"}
            className={`font-medium ${activeItem === "Music" ? "text-primary" : "text-black-400"}`}
          >
            Music
          </BreadcrumbItem>
          <BreadcrumbItem 
            onClick={() => setActiveItem("Artist")}
            isCurrent={activeItem === "Artist"}
            className={`font-medium ${activeItem === "Artist" ? "text-primary" : "text-black-400"}`}
          >
            Artist
          </BreadcrumbItem>
          <BreadcrumbItem 
            onClick={() => setActiveItem("Album")}
            isCurrent={activeItem === "Album"}
            className={`font-medium ${activeItem === "Album" ? "text-primary" : "text-black-400"}`}
          >
            Album
          </BreadcrumbItem>
          <BreadcrumbItem 
            onClick={() => setActiveItem("Song")}
            isCurrent={activeItem === "Song"}
            className={`font-medium ${activeItem === "Song" ? "text-primary" : "text-black-400"}`}
          >
            Song
          </BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>
    </nav>
  );
}
