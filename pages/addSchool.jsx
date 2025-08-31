"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [focusedField, setFocusedField] = useState("");
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setMessage("File size must be less than 10MB");
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setMessage("Only JPEG, PNG, GIF, and WebP files are allowed");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setMessage("");
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setMessage("");
    
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "image") {
          formData.append(key, value);
        }
      });

      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      const res = await fetch("/api/addSchool", { 
        method: "POST", 
        body: formData 
      });

      const responseData = await res.json();

      if (res.ok) {
        setMessage("🎉 School added successfully!");
        reset();
        setImagePreview(null);
        
        setTimeout(() => {
          router.push("/showSchools");
        }, 2000);
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
    <div className="form-container">
      {/* Global CSS Reset */}
      <style jsx global>{`
        html, body, #__next {
          margin: 0 !important;
          padding: 0 !important;
          height: 100%;
          overflow-x: hidden;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>

      {/* Animated Background */}
      <div className="background-layer">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        <div className="floating-orb orb-4"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="grid-overlay"></div>

      <div className="form-wrapper">
        <div className="glass-container">
          {/* Header with Animation */}
          <div className="header-section">
            <div className="icon-wrapper">
              <span className="main-icon">🏫</span>
            </div>
            <h1 className="main-title">Add New School</h1>
            <p className="subtitle">Create an educational institution profile</p>
            
            {/* Awesome Navigate Button */}
            <div className="navigation-section">
              <button 
                onClick={() => router.push('/showSchools')}
                className="view-schools-button"
                type="button"
              >
                <span className="button-icon">🎓</span>
                <span className="button-text">View All Schools</span>
                <div className="button-shimmer"></div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="modern-form">
            
            {/* School Name */}
            <div className="input-group">
              <div className="input-wrapper">
                <div className="input-icon">🏫</div>
                <input
                  {...register("name", { 
                    required: "School name is required",
                    minLength: { value: 2, message: "School name must be at least 2 characters" }
                  })}
                  placeholder="Enter school name"
                  className={`modern-input ${errors.name ? 'error' : ''} ${focusedField === 'name' ? 'focused' : ''}`}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  disabled={isLoading}
                />
                <div className="input-glow"></div>
              </div>
              {errors.name && <div className="error-message">{errors.name.message}</div>}
            </div>

            {/* Address */}
            <div className="input-group">
              <div className="input-wrapper">
                <div className="input-icon">📍</div>
                <textarea
                  {...register("address", { 
                    required: "Address is required",
                    minLength: { value: 10, message: "Address must be at least 10 characters" }
                  })}
                  placeholder="Enter complete address"
                  rows={3}
                  className={`modern-input textarea ${errors.address ? 'error' : ''} ${focusedField === 'address' ? 'focused' : ''}`}
                  onFocus={() => setFocusedField('address')}
                  onBlur={() => setFocusedField('')}
                  disabled={isLoading}
                />
                <div className="input-glow"></div>
              </div>
              {errors.address && <div className="error-message">{errors.address.message}</div>}
            </div>

            {/* City and State Row */}
            <div className="input-row">
              <div className="input-group">
                <div className="input-wrapper">
                  <div className="input-icon">🏙️</div>
                  <input
                    {...register("city", { required: "City is required" })}
                    placeholder="City"
                    className={`modern-input ${errors.city ? 'error' : ''} ${focusedField === 'city' ? 'focused' : ''}`}
                    onFocus={() => setFocusedField('city')}
                    onBlur={() => setFocusedField('')}
                    disabled={isLoading}
                  />
                  <div className="input-glow"></div>
                </div>
                {errors.city && <div className="error-message">{errors.city.message}</div>}
              </div>

              <div className="input-group">
                <div className="input-wrapper">
                  <div className="input-icon">🗺️</div>
                  <input
                    {...register("state", { required: "State is required" })}
                    placeholder="State"
                    className={`modern-input ${errors.state ? 'error' : ''} ${focusedField === 'state' ? 'focused' : ''}`}
                    onFocus={() => setFocusedField('state')}
                    onBlur={() => setFocusedField('')}
                    disabled={isLoading}
                  />
                  <div className="input-glow"></div>
                </div>
                {errors.state && <div className="error-message">{errors.state.message}</div>}
              </div>
            </div>

            {/* Contact and Email Row */}
            <div className="input-row">
              <div className="input-group">
                <div className="input-wrapper">
                  <div className="input-icon">📞</div>
                  <input
                    {...register("contact", { 
                      required: "Contact is required", 
                      pattern: { 
                        value: /^[0-9+\-\s()]{10,}$/, 
                        message: "Invalid contact number" 
                      }
                    })}
                    placeholder="Phone number"
                    className={`modern-input ${errors.contact ? 'error' : ''} ${focusedField === 'contact' ? 'focused' : ''}`}
                    onFocus={() => setFocusedField('contact')}
                    onBlur={() => setFocusedField('')}
                    disabled={isLoading}
                  />
                  <div className="input-glow"></div>
                </div>
                {errors.contact && <div className="error-message">{errors.contact.message}</div>}
              </div>

              <div className="input-group">
                <div className="input-wrapper">
                  <div className="input-icon">✉️</div>
                  <input
                    type="email"
                    {...register("email_id", { 
                      required: "Email is required", 
                      pattern: { 
                        value: /^\S+@\S+$/i, 
                        message: "Invalid email address" 
                      }
                    })}
                    placeholder="Email address"
                    className={`modern-input ${errors.email_id ? 'error' : ''} ${focusedField === 'email_id' ? 'focused' : ''}`}
                    onFocus={() => setFocusedField('email_id')}
                    onBlur={() => setFocusedField('')}
                    disabled={isLoading}
                  />
                  <div className="input-glow"></div>
                </div>
                {errors.email_id && <div className="error-message">{errors.email_id.message}</div>}
              </div>
            </div>

            {/* Image Upload */}
            <div className="input-group">
              <div className="file-upload-wrapper">
                <div className="file-upload-container">
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
                    className="file-input"
                    id="image-upload"
                    disabled={isLoading}
                  />
                  <label htmlFor="image-upload" className={`file-upload-label ${errors.image ? 'error' : ''}`}>
                    <div className="upload-icon">📸</div>
                    <div className="upload-text">
                      <span className="primary-text">Choose School Image</span>
                      <span className="secondary-text">JPEG, PNG, GIF or WebP (Max 10MB)</span>
                    </div>
                  </label>
                  <div className="file-upload-glow"></div>
                </div>
                {errors.image && <div className="error-message">{errors.image.message}</div>}
                
                {/* Enhanced Image Preview */}
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <div className="preview-overlay">
                      <span>✓ Image Selected</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="submit-section">
              <button
                type="submit"
                disabled={isLoading}
                className={`submit-button ${isLoading ? 'loading' : ''}`}
              >
                <span className="button-content">
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      Adding School...
                    </>
                  ) : (
                    <>
                      <span className="button-icon">🚀</span>
                      Add School
                    </>
                  )}
                </span>
                <div className="button-glow"></div>
              </button>
            </div>

            {/* Enhanced Message Display */}
            {message && (
              <div className={`message-container ${message.includes("successfully") ? 'success' : 'error'}`}>
                <div className="message-icon">
                  {message.includes("successfully") ? '🎉' : '⚠️'}
                </div>
                <div className="message-text">{message}</div>
              </div>
            )}
          </form>
        </div>
      </div>

      <style jsx>{`
        .form-container {
          min-height: 100vh;
          position: relative;
          background: linear-gradient(135deg, 
            #0a0a0a 0%, 
            #1a1a2e 25%, 
            #16213e 50%, 
            #0f3460 75%, 
            #0a0a0a 100%
          );
          overflow: hidden;
          margin: 0;
          padding: 0;
          width: 100vw;
        }

        .background-layer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .floating-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: float 15s infinite ease-in-out;
        }

        .orb-1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(147, 51, 234, 0.3), transparent);
          top: -150px;
          left: -150px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent);
          top: 20%;
          right: -200px;
          animation-delay: -5s;
        }

        .orb-3 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.2), transparent);
          bottom: -175px;
          left: 30%;
          animation-delay: -10s;
        }

        .orb-4 {
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(245, 101, 101, 0.25), transparent);
          top: 60%;
          left: -125px;
          animation-delay: -7s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -30px) rotate(90deg); }
          50% { transform: translate(-20px, 20px) rotate(180deg); }
          75% { transform: translate(-30px, -10px) rotate(270deg); }
        }

        .grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        .form-wrapper {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
        }

        .glass-container {
          background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0.03) 100%
          );
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 3rem;
          max-width: 900px;
          width: 100%;
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .glass-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
        }

        .header-section {
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
        }

        .icon-wrapper {
          position: relative;
          display: inline-block;
          margin-bottom: 1rem;
        }

        .main-icon {
          font-size: 4rem;
          display: inline-block;
          animation: iconPulse 3s ease-in-out infinite;
          filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.5));
        }

        @keyframes iconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .main-title {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg,
            #ffffff 0%,
            #a855f7 50%,
            #3b82f6 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .subtitle {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.1rem;
          margin: 0 0 2rem 0;
          font-weight: 400;
        }

        /* AWESOME NAVIGATION BUTTON */
        .navigation-section {
          margin-bottom: 1rem;
        }

        .view-schools-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          background: linear-gradient(135deg, 
            rgba(16, 185, 129, 0.8) 0%, 
            rgba(5, 150, 105, 0.9) 50%,
            rgba(4, 120, 87, 1) 100%
          );
          color: white;
          border: none;
          border-radius: 50px;
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 10px 30px rgba(16, 185, 129, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .view-schools-button:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 
            0 15px 40px rgba(16, 185, 129, 0.4),
            0 0 50px rgba(16, 185, 129, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          background: linear-gradient(135deg, 
            rgba(16, 185, 129, 0.9) 0%, 
            rgba(5, 150, 105, 1) 50%,
            rgba(4, 120, 87, 1) 100%
          );
        }

        .view-schools-button:active {
          transform: translateY(-1px) scale(1.01);
        }

        .button-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg, 
            transparent, 
            rgba(255, 255, 255, 0.3), 
            transparent
          );
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .button-icon {
          font-size: 1.3rem;
          z-index: 2;
        }

        .button-text {
          z-index: 2;
          font-weight: 700;
        }

        .modern-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .input-group {
          position: relative;
        }

        .input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1.25rem;
          z-index: 2;
          font-size: 1.25rem;
          pointer-events: none;
          transition: all 0.3s ease;
        }

        .modern-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.25rem 1.25rem 1.25rem 4rem;
          color: white;
          font-size: 1rem;
          font-weight: 500;
          outline: none;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          position: relative;
        }

        .modern-input.textarea {
          resize: vertical;
          min-height: 120px;
          padding-top: 1.25rem;
        }

        .modern-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
        }

        .modern-input:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(59, 130, 246, 0.6);
          box-shadow: 
            0 0 30px rgba(59, 130, 246, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .modern-input:focus::placeholder {
          color: rgba(255, 255, 255, 0.7);
          transform: translateX(5px);
        }

        .modern-input.focused + .input-glow {
          opacity: 1;
        }

        .modern-input.error {
          border-color: rgba(239, 68, 68, 0.6);
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.2);
        }

        .input-glow {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(135deg,
            rgba(59, 130, 246, 0.6),
            rgba(147, 51, 234, 0.6)
          );
          border-radius: 18px;
          opacity: 0;
          z-index: -1;
          transition: opacity 0.3s ease;
          filter: blur(4px);
        }

        .file-upload-wrapper {
          position: relative;
        }

        .file-upload-container {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
        }

        .file-input {
          position: absolute;
          opacity: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        .file-upload-label {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          background: rgba(255, 255, 255, 0.04);
          border: 2px dashed rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 2rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .file-upload-label:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(59, 130, 246, 0.4);
          transform: translateY(-2px);
        }

        .file-upload-label.error {
          border-color: rgba(239, 68, 68, 0.6);
        }

        .upload-icon {
          font-size: 2.5rem;
          opacity: 0.8;
        }

        .upload-text {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .primary-text {
          color: white;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .secondary-text {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }

        .image-preview {
          margin-top: 1.5rem;
          position: relative;
          display: inline-block;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .image-preview img {
          max-width: 250px;
          max-height: 250px;
          object-fit: cover;
          display: block;
          border-radius: 12px;
        }

        .preview-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(16, 185, 129, 0.8));
          padding: 0.75rem;
          color: white;
          font-weight: 600;
          text-align: center;
        }

        .submit-section {
          margin-top: 2rem;
          position: relative;
        }

        .submit-button {
          width: 100%;
          background: linear-gradient(135deg,
            #667eea 0%,
            #764ba2 50%,
            #f093fb 100%
          );
          border: none;
          border-radius: 16px;
          padding: 1.5rem 2rem;
          color: white;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .submit-button:not(.loading):hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
        }

        .submit-button:not(.loading):active {
          transform: translateY(-1px);
        }

        .submit-button.loading {
          background: linear-gradient(135deg,
            #6b7280 0%,
            #9ca3af 100%
          );
          cursor: not-allowed;
        }

        .button-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          position: relative;
          z-index: 2;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .error-message {
          margin-top: 0.75rem;
          color: #ef4444;
          font-size: 0.9rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(239, 68, 68, 0.1);
          border-radius: 8px;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .error-message::before {
          content: '⚠️';
          font-size: 1rem;
        }

        .message-container {
          margin-top: 2rem;
          padding: 1.5rem;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 1rem;
          font-weight: 600;
          backdrop-filter: blur(10px);
          border: 1px solid;
          animation: slideIn 0.5s ease-out;
        }

        .message-container.success {
          background: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.3);
          color: #10b981;
        }

        .message-container.error {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }

        .message-icon {
          font-size: 1.5rem;
        }

        .message-text {
          font-size: 1.1rem;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .glass-container {
            padding: 2rem 1.5rem;
            margin: 1rem;
          }

          .main-title {
            font-size: 2.5rem;
          }

          .view-schools-button {
            padding: 0.875rem 2rem;
            font-size: 1rem;
          }

          .input-row {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .modern-form {
            gap: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .glass-container {
            padding: 1.5rem 1rem;
          }

          .main-title {
            font-size: 2rem;
          }

          .view-schools-button {
            padding: 0.75rem 1.5rem;
            font-size: 0.95rem;
          }

          .modern-input {
            padding: 1rem 1rem 1rem 3.5rem;
          }
        }
      `}</style>
    </div>
  );
}
