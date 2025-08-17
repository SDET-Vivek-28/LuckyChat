import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory OTP storage (in production, use Redis or database)
const otpStorage = new Map<string, { otp: string; expiresAt: Date; attempts: number }>()

export async function POST(request: NextRequest) {
  try {
    const { identifier, otp } = await request.json()

    if (!identifier || !otp) {
      return NextResponse.json(
        { error: 'Identifier and OTP are required' },
        { status: 400 }
      )
    }

    // Get stored OTP data
    const storedData = otpStorage.get(identifier)
    
    if (!storedData) {
      return NextResponse.json(
        { error: 'OTP not found or expired' },
        { status: 400 }
      )
    }

    // Check if OTP is expired
    if (new Date() > storedData.expiresAt) {
      otpStorage.delete(identifier)
      return NextResponse.json(
        { error: 'OTP has expired' },
        { status: 400 }
      )
    }

    // Check if too many attempts
    if (storedData.attempts >= 3) {
      otpStorage.delete(identifier)
      return NextResponse.json(
        { error: 'Too many failed attempts. Please request a new OTP.' },
        { status: 400 }
      )
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      // Increment attempts
      storedData.attempts++
      otpStorage.set(identifier, storedData)
      
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 400 }
      )
    }

    // OTP is valid - remove it from storage
    otpStorage.delete(identifier)

    return NextResponse.json({
      success: true,
      message: 'OTP verified successfully'
    })
  } catch (error) {
    console.error('OTP Verify Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 