import type { NextPage } from "next";
import Head from "next/head";
import OurServices from "../components/home/ourServices";
import React from "react";

import Section from "../components/home/section";

const Home: NextPage = () => {
  return (
    <div className="container mx-auto min-h-full">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section />
      <OurServices />
    </div>
  );
};

export default Home;
