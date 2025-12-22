import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Get SMTP configuration from environment variables
    const SMTP_HOST = process.env.SMTP_HOST
    const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587')
    const SMTP_USER = process.env.SMTP_USER
    const SMTP_PASS = process.env.SMTP_PASS
    const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER || 'noreply@futurawatch.com'
    const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'info@futurawatch.com'

    // Check if SMTP is configured
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      console.error('SMTP configuration missing:', {
        hasHost: !!SMTP_HOST,
        hasUser: !!SMTP_USER,
        hasPass: !!SMTP_PASS
      })
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact support directly at info@futurawatch.com' },
        { status: 500 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })

    // Email content
    const mailOptions = {
      from: `"FuturaWatch Contact Form" <${SMTP_FROM}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #eab308;">New Contact Form Submission</h2>
          <div style="background-color: #1f2937; padding: 20px; border-radius: 8px; color: #ffffff;">
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border-color: #374151; margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">
            This email was sent from the FuturaWatch contact form.
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${fullName}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)

    console.log('Contact form email sent:', {
      messageId: info.messageId,
      to: CONTACT_EMAIL,
      from: email,
      subject: subject
    })

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon!',
    })

  } catch (error: any) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send message. Please try again or contact us directly at info@futurawatch.com' },
      { status: 500 }
    )
  }
}


