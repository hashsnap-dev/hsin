import type { NextPage } from 'next';
import Head from 'next/head';
import Login from '../components/Login';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>HSIN - 로그인</title>
        <meta name="description" content="HSIN Uploader" />
      </Head>

      <Login />
    </>
  );
};

export default Home;
