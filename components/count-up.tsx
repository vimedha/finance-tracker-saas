"use client";
import { useEffect, useState } from "react";
import CountUpLib from "react-countup";

// Define specific types for props (replaces 'any')
interface CountUpProps {
  end: number; // Made required to match library expectations
  formattingFn?: (value: number) => string;
  // Add other react-countup props if used (e.g., duration?: number; start?: number;)
}

const CountUp = (props: CountUpProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <span>{props.formattingFn ? props.formattingFn(props.end || 0) : String(props.end || 0)}</span>;
  }

  return <CountUpLib {...props} />;
};

export { CountUp };
