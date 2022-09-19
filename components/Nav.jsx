import Image from "next/future/image";
import Link from "next/link";
import NavLink from "./NavLink";
import { useEffect, useState } from "react";

const navItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/writing",
    label: "Writing",
  },
  {
    href: "/projects",
    label: "Projects",
  },
  {
    href: "/bookmarks",
    label: "Bookmarks",
  },
  {
    href: "/uses",
    label: "Stack",
  },
];

const mobileNavItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/writing",
    label: "Writing",
  },
  {
    href: "/projects",
    label: "Projects",
  },
  {
    href: "/bookmarks",
    label: "Bookmarks",
  },
];

const Nav = () => {
  const [key, setKey] = useState("");

  useEffect(() => {
    const userAgent = window.navigator?.userAgent?.toLowerCase();
    const macosPlatforms = /(macintosh|macintel|macppc|mac68k|macos|mac)/i;

    if (macosPlatforms.test(userAgent)) {
      setKey("⌘");
    } else {
      setKey("⌃");
    }
  }, [key]);

  return (
    <div>
      <div
        as="nav"
        className="hidden dark:border-gray-700 md:fixed md:top-0 md:z-50 md:mx-auto md:flex md:h-16 md:w-full md:items-center md:justify-center md:rounded-none md:border md:border-none md:border-gray-200 md:bg-white md:py-0 md:shadow-none md:duration-500 dark:md:bg-[#0D1116] dark:md:shadow-none"
      >
        <div className="mx-auto w-full justify-center lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex h-full w-full items-center">
              <Link href="/">
                <a className="pt-1">
                  <Image
                    className="rounded-lg"
                    height={32}
                    width={32}
                    src="/logo.svg"
                    alt="Logo"
                    quality={50}
                  />
                </a>
              </Link>
              <p className="w-max pl-2 pb-0 text-sm text-gray-500 dark:text-gray-400">
                {"Press"}
              </p>
              <code className="w-max font-mono text-sm text-teal-700 dark:text-teal-300">
                {`${key} + K`}
              </code>
              <p className="w-max pb-0 text-sm text-gray-500 dark:text-gray-400">
                {"to find anything"}
              </p>
            </div>
            <div className="mx-0 flex w-full items-center justify-end">
              <div className="block">
                {/* Desktop nav */}
                <div className="flex items-center">
                  {navItems.map((item, idx) => (
                    <NavLink href={item.href} key={idx}>
                      <a className="nav">{item.label}</a>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        as="nav"
        className="fixed bottom-4 left-0 right-0 z-50 mx-auto flex h-max w-[95vw] items-center justify-center rounded-full border border-gray-200 bg-gray-100 py-2 shadow-lg duration-500 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none md:hidden"
      >
        {/* Mobile nav */}
        <div className="flex w-full items-center justify-between px-2 text-sm">
          {mobileNavItems.map((item, idx) => (
            <NavLink href={item.href} key={idx}>
              <a className="nav">{item.label}</a>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Nav;
