import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Menu } from 'antd';
import Layout from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import { MenuInfo } from 'rc-menu/lib/interface';
import useSelf from '../hooks/useSelf';
import Link from 'next/link';
import { VerticalAlignTopOutlined } from '@ant-design/icons';

type LayoutProps = {
  selectedKey?: string;
  children: React.ReactNode;
};

export default function DefaultLayout({ selectedKey, children }: LayoutProps) {
  const { isLoading, isError, data, error } = useSelf();
  const router = useRouter();

  const menuItems = [
    {
      key: 'foods',
      label: '제품 리스트',
      role: 'user',
    },
    {
      key: 'users',
      label: '회원 계정 관리',
      role: 'admin',
    },
  ];

  const handleMenuClick = ({ key }: MenuInfo) => {
    if (key === 'foods') {
      router.push('/foods');
    } else if (key === 'users') {
      router.push('/users');
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="logo">
          <Link href="/">
            <a>
              <Image src="/logo-s-b.svg" alt="hsin" width={85} height={23} />
            </a>
          </Link>
        </div>
        <Menu
          mode={'inline'}
          theme="dark"
          defaultSelectedKeys={['foods']}
          selectedKeys={[selectedKey || 'foods']}
          items={
            data && data.data.role === 'admin'
              ? menuItems
              : menuItems.filter((item) => item.role !== 'admin')
          }
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        {children}
        <Button
          size="large"
          icon={<VerticalAlignTopOutlined />}
          className="btn-top"
          onClick={handleScrollToTop}
        >
          Top
        </Button>
      </Layout>
    </Layout>
  );
}
