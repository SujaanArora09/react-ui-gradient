import React, { CSSProperties } from 'react';
import gradients from '../gradients.json';
import { GradientKeys } from '../gradient-types';

type CreateElementType = React.FC<any> | string;

type BaseProps = React.PropsWithChildren<{
  gradient: string[] | GradientKeys;
  target?: 'text' | 'border' | 'background';
  element?: CreateElementType;
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
  // TODO commented out cause I can't work out how to infer the element props correctly ... this type used to have an 'E' generic
} /*& (E extends React.FunctionComponent<infer U> ? U : {})*/>;

export type SimpleGradientProps =
  | (BaseProps & { type?: 'linear'; angle?: number })
  // radial has no angle, lets ban it using TS
  | (BaseProps & { type?: 'radial'; angle?: never });

/**
 * Most bare bones gradient component
 *
 * @param gradient value of gradient for this component
 * @param type gradient type (linear or radial)
 * @param target where to apply to (background, border or text)
 * @param angle in degrees
 * @param element Type of element to base off (DOM element or React Component)
 * Supports classname and style.
 */
function SimpleGradient({
  gradient,
  type = 'linear',
  target = 'background',
  angle = 0,
  element = 'div',
  className = '',
  style,

  children,

  ...rest
}: SimpleGradientProps) {
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
    type === 'linear' ? angle + 'deg,' : ''
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
}

export default SimpleGradient;
