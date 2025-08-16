import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Bloglist from "../components/BlogList";
import Footer from "../components/Footer";
import NewsLetter from "../components/Newsletter";

function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Bloglist />
      <NewsLetter />
      <Footer />
    </>
  );
}

export default Home;
