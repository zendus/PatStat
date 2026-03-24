"use client";

import { Layout } from "@/components/ui/Layout";
import { HowItWorks } from "@/widgets/HomeHeros";
import { MainHero } from "@/widgets/HomeHeros/MainHero";
import Head from "next/head";


const Home = () => {
  return (
    <Layout title="Pat-Stat | Built for African healthcare systems" >
      <Head>
        <title>Pat-Stat | Built for African healthcare systems</title>
        <meta name="description" content="Pat-Stat is a powerful analytics platform designed specifically for African healthcare systems." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <MainHero />
        <HowItWorks />
      </main>
    </Layout>
  );
};

export default Home;
