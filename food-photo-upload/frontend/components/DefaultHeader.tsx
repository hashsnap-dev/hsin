import { useRouter } from 'next/router';
import { PageHeader, Button } from 'antd';
import useLogout from '../hooks/useLogout';
import errorHandler from '../network/errorHandler';

type headerProps = {
  title: string;
};

export default function DefaultHeader(props: headerProps) {
  const { isLoading, isError, isSuccess, mutateAsync } = useLogout();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await mutateAsync();
      router.push('/login');
    } catch (e) {
      errorHandler(e);
    }
  };

  const handleSettings = () => {
    router.push('/profile');
  };

  return (
    <PageHeader
      className="site-page-header"
      title={props.title}
      extra={[
        <Button key="1" type="link" onClick={handleSettings}>
          내 정보
        </Button>,
        <Button key="2" type="link" onClick={handleLogout}>
          로그아웃
        </Button>,
      ]}
    />
  );
}
