import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Bloglist from "../components/BlogList";
import Footer from "../components/Footer";
import Newsletter from "../components/NewsLetter";

function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Bloglist />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Home;
