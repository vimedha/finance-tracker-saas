"use client";
import { useEffect, useState } from "react";
import CountUpLib from "react-countup";

const CountUp = (props: any) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <span>{props.formattingFn ? props.formattingFn(props.end || 0) : (props.end || 0)}</span>;
  }

  return <CountUpLib {...props} />;
};

export { CountUp };