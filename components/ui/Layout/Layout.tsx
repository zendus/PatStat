import { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import styles from './style.module.css';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export const Layout = ({ children, title = 'Pat-Stat' }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};
