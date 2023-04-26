import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Form,
  Input,
  Button,
  Radio,
  Card,
  Descriptions,
  Space,
  Row,
  Modal,
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import DefaultLayout from '../../../components/DefaultLayout';
import Auth from '../../../components/Auth';
import DefaultHeader from '../../../components/DefaultHeader';
import errorHandler from '../../../network/errorHandler';
import useUpdateUser from '../../../hooks/useUpdateUser';
import useFetchUserDetail from '../../../hooks/useFetchUserDetail';
import NumberInput from '../../../components/NumberInput';

const NewUser: NextPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { id } = router.query;

  const [editPassword, setEditPassword] = useState(false);

  const { isLoading, isError, data, error } = useFetchUserDetail(id as string);
  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    isSuccess,
    mutateAsync,
  } = useUpdateUser();

  const handleClick = () => {
    setEditPassword(!editPassword);
  };

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    try {
      const response = await mutateAsync({
        id: data?.data._id || '',
        password: values.password,
        email: values.email,
        role: values.role,
        phone: values.phone,
        name: values.name,
        deletable: values.deletable,
      });

      router.push('/users');
    } catch (e) {
      errorHandler(e);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onValueChanged = (values: any) => {
    console.log(values);
  };

  useEffect(() => {
    form.setFieldsValue(data?.data || {});
  }, [form, data]);

  return (
    <Auth>
      <DefaultLayout selectedKey="users">
        <Head>
          <title>HSIN - 회원 계정 수정</title>
        </Head>

        <DefaultHeader title="회원 계정 수정" />

        <Content className="site-page-content">
          <Card>
            <Form
              form={form}
              initialValues={{}}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              onValuesChange={onValueChanged}
              colon={false}
            >
              <Descriptions
                column={1}
                bordered
                labelStyle={{ width: '280px' }}
                style={{ marginBottom: '30px' }}
              >
                <Descriptions.Item label="아이디">
                  {data?.data.username}
                </Descriptions.Item>
                <Descriptions.Item label="비밀번호">
                  <Button onClick={handleClick}>수정</Button>
                </Descriptions.Item>
                {editPassword && (
                  <>
                    <Descriptions.Item label="새 비밀번호">
                      <Form.Item
                        name="password"
                        label=""
                        rules={[
                          { required: true, message: '필수 정보입니다.' },
                          {
                            pattern: /^((?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{6,})$/,
                            message: '영문+숫자+특수 문자 조합하여 최소 6자리 ',
                          },
                        ]}
                      >
                        <Input.Password visibilityToggle={false} />
                      </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label="새 비밀번호 확인">
                      <Form.Item
                        name="password_confirm"
                        label=""
                        rules={[
                          { required: true, message: '필수 정보입니다.' },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue('password') === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error('비밀번호가 일치하지 않습니다')
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password visibilityToggle={false} />
                      </Form.Item>
                    </Descriptions.Item>
                  </>
                )}
                <Descriptions.Item label="성명">
                  <Form.Item
                    label=""
                    name="name"
                    rules={[{ required: true, message: '필수 정보입니다.' }]}
                  >
                    <Input maxLength={10} />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="이메일주소">
                  <Form.Item
                    label=""
                    name="email"
                    rules={[
                      { required: true, message: '필수 정보입니다.' },
                      {
                        type: 'email',
                        message: '유효하지 않는 이메일주소입니다.',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="연락처">
                  <Form.Item
                    label=""
                    name="phone"
                    rules={[{ required: true, message: '필수 정보입니다.' }]}
                  >
                    <NumberInput maxLength={11} />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="사진/URL 삭제 권한" contentStyle={{}}>
                  <Form.Item name="deletable" label="">
                    <Radio.Group>
                      <Radio value={false}>삭제 불가</Radio>
                      <Radio value={true}>삭제 가능</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Descriptions.Item>
              </Descriptions>

              <Row justify="center">
                <Space>
                  <Button type="primary" htmlType="submit" size="large">
                    변경
                  </Button>
                  <Link href="/users">
                    <Button type="default" htmlType="button" size="large">
                      취소
                    </Button>
                  </Link>
                </Space>
              </Row>
            </Form>
          </Card>
        </Content>
      </DefaultLayout>
    </Auth>
  );
};

export default NewUser;
