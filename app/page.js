'use client'

import { useState } from 'react'

export default function Home() {
  const [name, setName] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)

  const generateUsernames = (inputName) => {
    const clean = inputName.toLowerCase().replace(/[^a-z0-9]/g, '')
    const usernames = []

    // Basic variations
    usernames.push(clean)
    usernames.push(`${clean}_official`)
    usernames.push(`the_${clean}`)
    usernames.push(`${clean}_real`)
    usernames.push(`${clean}hq`)

    // With numbers
    const currentYear = new Date().getFullYear()
    usernames.push(`${clean}${currentYear}`)
    usernames.push(`${clean}${currentYear.toString().slice(-2)}`)
    usernames.push(`${clean}123`)
    usernames.push(`${clean}99`)

    // Creative variations
    usernames.push(`i_am_${clean}`)
    usernames.push(`${clean}_is_here`)
    usernames.push(`its${clean}`)
    usernames.push(`hey${clean}`)
    usernames.push(`${clean}xo`)
    usernames.push(`${clean}_`)

    // Split name variations if multi-word
    const words = inputName.toLowerCase().split(/\s+/)
    if (words.length > 1) {
      usernames.push(words.join(''))
      usernames.push(words.join('_'))
      usernames.push(words.join('.'))
      usernames.push(`${words[0]}.${words[words.length - 1]}`)
    }

    return [...new Set(usernames)].slice(0, 15)
  }

  const checkAvailability = async (username, platform) => {
    // Simulate API check with random availability
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 300))
    return Math.random() > 0.4
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    const usernames = generateUsernames(name)

    const platforms = ['Twitter/X', 'Instagram', 'TikTok', 'YouTube', 'GitHub']
    const results = []

    for (const username of usernames) {
      const availability = {}
      for (const platform of platforms) {
        availability[platform] = await checkAvailability(username, platform)
      }
      results.push({ username, availability })
    }

    setSuggestions(results)
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        paddingTop: '40px'
      }}>
        <h1 style={{
          color: 'white',
          textAlign: 'center',
          fontSize: '2.5rem',
          marginBottom: '10px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
        }}>
          Social Media Username Finder
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.9)',
          textAlign: 'center',
          fontSize: '1.1rem',
          marginBottom: '40px'
        }}>
          Enter your name and discover available usernames across platforms
        </p>

        <form onSubmit={handleSubmit} style={{
          background: 'white',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          marginBottom: '30px'
        }}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name (e.g., John Smith)"
            style={{
              width: '100%',
              padding: '15px',
              fontSize: '1.1rem',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              marginBottom: '15px',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          />
          <button
            type="submit"
            disabled={loading || !name.trim()}
            style={{
              width: '100%',
              padding: '15px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              color: 'white',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            {loading ? 'Finding Usernames...' : 'Find Usernames'}
          </button>
        </form>

        {loading && (
          <div style={{
            textAlign: 'center',
            color: 'white',
            fontSize: '1.2rem',
            padding: '20px'
          }}>
            <div style={{
              display: 'inline-block',
              width: '40px',
              height: '40px',
              border: '4px solid rgba(255,255,255,0.3)',
              borderTopColor: 'white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <style jsx>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {!loading && suggestions.length > 0 && (
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              marginBottom: '20px',
              color: '#333'
            }}>
              Available Username Suggestions
            </h2>

            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse'
              }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#666'
                    }}>Username</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#666' }}>Twitter/X</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#666' }}>Instagram</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#666' }}>TikTok</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#666' }}>YouTube</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#666' }}>GitHub</th>
                  </tr>
                </thead>
                <tbody>
                  {suggestions.map((item, idx) => (
                    <tr key={idx} style={{
                      borderBottom: '1px solid #f0f0f0',
                      background: idx % 2 === 0 ? '#fafafa' : 'white'
                    }}>
                      <td style={{
                        padding: '12px',
                        fontWeight: '500',
                        color: '#333',
                        fontFamily: 'monospace',
                        fontSize: '1rem'
                      }}>
                        {item.username}
                      </td>
                      {['Twitter/X', 'Instagram', 'TikTok', 'YouTube', 'GitHub'].map(platform => (
                        <td key={platform} style={{
                          padding: '12px',
                          textAlign: 'center'
                        }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            background: item.availability[platform] ? '#d4edda' : '#f8d7da',
                            color: item.availability[platform] ? '#155724' : '#721c24'
                          }}>
                            {item.availability[platform] ? '✓ Available' : '✗ Taken'}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{
              marginTop: '20px',
              padding: '15px',
              background: '#fff3cd',
              borderRadius: '8px',
              color: '#856404',
              fontSize: '0.9rem'
            }}>
              <strong>Note:</strong> Availability is simulated for demonstration purposes.
              For actual availability, please check each platform directly.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
