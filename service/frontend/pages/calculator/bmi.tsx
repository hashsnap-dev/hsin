import ContentSection from '@/components/ContentSection';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import Radio from '@/components/Radio';
import SectionTitle from '@/components/SectionTitle';
import { Column, Row } from '@/layouts/flex-utils';
import type { NextPage } from 'next';
import Image from 'next/image';
import Content from '@/components/calculator/bmi/Content';
import { useRef, useState } from 'react';
import { computeBMI } from '@/helper/bmi-list';
import classNames from 'classnames';

const BMI: NextPage = () => {
  const [options, setOptions] = useState({
    gender: '' as '' | 'M' | 'F',
    invalidGender: false,
    height: 0,
    invalidHeight: false,
    weight: 0,
    invalidWeight: false,
    age: 0,
    invalidAge: false,
    bmi: 0,
    complete: false,
  });

  const i1 = useRef<HTMLInputElement>(null);
  const i2 = useRef<HTMLInputElement>(null);
  const i3 = useRef<HTMLInputElement>(null);

  const heightChangeHandler = (ev: any) => {
    const n = Number(ev.target.value);
    if (!Number.isNaN(n)) {
      setOptions((data) => ({ ...data, height: n }));
      // if (n) ev.target.value = n;
    } else {
      if (ev.target.value)
        ev.target.value = ev.target.value
          .split('.')
          .splice(0, 2)
          .join('.')
          .replace(/[^0-9.]/g, '');
    }
  };
  const weightChangeHandler = (ev: any) => {
    const n = Number(ev.target.value);
    if (!Number.isNaN(n)) {
      setOptions((data) => ({ ...data, weight: n }));
      // if (n) ev.target.value = n;
    } else {
      if (ev.target.value)
        ev.target.value = ev.target.value
          .split('.')
          .splice(0, 2)
          .join('.')
          .replace(/[^0-9.]/g, '');
    }
  };
  const ageChangeHandler = (ev: any) => {
    const n = Number(ev.target.value);
    if (!Number.isNaN(n)) {
      setOptions((data) => ({ ...data, age: n }));
      // if (n) ev.target.value = n;
    } else {
      if (ev.target.value)
        ev.target.value = ev.target.value
          .split('.')
          .splice(0, 2)
          .join('.')
          .replace(/[^0-9.]/g, '');
    }
  };

  const computeHandler = () => {
    if (!(options.height && options.weight && options.age && options.gender)) {
      setOptions((data) => ({
        ...data,
        invalidHeight: !options.height,
        invalidWeight: !options.weight,
        invalidAge: !options.age,
        invalidGender: !options.gender,
      }));
      return;
    }

    const bmi = options.weight / (options.height * options.height * 0.0001);
    setOptions((data) => ({ ...data, bmi, complete: true }));
  };
  const resetHandler = () => {
    (i1 as any).current.value = '';
    (i2 as any).current.value = '';
    (i3 as any).current.value = '';

    setOptions({
      gender: '' as '' | 'M' | 'F',
      invalidGender: false,
      height: 0,
      invalidHeight: false,
      weight: 0,
      invalidWeight: false,
      age: 0,
      invalidAge: false,
      bmi: 0,
      complete: false,
    });
  };

  const result = computeBMI(options.bmi);

  return (
    <>
      <Nav breadcrumb />
      <ContentSection className={`font-notosans`}>
        <Spacer size={64} mobileSize={0} />
        <SectionTitle className="desktop" label="BMI 계산기" emphasis />
      </ContentSection>
      <ContentSection className={`font-notosans`}>
        <Content>
          <Row className="control" justifyContent="center" marginTop="45px">
            <div className="form">
              <h4>성별정보</h4>
              <Row
                className={classNames('radios', {
                  invalid: options.invalidGender,
                })}
              >
                <Radio
                  name="gender"
                  label="남성"
                  onClick={() =>
                    setOptions((data) => ({ ...data, gender: 'M' }))
                  }
                  defaultChecked={options.gender === 'M'}
                />
                <Radio
                  name="gender"
                  label="여성"
                  onClick={() =>
                    setOptions((data) => ({ ...data, gender: 'F' }))
                  }
                  defaultChecked={options.gender === 'F'}
                />
              </Row>
              <h4>신체정보</h4>
              <Column>
                <label>
                  <input
                    ref={i1}
                    className={classNames({ invalid: options.invalidHeight })}
                    onInput={heightChangeHandler}
                    placeholder="키를 입력하세요."
                  />
                  <span>cm</span>
                </label>
                <label>
                  <input
                    ref={i2}
                    className={classNames({ invalid: options.invalidWeight })}
                    onInput={weightChangeHandler}
                    placeholder="몸무게를 입력하세요."
                  />
                  <span>kg</span>
                </label>
                <label>
                  <input
                    ref={i3}
                    className={classNames({ invalid: options.invalidAge })}
                    onInput={ageChangeHandler}
                    placeholder="나이를 입력하세요."
                  />
                  <span>세</span>
                </label>
              </Column>
              <button onClick={computeHandler}>계산하기</button>
            </div>
            <div className="result">
              <h4>비만도결과</h4>
              <Column
                className={
                  'content ' +
                  (options.bmi ? computeBMI(options.bmi).className : '')
                }
                alignItems="center"
              >
                <p className="p1">
                  나의 체질량지수는 <span>{options.bmi.toFixed(2)}</span>
                </p>
                <p
                  className="p2"
                  style={{
                    backgroundImage: !options.complete
                      ? `url(/assets/HSIN_Icon_bmi_40x40-04.svg)`
                      : result.className === 'bmi-1'
                      ? `url(/assets/HSIN_Icon_bmi_40x40-01.svg)`
                      : result.className === 'bmi-2'
                      ? `url(/assets/HSIN_Icon_bmi_40x40-02.svg)`
                      : result.className === 'bmi-3'
                      ? `url(/assets/HSIN_Icon_bmi_40x40-03.svg)`
                      : result.className === 'bmi-4'
                      ? `url(/assets/HSIN_Icon_bmi_40x40-03.svg)`
                      : result.className === 'bmi-5'
                      ? `url(/assets/HSIN_Icon_bmi_40x40-03.svg)`
                      : '',
                  }}
                >
                  <span>
                    {options.bmi && options.complete
                      ? result?.label
                      : '정상체중'}
                  </span>
                  입니다.
                </p>
                <button onClick={resetHandler}>초기화</button>
              </Column>
            </div>
          </Row>
          <div className="info">
            <p className="p1">
              ※ 19세 미만은 계산된 체질량지수에 대한 비만도를 아래 표준
              성장도표에서 확인해 주세요.
            </p>
            <p className="p2">성별·나이에 따라 BMI를 확인하세요.</p>
          </div>
          <div className="info-table">
            <h1>
              표준성장도표: 체질량지수(남아:2~18세) (kg/m<sup>2</sup>)
            </h1>
            <div className="desktop">
              <Image
                alt="표준성장도표: 체질량지수(남아:2~18세) (kg/m2)"
                src="/assets/image_calculator_bmi1.svg"
                width="1200"
                height="787"
              />
            </div>
            <img
              className="mobile"
              alt="표준성장도표: 체질량지수(남아:2~18세) (kg/m2)"
              src="/assets/image_mobile_calculator_bmi1.svg"
            />
            <p>
              주 1): 2~2.5는 2세부터 2.5세미만에 해당하며 다른 연령에도 동일하게
              적용됨
            </p>
            <p>
              주 2): 5th 미만 : 저체중, 85th ≤ 위험체중(과체중) {'<'} 95th, 95th
              이상 혹은 BMI 25 kg/m2이상 : 비만
            </p>

            <h1>
              표준성장도표: 체질량지수(여아:2~18세) (kg/m<sup>2</sup>)
            </h1>
            <div className="desktop">
              <Image
                alt="표준성장도표: 체질량지수(여아:2~18세) (kg/m2)"
                src="/assets/image_calculator_bmi2.svg"
                width="1200"
                height="787"
              />
            </div>
            <img
              className="mobile"
              alt="표준성장도표: 체질량지수(여아:2~18세) (kg/m2)"
              src="/assets/image_mobile_calculator_bmi2.svg"
            />
            <p>출처: 질병관리본부, 2007년 소아청소년 표준성장도표</p>
          </div>
        </Content>
      </ContentSection>
      <Spacer size={180} mobileSize={100} />
      <Footer />
    </>
  );
};

export default BMI;
