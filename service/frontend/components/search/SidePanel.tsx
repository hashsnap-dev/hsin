import { UserData, useUserData } from "@/store/user-data";
import { flexCenter } from "@/styles/utils";
import { Gray100, Gray200, Gray300 } from "@/styles/variables";
import localforage from "localforage";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Link from "../Link";

export const SidePanelContainer = styled.div`
  position: fixed;
  z-index: 2;
  transform: translate(1302px, 80px);
  width: 260px;

  p {
    cursor: pointer;
    user-select: none;
    position: relative;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 2px 0;
    font-size: 14px;

    button {
      position: absolute;
      top: 5px;
      right: 0;
      display: none;
      width: 12px;
      height: 12px;
      background: url(/assets/icon_side-panel_remove.svg) no-repeat center;
    }
    &:hover {
      padding-right: 20px;

      button {
        display: inline-block
      }
    }
    
    
  }

  .c {
    border: 1px solid ${Gray300};
    height: 320px;
    background: white;
    margin-bottom: 8px;

    h4 {
      font-size: 14px;
      font-weight: 500;
      height: 40px;
      background: ${Gray100};
      ${flexCenter()}
    }
  }
  .l {
    padding: 16px 28px 28px 28px;
  }
  .c.recent h4:before {
    margin-right: 6px;
    content: '';
    display: inline-block;
    background: url(/assets/icon_side-panel-recent.svg) no-repeat;
    width: 24px;
    height: 24px;
  }
  .c.heart h4:before {
    margin-right: 6px;
    content: '';
    display: inline-block;
    background: url(/assets/icon_side-panel-heart.svg) no-repeat;
    width: 24px;
    height: 24px;
  }
  .c.heart {
    
    .l {
      padding: 16px 16px 28px 28px;
      height: 280px;
      overflow-y: auto;
    }
  }
`;

const SidePanel: FC<{}> = () => {
  const [userData, setUserData] = useUserData();
  const router = useRouter();
  
  const deleteRecentHandler = async (ev: any, i: number) => {
    ev.stopPropagation();
    setUserData({
      recent: userData.recent.filter((_, idx) => idx !== i),
    });
  };

  const deleteHeartHandler = async (ev: any, i: number) => {
    ev.stopPropagation();
    setUserData({
      heart: userData.heart.filter((_, idx) => idx !== i),
    });
  };

  return <SidePanelContainer>
    <div className="c recent">
      <h4>최근 본 제품 목록</h4>
      <div className="l">
        {userData.recent.map(({name, report_no, type}, i) => 
          <p key={`recent-${i}`} onClick={() => router.push(`/search/product/${type === 'domestic' ? 'd' : 'o'}${report_no}`)}>
          {type === 'domestic' ? '[국내]' : '[수입]'} {name}
          <button onClick={(ev) => deleteRecentHandler(ev, i)} />
          </p>)}
      </div>
    </div>
    <div className="c heart">
      <h4>찜 제품 목록</h4>
      <div className="l">
        {userData.heart.map(({name, report_no, type}, i) => 
          <p key={`heart-${i}`} onClick={() => router.push(`/search/product/${type === 'domestic' ? 'd' : 'o'}${report_no}`)}>
          {type === 'domestic' ? '[국내]' : '[수입]'} {name}
          <button onClick={(ev) => deleteHeartHandler(ev, i)}  />
          </p>)}
      </div>
    </div>
  </SidePanelContainer>
};

export default SidePanel;