import React from "react";
import HomePageNews from "./HomePageNews";

const LandingPage = () => {
  return (
    <section className=" py-8 px-4 max-w-7xl mx-auto">
      <h2 className="md:text-4xl text-2xl font-bold text-left text-gray-800 mb-6">
        Currently Trending News In Canada
      </h2>

      <HomePageNews />
    </section>
  );
};

export default LandingPage;
