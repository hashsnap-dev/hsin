import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {
  Input,
  Button,
  Select,
  Radio,
  Card,
  Upload,
  message,
  Table,
  RadioChangeEvent,
  UploadProps,
  Row,
  Col,
  Image,
  Space,
  Modal,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { SorterResult } from 'antd/lib/table/interface';
import { TableProps } from 'antd/lib/table';
import { Content } from 'antd/lib/layout/layout';
import Auth from '../components/Auth';
import DefaultLayout from '../components/DefaultLayout';
import DefaultHeader from '../components/DefaultHeader';
import useFetchFoods from '../hooks/useFetchFoods';
import { Food } from '../types';
import useAddFoodThumbnail from '../hooks/useAddFoodThumbnail';
import errorHandler from '../network/errorHandler';
import useDeleteFoodThumbnail from '../hooks/useDeleteFoodThumbnail';
import DateTime from '../components/DateTime';
import useDeleteFoodUrl from '../hooks/useDeleteFoodUrl';
import AddFoodUrl from '../components/AddFoodUrl';
import { FOOD_TYPES } from '../constants';
import useSelf from '../hooks/useSelf';
import { useRouter } from 'next/router';

const { Column } = Table;
const { Option } = Select;
const { Search } = Input;
const { confirm } = Modal;

const Users: NextPage = () => {
  const initSort = '_id';
  const initOrder = 'asc';
  const initCategory = 'all';
  const initQuery = '';
  const initType = 'integration';
  const initThumb = 'all';
  const initUrl = 'all';
  const initPage = 1;
  const initLimit = 10;

  const [category, setCategory] = useState(initCategory);
  const [query, setQuery] = useState(initQuery);
  const [querying, setQuerying] = useState(initQuery);
  const [type, setType] = useState(initType);
  const [thumb, setThumb] = useState(initThumb);
  const [url, setUrl] = useState(initUrl);
  const [page, setPage] = useState(initPage);
  const [limit, setLimit] = useState(initLimit);
  const [sort, setSort] = useState(initSort);
  const [order, setOrder] = useState(initOrder);
  const [foods, setFoods] = useState<Food[]>([]);
  const [selectedFoodReportNo, setSelectedFoodReportNo] = useState('');
  const [isInitRouter, setIsInitRouter] = useState(false);

  const router = useRouter();

  const { isLoading, isError, data: userData, error } = useSelf();
  const {
    isIdle,
    isLoading: isLoadingFetch,
    isError: isErrorFetch,
    data,
    error: errorFetch,
    refetch,
    isFetching,
  } = useFetchFoods({
    type,
    thumb,
    url,
    category,
    query,
    page,
    limit,
    sort,
    order,
  });

  const {
    isLoading: isLoadingAddFoodThumbnail,
    isError: isErrorAddFoodThumbnail,
    isSuccess: isSuccessAddFoodThumbnail,
    mutateAsync: mutateAsyncAddFoodThumbnail,
  } = useAddFoodThumbnail();

  const {
    isLoading: isLoadingDeleteFoodThumbnail,
    isError: isErrorDeleteFoodThumbnail,
    isSuccess: isSuccessDeleteFoodThumbnail,
    mutateAsync: mutateAsyncDeleteFoodThumbnail,
  } = useDeleteFoodThumbnail();

  const {
    isLoading: isLoadingDeleteFoodUrl,
    isError: isErrorDeleteFoodUrl,
    isSuccess: isSuccessDeleteFoodUrl,
    mutateAsync: mutateAsyncDeleteFoodUrl,
  } = useDeleteFoodUrl();

  const onSearch = (value: string) => {
    console.log('onsearch', value);

    // 1페이지로 이동
    router.push(
      {
        query: {
          ...router.query,
          query: value,
          category,
          page: 1,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const onChangeType = (e: RadioChangeEvent) => {
    // 1페이지로 이동
    router.push(
      {
        query: {
          ...router.query,
          type: e.target.value,
          page: 1,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const onChangeThumb = (e: RadioChangeEvent) => {
    // 1페이지로 이동
    router.push(
      {
        query: {
          ...router.query,
          thumb: e.target.value,
          page: 1,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const onChangeUrl = (e: RadioChangeEvent) => {
    // 1페이지로 이동
    router.push(
      {
        query: {
          ...router.query,
          url: e.target.value,
          page: 1,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleSelectFood = (food: Food) => {
    setSelectedFoodReportNo(food.report_no);
  };

  const handleDeleteFoodThumbnail = async (
    report_no: string,
    thumbnail: string
  ) => {
    confirm({
      title: '삭제하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      onOk: async () => {
        try {
          await mutateAsyncDeleteFoodThumbnail({ report_no, nid: thumbnail });
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

  const handleDeleteFoodUrl = (report_no: string) => {
    confirm({
      title: '삭제하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      onOk: async () => {
        try {
          await mutateAsyncDeleteFoodUrl(report_no);
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

  const uploadProps: UploadProps = {
    name: 'file',
    accept: 'image/*',
    showUploadList: false,
    beforeUpload: async (file) => {
      const isImage = file.type.startsWith('image');
      if (!isImage) {
        message.error(
          '이미지 파일만 업로드할 수 있습니다 (JPEG, GIF, PNG, SVG 가능)'
        );
        return;
      }

      try {
        await mutateAsyncAddFoodThumbnail({
          report_no: selectedFoodReportNo,
          file: file,
        });
        refetch();
      } catch (e) {
        errorHandler(e);
      }

      return false;
    },
  };

  const handleTableChange: TableProps<Food>['onChange'] = (
    pagination,
    filters,
    sorter: SorterResult<Food> | SorterResult<Food>[],
    extra
  ) => {
    console.log({ pagination, filters, sorter, extra });
    let newSort = initSort;
    let newOrder = initOrder;
    if ((sorter as SorterResult<Food>).order) {
      newSort = (sorter as SorterResult<Food>).field as string;
      newOrder =
        ((sorter as SorterResult<Food>).order as string) === 'ascend'
          ? 'asc'
          : 'desc';
    }

    router.push(
      {
        query: {
          ...router.query,
          sort: newSort,
          order: newOrder,
          page: pagination.current,
          limit: pagination.pageSize,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (isIdle) {
      return;
    }

    setFoods(data?.data.data || []);
  }, [data, isIdle]);

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
  }, [
    refetch,
    isInitRouter,
    category,
    query,
    type,
    thumb,
    url,
    page,
    limit,
    sort,
    order,
  ]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (router.query?.category) {
      setCategory((router.query?.category as string) || initCategory);
    } else {
      setCategory(initCategory);
    }
    if (router.query?.query) {
      setQuerying((router.query?.query as string) || initQuery);
      setQuery((router.query?.query as string) || initQuery);
    } else {
      setQuerying(initQuery);
      setQuery(initQuery);
    }
    if (router.query?.type) {
      setType((router.query?.type as string) || initType);
    } else {
      setType(initType);
    }
    if (router.query?.thumb) {
      setThumb((router.query?.thumb as string) || initThumb);
    } else {
      setThumb(initThumb);
    }
    if (router.query?.url) {
      setUrl((router.query?.url as string) || initUrl);
    } else {
      setUrl(initUrl);
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
    if (router.query?.limit) {
      if (router.query?.limit as string) {
        setLimit(parseInt(router.query?.limit as string, 10) || initLimit);
      } else {
        setLimit(initLimit);
      }
    } else {
      setLimit(initLimit);
    }
    if (router.query?.sort) {
      setSort((router.query?.sort as string) || initSort);
    } else {
      setSort(initSort);
    }
    if (router.query?.order) {
      setOrder((router.query?.order as string) || initOrder);
    } else {
      setOrder(initOrder);
    }

    setIsInitRouter(true);

    console.log('라우터 변경됨', router.query);
  }, [router]);

  return (
    <Auth>
      <DefaultLayout key="foods">
        <Head>
          <title>HSIN - 제품 리스트</title>
        </Head>

        <DefaultHeader title="제품 리스트" />

        <Content className="site-page-content">
          <Card style={{ marginBottom: '30px' }}>
            <Row align="middle" style={{ marginBottom: '30px' }}>
              <Col flex="150px">제품 검색</Col>
              <Col flex="auto">
                <Input.Group compact>
                  <Select
                    value={category}
                    style={{ width: '100px' }}
                    onChange={(value) => setCategory(value)}
                  >
                    <Option value="all">통합</Option>
                    <Option value="report_no">신고번호</Option>
                    <Option value="name">제품명</Option>
                    <Option value="company">제조사명</Option>
                  </Select>
                  <Search
                    placeholder="검색어를 입력하세요."
                    enterButton
                    value={querying}
                    onChange={(e) => setQuerying(e.target.value)}
                    onSearch={onSearch}
                    style={{ width: '50%' }}
                  />
                </Input.Group>
              </Col>
            </Row>
            <Row>
              <Col flex="150px">옵션 검색</Col>
              <Col flex="auto">
                <Row style={{ marginBottom: '20px' }}>
                  <Col flex="150px">제품 구분</Col>
                  <Col flex="auto">
                    <Radio.Group onChange={onChangeType} value={type}>
                      <Radio value="integration">통합</Radio>
                      <Radio value="domestic">국내</Radio>
                      <Radio value="foreign">수입</Radio>
                    </Radio.Group>
                  </Col>
                </Row>
                <Row style={{ marginBottom: '20px' }}>
                  <Col flex="150px">사진 업로드 확인</Col>
                  <Col flex="auto">
                    <Radio.Group onChange={onChangeThumb} value={thumb}>
                      <Radio value="all">전체</Radio>
                      <Radio value="exist">있음</Radio>
                      <Radio value="nothing">없음</Radio>
                    </Radio.Group>
                  </Col>
                </Row>
                <Row>
                  <Col flex="150px">URL 업로드 확인</Col>
                  <Col flex="auto">
                    <Radio.Group onChange={onChangeUrl} value={url}>
                      <Radio value="all">전체</Radio>
                      <Radio value="exist">있음</Radio>
                      <Radio value="nothing">없음</Radio>
                    </Radio.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>

          <Table<Food>
            dataSource={foods}
            pagination={{
              position: ['bottomCenter'],
              total: data?.data.total || 0,
              current: page || initPage,
              pageSize: limit || initLimit,
              showTotal: (total: number) => `Total ${total} items`,
              showSizeChanger: true,
            }}
            onChange={handleTableChange}
            loading={isLoadingFetch}
            rowKey="report_no"
            showSorterTooltip={{
              title: (
                <>
                  {sort === '_id' ? (
                    <>기본순서로 정렬되었습니다</>
                  ) : order === 'asc' ? (
                    <>업데이트가 오래된순으로 정렬되었습니다</>
                  ) : (
                    <>업데이트가 최신순으로 정렬되었습니다</>
                  )}
                </>
              ),
            }}
          >
            <Column
              title="신고번호"
              dataIndex="report_no"
              key="report_no"
              align="center"
            />
            <Column<Food>
              title="국내/수입"
              dataIndex="type"
              key="type"
              align="center"
              render={(text, food) => <>{FOOD_TYPES[food.type]}</>}
            />
            <Column title="제품명" dataIndex="name" key="name" align="center" />
            <Column
              title="제조사명"
              dataIndex="company"
              key="company"
              align="center"
            />
            <Column<Food>
              title="썸네일 추가"
              dataIndex="thumbnails"
              key="thumbnails"
              align="center"
              width={'200px'}
              render={(thumbnails: any, food) => (
                <>
                  {food.thumbnails.map((thumbnail) => {
                    return (
                      <Space key={thumbnail}>
                        <Image
                          width={130}
                          height={100}
                          src={`https://health-functional-food.s3.ap-northeast-2.amazonaws.com/saved/${food.report_no}/${thumbnail}`}
                          alt="사진"
                          style={{ objectFit: 'cover' }}
                        />
                        {userData?.data.deletable && (
                          <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() =>
                              handleDeleteFoodThumbnail(
                                food.report_no,
                                thumbnail
                              )
                            }
                          />
                        )}
                      </Space>
                    );
                  })}
                  {food.thumbnails.length === 0 && (
                    <Upload {...uploadProps}>
                      <Button
                        onClick={() => handleSelectFood(food)}
                        icon={<PlusOutlined />}
                      ></Button>
                    </Upload>
                  )}
                </>
              )}
            />
            <Column<Food>
              title="url 추가"
              dataIndex="url"
              key="url"
              align="center"
              width={'300px'}
              render={(text: any, food) => (
                <>
                  {food.url ? (
                    <Space>
                      <Link href={food.url}>
                        <a target="_blank">
                          <Button style={{ marginRight: '10px' }}>
                            링크 확인
                          </Button>
                        </a>
                      </Link>
                      {userData?.data.deletable && (
                        <Button
                          danger
                          onClick={() => handleDeleteFoodUrl(food.report_no)}
                        >
                          링크 삭제
                        </Button>
                      )}
                    </Space>
                  ) : (
                    <AddFoodUrl
                      reportNo={food.report_no}
                      onAddComplete={() => refetch()}
                    />
                  )}
                </>
              )}
            />
            <Column<Food>
              title="업데이트시각"
              dataIndex="updated_at"
              key="updated_at"
              align="center"
              sorter={true}
              render={(text: any, food) => (
                <DateTime dateString={food.updated_at} />
              )}
            />
          </Table>
        </Content>
      </DefaultLayout>
    </Auth>
  );
};

export default Users;
