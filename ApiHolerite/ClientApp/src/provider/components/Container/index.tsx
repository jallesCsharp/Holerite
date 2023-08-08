import React, { ReactNode } from 'react';

interface Props {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  className?: string;
  offset?: number;
  col: number;
  children: ReactNode;
}

const Container: React.FC<Props> = (props) => {
  const sm = props.sm ? props.sm : '12';
  const md = props.md ? props.md : '6';
  const lg = props.lg ? props.lg : props.col;
  const xl = props.xl ? props.xl : props.col;
  const offset = props.offset ? `lg:col-offset-${props.offset} xl:col-offset-${props.offset}` : '';
  const className = `form-layout col-12 sm:col-${sm} md:col-${md} lg:col-${lg} xl:col-${xl} ${
    props.className ? props.className : ''
  } ${offset}`;
  return <div className={className}>{props.children}</div>;
};
export default Container;
