type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
  size?: "default" | "small" | "large";
};

const Button = ({
  variant = "primary",
  size = "default",
  className,
  children,
  ...restProps
}: ButtonProps) => {
  const variantClass =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-500"
      : variant === "secondary"
      ? "bg-white text-black hover:bg-gray-200 hover:text-gray-800"
      : "bg-red-600 hover:bg-red-500 text-white";

  const sizeClass =
    size === "small"
      ? "px-3 py-2 text-sm"
      : size === "large"
      ? "px-6 py-3 text-lg"
      : "px-4 py-2 text-base"; // default

  return (
    <button
      className={`cursor-pointer rounded transition-colors duration-200 ${sizeClass} ${variantClass} ${
        className ?? ""
      }`}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
