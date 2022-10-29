import React from "react";

const PageHeader = ({ children, paddingTop }) => {
  return (
    <h1
      className={`pt-${paddingTop} pb-4 font-sans text-4xl font-black text-neutral-800 dark:text-neutral-200 md:text-5xl`}
    >
      {children}
    </h1>
  );
};

export default PageHeader;
