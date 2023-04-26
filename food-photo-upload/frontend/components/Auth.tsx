import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSelf from '../hooks/useSelf';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Auth({ children }: LayoutProps) {
  const { isLoading, isError, data, error } = useSelf();
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      router.push('/');
    }
  }, [isError, router]);

  if (data) {
    return <>{children}</>;
  }

  return <></>;
}
