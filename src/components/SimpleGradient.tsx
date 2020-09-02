import React, { CSSProperties } from 'react';
import { ArgsType } from '../types';
import gradients from '../gradients.json';
import { GradientKeys } from '../gradient-types';

type BaseProps = {
  gradient: string[] | GradientKeys;
  target?: 'text' | 'border' | 'background';
  element?: ArgsType<typeof React.createElement>[0];
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
};

// TODO type the props of 'element' into this typing using generics.
export type SimpleGradientProps =
  | (BaseProps & { type?: 'linear'; angle?: string })
  // radial has no angle, lets ban it using TS
  | (BaseProps & { type?: 'radial'; angle?: never });

// TODO use property keyword to apply to border/background/text
/**
 * Most bare bones gradient component
 *
 * @param gradient value of gradient for this component
 * @param type gradient type (linear or radial)
 * @param target where to apply to (background, border or text)
 * @param angle CSS angle of gradient (linear only)
 * @param element Type of element to base off (DOM element or React Component)
 * Supports classname and style.
 */
const SimpleGradient: React.FC<SimpleGradientProps> = ({
  gradient,
  type = 'linear',
  target = 'background',
  angle = '0deg',
  element = 'div',
  className = '',
  style,

  children,

  ...rest
}) => {
  // use given gradient or find it in the uigradients json.
  const finalGradient =
    typeof gradient === 'string' ? gradients[gradient] : gradient;
  if (!finalGradient) {
    throw new Error('Invalid gradient given: ' + gradient);
  }
  // work out how to apply styling based off where gradient should be applied
  const property: keyof CSSProperties =
    target === 'border' ? 'borderImage' : 'backgroundImage';
  const finalStyle: CSSProperties = {
    ...style,
  };

  if (target === 'text') {
    finalStyle.WebkitBackgroundClip = 'text';
    finalStyle.WebkitTextFillColor = 'transparent';
  }
  if (target === 'border' && !finalStyle.border)
    finalStyle.border = '10px solid';

  finalStyle[property] = `${type}-gradient(${
    type === 'linear' ? angle + ',' : ''
  }${finalGradient.join(',')}) ${target === 'border' ? '1' : ''}`;

  return React.createElement<any>(
    element,
    {
      ...rest,
      className: `react-ui-gradient ${className}`,
      style: finalStyle,
    },
    children
  );
};

export default SimpleGradient;
