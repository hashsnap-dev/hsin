import { desktop, mobile } from '@/styles/utils';
import {FC, useEffect, useState} from 'react';
import styled, { css } from 'styled-components';

const PopupStyle = styled.div`
  position: fixed;
  z-index: 50;
  line-height: 0;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  img {
    max-width: 100%;
    width: auto;
    vertical-align: top;
  }
  ${desktop(css`
    left: 25px;
    top: 40px;
    width: 400px;
  `)}

  ${mobile(css`
    width: 85%;
    left: 50%;
    top: 80px;
    transform: translateX(-50%);
  `)}
`
const HomePopup: FC<{}> = ({...props}) => {
  const [todayShow, setTodayShow] = useState(true);
  
  useEffect(() => {
    const POPUP_TODAY_SHOW = localStorage.getItem('popupTodayShow');
    if (POPUP_TODAY_SHOW && Number(POPUP_TODAY_SHOW) >= new Date().getTime()) {
      setTodayShow(false);
    } else {
      setTodayShow(true);
      localStorage.removeItem('popupTodayShow');
    }
  }, []);

  const handlerClick = () => {
    const now = new Date();
    const expires = now.setHours(now.getHours() + 24);
    localStorage.setItem('popupTodayShow', `${expires}`);
    setTodayShow(false)
  }

  return <>
    {todayShow && <PopupStyle>
      <a href='https://www.youtube.com/channel/UC2TpWu4QvRwU3y8jU4jKwQA' target="_blank" style={{display: 'block'}}>
        <img src='/assets/popup-youtube.jpg' alt='' />
      </a>
      <button onClick={handlerClick} style={{
        width: '100%',
        textAlign: 'right',
        color: '#f8f8f8',
        fontSize: 13,
        padding: '12px 20px',
        background: '#363636',
        cursor: 'pointer',
      }}>
        오늘 하루 이 창 열지 않기
      </button>
    </PopupStyle>}
  </>
}
export default HomePopup;