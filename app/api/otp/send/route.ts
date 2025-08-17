import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory OTP storage (in production, use Redis or database)
const otpStorage = new Map<string, { otp: string; expiresAt: Date; attempts: number }>()

export async function POST(request: NextRequest) {
  try {
    const { type, identifier } = await request.json()

    if (!type || !identifier) {
      return NextResponse.json(
        { error: 'Type and identifier are required' },
        { status: 400 }
      )
    }

    if (type !== 'sms' && type !== 'email') {
      return NextResponse.json(
        { error: 'Type must be either "sms" or "email"' },
        { status: 400 }
      )
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Store OTP in memory
    otpStorage.set(identifier, {
      otp,
      expiresAt,
      attempts: 0
    })

    // In production, this would send actual SMS/Email
    // For now, we'll simulate it
    let message = ''
    if (type === 'sms') {
      message = `OTP sent to ${identifier}`
      console.log(`SMS OTP: ${otp} sent to ${identifier}`)
    } else {
      message = `Email OTP sent to ${identifier}`
      console.log(`Email OTP: ${otp} sent to ${identifier}`)
    }

    return NextResponse.json({
      success: true,
      message,
      otp: process.env.NODE_ENV === 'development' ? otp : undefined // Only show in development
    })
  } catch (error) {
    console.error('OTP Send Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 