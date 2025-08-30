// pages/showSchools.jsx
"use client";
import {useEffect, useState} from "react";
import DarkLayout from "@/app/DarkLayout";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch("/api/getSchools")
      .then((r) => r.json())
      .then(setSchools);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)",
        padding: "2rem 1rem",
      }}
    >
      {/* header ------------------------------------------------------------ */}
      <div style={{textAlign: "center", marginBottom: "3rem"}}>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "700",
            color: "#fff",
            marginBottom: "1rem",
          }}
        >
          🏫 Schools Directory
        </h1>
        <p style={{color: "#cbd5e1", fontSize: "1.1rem"}}>
          Discover educational institutions in your area
        </p>
      </div>

      {/* grid -------------------------------------------------------------- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "1.5rem",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {schools.map((school) => (
          <div
            key={school.id}
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              /* ↓↓↓ THIS LINE CHANGED — old white line gone */
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "1rem",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
              transition: "all .3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            }}
          >
            {/* image ------------------------------------------------------- */}
            <div style={{height: "200px", overflow: "hidden", position: "relative"}}>
              <img
                src={`/schoolImages/${school.image}`}
                alt={school.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform .3s ease",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentNode.style.background =
                    "linear-gradient(45deg,#374151,#4b5563)";
                  e.currentTarget.parentNode.innerHTML =
                    "<div style='display:flex;align-items:center;justify-content:center;height:100%;color:#fff;font-size:2rem'>🏫</div>";
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
              <div
                style={{
                  position: "absolute",
                  inset: "auto 0 0 0",
                  height: "50%",
                  background: "linear-gradient(transparent,rgba(0,0,0,0.6))",
                }}
              />
            </div>

            {/* content ---------------------------------------------------- */}
            <div style={{padding: "1.5rem"}}>
              <h3
                style={{
                  color: "#fff",
                  fontSize: "1.3rem",
                  fontWeight: "700",
                  marginBottom: "1rem",
                  lineHeight: "1.3",
                }}
              >
                {school.name}
              </h3>

              <div style={{display: "flex", flexDirection: "column", gap: ".7rem"}}>
                <div style={{display: "flex", color: "#e2e8f0"}}>
                  <span style={{marginRight: 8, color: "#ef4444"}}>📍</span>
                  <span style={{fontSize: ".9rem"}}>{school.address}</span>
                </div>

                <div style={{display: "flex", color: "#e2e8f0"}}>
                  <span style={{marginRight: 8, color: "#3b82f6"}}>🏙️</span>
                  <span style={{fontSize: ".9rem",padding: "0.25rem 0" }}>
                    {school.city + ", "+school.state} 
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
