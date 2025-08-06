import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Bloglist from "../components/Bloglist";
import NewsLetter from "../components/NewsLetter";

function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Bloglist />
      <NewsLetter />
    </>
  );
}

export default Home;
