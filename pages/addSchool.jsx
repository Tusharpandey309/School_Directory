"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DarkLayout from "@/app/DarkLayout";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "image") formData.append(key, value);
    });
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    const res = await fetch("/api/addSchool", { method: "POST", body: formData });
    if (res.ok) {
      setMessage("School added successfully!");
      setTimeout(() => {
        router.push("/showSchools");
      }, 1500);
    } else {
      const { error } = await res.json().catch(() => ({}));
      setMessage(error || "An error occurred.");
    }
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        background: `
          radial-gradient(2px 2px at 20px 30px, #eee, transparent),
          radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
          radial-gradient(1px 1px at 90px 40px, #fff, transparent),
          radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
          radial-gradient(2px 2px at 160px 30px, #ddd, transparent),
          linear-gradient(135deg, #0f0f23 0%, #1a1a3e 25%, #2d1b69 50%, #1a1a3e 75%, #0f0f23 100%)
        `,
        padding: '2rem 1rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(255, 119, 198, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 75% 25%, rgba(119, 198, 255, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 25% 75%, rgba(198, 255, 119, 0.2) 0%, transparent 50%)
        `,
        animation: 'pulse 4s ease-in-out infinite alternate',
        pointerEvents: 'none'
      }} />

      {/* Floating Stars */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '4px',
        height: '4px',
        background: 'white',
        borderRadius: '50%',
        boxShadow: '0 0 10px rgba(255,255,255,0.8)',
        animation: 'twinkle 2s ease-in-out infinite alternate'
      }} />
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '15%',
        width: '2px',
        height: '2px',
        background: 'rgba(255,255,255,0.8)',
        borderRadius: '50%',
        animation: 'twinkle 3s ease-in-out infinite alternate-reverse'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '30%',
        left: '20%',
        width: '3px',
        height: '3px',
        background: 'rgba(255,255,255,0.6)',
        borderRadius: '50%',
        animation: 'twinkle 2.5s ease-in-out infinite alternate'
      }} />

      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        position: 'relative', 
        zIndex: 10 
      }}>
        {/* Glass Form Container */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          padding: '3rem',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Inner glow effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
          }} />

          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: 'white', 
            marginBottom: '2rem', 
            textAlign: 'center',
            textShadow: '0 0 20px rgba(255,255,255,0.5)'
          }}>
            ✨ Add New School
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* School Name */}
            <div>
              <label htmlFor="name" style={{ 
                display: 'block', 
                color: '#e2e8f0', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                fontSize: '1rem'
              }}>
                🏫 School Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                id="name"
                {...register("name", { required: true })}
                placeholder="Enter school name..."
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  border: errors.name ? '2px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  '::placeholder': { color: 'rgba(255, 255, 255, 0.6)' }
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(59, 130, 246, 0.6)';
                  e.target.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {errors.name && <p style={{ marginTop: '0.5rem', color: '#ef4444', fontSize: '0.875rem' }}>School name is required.</p>}
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" style={{ 
                display: 'block', 
                color: '#e2e8f0', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                fontSize: '1rem'
              }}>
                📍 Address <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                id="address"
                {...register("address", { required: true })}
                placeholder="Enter full address..."
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  border: errors.address ? '2px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(59, 130, 246, 0.6)';
                  e.target.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {errors.address && <p style={{ marginTop: '0.5rem', color: '#ef4444', fontSize: '0.875rem' }}>Address is required.</p>}
            </div>

            {/* City and State */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label htmlFor="city" style={{ 
                  display: 'block', 
                  color: '#e2e8f0', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem',
                  fontSize: '1rem'
                }}>
                  🏙️ City <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  id="city"
                  {...register("city", { required: true })}
                  placeholder="City name..."
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    borderRadius: '12px',
                    border: errors.city ? '2px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.6)';
                    e.target.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.city && <p style={{ marginTop: '0.5rem', color: '#ef4444', fontSize: '0.875rem' }}>City is required.</p>}
              </div>

              <div>
                <label htmlFor="state" style={{ 
                  display: 'block', 
                  color: '#e2e8f0', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem',
                  fontSize: '1rem'
                }}>
                  🗺️ State <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  id="state"
                  {...register("state", { required: true })}
                  placeholder="State name..."
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    borderRadius: '12px',
                    border: errors.state ? '2px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.6)';
                    e.target.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.state && <p style={{ marginTop: '0.5rem', color: '#ef4444', fontSize: '0.875rem' }}>State is required.</p>}
              </div>
            </div>

            {/* Contact and Email */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label htmlFor="contact" style={{ 
                  display: 'block', 
                  color: '#e2e8f0', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem',
                  fontSize: '1rem'
                }}>
                  📞 Contact <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  id="contact"
                  {...register("contact", { required: true, pattern: /^[0-9]+$/ })}
                  placeholder="Phone number..."
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    borderRadius: '12px',
                    border: errors.contact ? '2px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.6)';
                    e.target.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.contact && <p style={{ marginTop: '0.5rem', color: '#ef4444', fontSize: '0.875rem' }}>Contact must be numeric.</p>}
              </div>

              <div>
                <label htmlFor="email_id" style={{ 
                  display: 'block', 
                  color: '#e2e8f0', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem',
                  fontSize: '1rem'
                }}>
                  ✉️ Email <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  id="email_id"
                  {...register("email_id", { required: true, pattern: /^\S+@\S+$/i })}
                  placeholder="Email address..."
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    borderRadius: '12px',
                    border: errors.email_id ? '2px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.6)';
                    e.target.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.email_id && <p style={{ marginTop: '0.5rem', color: '#ef4444', fontSize: '0.875rem' }}>Invalid email address.</p>}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" style={{ 
                display: 'block', 
                color: '#e2e8f0', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                fontSize: '1rem'
              }}>
                📸 Upload Image <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                id="image"
                {...register("image", { required: true })}
                type="file"
                accept="image/*"
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: errors.image ? '2px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(59, 130, 246, 0.6)';
                  e.target.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {errors.image && <p style={{ marginTop: '0.5rem', color: '#ef4444', fontSize: '0.875rem' }}>Image is required.</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: '600',
                padding: '1rem 2rem',
                borderRadius: '12px',
                border: 'none',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
              }}
            >
              <span>🚀 Add School</span>
            </button>

            {/* Form message */}
            {message && (
              <div style={{
                textAlign: 'center',
                marginTop: '1rem',
                padding: '1rem',
                borderRadius: '12px',
                background: message.includes("successfully") 
                  ? 'rgba(16, 185, 129, 0.2)' 
                  : 'rgba(239, 68, 68, 0.2)',
                border: message.includes("successfully")
                  ? '1px solid rgba(16, 185, 129, 0.3)'
                  : '1px solid rgba(239, 68, 68, 0.3)',
                color: message.includes("successfully") ? '#10b981' : '#ef4444',
                fontWeight: '600'
              }}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.3; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes pulse {
          0% { opacity: 0.6; }
          100% { opacity: 0.8; }
        }
        
        input::placeholder {
          color: rgba(255, 255, 255, 0.6) !important;
        }
      `}</style>
    </div>
  );
}
