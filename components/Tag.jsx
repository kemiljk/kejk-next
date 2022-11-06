import React from "react";
import classNames from "classnames";

const Tag = ({ children }) => {
  return (
    <div
      className={classNames(
        "flex w-max items-center justify-center rounded-lg border px-3 py-1 font-mono text-xs font-normal uppercase leading-tight",
        "border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-900 dark:bg-teal-900/30 dark:text-teal-200"
      )}
    >
      {children}
    </div>
  );
};

export default Tag;
