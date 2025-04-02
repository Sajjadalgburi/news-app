import React from "react";
import HomePageNews from "./HomePageNews";

const LandingPage = () => {
  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <h2 className="md:text-4xl text-2xl font-bold text-left mb-6">
        Currently Trending News Around The Globe
      </h2>

      <HomePageNews />
    </section>
  );
};

export default LandingPage;
