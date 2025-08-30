// components/DarkLayout.jsx
"use client";

export default function DarkLayout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0b0c16 0%,#0e1130 50%,#0b0c16 100%)",
        padding: "2rem 1rem",
      }}
    >
      {children}
    </div>
  );
}
