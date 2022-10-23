import React from "react";
import Image from "next/future/image";
import Link from "next/link";

const AppCard = ({ title, subtitle, image, link }) => {
  return (
    <Link href={link}>
      <a
        className="flex flex-col space-y-2 rounded-xl border border-neutral-200 p-4 transition-all ease-in-out hover:cursor-pointer hover:border-teal-600 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900
    "
        href={link}
        rel="noreferrer"
      >
        <div className="flex w-full items-start justify-between pb-2">
          <Image
            className="h-auto w-full rounded"
            src={image}
            width={400}
            height={100}
            placeholder="blur"
            blurDataURL={`${image}?auto=format,compress&q=1&blur=500&w=2`}
            alt="Image of the project"
            quality={100}
          />
        </div>
        <div className="flex w-full flex-col items-start gap-2">
          <header className="mr-2 text-lg font-bold text-neutral-700 dark:text-neutral-200">
            {title}
          </header>
          <span className="font-mono tracking-tight text-neutral-500 dark:text-neutral-400">
            {subtitle}
          </span>
        </div>
      </a>
    </Link>
  );
};

export default AppCard;
