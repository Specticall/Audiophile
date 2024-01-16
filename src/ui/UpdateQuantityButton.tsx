import { useEffect, useState } from "react";

const styles = {
  large: {
    text: "min-w-[3rem]",
    style: "px-4 py-3",
  },
  small: {
    text: "min-w-[2rem]",
    style: "px-3 py-2",
  },
} as const;

type Props = {
  onIncrement?: (count: number) => void;
  onDecrement?: (count: number) => void;
  initialCount: number;
  className?: string;
  type: keyof typeof styles;
  value?: number;
};

export default function UpdateQuantityButton({
  onIncrement = () => {},
  onDecrement = () => {},
  initialCount = 0,
  className = "",
  type = "large",
  value = 0,
}: Props) {
  const [count, setCount] = useState(initialCount);
  const handleIncrement = () => {
    setCount((count) => count + 1);
    onIncrement(count + 1);
  };

  const handleDecrement = () => {
    if (count - 1 < 0) return;
    setCount((count) => count - 1);
    onDecrement(count - 1);
  };

  // Controlling the components from outside variables
  useEffect(() => {
    setCount(value);
  }, [value]);

  return (
    <div
      className={`flex bg-gray items-center justify-center w-fit ${className}`}
    >
      <button
        className={`text-black/25 hover:text-accent-dark ${styles[type].style}`}
        onClick={handleDecrement}
      >
        -
      </button>
      <p className={`font-bold text-center ${styles[type].text}`}>{count}</p>
      <button
        className={`text-black/25 px-4 py-3 hover:text-accent-dark ${styles[type].style}`}
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
}
