import React from 'react'

export const Logo = () => (
  <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 0' }}>
    <img
      src="/logo.png"
      alt="EnidPath Logo"
      style={{ width: 'auto', height: '45px', objectFit: 'contain', display: 'block' }}
    />
  </div>
)
