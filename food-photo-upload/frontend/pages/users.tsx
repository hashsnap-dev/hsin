import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Input, Button, Card, Table, Space, Modal } from 'antd';
import { TableProps } from 'antd/lib/table';
import { Content } from 'antd/lib/layout/layout';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import DefaultLayout from '../components/DefaultLayout';
import Auth from '../components/Auth';
import DefaultHeader from '../components/DefaultHeader';
import { User } from '../types';
import useFetchUsers from '../hooks/useFetchUsers';
import useDeleteUser from '../hooks/useDeleteUser';
import errorHandler from '../network/errorHandler';
import { useRouter } from 'next/router';
import PhoneNumber from '../components/PhoneNumber';

const { Search } = Input;
const { Column } = Table;
const { confirm } = Modal;

const Users: NextPage = () => {
  const initPage = 1;
  const initLimit = 20;
  const initQuery = '';

  const [query, setQuery] = useState(initQuery);
  const [querying, setQuerying] = useState(initQuery);
  const [page, setPage] = useState(initPage);
  const [limit, setLimit] = useState(initLimit);
  const [isInitRouter, setIsInitRouter] = useState(false);

  const router = useRouter();

  const { isLoading, isError, data, error, refetch } = useFetchUsers({
    page,
    limit,
    query,
  });

  const {
    isLoading: isUpdateLoading,
    isError: isUpdateError,
    isSuccess,
    mutateAsync,
  } = useDeleteUser();

  const handleTableChange: TableProps<User>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    router.push(
      {
        query: {
          ...router.query,
          page: pagination.current,
          limit: pagination.pageSize,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleDeleteUser = (id: string) => {
    confirm({
      title: '계정을 삭제하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      onOk: async () => {
        try {
          await mutateAsync(id);
          refetch();
        } catch (e) {
          errorHandler(e);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const onSearch = (value: string) => {
    console.log('onsearch', value);

    // 1페이지로 이동
    router.push(
      {
        query: {
          ...router.query,
          query: value,
          page: 1,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    // 최초 init을 실행체크하지않으면
    // router의 query page 가 1이 아닌 다른 페이지가 올때
    // page 파라메터가 최초는 1이어서 한번 호출되고
    // router 세팅후 page=2로 한번더 호출하게 되어 2번호출하는 문제가 있어
    // 첫 로드를 체크한다
    if (!isInitRouter) {
      return;
    }

    console.log('refetch함');

    refetch();
  }, [refetch, isInitRouter, query, page]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (router.query?.query) {
      setQuerying((router.query?.query as string) || initQuery);
      setQuery((router.query?.query as string) || initQuery);
    } else {
      setQuerying(initQuery);
      setQuery(initQuery);
    }
    if (router.query?.page) {
      if (router.query?.page as string) {
        setPage(parseInt(router.query?.page as string, 10) || initPage);
      } else {
        setPage(initPage);
      }
    } else {
      setPage(initPage);
    }

    setIsInitRouter(true);
  }, [router]);

  return (
    <Auth>
      <DefaultLayout selectedKey="users">
        <Head>
          <title>HSIN - 회원 계정 관리</title>
        </Head>

        <DefaultHeader title="회원 계정 관리" />

        <Content className="site-page-content">
          <Card style={{ margin: '0 0 27px 0' }}>
            <Input.Group compact>
              <Search
                placeholder="전체 사용자 검색 (아이디 / 이메일 주소 / 성명 / 연락처)"
                enterButton
                loading={isLoading}
                value={querying}
                onChange={(e) => setQuerying(e.target.value)}
                onSearch={onSearch}
              />
            </Input.Group>
          </Card>

          <div style={{ marginBottom: '16px', textAlign: 'right' }}>
            <Link href="/users/new">
              <Button type="primary" size="large">
                계정 추가
              </Button>
            </Link>
          </div>

          <Table<User>
            tableLayout="auto"
            dataSource={data?.data.data || []}
            pagination={{
              position: ['bottomCenter'],
              total: data?.data.total || 0,
              current: page || initPage,
              pageSize: limit || initLimit,
              showTotal: (total: number) => `Total ${total} items`,
              showSizeChanger: false,
            }}
            onChange={handleTableChange}
            loading={isLoading}
            rowKey="_id"
          >
            <Column<User>
              title="회원구분"
              dataIndex="username"
              key="username"
              align="center"
              render={(text: any, user) => (
                <>{user.role === 'admin' ? '관리자' : '회원'}</>
              )}
            />
            <Column
              title="아이디"
              dataIndex="username"
              key="username"
              align="center"
            />
            <Column title="성명" dataIndex="name" key="name" align="center" />
            <Column<User>
              title="연락처"
              dataIndex="phone"
              key="phone"
              align="center"
              render={(text: any, user) => <PhoneNumber value={user.phone} />}
            />
            <Column
              title="이메일주소"
              dataIndex="email"
              key="email"
              align="center"
            />
            <Column<User>
              title="계정 관리"
              key="action"
              align="center"
              render={(text: any, user) => (
                <Space>
                  <Link href={`/users/${user._id}/edit`}>
                    <Button htmlType="button">정보 수정</Button>
                  </Link>
                  <Button
                    danger
                    htmlType="button"
                    disabled={user.role === 'admin'}
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    계정 삭제
                  </Button>
                </Space>
              )}
            />
          </Table>
        </Content>
      </DefaultLayout>
    </Auth>
  );
};

export default Users;
