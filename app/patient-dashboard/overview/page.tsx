import type { NextPage } from 'next';
import Head from 'next/head';
import { PatientOverview } from '@/widgets/Admin/Dashboard';

const PatientOverviewPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Patient Overview – Pat-Stat</title>
        <meta name="description" content="Real-time updates about your loved one's care." />
      </Head>
      <PatientOverview />
    </>
  );
};

export default PatientOverviewPage;