import SimpleGradient, { SimpleGradientProps } from './SimpleGradient';
import React from 'react';

export type AnimatedGradientProps = {
  angleDuration?: number;
  gradientDuration?: number;
} & SimpleGradientProps;

const AnimatedGradient: React.FC<AnimatedGradientProps> = (Base => ({
  angleDuration,
  gradientDuration,
  ...rest
}: AnimatedGradientProps) => {
  return <Base {...rest} />;
})(SimpleGradient);

export default AnimatedGradient;
