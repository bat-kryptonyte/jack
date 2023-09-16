import React from "react";
import Layout from "../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import styles from "./Home.module.css";

export const Home: React.FC = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.heading}>
          <div className={styles.homeContent}>
            <Image
              src="/duck-contour-final.png"
              alt="Descriptive Alt Text"
              width={250}
              height={250}
            />
            <h1>An Open Source ML Research Community</h1>
            <Link href="/projects">
              <a className={styles.projectButton}>
                Check out our latest research &gt;&gt;
              </a>
            </Link>
          </div>
        </h1>
      </div>
    </Layout>
  );
};

export default Home;