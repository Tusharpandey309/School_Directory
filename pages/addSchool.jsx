"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size
      if (file.size > 10 * 1024 * 1024) {
        setMessage("File size must be less than 10MB");
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setMessage("Only JPEG, PNG, GIF, and WebP files are allowed");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setMessage(""); // Clear any previous error messages
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setMessage("");
    
    try {
      const formData = new FormData();
      
      // Add all form fields except image
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "image") {
          formData.append(key, value);
        }
      });

      // Add image file
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      const res = await fetch("/api/addSchool", { 
        method: "POST", 
        body: formData 
      });

      const responseData = await res.json();

      if (res.ok) {
        setMessage("School added successfully!");
        reset(); // Clear the form
        setImagePreview(null); // Clear image preview
        
        setTimeout(() => {
          router.push("/showSchools");
        }, 1500);
      } else {
        setMessage(responseData.error || "An error occurred.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
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
    }}>
      {/* Background animations */}
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

      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        position: 'relative', 
        zIndex: 10 
      }}>
        {/* Glass form container */}
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

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* School Name */}
            <div>
              <label style={{ 
                display: 'block', 
                color: '#e2e8f0', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                fontSize: '1rem'
              }}>
                🏫 School Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                {...register("name", { 
                  required: "School name is required",
                  minLength: { value: 2, message: "School name must be at least 2 characters" }
                })}
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
                  transition: 'all 0.3s ease'
                }}
                disabled={isLoading}
              />
              {errors.name && <p style={{ marginTop: '0.5rem', color: '#ef4444', fontSize: '0.875rem' }}>{errors.name.message}</p>}
            </div>

            {/* Address */}
            <div>
              <label style={{ 
                display: 'block', 
                color: '#e2e8f0', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                fontSize: '1rem'
              }}>
                📍 Address <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <textarea
                {...register("address", { 
                  required: "Address is required",
                  minLength: { value: 10, message: "Address must be at least 10 characters" }
                })}
                placeholder="Enter full address..."
                rows={3}
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
                  transition: 'all 0.3s ease',
                  resize: 'vertical'
                }}
                disabled={isLoading}
              />
              {errors.address && <p style={{ marginTop: '0.5rem', color: '#ef4444', fontSize: '0.875rem' }}>{errors.address.message}</p>}
            </div>

            {/* City and State */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  color: '#e2e8f0', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem',
                  fontSize: '1rem'
                }}>
                  🏙️ City <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  {...register("city", { required: "City is required" })}
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
                  disabled={isLoading}
                />
                {errors.city && <p style={{ marginTop: '0.5rem', color: '#ef4444', fontSize: '0.875rem' }}>{errors.city.message}</p>}
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  color: '#e2e8f0', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem',
                  fontSize: '1rem'
                }}>
                  🗺️ State <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  {...register("state", { required: "State is required" })}
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
                  disabled={isLoading}
                />
                {errors.state && <p style={{ marginTop: '0.5rem', color: '#ef4444', fontSize: '0.875rem' }}>{errors.state.message}</p>}
              </div>
            </div>

            {/* Contact and Email */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  color: '#e2e8f0', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem',
                  fontSize: '1rem'
                }}>
                  📞 Contact <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  {...register("contact", { 
                    required: "Contact is required", 
                    pattern: { 
                      value: /^[0-9+\-\s()]{10,}$/, 
                      message: "Invalid contact number" 
                    }
                  })}
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
                  disabled={isLoading}
                />
                {errors.contact && <p style={{ marginTop: '0.5rem', color: '#ef4444', fontSize: '0.875rem' }}>{errors.contact.message}</p>}
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  color: '#e2e8f0', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem',
                  fontSize: '1rem'
                }}>
                  ✉️ Email <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="email"
                  {...register("email_id", { 
                    required: "Email is required", 
                    pattern: { 
                      value: /^\S+@\S+$/i, 
                      message: "Invalid email address" 
                    }
                  })}
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
                  disabled={isLoading}
                />
                {errors.email_id && <p style={{ marginTop: '0.5rem', color: '#ef4444', fontSize: '0.875rem' }}>{errors.email_id.message}</p>}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label style={{ 
                display: 'block', 
                color: '#e2e8f0', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                fontSize: '1rem'
              }}>
                📸 Upload Image <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                {...register("image", { 
                  required: "Image is required",
                  validate: {
                    fileSize: (files) => {
                      if (files && files.length > 0) {
                        return files[0].size <= 10 * 1024 * 1024 || "File size must be less than 10MB";
                      }
                      return true;
                    },
                    fileType: (files) => {
                      if (files && files.length > 0) {
                        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
                        return allowedTypes.includes(files[0].type) || "Only JPEG, PNG, GIF, and WebP files are allowed";
                      }
                      return true;
                    }
                  }
                })}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
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
                disabled={isLoading}
              />
              {errors.image && <p style={{ marginTop: '0.5rem', color: '#ef4444', fontSize: '0.875rem' }}>{errors.image.message}</p>}
              
              {/* Image Preview */}
              {imagePreview && (
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    style={{ 
                      maxWidth: '200px', 
                      maxHeight: '200px', 
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      objectFit: 'cover'
                    }} 
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                background: isLoading 
                  ? 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: '600',
                padding: '1rem 2rem',
                borderRadius: '12px',
                border: 'none',
                fontSize: '1.1rem',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              <span>{isLoading ? '⏳ Adding School...' : '🚀 Add School'}</span>
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
        @keyframes pulse {
          0% { opacity: 0.6; }
          100% { opacity: 0.8; }
        }
        
        input::placeholder, textarea::placeholder {
          color: rgba(255, 255, 255, 0.6) !important;
        }
        
        input:focus, textarea:focus {
          border-color: rgba(59, 130, 246, 0.6) !important;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3) !important;
        }
      `}</style>
    </div>
  );
}
