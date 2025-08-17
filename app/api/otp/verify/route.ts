import { NextRequest, NextResponse } from 'next/server'
import { supabaseDatabase } from '@/lib/supabase-database'

export async function POST(request: NextRequest) {
  try {
    const { type, identifier, otp } = await request.json()

    if (!type || !identifier || !otp) {
      return NextResponse.json(
        { error: 'Type, identifier, and OTP are required' },
        { status: 400 }
      )
    }

    if (type !== 'sms' && type !== 'email') {
      return NextResponse.json(
        { error: 'Type must be either "sms" or "email"' },
        { status: 400 }
      )
    }

    const result = await supabaseDatabase.verifyOTP(identifier, otp, type as 'sms' | 'email')

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message
      })
    } else {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('OTP Verify Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
      )
  }
} 