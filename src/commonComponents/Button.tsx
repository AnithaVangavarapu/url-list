import clsx from "clsx";
import { twMerge } from "tw-merge";

interface ButtonProps {
  label: string;
  type: "submit" | "button";
  onClick?: () => void;
  className?: string;
}

const Button = ({ label, type, onClick, className }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(
        clsx(
          `border text-white font-medium px-2 rounded-[2px] cursor-pointer`,
          className
        )
      )}
    >
      {label}
    </button>
  );
};

export default Button;
