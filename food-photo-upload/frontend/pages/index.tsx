import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSelf from '../hooks/useSelf';

const Home: NextPage = () => {
  const { isLoading, isError, data, error } = useSelf();
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      router.push('/login');
      return;
    }

    if (isLoading) {
      return;
    }

    if (data) {
      router.push('/foods');
    }
  }, [isLoading, isError, router, data]);

  return (
    <>
      <Head>
        <title>HSIN</title>
        <meta name="description" content="HSIN Uploader" />
      </Head>
    </>
  );
};

export default Home;
