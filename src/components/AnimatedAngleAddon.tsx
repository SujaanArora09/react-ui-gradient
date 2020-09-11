import { SimpleGradientProps } from './SimpleGradient';
import React, { useEffect, useRef, useState } from 'react';

export type AnimatedAngleProps = {
  // I really cbs typing this to be never if type is radial. I don't see it as being too important, maybe in the future?
  angleDuration?: number;
} & SimpleGradientProps;

/**
 * Component which animates transitions between angle props when they are changed
 */
const AnimatedAngleAddon = <T extends SimpleGradientProps = SimpleGradientProps>(Base: React.FC<T>) => ({
  // default is instantaneous. 0 would be dividing by 0, so 1 is better.
  angleDuration = 1,
  gradientDuration = 1,
  ...props
}: AnimatedAngleProps & T) => {
  const [angle, setAngle] = useState<AnimatedAngleProps['angle']>(
    props.angle
  );

  const angleAnimationId = useRef<number | undefined>();

  // angle animation
  useEffect(() => {
    const duration = angleDuration;
    const startTime = Date.now();
    const startAngle = angle || 0;
    const endAngle = props.angle;
    const animate = () => {
      if (endAngle === undefined) return;
      const timestamp = Date.now();

      let t = (timestamp - startTime) / duration;
      if (t > 1) t = 1;
      const newAngle = lerp(startAngle, endAngle, t);
      setAngle(newAngle);
      if (newAngle === endAngle) return;
      angleAnimationId.current = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (angleAnimationId.current !== undefined)
        window.cancelAnimationFrame(angleAnimationId.current);
    };
  }, [props.angle]);

  //gradient animation
  useEffect(() => {}, [props.gradient]);

  // TS doesn't know whether the type is linear or radial, so we work it out and cast as any to avoid TS complaining
  // extra || because default type linear, so checking for that.


  return (
    // @ts-ignore I have no idea how to do this correctly. Everything outside works tho.
    <Base
      {...props}
      angle={
        props.type === 'linear' || !props.type ? (angle as any) : undefined
      }
    />
  );
};

// https://en.wikipedia.org/wiki/Linear_interpolation
function lerp(v0: number, v1: number, t: number) {
  return (1 - t) * v0 + t * v1;
}

export default AnimatedAngleAddon;
