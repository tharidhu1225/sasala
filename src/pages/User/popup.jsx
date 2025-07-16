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
    setTimeout(() => setVisible(false), 300) // wait for fade-out animation
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
          borderRadius: '16px',
          width: '90%',
          maxWidth: '420px',
          textAlign: 'center',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
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
            color: '#999',
            cursor: 'pointer',
          }}
        >
          ×
        </button>
        <h2 style={{ fontSize: '22px', marginBottom: '10px' }}>📲 Get Our Mobile App</h2>
        <p style={{ fontSize: '16px', color: '#555' }}>
          Enjoy faster access and smoother experience with our mobile app.
        </p>
        <a
          href="/universal.apk"
          download
          onClick={handleDownload}
          style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '12px 30px',
            backgroundColor: '#2563eb',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => e.target.style.backgroundColor = '#1e40af'}
          onMouseLeave={e => e.target.style.backgroundColor = '#2563eb'}
        >
          Download APK
        </a>
      </div>
    </div>
  )
}

export default PopupAd
