import React from "react";
import Image from "next/image";
import Tag from "../components/Tag";

const AppCard = ({ title, subtitle, image, link, tags }) => {
  return (
    <a
      className=" space-y-2 rounded-xl border border-neutral-200 p-4 transition-all ease-in-out hover:cursor-pointer hover:border-teal-600 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800
    "
      href={link}
      rel="noreferrer"
    >
      <div className="flex w-full items-start justify-between space-x-4">
        <Image
          className="rounded"
          src={image}
          width={50}
          height={50}
          placeholder="blur"
          blurDataURL={`${image}?auto=format,compress&q=1&blur=500&w=2`}
          alt="Image of the plugin icon"
          quality={50}
        />
        <div className="w-full flex-col items-center gap-2">
          <header className="mr-2 text-lg font-bold text-neutral-700 dark:text-neutral-200">
            {title}
          </header>
          <span className="font-mono text-sm tracking-tight text-neutral-500 dark:text-neutral-400">
            {subtitle}
          </span>
          {tags && (
            <div className="flex w-full items-center justify-start space-x-2 pt-4">
              {tags !== undefined &&
                tags.map((tag, idx) => {
                  return <Tag key={idx}>{tag}</Tag>;
                })}
            </div>
          )}
        </div>
      </div>
    </a>
  );
};

export default AppCard;
