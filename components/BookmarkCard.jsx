import React from "react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

const BookmarkCard = ({ title, subtitle, url, date }) => {
  return (
    <div
      className=" group flex min-h-full flex-col space-y-2  rounded-xl transition-all ease-in-out hover:cursor-pointer
    "
    >
      <div className="flex h-max w-full items-start justify-between gap-2 ">
        <header className="mr-2 block text-lg font-bold text-neutral-700 group-hover:underline group-hover:decoration-teal-500 group-hover:decoration-2 group-hover:underline-offset-4 dark:text-neutral-200">
          {title}
        </header>
        <ArrowLongRightIcon className="h-6 w-6 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
      </div>
      <div className="flex min-h-full w-full flex-1 flex-col justify-between ">
        <span className="flex text-neutral-500 dark:text-neutral-400">
          {subtitle}
        </span>
        <div className="flex pt-4 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
          <span className="flex w-full justify-start font-mono text-xs font-light uppercase leading-6 text-neutral-500 dark:text-neutral-400">
            {date}
          </span>
          <span className="flex w-full justify-end font-mono text-xs font-light uppercase leading-6 text-teal-700 dark:text-teal-400">
            {url}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;
