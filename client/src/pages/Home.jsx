import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Bloglist from "../components/BlogList";
import NewsLetter from "../components/Newsletter";
import Footer from "../components/Footer";

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
