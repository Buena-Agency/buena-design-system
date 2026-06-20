import { Children } from 'react';
import type { HTMLAttributes } from 'react';
import { cx } from '../cx';

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  index?: number;
  onIndexChange?: (index: number) => void;
}

/** Carousel = a track of slides + dot controls. */
export function Carousel({ index = 0, onIndexChange, children, className, ...rest }: CarouselProps) {
  const slides = Children.toArray(children);
  return (
    <div className={cx('bds-carousel', className)} {...rest}>
      <div className="bds-carousel__viewport">
        <div className="bds-carousel__track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((c, i) => (
            <div key={i} className="bds-carousel__slide">
              {c}
            </div>
          ))}
        </div>
      </div>
      <div className="bds-carousel__dots">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index || undefined}
            className={cx('bds-carousel__dot', i === index && 'bds-carousel__dot--active')}
            onClick={() => onIndexChange?.(i)}
          />
        ))}
      </div>
    </div>
  );
}
