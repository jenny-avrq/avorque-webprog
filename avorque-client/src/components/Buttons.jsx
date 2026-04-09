import { Link } from 'react-router-dom';

const Button = ({
  children,
  to,
  onClick,
  variant = 'primary',
  className = '',
}) => {
  const baseClass =
    'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200';

  const variants = {
    primary:
      'bg-[#d88fa3] text-white shadow-sm hover:bg-[#b96d84]',
    secondary:
      'border border-[#e7b8c5] bg-[#fff6f8] text-[#5c3a44] hover:bg-[#f3c7d3]',
  };

  const combinedClass = `${baseClass} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClass}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClass}>
      {children}
    </button>
  );
};

export default Button;