import { FC, useState } from 'react';
import Image from 'next/image';
import Link from '@/components/Link';
import styled, { css } from 'styled-components';
import {
  AquaBlue50,
  AquaBlue500,
  AquaBlue550,
  AquaBlue600,
  ContentWidth,
  ContentWidth2,
  Gray200,
  Gray400,
  Gray550,
  Gray600,
} from '@/styles/variables';
import { useRouter } from 'next/router';
import ContentSection, { Content } from '@/components/ContentSection';
import {
  flex,
  alignItems,
  flexCenter,
  fill,
  mobile,
  desktop,
} from '@/styles/utils';
import { Spacer } from './Flex';
import navConfig from '@/nav.config';
// import { useLocalForge } from '@/helper/utils';
import { UserData, useUserData } from '@/store/user-data';
// import localforage from 'localforage';

const Gnb = styled.nav`
  .LogoContainer .desktop,
  .LogoContainer .mobile {
    display: none;
  }
  .main-menu,
  .main-mobile-menu {
    display: none;
  }

  button.top {
    position: fixed;
    ${flexCenter()}
    right: 10px;
    bottom: 10px;
    width: 48px;
    height: 48px;
    background: ${AquaBlue600};
    border-radius: 4px;
    color: white;
    z-index: 1;
  }

  ${desktop(css`
    min-width: ${ContentWidth};
    text-align: center;
    position: relative;
    z-index: 3;

    .LogoContainer {
      position: relative;
      width: ${ContentWidth};
      margin: 0 auto;
      height: 64px;
      ${flexCenter()}

      .desktop {
        display: block;
      }
      .shortcut {
        position: absolute;
        right: 0;
        top: 16px;
        ${alignItems('center')}

        a {
          display: inline-block;
          margin-left: 11px;
          ${alignItems('center')}
        }
      }
    }
    .burger-button {
      display: none;
    }
    .main-menu {
      display: block;
    }
    .main-menu {
      border-top: 1px solid ${Gray200};
      border-bottom: 1px solid ${Gray200};
    }
    .main-menu li {
      width: 240px;
      height: 48px;
      display: inline-block;
    }
    .main-menu li a {
      ${flexCenter()}
      ${fill}
    color: ${Gray600};
      font-size: 16px;
      font-weight: 700;
    }
    .dropdown {
      display: none;
    }
    .main-menu:hover .dropdown {
      position: absolute;
      ${flexCenter()}
      width: 100%;
      min-width: ${ContentWidth};
      height: 206px;
      background: white;
      z-index: 2;
      box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.16);
      border-top: 1px solid ${Gray200};
    }

    .dropdown {
      .VHr {
        border-left: 1px solid ${Gray200};
        height: 174px;
      }
      .c1 {
        color: ${Gray550};
        ${alignItems('start')}
      }
      .w1 {
        width: 240px;
      }
      .c1 a {
        ${flexCenter()}
        height: 40px;
      }
      .c1 a:hover {
        font-weight: 500;
        color: ${AquaBlue550};
        background: ${AquaBlue50};
      }
    }
  `)}

  ${mobile(css`
    text-align: center;

    .LogoContainer {
      width: 100%;
      background: white;
      z-index: 2;
      position: fixed;
      top: 0;
      height: 60px;
      ${flexCenter()}
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.25);

      .mobile {
        display: block;
      }
    }
    .shortcut {
      display: none;
    }
    .main-mobile-menu {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 3;
      display: block;
      width: 100%;
      height: 100%;
      background: white;
      transition: transform 0.125s, box-shadow 0.125s;
      transform: translateX(120%);
      box-shadow: 0px 0px 0px 0 rgba(0, 0, 0, 0);
      ${flex('start', 'start', { direction: 'column' })}

      > a {
        margin-left: 24px;
      }

      .mobile {
        margin-top: 18px;
      }
    }
    .burger-button {
      position: absolute;
      right: 20px;
      width: 32px;
      height: 32px;
      background: url(/assets/icon_mobile_menu.svg) no-repeat center;
    }
    .burger-close-button {
      position: absolute;
      right: 26px;
      top: 14px;
      width: 32px;
      height: 32px;
      background: url(/assets/icon_mobile_menu_close.svg) no-repeat center;
    }
    .main-mobile-menu.is-open {
      transform: translateX(0%);
      box-shadow: -4px 4px 8px 0 rgba(0, 0, 0, 0.25);
    }
    .dropdown {
      display: none !important;
    }
    .mobile-menu-list {
      flex: 1;
      width: 100%;
    }
    .accordian-title {
      cursor: pointer;
      user-select: none;
      font-size: 18px;
      font-weight: 500;
      color: ${Gray600};
      div {
        ${alignItems('center')}
        height: 60px;
        padding: 0 40px;
        background: url(/assets/icon_mobile_arrow_down.svg) no-repeat right 42px
          center;
      }
      div.opened {
        color: ${AquaBlue550};
        background-image: url(/assets/icon_mobile_arrow_up.svg);
      }
    }
    .accordian-item {
      ${flex('center', 'start')}
      padding-left: 40px;
      width: 100%;
      height: 48px;
      background: ${AquaBlue550};
      color: white;
      font-size: 14px;
      font-weight: 500;
      transition: background 0.3s;
    }
    .accordian-item:hover {
      background: ${AquaBlue600};
    }
    .accordian-item.current {
      background: ${AquaBlue600};
    }
    .footer {
      position: relative;
      ${flex()}
      width: 100%;
      height: 56px;
      border-top: 1px solid ${Gray200};

      button:first-child {
        border-right: 1px solid ${Gray200};
      }
      button {
        flex: 1;
        font-weight: 500;
        font-size: 14px;
        ${flexCenter()}
        /* gap: 6px; */

        > *:first-child {
          margin-right: 6px !important;
        }
      }
    }
  `)}
`;

const Breadcrumb = styled.nav`
  position: relative;
  color: white;
  background: ${AquaBlue500};
  font-weight: 500;

  menu {
    display: none;
    position: absolute;
    transform: translateY(48px);
    left: 0;
    top: 0;
    width: 268px;
    z-index: 1;
    background: ${AquaBlue500};
    color: white;
    font-weight: 400;
    padding-top: 10px;
    padding-bottom: 10px;

    li {
      display: block;
      /* margin-top: 10px; */
      height: 50px;

      &:hover {
        background: ${AquaBlue600};
      }

      a {
        /* ${flexCenter()} */
        width: 100%;
        height: 100%;
        text-align: left;
        padding: 0 20px;
        ${alignItems('center')}
      }
    }
  }

  .label-top:hover menu.top {
    display: block;
  }
  .label-sub:hover menu.sub {
    display: block;
  }
  ${desktop(css`
    > div {
      display: flex;
      height: 48px;
    }
    .home {
      display: block;
      width: 48px;
      height: 100%;
      background: url(/assets/icon_breadcrumb_home.png) white no-repeat center;
    }
    .item {
      ${alignItems('center')}
      position: relative;
      cursor: pointer;
      width: 268px;
      height: 100%;
      padding-left: 22px;
      background: url(/assets/icon_breadcrumb_arrow_down.png) no-repeat 230px
        center;
      font-size: 14px;

      &:hover {
        background-color: ${AquaBlue600};
      }
    }
  `)}
  ${mobile(css`
    cursor: pointer;
    height: 48px;
    margin-top: 60px;

    .label-top {
      display: none;
    }
    .label-sub {
      ${fill}
      ${flex('center')}
    padding: 0 4px;
      background: url(/assets/icon_mobile_breadcrumb_arrow_down.svg) no-repeat
        right 5px center;
    }
    .label-sub:hover {
      background-image: url(/assets/icon_mobile_breadcrumb_arrow_up.svg);
    }
    .sub {
      width: 100%;
      background: ${AquaBlue550};
      z-index: 3;
    }
    ${Content} {
      height: 100%;
    }
  `)}
`;

const items = navConfig;

const subItems = items.map(({ href, children }) => {
  return children.map((item) => {
    return {
      ...item,
      href: href + item.href,
    };
  });
});

const MobileNavItem: FC<{
  data: any;
  opened: boolean;
  onToggle: (val: boolean) => void;
}> = ({ data, opened, onToggle }) => {
  // const [opened, setOpened] = useState(false);

  const toggleHandler = () => {
    onToggle(!opened);
  };

  return (
    <li className="accordian-title">
      <div onClick={toggleHandler} className={opened ? 'opened' : ''}>
        {data.label}
      </div>
      {opened && (
        <ul>
          {data.children.map(
            ({ label, href }: { label: string; href: string }, i: number) => {
              return (
                <Link href={data.href + href} key={`menu-nav-item-${i}`}>
                  <li
                    className={
                      'accordian-item ' +
                      (data.href + href === globalThis.location?.pathname
                        ? 'current'
                        : '')
                    }
                    key={`sub-menu-${label}`}
                  >
                    {label}
                  </li>
                </Link>
              );
            }
          )}
        </ul>
      )}
    </li>
  );
};

const MobileMenuList: FC<{ items: any[] }> = ({ items }) => {
  const [opens, setOpens] = useState(Array.from(items, () => false));

  const toggleHandler = (val: boolean, i: number) => {
    if (val) setOpens((data) => data.map((_, j) => (j === i ? true : false)));
    else setOpens((data) => data.map(() => false));
  };

  return (
    <ul className="mobile-menu-list">
      {items.map((parent: any, i: number) => (
        <MobileNavItem
          data={parent}
          opened={opens[i]}
          onToggle={(val) => toggleHandler(val, i)}
          key={`menu-${i}`}
        />
      ))}
    </ul>
  );
};

const MobileSavedContainer = styled.div`
  position: fixed;
  /* z-index: 4; */
  background: white;
  width: 100%;
  height: 100%;
  padding: 0 26px;
  h4 {
    height: 60px;
    ${flexCenter()}

    button {
      position: absolute;
      width: 24px;
      height: 24px;
      background: url(/assets/icon_nav_back.svg) no-repeat center;
      left: 25px;
      top: 20px;
    }
  }
  p {
    height: 55px;
    ${flex('center', 'space-between')}

    button {
      width: 40px;
      height: 40px;
      background: url(/assets/icon_nav_delete.svg) no-repeat center;
    }
  }
`;

const MobileSaved: FC<{
  onClose: Function;
}> = ({ children, onClose, ...props }) => {
  return (
    <MobileSavedContainer className="mobile-saved" {...props}>
      <h4>
        <button onClick={onClose as any} />
        최근 본 제품 목록
      </h4>
      {children}
    </MobileSavedContainer>
  );
};

const Nav: FC<{
  breadcrumb?: boolean;
}> = ({ breadcrumb = false }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [, p1, p2] = router.pathname.split('/');
  const topMenuIndex = items.findIndex(({ href }) => href === '/' + p1);
  const topMenu = items[topMenuIndex];
  const subMenu = topMenu?.children.find(({ href, linked }) => {
    return href === '/' + p2;
  });
  const currentSubItems = subItems[topMenuIndex];

  const [userData, setUserData] = useUserData();
  const deleteRecentHandler = async (ev: any, i: number) => {
    try {
      ev.stopPropagation();
      setUserData({
        recent: userData.recent.filter((_: any, idx: any) => idx !== i),
      });
    } catch (err: any) {}
  };

  const deleteHeartHandler = async (ev: any, i: number) => {
    try {
      ev.stopPropagation();
      userData.heart.splice(i, 1);
      setUserData({ ...userData });
    } catch (err: any) {}
  };

  const [mobileTab, setMobileTab] = useState<'' | 'recent' | 'heart'>('');

  return (
    <Gnb className="font-nanumsquare">
      <div className="LogoContainer">
        <Link href="/" className="desktop" passHref>
          <Image
            src="/assets/HSIN_Logo(KR_horizontal).svg"
            alt="HSIN (Health Supplements Information portal)"
            width="220"
            height="24"
            quality={100}
          />
        </Link>
        <Link href="/" className="mobile" passHref>
          <Image
            src="/assets/HSIN_Logo(EN_Mobile)_82X22.svg"
            alt="HSIN (Health Supplements Information portal)"
            width="82"
            height="22"
            quality={100}
          />
        </Link>
        <div className="shortcut">
          <Link href="https://www.khsa.or.kr/" target="_blank">
            <Image src="/assets/icon_nav_s1.png" width="33" height="20" alt="" />
          </Link>
          <Link href="https://m.post.naver.com/khsa_info" target="_blank">
            <Image
              src="/assets/HSIN_Icon(SNS)_32x32-03.svg"
              width="32"
              height="32"
              quality={100}
              alt=""
            />
          </Link>
        </div>
        <button className="burger-button" onClick={() => setIsMenuOpen(true)} />
      </div>
      <menu className="main-menu">
        <li>
          <Link href={items[0].href}>{items[0].label}</Link>
        </li>
        <li>
          <Link href={items[1].href}>{items[1].label}</Link>
        </li>
        <li>
          <Link href={items[2].href}>{items[2].label}</Link>
        </li>
        <li>
          <Link href={items[3].href}>{items[3].label}</Link>
        </li>
        <li>
          <Link href={items[4].href}>{items[4].label}</Link>
        </li>
        <div className="dropdown font-notosans">
          <div className="c1">
            <div className="w1">
              {subItems[0].map(({ label, href }) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </div>
            <div className="VHr" />
            <div className="w1">
              {subItems[1].map(({ label, href }) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </div>
            <div className="VHr" />
            <div className="w1">
              {subItems[2].map(({ label, href }) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </div>
            <div className="VHr" />
            <div className="w1">
              {subItems[3].map(({ label, href }) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </div>
            <div className="VHr" />
            <div className="w1">
              {subItems[4].map(({ label, href }) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </menu>
      <menu
        className={
          'main-mobile-menu font-notosans ' + (isMenuOpen ? 'is-open' : '')
        }
      >
        <button
          className="burger-close-button"
          onClick={() => setIsMenuOpen(false)}
        />
        <Link href="/" className="mobile" passHref>
          <Image
            src="/assets/logo_mobile_hsin.png"
            alt="HSIN (Health Supplements Information portal)"
            width="81"
            height="23"
            quality={100}
          />
        </Link>
        <Spacer size={42} />
        {mobileTab === 'recent' ? (
          <MobileSaved onClose={() => setMobileTab('')}>
            {userData.recent.map(({ name, report_no, type }, i) => (
              <p
                key={`recent-${i}`}
                onClick={() =>
                  router.push(
                    `/search/product/${
                      type === 'domestic' ? 'd' : 'o'
                    }${report_no}`
                  )
                }
              >
                {type === 'domestic' ? '[국내]' : '[수입]'} {name}
                <button onClick={(ev) => deleteRecentHandler(ev, i)} />
              </p>
            ))}
          </MobileSaved> //userData?.recent(({}))
        ) : mobileTab === 'heart' ? (
          <MobileSaved onClose={() => setMobileTab('')}>
            {userData.heart.map(({ name, report_no, type }, i) => (
              <p
                key={`heart-${i}`}
                onClick={() => {
                  setMobileTab('');
                  setIsMenuOpen(false);
                  router.push(
                    `/search/product/${
                      type === 'domestic' ? 'd' : 'o'
                    }${report_no}`
                  );
                }}
              >
                {type === 'domestic' ? '[국내]' : '[수입]'} {name}
                <button onClick={(ev) => deleteHeartHandler(ev, i)} />
              </p>
            ))}
          </MobileSaved>
        ) : null}
        <MobileMenuList items={items} />
        <div className="mobile footer">
          <button
            className="recent"
            onClick={() => setMobileTab('recent')}
            style={mobileTab === 'recent' ? { color: AquaBlue500 } : {}}
          >
            <Image
              alt="아이콘"
              src={`/assets/${
                mobileTab === 'recent'
                  ? 'icon_mobile_nav_recent_primary.svg'
                  : 'icon_mobile_nav_recent.svg'
              } `}
              width="20"
              height="12"
            />
            최근 본 제품 목록
          </button>
          <button
            className="heart"
            onClick={() => setMobileTab('heart')}
            style={mobileTab === 'heart' ? { color: AquaBlue500 } : {}}
          >
            <Image
              alt="아이콘"
              src={`/assets/${
                mobileTab === 'heart'
                  ? 'icon_mobile_nav_heart_primary.svg'
                  : 'icon_mobile_nav_heart.svg'
              } `}
              width="16"
              height="14"
            />
            찜 제품 목록
          </button>
        </div>
      </menu>
      {breadcrumb && (
        <Breadcrumb className="font-notosans">
          <ContentSection className="flex">
            <Link className="home" href="/" />
            <div className="item label-top">
              {topMenu?.label}
              <menu className="top">
                {items.map(({ label, href }) => {
                  return (
                    <li key={`breadcrumb-top-${label}`}>
                      <Link className="flex-center" href={href}>
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </menu>
            </div>
            <div className="item label-sub">
              {subMenu?.label}
              <menu className="sub">
                {currentSubItems.map(({ label, href }) => {
                  return (
                    <li key={`breadcrumb-sub-${label}`}>
                      <Link className="" href={href}>
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </menu>
            </div>
          </ContentSection>
        </Breadcrumb>
      )}
      <button className="mobile top" onClick={() => window.scrollTo(0, 0)}>
        TOP
      </button>
    </Gnb>
  );
};

export default Nav;
