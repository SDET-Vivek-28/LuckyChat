/**
 * Simple Test Page
 * Copyright © 2024 Appvik. All rights reserved.
 */

export default function TestPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🧪 LuckyChat Test Page</h1>
      <p>If you can see this, Next.js is working!</p>
      <div style={{ 
        background: '#f0f0f0', 
        padding: '10px', 
        borderRadius: '5px',
        margin: '10px 0'
      }}>
        <strong>Status:</strong> ✅ Server is responding
      </div>
      <p>Now let's check the main app...</p>
      <a href="/" style={{ 
        background: '#007bff', 
        color: 'white', 
        padding: '10px 20px', 
        textDecoration: 'none',
        borderRadius: '5px'
      }}>
        Go to Main App
      </a>
    </div>
  )
} 