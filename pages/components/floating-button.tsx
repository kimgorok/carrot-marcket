import Link from "next/link";
import React from "react";

interface FloatingButton {
  children: React.ReactNode;
  href: string;
}

export default function FloatingButton({ children, href }: FloatingButton) {
  return (
    <Link href={href} legacyBehavior>
      <a className="fixed hover:bg-blue-600 border-0 aspect-square cursor-pointer bottom-9 right-9 bg-blue-500 rounded-full w-16 flex items-center justify-center text-white">
        {children}
      </a>
    </Link>
  );
}
