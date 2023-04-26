import {
  FC,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import styled from 'styled-components';
import useEmblaCarousel from 'embla-carousel-react';
import {
  AquaBlue,
  AquaBlue150,
  ContentWidth,
  CyanBlue,
  CyanBlue200,
  CyanBlue300,
  CyanBlue500,
  Gray300,
  Gray500,
  Gray600,
} from '@/styles/variables';

const Container = styled.div`
  margin-top: 16px;
  .c1 {
    margin-top: 32px;
    text-align: center;
  }
  .c2 {
    width: 100%;
    margin-top: 16px;
    position: relative;

    a {
      position: relative;
    }
    p {
      position: relative;
      width: 100%;
      font-size: 18px;
      font-weight: 500;
    }
  }

  .embla {
    overflow: hidden;
  }
  .embla__container {
    display: flex;
  }
  .embla__slide {
    position: relative;
    min-width: 80%;
    padding: 0 8px;
  }
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
`;

const PageButton = styled.div`
  display: inline-block;
  cursor: pointer;
  transition: background 0.25s, border 0.25s, width 0.25s;
  margin: 0 6px;
  width: 11px;
  height: 11px;
  border: 1px solid ${AquaBlue150};
  border-radius: 9999px;
  background: white;

  &.current {
    border: 1px solid ${AquaBlue};
    background: ${AquaBlue};
    width: 32px;
  }
`;

const HealthInfoCarousel: FC<{ className?: string }> = forwardRef(
  ({ children, ...prop }, ref) => {
    const [emblaRef, embla] = useEmblaCarousel({
      align: 'center',
    });
    const [carouselIndex, setCarouselIndex] = useState(0);

    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
    const scrollTo = useCallback(
      (index) => embla && embla.scrollTo(index),
      [embla]
    );

    useImperativeHandle(ref, () => ({
      redraw() {
        embla?.reInit({});
      },
    }));

    useEffect(() => {
      if (!embla) return;
      setTimeout(() => {
        embla.reInit();
      }, 1000);
      embla.on('select', () => {
        setCarouselIndex(embla.selectedScrollSnap());
      });
    }, [embla]);

    return (
      <Container {...prop}>
        <div className="c2">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {(Array.isArray(children) ? children : [children]).map(
                (node, i) => (
                  <div
                    className="embla__slide"
                    key={`health-info-embla__slide-${i}`}
                  >
                    {node}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className="c1 font-nanumsquare">
          {Array.from({ length: (children as any)?.length ?? 0 }, (_, i) => (
            <PageButton
              className={i === carouselIndex ? 'current' : ''}
              onClick={() => scrollTo(i)}
              key={`pagination-${i}`}
            />
          ))}
        </div>
      </Container>
    );
  }
);

export default HealthInfoCarousel;
