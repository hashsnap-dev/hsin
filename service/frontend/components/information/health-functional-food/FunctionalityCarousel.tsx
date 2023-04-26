import {
  FC,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import Slider from 'react-slick';
import styled, { css } from 'styled-components';
import useEmblaCarousel from 'embla-carousel-react';
import {
  ContentWidth,
  CyanBlue,
  CyanBlue200,
  CyanBlue300,
  CyanBlue500,
  Gray300,
  Gray500,
  Gray600,
} from '@/styles/variables';
import {
  alignItems,
  desktop,
  flex,
  flexCenter,
  justifyContent,
  mobile,
} from '@/styles/utils';
import { Row } from '@/layouts/flex-utils';
import ShortcutButton from './ShortcutButton';

const Container = styled.div`
  width: 100%;
  margin-top: 56px;
  .c1 {
    text-align: center;
  }
  .c2 {
    margin-top: 16px;
    position: relative;
  }

  .embla {
    overflow: hidden;
  }
  .embla__container {
    display: flex;
  }
  .embla__slide {
    position: relative;
    flex: 0 0 100%;
  }
  ${desktop(css`
    .c2 {
      width: ${ContentWidth};
      margin: 0 auto;
    }
  `)}
  ${mobile(css`
    .c2 {
      width: 100%;
    }
    .embla__slide {
      padding: 0 16px;
    }
  `)}
`;

const CarouselButton = styled.div<{ src: string; right?: boolean }>`
  position: absolute;
  cursor: pointer;
  width: 64px;
  height: 64px;
  border-radius: 100px;
  background: url(${({ src }) => src}) white no-repeat;
  top: 50%;
  right: ${({ right }) => (right ? '0' : 'auto')};
  transform: translateY(-50%);
  z-index: 1;

  ${mobile(css`
    /* transform: translateY(0); */
    display: none;
  `)}
`;

const PageButton = styled.span`
  cursor: pointer;
  font-size: 24px;
  font-weight: 800;
  color: ${Gray300};
  transition: color 0.3s;
  margin: 0 10px;
  &.current {
    color: ${CyanBlue};
  }
`;

const slickSettings = {
  dots: false,
  arrows: false,
};

export const FunctionalityCarouselCard = styled.div`
  margin: 0 auto;

  .header {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 100%;
    height: 88px;
    min-height: 88px;
    color: white;
    background: ${CyanBlue500};
    ${flexCenter({ direction: 'column' })}

    h4 {
      font-size: 20px;
      font-weight: 700;
    }
    p {
      color: white;
      margin-top: 10px;
      font-size: 14px;
    }
    .comment {
      margin-top: 0;
      font-size: 10px;
      color: ${CyanBlue200};
    }
    ${Row} {
      p {
        margin-top: 0;
      }
    }
  }
  .content {
    border: 1px solid ${CyanBlue300};
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    display: flex;
    background-color: white;

    h5 {
      font-size: 16px;
      font-weight: 700;
      color: ${Gray600};
    }
    .c1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: ${Gray600};
    }
    .t1 {
      font-size: 13px;
    }
  }
  .image_info_5 {
    background: url(/assets/HSIN_IMG_info02_914x350-06.svg) white no-repeat
      center 70px / 606px 232px;
  }

  ${ShortcutButton} {
    position: absolute;
    bottom: 36px;
    height: 48px;
    left: 50%;
    transform: translateX(-50%);
  }

  ${desktop(css`
    width: 900px;

    .content {
      height: 412px;
      padding: 36px 0;
      justify-content: start;
    }
    .c1 {
      width: 440px;
    }
    .i1 {
      height: 190px;
    }
    .i2 {
      height: 190px;
    }
    .i4 {
      height: 190px;
    }
    .VHr {
      display: inline-block;
      height: 388px;
      border-left: 1px solid ${Gray300};
      margin: 0 43px;
    }
  `)}

  ${mobile(css`
    width: 100%;
    height: 100%;
    .header {
      text-align: center;
      height: 116px;
      padding: 0 8px;
      p {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 2;
        max-height: 2.8em;
      }
    }
    .content {
      padding: 23px 0;
      height: 617px;
      text-align: center;
      hr {
        width: 100%;
        border: 0;
        border-top: 1px solid ${Gray300};
        margin-top: 26px;
        margin-bottom: 30px;
      }
      img {
        height: 164px;
      }
      &.image_info_5 {
        ${alignItems('center')}
        position: relative;
        /* width: 260px;
      height: 378px; */
        background: url(/assets/image_mobile_info_5.svg) white no-repeat center;
      }
    }
    ${Row} {
      flex-direction: column;
      align-items: center;
    }
    ${ShortcutButton} {
      width: 240px;
      bottom: 16px;
    }
  `)}
`;

export const FunctionalityCarouselComment = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: ${Gray500};
  text-align: center;

  b {
    font-weight: 700;
  }
`;

const FunctionalityCarousel: FC<{ ref: any; className?: string }> = forwardRef(
  ({ children, ...prop }, ref) => {
    const [slider, setSlider] = useState<Slider>(null as any);
    const [emblaRef, embla] = useEmblaCarousel({
      loop: true,
    });
    const [carouselIndex, setCarouselIndex] = useState(0);

    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
    const scrollTo = useCallback(
      (index) => embla && embla.scrollTo(index),
      [embla]
    );

    useEffect(() => {
      if (!embla) return;
      embla.on('select', () => {
        setCarouselIndex(embla.selectedScrollSnap());
      });
    }, [embla]);

    useImperativeHandle(ref, () => ({
      redraw() {
        embla?.reInit({});
      },
    }));

    return (
      <Container {...prop}>
        <div className="c1 font-nanumsquare">
          {Array.from({ length: 3 }, (_, i) => (
            <PageButton
              className={i === carouselIndex ? 'current' : ''}
              onClick={() => scrollTo(i)}
              key={`pagenation-${i}`}
            >
              0{i + 1}
            </PageButton>
          ))}
        </div>
        <div className="c2">
          <CarouselButton
            src="/assets/button_carousel_left.png"
            onClick={() => scrollPrev()}
          />
          <CarouselButton
            src="/assets/button_carousel_right.png"
            onClick={() => scrollNext()}
            right
          />
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {(Array.isArray(children) ? children : [children]).map(
                (node, i) => (
                  <div className="embla__slide" key={`info-embla__slide-${i}`}>
                    {node}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </Container>
    );
  }
);

export default FunctionalityCarousel;
