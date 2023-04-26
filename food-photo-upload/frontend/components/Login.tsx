import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Form, Input, Button, Checkbox, Card, Layout, Row } from 'antd';
import errorHandler from '../network/errorHandler';
import useLogin from '../hooks/useLogin';
import styles from './Login.module.scss';

export default function Login() {
  const { isLoading, isError, isSuccess, mutateAsync } = useLogin();
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    try {
      const response = await mutateAsync({
        username: values.username,
        password: values.password,
      });

      if (values.remember) {
        localStorage.setItem('username', values.username);
        localStorage.setItem('password', values.password);
      } else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      }

      router.push('/foods');
    } catch (e) {
      errorHandler(e);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (localStorage.getItem('username') && localStorage.getItem('password')) {
      form.setFieldsValue({
        username: localStorage.getItem('username') || '',
        password: localStorage.getItem('password') || '',
        remember: true,
      });
    }
  }, [form]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Card className={styles.box}>
          <Form
            form={form}
            initialValues={{
              username: '',
              password: '',
              remember: false,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={styles.form}
          >
            <div className={styles.logo}>
              <Image src="/logo.png" alt="hsin" width={125} height={49} />
            </div>
            <div className={styles.txt1}>Admin</div>

            <Form.Item
              name="username"
              rules={[{ required: true, message: '아이디를 입력해주세요.' }]}
            >
              <Input placeholder="ID" size="large" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '패스워드를 입력해주세요.' }]}
            >
              <Input.Password
                placeholder="PW"
                size="large"
                visibilityToggle={false}
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>계정 저장</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </Layout>
  );
}
