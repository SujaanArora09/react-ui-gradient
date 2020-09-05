import SimpleGradient, { SimpleGradientProps } from './SimpleGradient';
import React, { useEffect, useRef, useState } from 'react';

export type AnimatedGradientProps = {
  // I really cbs typing this to be never if type is radial.
  angleDuration?: number;
  gradientDuration?: number;
} & SimpleGradientProps;

/**
 * Component which animates transitions between gradient and angle props when they are changed.
 */
const AnimatedGradient: React.FC<AnimatedGradientProps> = (Base => ({
  angleDuration,
  gradientDuration,
  ...props
}: AnimatedGradientProps) => {
  const [angle, setAngle] = useState<AnimatedGradientProps['angle']>(
    props.angle
  );
  const [gradient, setGradient] = useState<AnimatedGradientProps['gradient']>(
    props.gradient
  );

  const angleAnimationId = useRef<number | undefined>();

  // angle animation
  useEffect(() => {
    // default is instantaneous. 0 would be dividing by 0, so 1 is better.
    const duration = angleDuration || 1;
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
      console.log('clean');
      if (angleAnimationId.current !== undefined)
        window.cancelAnimationFrame(angleAnimationId.current);
    };
  }, [props.angle]);
  // TS doesn't know whether the type is linear or radial, so we work it out and cast as any to avoid TS complaining
  // extra || because default type linear, so checking for that.
  return (
    <Base
      {...props}
      angle={
        props.type === 'linear' || !props.type ? (angle as any) : undefined
      }
    />
  );
})(SimpleGradient);

// https://en.wikipedia.org/wiki/Linear_interpolation
function lerp(v0: number, v1: number, t: number) {
  return (1 - t) * v0 + t * v1;
}

export default AnimatedGradient;
