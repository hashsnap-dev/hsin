import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
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
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import DefaultLayout from '../../components/DefaultLayout';
import Auth from '../../components/Auth';
import DefaultHeader from '../../components/DefaultHeader';
import useCreateUser from '../../hooks/useCreateUser';
import errorHandler from '../../network/errorHandler';
import useCheckUsername from '../../hooks/useCheckUsername';
import NumberInput from '../../components/NumberInput';

const NewUser: NextPage = () => {
  const { isLoading, isError, isSuccess, mutateAsync } = useCreateUser();
  const {
    isLoading: isLoadingCheckUsername,
    isError: isErrorCheckUsername,
    isSuccess: isSuccessCheckUsername,
    mutateAsync: mutateAsyncCheckUsername,
  } = useCheckUsername();

  const router = useRouter();

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    try {
      const response = await mutateAsync({
        username: values.username,
        password: values.password,
        name: values.name,
        email: values.email,
        phone: values.phone,
        role: 'user',
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

  const handleCancel = () => {
    router.push('/users');
  };

  return (
    <Auth>
      <DefaultLayout selectedKey="users">
        <Head>
          <title>HSIN - 회원 계정 등록</title>
        </Head>

        <DefaultHeader title="회원 계정 등록" />

        <Content className="site-page-content">
          <Card>
            <Form
              initialValues={{ deletable: false }}
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
                  <Form.Item
                    label=""
                    name="username"
                    rules={[
                      { required: true, message: '필수 정보입니다.' },
                      {
                        pattern: /^[a-zA-Z0-9_]{6,}$/,
                        message: '최소 6글자 이상의 영숫자 및 _만 허용',
                      },
                      ({ getFieldValue }) => ({
                        async validator(_, value) {
                          if (!value) {
                            return Promise.resolve();
                          }

                          const response = await mutateAsyncCheckUsername(
                            value
                          );
                          if (response.data.total > 0) {
                            return Promise.reject(
                              new Error('이미 사용중인 아이디입니다.')
                            );
                          }

                          return Promise.resolve();
                        },
                      }),
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="비밀번호">
                  <Form.Item
                    label=""
                    name="password"
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
                <Descriptions.Item label="비밀번호 확인">
                  <Form.Item
                    label=""
                    name="password_confirm"
                    rules={[
                      { required: true, message: '필수 정보입니다.' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
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
                    등록
                  </Button>
                  <Button
                    type="default"
                    htmlType="button"
                    size="large"
                    onClick={handleCancel}
                  >
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

export default NewUser;
