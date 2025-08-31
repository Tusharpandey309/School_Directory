// pages/showSchools.jsx
"use client";
import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 25%, #2d1b69 50%, #1a1a3e 75%, #0f0f23 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
          <div>Loading schools...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 25%, #2d1b69 50%, #1a1a3e 75%, #0f0f23 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ef4444' }}>❌</div>
          <div>{error}</div>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid #ef4444',
              borderRadius: '8px',
              color: '#ef4444',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(2px 2px at 20px 30px, #eee, transparent),
        radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
        radial-gradient(1px 1px at 90px 40px, #fff, transparent),
        linear-gradient(135deg, #0f0f23 0%, #1a1a3e 25%, #2d1b69 50%, #1a1a3e 75%, #0f0f23 100%)
      `,
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: 'white', 
            textAlign: 'center',
            marginBottom: '1rem',
            textShadow: '0 0 20px rgba(255,255,255,0.5)'
          }}>
            🏫 School Directory
          </h1>
          <p style={{ 
            textAlign: 'center', 
            color: '#e2e8f0', 
            fontSize: '1.1rem',
            marginBottom: '0'
          }}>
            Discover educational institutions in your area ({schools.length} schools)
          </p>
        </div>

        {schools.length === 0 ? (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '3rem',
            textAlign: 'center',
            color: 'white'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
            <h2>No schools found</h2>
            <p style={{ color: '#e2e8f0', marginBottom: '2rem' }}>
              Be the first to add a school to our directory!
            </p>
            <button
              onClick={() => window.location.href = '/addSchool'}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Add First School
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {schools.map((school) => (
              <div
                key={school.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {/* School Image */}
                <div style={{ 
                  marginBottom: '1rem',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  height: '200px',
                  background: 'rgba(255, 255, 255, 0.05)'
                }}>
                  <img
                    src={school.image}
                    alt={school.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '12px'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'none',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '3rem'
                    }}
                  >
                    🏫
                  </div>
                </div>

                {/* School Info */}
                <h3 style={{ 
                  color: 'white', 
                  fontSize: '1.4rem', 
                  fontWeight: '600',
                  marginBottom: '1rem',
                  textShadow: '0 0 10px rgba(255,255,255,0.3)'
                }}>
                  {school.name}
                </h3>

                <div style={{ color: '#e2e8f0', lineHeight: '1.6' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    marginBottom: '0.5rem' 
                  }}>
                    <span style={{ marginRight: '0.5rem', fontSize: '1.1rem' }}>📍</span>
                    <span>{school.address}</span>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '0.5rem' 
                  }}>
                    <span style={{ marginRight: '0.5rem', fontSize: '1.1rem' }}>🏙️</span>
                    <span>{school.city}, {school.state}</span>
                  </div>
                  
                  {/* <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '0.5rem' 
                  }}>
                    <span style={{ marginRight: '0.5rem', fontSize: '1.1rem' }}>📞</span>
                    <a 
                      href={`tel:${school.contact}`}
                      style={{ 
                        color: '#60a5fa',
                        textDecoration: 'none'
                      }}
                    >
                      {school.contact}
                    </a>
                  </div> */}
                  
                  {/* <div style={{ 
                    display: 'flex', 
                    alignItems: 'center' 
                  }}>
                    <span style={{ marginRight: '0.5rem', fontSize: '1.1rem' }}>✉️</span>
                    <a 
                      href={`mailto:${school.email_id}`}
                      style={{ 
                        color: '#60a5fa',
                        textDecoration: 'none',
                        wordBreak: 'break-word'
                      }}
                    >
                      {school.email_id}
                    </a>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
