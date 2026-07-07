import "../styles/FloatingInput.css";

export default function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  className = "",
  children,
}) {
  return (
    <div className={`floating-input ${className}`}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="auth-inputs"
      />

      <label htmlFor={id}>{label}</label>

      {children}
    </div>
  );
}