import React, { CSSProperties } from 'react';
import gradients from '../gradients.json';
import { ArgsType } from '../types';
import { GradientKeys } from '../gradient-types';
/**
 * Most bare bones gradient component
 * @param gradient value that gradient should be for this component
 */

// TODO type the props of 'element' into this typing using generics.
type SimpleGradientProps = {
  gradient: string[] | GradientKeys;
  type?: 'linear' | 'radial';
  apply?: 'text' | 'border' | 'background';
  angle?: string; // angle unit
  element?: ArgsType<typeof React.createElement>[0];
  className?: string;
  style?: CSSProperties;
  property?: keyof CSSProperties;
  [key: string]: any;
};

// TODO use property keyword to apply to border/background/text
const SimpleGradient: React.FC<SimpleGradientProps> = ({
  gradient,
  type = 'linear',
  angle = '0deg',
  element = 'div',
  className,
  style,
  property = 'background',
  apply = 'background',
  children,

  ...rest
}) => {
  const finalGradient =
    typeof gradient === 'string' ? gradients[gradient] : gradient;
  if (!finalGradient) {
    throw new Error('Invalid gradient given: ' + gradient);
  }

  return React.createElement<any>(
    element,
    {
      ...rest,
      className: `react-ui-gradient ${className}`,
      style: {
        ...style,
        [property]: `${type}-gradient(${angle},${finalGradient.join(',')}`
      }
    },
    children
  );
};

export default SimpleGradient;
