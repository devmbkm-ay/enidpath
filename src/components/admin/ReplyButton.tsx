'use client'

import { useDocumentInfo, useFormFields } from '@payloadcms/ui'
import { useState } from 'react'

export function ReplyButton() {
  const { id } = useDocumentInfo()
  const name = useFormFields(([fields]) => fields.name?.value as string)
  const email = useFormFields(([fields]) => fields.email?.value as string)
  const subject = useFormFields(([fields]) => fields.subject?.value as string)

  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  if (!email || !id) return null

  const handleSend = async () => {
    if (!message.trim()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          name,
          subject: `Re: ${subject || 'Your enquiry'}`,
          message,
        }),
      })
      if (res.ok) {
        setStatus('sent')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ marginTop: '2rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
      <h4 style={{ margin: '0 0 4px', fontSize: '15px' }}>Reply to {name}</h4>
      <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#6b7280' }}>{email}</p>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your reply here..."
        rows={6}
        disabled={status === 'sending'}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '14px',
          lineHeight: '1.6',
          resize: 'vertical',
          fontFamily: 'inherit',
          boxSizing: 'border-box',
        }}
      />

      <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={handleSend}
          disabled={status === 'sending' || !message.trim()}
          style={{
            padding: '10px 20px',
            background: status === 'sending' ? '#93c5fd' : '#1d4ed8',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '14px',
            cursor: status === 'sending' || !message.trim() ? 'not-allowed' : 'pointer',
          }}
        >
          {status === 'sending' ? 'Sending…' : 'Send Reply'}
        </button>

        {status === 'sent' && (
          <span style={{ color: '#16a34a', fontWeight: 600 }}>✓ Reply sent successfully!</span>
        )}
        {status === 'error' && (
          <span style={{ color: '#dc2626' }}>Failed to send. Please try again.</span>
        )}
      </div>
    </div>
  )
}
