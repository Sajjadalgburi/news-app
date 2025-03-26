import React from "react";

const ArticleLaytout = ({ children }: { children: React.ReactNode }) => {
  return <section className="max-w-7xl mx-auto p-2">{children}</section>;
};

export default ArticleLaytout;
