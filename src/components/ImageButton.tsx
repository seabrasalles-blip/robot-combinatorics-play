import React from "react";

interface ImageButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

// Botão totalmente transparente, sem fundo padrão de navegador.
export default function ImageButton({
  src, alt, width, height, style, ...rest
}: ImageButtonProps) {
  return (
    <button
      {...rest}
      style={{
        background: "transparent",
        border: "none",
        padding: 0,
        margin: 0,
        appearance: "none",
        boxShadow: "none",
        cursor: rest.disabled ? "not-allowed" : "pointer",
        opacity: rest.disabled ? 0.45 : 1,
        outline: "none",
        ...style,
      }}
      onFocus={(e) => (e.currentTarget.style.outline = "3px solid #fde047")}
      onBlur={(e) => (e.currentTarget.style.outline = "none")}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{ display: "block", width, height, userSelect: "none" }}
      />
    </button>
  );
}
