import React from "react";
import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const MusicCard = ({ title, subtitle, image, link }) => {
  return (
    <a
      className=" space-y-2 rounded-xl border border-neutral-200 p-4 transition-all ease-in-out hover:cursor-pointer hover:border-teal-600 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900
    "
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex w-full items-start justify-between pb-2">
        <Image
          className="rounded"
          src={image}
          width={50}
          height={50}
          placeholder="blur"
          blurDataURL={`${image}?auto=format,compress&q=1&blur=500&w=2`}
          alt="Image of the music album art"
          quality={50}
        />
        <ArrowTopRightOnSquareIcon className="h-4 w-4 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
      </div>
      <div className="flex w-full items-center gap-2">
        <header className="mr-2 text-lg font-bold text-neutral-700 dark:text-neutral-200">
          {title}
        </header>
      </div>
      <span className="font-mono tracking-tight text-neutral-500 dark:text-neutral-400">
        {subtitle}
      </span>
    </a>
  );
};

export default MusicCard;
