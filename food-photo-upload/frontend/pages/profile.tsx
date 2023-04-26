import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Descriptions, Button, Card, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Auth from '../components/Auth';
import DefaultLayout from '../components/DefaultLayout';
import DefaultHeader from '../components/DefaultHeader';
import useSelf from '../hooks/useSelf';
import PhoneNumber from '../components/PhoneNumber';

const UserDetail: NextPage = () => {
  const { isLoading, isError, data, error } = useSelf();
  const router = useRouter();

  const handleClick = () => {
    router.push('/settings');
  };

  return (
    <Auth>
      <DefaultLayout>
        <Head>
          <title>HSIN - 내 정보</title>
        </Head>

        <DefaultHeader title="내 정보" />

        <Content className="site-page-content">
          <Card>
            <Descriptions
              column={1}
              bordered
              labelStyle={{ width: '280px' }}
              style={{ marginBottom: '30px' }}
            >
              <Descriptions.Item label="아이디">
                {data?.data.username}
              </Descriptions.Item>
              <Descriptions.Item label="성명">
                {data?.data.name}
              </Descriptions.Item>
              <Descriptions.Item label="이메일주소">
                {data?.data.email}
              </Descriptions.Item>
              <Descriptions.Item label="연락처">
                <PhoneNumber value={data?.data.phone} />
              </Descriptions.Item>
            </Descriptions>

            {data?.data.role === 'user' && (
              <p style={{ marginBottom: '30px' }}>
                ※ 계정 삭제 요청은 한국건강기능식품협회 담당자에게
                연락부탁드립니다.
              </p>
            )}

            <Row justify="center">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                onClick={handleClick}
              >
                정보수정
              </Button>
            </Row>
          </Card>
        </Content>
      </DefaultLayout>
    </Auth>
  );
};

export default UserDetail;
