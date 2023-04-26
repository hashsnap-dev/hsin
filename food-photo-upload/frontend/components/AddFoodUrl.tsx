import { Button, Form, Input } from 'antd';
import useAddFoodUrl from '../hooks/useAddFoodUrl';
import errorHandler from '../network/errorHandler';
import { Modal } from 'antd';

type AddFoodUrlProps = {
  reportNo: string;
  url?: string;
  onAddComplete?: () => void;
};

export default function AddFoodUrl({
  reportNo,
  url,
  onAddComplete,
}: AddFoodUrlProps) {
  const {
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    mutateAsync: mutateAsync,
  } = useAddFoodUrl();

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    try {
      const response = await mutateAsync({
        report_no: reportNo,
        url: values.url,
      });
      if (onAddComplete) onAddComplete();
    } catch (e) {
      errorHandler(e);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    if (
      errorInfo.errorFields.length > 0 &&
      errorInfo.errorFields[0].errors.length > 0
    ) {
      Modal.error({
        title: errorInfo.errorFields[0].errors[0],
      });
    }
  };

  return (
    <Form
      initialValues={{ url }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Input.Group compact>
        <Form.Item
          label=""
          name="url"
          noStyle
          rules={[
            { required: true, message: 'URL을 입력하세요' },
            { type: 'url', message: '올바른 URL을 입력하세요' },
          ]}
        >
          <Input
            style={{ width: '150px', textAlign: 'left' }}
            placeholder="URL"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          등록
        </Button>
      </Input.Group>
    </Form>
  );
}
