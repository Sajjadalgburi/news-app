"use client";

import Articles from "@/components/Article-Stuff-Here/Articles";
import React from "react";
import { multipleArticles as data } from "@/__tests__/index";

const page = () => {
  return <Articles articles={data} loading={false} error={undefined} />;
};

export default page;
