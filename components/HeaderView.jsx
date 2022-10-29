import React from "react";

export default function HeaderView({ children }) {
  return (
    <header className="mx-auto w-full">
      <div className="flex w-full justify-start pt-12 md:justify-center md:px-4">
        <h1 className="text-left font-mono text-2xl font-bold text-neutral-900 dark:text-neutral-200 md:text-center md:text-3xl">
          {children}
        </h1>
      </div>
    </header>
  );
}
