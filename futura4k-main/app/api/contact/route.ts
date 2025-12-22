import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Sanitize HTML to prevent XSS attacks
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { fullName, email, subject, message } = body

    // Validate required fields
    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Trim and validate input
    const trimmedFullName = fullName.trim()
    const trimmedEmail = email.trim().toLowerCase()
    const trimmedSubject = subject.trim()
    const trimmedMessage = message.trim()

    // Additional validation
    if (trimmedFullName.length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters long' },
        { status: 400 }
      )
    }

    if (trimmedMessage.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Get SMTP configuration from environment variables
    const SMTP_HOST = process.env.SMTP_HOST?.trim()
    const SMTP_PORT = parseInt(process.env.SMTP_PORT?.trim() || '587', 10)
    const SMTP_USER = process.env.SMTP_USER?.trim()
    const SMTP_PASS = process.env.SMTP_PASS?.trim()
    const SMTP_FROM = process.env.SMTP_FROM?.trim() || SMTP_USER || 'noreply@futurawatch.com'
    const CONTACT_EMAIL = process.env.CONTACT_EMAIL?.trim() || 'info@futurawatch.com'

    // Log configuration (without password)
    console.log('📧 SMTP Configuration:', {
      host: SMTP_HOST,
      port: SMTP_PORT,
      user: SMTP_USER,
      from: SMTP_FROM,
      to: CONTACT_EMAIL,
      hasPass: !!SMTP_PASS
    })

    // Check if SMTP is configured
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      console.error('❌ SMTP configuration missing:', {
        hasHost: !!SMTP_HOST,
        hasUser: !!SMTP_USER,
        hasPass: !!SMTP_PASS,
        port: SMTP_PORT
      })
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact support directly at info@futurawatch.com' },
        { status: 500 }
      )
    }

    // Validate CONTACT_EMAIL format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(CONTACT_EMAIL)) {
      console.error('❌ Invalid CONTACT_EMAIL format:', CONTACT_EMAIL)
      return NextResponse.json(
        { error: 'Email configuration error. Please contact support directly at info@futurawatch.com' },
        { status: 500 }
      )
    }

    // Create transporter with better error handling
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false // Allow self-signed certificates if needed
      },
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,
      socketTimeout: 10000,
    })

    // Verify transporter connection
    try {
      await transporter.verify()
    } catch (verifyError: any) {
      console.error('SMTP connection verification failed:', verifyError)
      return NextResponse.json(
        { error: 'Email service connection failed. Please try again later or contact us directly at info@futurawatch.com' },
        { status: 500 }
      )
    }

    // Sanitize inputs for HTML
    const safeFullName = escapeHtml(trimmedFullName)
    const safeEmail = escapeHtml(trimmedEmail)
    const safeSubject = escapeHtml(trimmedSubject)
    const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, '<br>')

    // Email content with better formatting
    // IMPORTANT: Use SMTP_USER as FROM if SMTP_FROM is different, some providers require this
    const fromEmail = SMTP_FROM || SMTP_USER
    const mailOptions = {
      from: `"FuturaWatch Contact Form" <${fromEmail}>`,
      to: CONTACT_EMAIL,
      replyTo: trimmedEmail,
      subject: `[FuturaWatch Contact] ${safeSubject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #eab308 0%, #f59e0b 100%); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #000; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          <div style="background-color: #1f2937; padding: 30px; border-radius: 0 0 8px 8px; color: #ffffff;">
            <div style="margin-bottom: 20px;">
              <p style="margin: 5px 0;"><strong style="color: #eab308;">Name:</strong> <span style="color: #ffffff;">${safeFullName}</span></p>
            </div>
            <div style="margin-bottom: 20px;">
              <p style="margin: 5px 0;"><strong style="color: #eab308;">Email:</strong> <a href="mailto:${safeEmail}" style="color: #60a5fa; text-decoration: none;">${safeEmail}</a></p>
            </div>
            <div style="margin-bottom: 20px;">
              <p style="margin: 5px 0;"><strong style="color: #eab308;">Subject:</strong> <span style="color: #ffffff;">${safeSubject}</span></p>
            </div>
            <hr style="border: none; border-top: 1px solid #374151; margin: 30px 0;">
            <div>
              <p style="margin: 0 0 10px 0;"><strong style="color: #eab308;">Message:</strong></p>
              <div style="background-color: #111827; padding: 15px; border-radius: 4px; border-left: 3px solid #eab308;">
                <p style="margin: 0; white-space: pre-wrap; color: #e5e7eb;">${safeMessage}</p>
              </div>
            </div>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #6b7280; font-size: 12px;">
              This email was sent from the FuturaWatch contact form at <a href="https://www.futurawatch.com/contact" style="color: #eab308;">futurawatch.com</a>
            </p>
            <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 12px;">
              Reply directly to this email to respond to ${safeFullName}
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
New Contact Form Submission - FuturaWatch

Name: ${trimmedFullName}
Email: ${trimmedEmail}
Subject: ${trimmedSubject}

Message:
${trimmedMessage}

---
This email was sent from the FuturaWatch contact form.
Reply directly to this email to respond to ${trimmedFullName}.
      `,
    }

    // Send email with timeout
    const sendPromise = transporter.sendMail(mailOptions)
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Email sending timeout')), 30000) // 30 seconds timeout
    })

    const info = await Promise.race([sendPromise, timeoutPromise]) as nodemailer.SentMessageInfo

    console.log('✅ Contact form email sent successfully:', {
      messageId: info.messageId,
      accepted: info.accepted, // Array of accepted email addresses
      rejected: info.rejected, // Array of rejected email addresses
      pending: info.pending, // Array of pending email addresses
      response: info.response, // Response from SMTP server
      to: CONTACT_EMAIL,
      from: fromEmail,
      replyTo: trimmedEmail,
      subject: trimmedSubject,
      timestamp: new Date().toISOString()
    })

    // Check if email was actually accepted
    if (info.rejected && info.rejected.length > 0) {
      console.error('⚠️ Email was rejected by SMTP server:', {
        rejected: info.rejected,
        accepted: info.accepted
      })
      return NextResponse.json({
        success: false,
        error: 'Email was rejected by the server. Please check if info@futurawatch.com is a valid email address.',
        message: 'Your message could not be delivered. Please try again or contact us directly at info@futurawatch.com',
      }, { status: 500 })
    }

    if (!info.accepted || info.accepted.length === 0) {
      console.error('⚠️ Email was not accepted by SMTP server')
      return NextResponse.json({
        success: false,
        error: 'Email was not accepted by the server.',
        message: 'Your message could not be delivered. Please try again or contact us directly at info@futurawatch.com',
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
      debug: process.env.NODE_ENV === 'development' ? {
        messageId: info.messageId,
        accepted: info.accepted,
        to: CONTACT_EMAIL
      } : undefined
    }, { status: 200 })

  } catch (error: any) {
    console.error('❌ Contact form error:', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    })

    // Provide user-friendly error messages
    let errorMessage = 'Failed to send message. Please try again or contact us directly at info@futurawatch.com'
    
    if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      errorMessage = 'Connection timeout. Please check your internet connection and try again.'
    } else if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please contact support directly at info@futurawatch.com'
    } else if (error.message?.includes('timeout')) {
      errorMessage = 'Request timed out. Please try again in a moment.'
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}


