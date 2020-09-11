import React from 'react';
import { SimpleGradientProps } from './SimpleGradient';

export type AnimatedGradientProps = {
  // the amount of gradients to show at once. Under the hood, controls the zoom level of the underlying css background
  gradientResolution?: number;
  // how long before the effect loops itself.
  gradientDuration?: number;
} & SimpleGradientProps;

/**
 * Component which animates transitions between gradient props when they are changed.
 */
export const AnimatedGradientAddon = <T extends SimpleGradientProps = SimpleGradientProps>(Base: React.FC<T>) => ({
  // default is instantaneous. 0 would be dividing by 0, so 1 is better.
  gradientResolution = 4,
  gradientDuration = 1,
  ...props
}: AnimatedGradientProps & T) => {




// @ts-ignore I have no idea how to do this correctly. Everything outside works tho.
  return <Base {...props}/>
};

