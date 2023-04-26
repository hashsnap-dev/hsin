import { Modal } from 'antd';
import axios, { AxiosError } from 'axios';

type ServerError = { statusCode: number; message: string | string[] };

export default function errorHandler(e: any) {
  let message = e.message;

  if (axios.isAxiosError(e)) {
    if (
      (e as AxiosError<ServerError>).response?.status === 401 &&
      (e as AxiosError<ServerError>).response?.data.message === 'Unauthorized'
    ) {
      message =
        '아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.';
    } else {
      if (
        Array.isArray((e as AxiosError<ServerError>).response?.data.message)
      ) {
        message = (e as AxiosError<ServerError>).response?.data.message[0];
      } else {
        message = (e as AxiosError<ServerError>).response?.data.message;
      }
    }
  }

  Modal.error({
    title: message,
  });
}
