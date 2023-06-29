import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { FakeFetch } from "./components/FakeFetch";
import { Banner } from "./components/Banner";
import { About } from "./components/About";
import { SkillReport } from "./components/SkillReport";
import { Speakers } from "./components/Speakers";
import FaqsPage from "./components/Faqs";
import Navbar from "./components/Navbar";
import { BannerSlider } from "./components/BannerSlider";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <BannerSlider />
        {/* <Navbar />
        <Banner />
        <About />
        <SkillReport />
        <Speakers /> */}
      </main>
    </>
  );
}