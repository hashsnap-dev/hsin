import { flexCenter } from '@/styles/utils';
import { AquaBlue } from '@/styles/variables';
import { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 16px;
  width: 100%;
  height: 336px;
  ${flexCenter()}

  span {
    color: ${AquaBlue};
  }
`;

const EmptyResult: FC<{ search: string }> = ({ search }) => {
  return (
    <Container>
      {search ? (
        <>
          <span>{search}</span>에 대한 검색결과가 없습니다.
        </>
      ) : (
        '검색결과가 없습니다.'
      )}
    </Container>
  );
};

export default EmptyResult;
