import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Descriptions,
  Button,
  Card,
  Row,
  Form,
  Input,
  Modal,
  Space,
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Auth from '../components/Auth';
import DefaultLayout from '../components/DefaultLayout';
import DefaultHeader from '../components/DefaultHeader';
import useSelf from '../hooks/useSelf';
import useUpdateProfile from '../hooks/useUpdateProfile';
import { UpdateMyProfileRequest } from '../types';
import errorHandler from '../network/errorHandler';
import NumberInput from '../components/NumberInput';

const UserDetail: NextPage = () => {
  const [editPassword, setEditPassword] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();

  const { isLoading, isError, data, error } = useSelf();
  const {
    isLoading: isUpdateLoading,
    isError: isUpdateError,
    isSuccess,
    mutateAsync,
  } = useUpdateProfile();

  const handleClick = () => {
    setEditPassword(!editPassword);
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    try {
      const updateParams: UpdateMyProfileRequest = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      if (editPassword) {
        updateParams.password = values.password;
      }

      const response = await mutateAsync(updateParams);

      router.push('/profile');
    } catch (e) {
      errorHandler(e);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    form.setFieldsValue(data?.data || {});
  }, [form, data]);

  return (
    <Auth>
      <DefaultLayout>
        <Head>
          <title>HSIN - 내 정보</title>
        </Head>

        <DefaultHeader title="내 정보" />

        <Content className="site-page-content">
          <Card>
            <Form
              form={form}
              initialValues={{}}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
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
                          { required: true, message: '비밀번호를 입력하세요' },
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
                          { required: true, message: '비밀번호를 입력하세요' },
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
                    <Input />
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
              </Descriptions>

              <Row justify="center">
                <Space>
                  <Button type="primary" size="large" htmlType="submit">
                    변경
                  </Button>
                  <Button size="large" htmlType="button" onClick={handleCancel}>
                    취소
                  </Button>
                </Space>
              </Row>
            </Form>
          </Card>
        </Content>
      </DefaultLayout>
    </Auth>
  );
};

export default UserDetail;
