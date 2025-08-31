"use client";
import { useEffect, useState } from "react";
// Removed Link import since we're going back to button

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch("/api/getSchools");
        if (response.ok) {
          const data = await response.json();
          setSchools(data);
        } else {
          setError("Failed to load schools");
        }
      } catch (err) {
        setError("Network error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
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
        <div className="loading-content">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
          <div className="loading-text">
            <span>Loading schools...</span>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <style jsx>{`
          .loading-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0a0a0a 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;
          }

          .loading-content {
            text-align: center;
            z-index: 10;
          }

          .loading-spinner {
            position: relative;
            width: 120px;
            height: 120px;
            margin: 0 auto 2rem;
          }

          .spinner-ring {
            position: absolute;
            border: 3px solid transparent;
            border-radius: 50%;
            animation: spin 2s linear infinite;
          }

          .spinner-ring:nth-child(1) {
            width: 120px;
            height: 120px;
            border-top: 3px solid #667eea;
            animation-delay: 0s;
          }

          .spinner-ring:nth-child(2) {
            width: 90px;
            height: 90px;
            top: 15px;
            left: 15px;
            border-right: 3px solid #764ba2;
            animation-delay: -0.5s;
            animation-direction: reverse;
          }

          .spinner-ring:nth-child(3) {
            width: 60px;
            height: 60px;
            top: 30px;
            left: 30px;
            border-bottom: 3px solid #f093fb;
            animation-delay: -1s;
          }

          .loading-text {
            color: white;
            font-size: 1.5rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
          }

          .loading-dots {
            display: flex;
            gap: 0.5rem;
          }

          .loading-dots span {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #667eea;
            animation: bounce 1.4s ease-in-out infinite both;
          }

          .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
          .loading-dots span:nth-child(2) { animation-delay: -0.16s; }
          .loading-dots span:nth-child(3) { animation-delay: 0s; }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes bounce {
            0%, 80%, 100% {
              transform: scale(0);
            } 40% {
              transform: scale(1);
            }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
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
        <div className="error-content">
          <div className="error-icon">💥</div>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            <span>🔄 Try Again</span>
          </button>
        </div>
        <style jsx>{`
          .error-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0a0a0a 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2rem;
          }

          .error-content {
            text-align: center;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(239, 68, 68, 0.3);
            border-radius: 24px;
            padding: 3rem 2rem;
            max-width: 500px;
            width: 100%;
            animation: slideIn 0.6s ease-out;
          }

          .error-icon {
            font-size: 4rem;
            margin-bottom: 1.5rem;
            animation: shake 0.5s ease-in-out;
          }

          .error-content h2 {
            color: #ef4444;
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1rem;
          }

          .error-content p {
            color: rgba(255, 255, 255, 0.8);
            font-size: 1.1rem;
            margin-bottom: 2rem;
          }

          .retry-button {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            border: none;
            border-radius: 12px;
            padding: 1rem 2rem;
            color: white;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .retry-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3);
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="schools-container">
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
        <div className="floating-orb orb-5"></div>
      </div>

      {/* Grid Overlay */}
      <div className="grid-overlay"></div>

      <div className="content-wrapper">
        {/* Header Section - Made Smaller */}
        <div className="header-section">
          <div className="header-content">
            <div className="title-wrapper">
              <div className="title-icon">🎓</div>
              <h1 className="main-title">School Directory</h1>
            </div>
            <p className="subtitle">
              Discover educational institutions in your area
            </p>
            <div className="stats-badge">
              <span className="stats-number">{filteredSchools.length}</span>
              <span className="stats-text">School{filteredSchools.length !== 1 ? 's' : ''} Found</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="search-section">
            <div className="search-wrapper">
              <div className="search-icon">🔍</div>
              <input
                type="text"
                placeholder="Search schools, cities, or addresses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="clear-search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Schools Grid */}
        {filteredSchools.length === 0 ? (
          <div className="empty-state">
            <div className="empty-content">
              <div className="empty-icon">
                {searchTerm ? '🔍' : '📚'}
              </div>
              <h2 className="empty-title">
                {searchTerm ? 'No schools found' : 'No schools yet'}
              </h2>
              <p className="empty-description">
                {searchTerm 
                  ? `No schools match "${searchTerm}". Try a different search term.`
                  : 'Be the first to add a school to our directory!'
                }
              </p>
              {!searchTerm && (
                <button
                  onClick={() => window.location.href = '/addSchool'}
                  className="add-school-button"
                >
                  <span className="button-icon">✨</span>
                  Add First School
                </button>
              )}
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="clear-search-button"
                >
                  <span className="button-icon">🔄</span>
                  Clear Search
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="schools-grid">
            {filteredSchools.map((school, index) => (
              <div
                key={school.id}
                className="school-card"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredCard(school.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="card-glow"></div>
                
                {/* School Image */}
                <div className="school-image">
                  <img
                    src={school.image}
                    alt={school.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="image-fallback">
                    <span className="fallback-icon">🏫</span>
                  </div>
                  <div className="image-overlay"></div>
                </div>

                {/* School Info - Only Name, City & Address */}
                <div className="school-info">
                  <h3 className="school-name">{school.name}</h3>
                  
                  <div className="school-details">
                    <div className="detail-row">
                      <span className="detail-icon">🏙️</span>
                      <span className="detail-text">{school.city}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-icon">📍</span>
                      <span className="detail-text">{school.address}</span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                {hoveredCard === school.id && <div className="hover-glow"></div>}
              </div>
            ))}
          </div>
        )}

        {/* Add School FAB - Reverted to Button */}
        <div className="fab-container">
          <button
            onClick={() => window.location.href = '/addSchool'}
            className="add-fab"
            title="Add New School"
          >
            <span className="fab-icon">+</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .schools-container {
          min-height: 100vh;
          position: relative;
          background: linear-gradient(135deg, 
            #0a0a0a 0%, 
            #1a1a2e 25%, 
            #16213e 50%, 
            #0f3460 75%, 
            #0a0a0a 100%
          );
          overflow-x: hidden;
          margin: 0;
          padding: 0;
          width: 100vw;
        }

        .background-layer {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }

        .floating-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          animation: float 20s infinite ease-in-out;
          opacity: 0.7;
        }

        .orb-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(147, 51, 234, 0.4), transparent);
          top: -200px;
          left: -200px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent);
          top: 20%;
          right: -150px;
          animation-delay: -7s;
        }

        .orb-3 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.2), transparent);
          bottom: -250px;
          left: 20%;
          animation-delay: -14s;
        }

        .orb-4 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(245, 101, 101, 0.3), transparent);
          top: 50%;
          left: -175px;
          animation-delay: -3s;
        }

        .orb-5 {
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent);
          top: 10%;
          left: 50%;
          animation-delay: -10s;
        }

        @keyframes float {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg); 
            opacity: 0.7;
          }
          25% { 
            transform: translate(50px, -50px) rotate(90deg); 
            opacity: 0.5;
          }
          50% { 
            transform: translate(-30px, 30px) rotate(180deg); 
            opacity: 0.8;
          }
          75% { 
            transform: translate(-50px, -20px) rotate(270deg); 
            opacity: 0.6;
          }
        }

        .grid-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 2;
        }

        .content-wrapper {
          position: relative;
          z-index: 10;
          padding: 2rem 1rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .header-section {
          margin-bottom: 2rem;
        }

        /* SMALLER HEADER CARD */
        .header-content {
          text-align: center;
          margin-bottom: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 18px;
          padding: 1.5rem 2rem;
          position: relative;
          overflow: hidden;
          max-width: 700px;
          margin: 0 auto 1.5rem auto;
        }

        .header-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        }

        .title-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .title-icon {
          font-size: 2.5rem;
          animation: iconFloat 3s ease-in-out infinite;
          filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.5));
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .main-title {
          font-size: 2.25rem;
          font-weight: 800;
          background: linear-gradient(135deg,
            #ffffff 0%,
            #a855f7 30%,
            #3b82f6 60%,
            #10b981 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .subtitle {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1rem;
          margin: 0 0 1rem 0;
          font-weight: 300;
        }

        .stats-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(59, 130, 246, 0.2);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 50px;
          padding: 0.5rem 1rem;
          backdrop-filter: blur(10px);
        }

        .stats-number {
          font-size: 1.2rem;
          font-weight: 700;
          color: #3b82f6;
        }

        .stats-text {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .search-section {
          display: flex;
          justify-content: center;
        }

        .search-wrapper {
          position: relative;
          max-width: 500px;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 1.5rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.6);
          z-index: 2;
        }

        .search-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          padding: 1rem 3.5rem 1rem 3.5rem;
          color: white;
          font-size: 1rem;
          outline: none;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .search-input:focus {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(59, 130, 246, 0.6);
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
          transform: translateY(-2px);
        }

        .clear-search {
          position: absolute;
          right: 1.5rem;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 50%;
          width: 28px;
          height: 28px;
          color: #ef4444;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
        }

        .clear-search:hover {
          background: rgba(239, 68, 68, 0.3);
          transform: translateY(-50%) scale(1.1);
        }

        .schools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          animation: fadeInUp 0.8s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .school-card {
          position: relative;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: cardSlideIn 0.6s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
          min-height: 300px;
        }

        @keyframes cardSlideIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .school-card:hover {
          transform: translateY(-8px);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 0 40px rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .card-glow {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.3), 
            rgba(147, 51, 234, 0.3),
            rgba(16, 185, 129, 0.3)
          );
          border-radius: 22px;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
          filter: blur(6px);
        }

        .school-card:hover .card-glow {
          opacity: 1;
        }

        .school-image {
          position: relative;
          height: 160px;
          overflow: hidden;
          border-radius: 18px 18px 0 0;
        }

        .school-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .school-card:hover .school-image img {
          transform: scale(1.05);
        }

        .image-fallback {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.2), 
            rgba(147, 51, 234, 0.2)
          );
          display: none;
          align-items: center;
          justify-content: center;
        }

        .fallback-icon {
          font-size: 3rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40%;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
          pointer-events: none;
        }

        .school-info {
          padding: 1.25rem;
        }

        .school-name {
          color: white;
          font-size: 1.2rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          line-height: 1.3;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .school-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .detail-row {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.4;
        }

        .detail-icon {
          font-size: 1rem;
          flex-shrink: 0;
          margin-top: 0.1rem;
        }

        .detail-text {
          flex: 1;
          font-size: 0.85rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .empty-state {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
          animation: fadeIn 0.6s ease-out;
        }

        .empty-content {
          text-align: center;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 4rem 3rem;
          max-width: 500px;
          width: 100%;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 2rem;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        .empty-title {
          color: white;
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
        }

        .empty-description {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.1rem;
          margin: 0 0 2.5rem 0;
          line-height: 1.6;
        }

        .add-school-button, .clear-search-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 16px;
          padding: 1.25rem 2.5rem;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
        }

        .add-school-button:hover, .clear-search-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
        }

        .button-icon {
          font-size: 1.2rem;
        }

        .fab-container {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 100;
        }

        .add-fab {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          font-size: 2rem;
          font-weight: 300;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .add-fab:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.5);
        }

        .fab-icon {
          line-height: 1;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Responsive Design for 4 cards per row */
        @media (min-width: 1400px) {
          .schools-grid {
            grid-template-columns: repeat(4, 1fr);
            max-width: 1200px;
            margin: 0 auto;
          }
        }

        @media (max-width: 1200px) {
          .schools-grid {
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            gap: 1.25rem;
          }
        }

        @media (max-width: 900px) {
          .schools-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 1rem;
          }
          
          .school-card {
            min-height: 280px;
          }
        }

        @media (max-width: 768px) {
          .content-wrapper {
            padding: 1.5rem 1rem;
          }

          .header-content {
            padding: 1.25rem 1.5rem;
            max-width: 90%;
          }

          .main-title {
            font-size: 1.75rem;
          }

          .title-icon {
            font-size: 2rem;
          }

          .subtitle {
            font-size: 0.9rem;
          }

          .stats-badge {
            padding: 0.4rem 0.8rem;
          }

          .stats-number {
            font-size: 1rem;
          }

          .stats-text {
            font-size: 0.8rem;
          }

          .schools-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
          }

          .search-input {
            padding: 0.9rem 3rem 0.9rem 3rem;
            font-size: 0.95rem;
          }

          .fab-container {
            bottom: 1.5rem;
            right: 1.5rem;
          }

          .add-fab {
            width: 56px;
            height: 56px;
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .header-content {
            padding: 1rem;
            max-width: 95%;
          }

          .main-title {
            font-size: 1.5rem;
          }

          .title-icon {
            font-size: 1.75rem;
          }

          .subtitle {
            font-size: 0.85rem;
          }

          .stats-badge {
            padding: 0.3rem 0.7rem;
          }

          .schools-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
          }

          .school-info {
            padding: 1rem;
          }

          .school-name {
            font-size: 1rem;
          }

          .detail-text {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
