import React from 'react';

export default function About() {
  return (
    <div style={{ padding: '100px 24px', textAlign: 'center', background: '#fdf6f9', minHeight: '60vh' }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '48px', color: '#1a0a2e' }}>
        About Ellevation
      </h1>
      <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#5a4070', maxWidth: '600px', margin: '0 auto' }}>
        Deep dive into our mission, values, and the vision behind the Ellevation Community Ecosystem.
      </p>
    </div>
  );
}