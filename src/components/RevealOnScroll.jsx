import React from 'react';
import { useScrollReveal } from '../utils/useScrollReveal';

/**
 * Reusable RevealOnScroll component.
 * Animates children into view when scrolled into the viewport.
 */
export const RevealOnScroll = ({
  children,
  animation = 'fade-up', // 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'fade'
  delay = 0,             // in milliseconds (e.g. 100, 200)
  duration = 700,        // in milliseconds
  threshold = 0.1,
  className = '',
  triggerOnce = true,
  style = {},
  ...props
}) => {
  const [ref, isVisible] = useScrollReveal({ threshold, triggerOnce });

  const getAnimationStyles = () => {
    const baseTransition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return {
            opacity: 0,
            transform: 'translate3d(0, 36px, 0)',
            transition: baseTransition,
            willChange: 'opacity, transform'
          };
        case 'fade-down':
          return {
            opacity: 0,
            transform: 'translate3d(0, -36px, 0)',
            transition: baseTransition,
            willChange: 'opacity, transform'
          };
        case 'fade-left':
          return {
            opacity: 0,
            transform: 'translate3d(-36px, 0, 0)',
            transition: baseTransition,
            willChange: 'opacity, transform'
          };
        case 'fade-right':
          return {
            opacity: 0,
            transform: 'translate3d(36px, 0, 0)',
            transition: baseTransition,
            willChange: 'opacity, transform'
          };
        case 'zoom-in':
          return {
            opacity: 0,
            transform: 'scale3d(0.92, 0.92, 1)',
            transition: baseTransition,
            willChange: 'opacity, transform'
          };
        case 'fade':
        default:
          return {
            opacity: 0,
            transform: 'none',
            transition: baseTransition,
            willChange: 'opacity'
          };
      }
    }

    return {
      opacity: 1,
      transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)',
      transition: baseTransition,
      willChange: 'opacity, transform'
    };
  };

  return (
    <div
      ref={ref}
      className={`reveal-wrapper ${className}`}
      style={{
        ...style,
        ...getAnimationStyles()
      }}
      {...props}
    >
      {children}
    </div>
  );
};
