import React, { useState, useEffect } from 'react'

const PopupAd = () => {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => setVisible(false), 300)
  }

  const handleDownload = () => {
    handleClose()
  }

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        opacity: closing ? 0 : 1,
        transition: 'opacity 0.3s ease-in-out',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '30px 20px',
          borderRadius: '20px',
          width: '90%',
          maxWidth: '420px',
          textAlign: 'center',
          boxShadow: '0 15px 30px rgba(0,0,0,0.25)',
          position: 'relative',
          transform: closing ? 'scale(0.95)' : 'scale(1)',
          transition: 'transform 0.3s ease',
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '16px',
            fontSize: '24px',
            background: 'none',
            border: 'none',
            color: '#aaa',
            cursor: 'pointer',
          }}
        >
          ×
        </button>

        <h2 style={{ fontSize: '24px', marginBottom: '10px', color: '#1e40af' }}>
          📲 අපේ Mobile App එක Download කරන්න
        </h2>

        <p style={{ fontSize: '16px', color: '#444', marginBottom: '15px' }}>
          දැන් ඔබට අපේ සේවාවන්ට වඩාත් වේගවත් සහ පහසු ලෙස පිවිසිය හැක!
        </p>

        <ul style={{ textAlign: 'left', padding: '0 20px', marginBottom: '20px', color: '#333', fontSize: '15px' }}>
          <li>🚀 ඉතා වේගවත් Performance</li>
          <li>📱 Mobile friendly UI</li>
          <li>🔔 Notify වෙන instant updates</li>
          <li>🛒 පහසු සාප්පු කරන ක්‍රමවේද</li>
        </ul>

        <a
          href="/Sasala.lk.apk"
          download
          onClick={handleDownload}
          style={{
            display: 'inline-block',
            marginTop: '10px',
            padding: '12px 30px',
            backgroundColor: '#2563eb',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => e.target.style.backgroundColor = '#1e40af'}
          onMouseLeave={e => e.target.style.backgroundColor = '#2563eb'}
        >
          📥 APK එක Download කරන්න
        </a>
      </div>
    </div>
  )
}

export default PopupAd
