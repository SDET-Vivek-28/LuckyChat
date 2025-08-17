import { NextRequest, NextResponse } from 'next/server'
import { supabaseDatabase } from '@/lib/supabase-database'

// POST /api/auth/signin - User sign in
export async function POST(request: NextRequest) {
  try {
    const { email, mobile, password, otp, method } = await request.json()

    if (!method) {
      return NextResponse.json(
        { error: 'Authentication method is required' },
        { status: 400 }
      )
    }

    let user = null
    let identifier = ''

    if (method === 'email') {
      if (!email) {
        return NextResponse.json(
          { error: 'Email is required for email authentication' },
          { status: 400 }
        )
      }
      user = await supabaseDatabase.findUserByEmail(email)
      identifier = email
    } else if (method === 'mobile') {
      if (!mobile) {
        return NextResponse.json(
          { error: 'Mobile number is required for mobile authentication' },
          { status: 400 }
        )
      }
      user = await supabaseDatabase.findUserByMobile(mobile)
      identifier = mobile
    }

    if (!user) {
      // Log failed login attempt
      await supabaseDatabase.logAuthEvent({
        user_id: 'unknown',
        action: 'failed_login',
        success: false,
        ip_address: request.headers.get('x-forwarded-for') || undefined,
        user_agent: request.headers.get('user-agent') || undefined,
        details: {
          method: method as 'email' | 'mobile',
          failure_reason: 'User not found'
        }
      })

      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if user is active
    if (!user.is_active) {
      await supabaseDatabase.logAuthEvent({
        user_id: user.id,
        action: 'failed_login',
        success: false,
        ip_address: request.headers.get('x-forwarded-for') || undefined,
        user_agent: request.headers.get('user-agent') || undefined,
        details: {
          method: method as 'email' | 'mobile',
          failure_reason: 'Account deactivated'
        }
      })

      return NextResponse.json(
        { error: 'Account is deactivated' },
        { status: 403 }
      )
    }

    // Validate OTP if using mobile/email authentication
    if (method === 'mobile' || method === 'email') {
      if (!otp) {
        return NextResponse.json(
          { error: 'OTP is required' },
          { status: 400 }
        )
      }

      // Verify OTP using the OTP service
      const otpResult = await supabaseDatabase.verifyOTP(identifier, otp, method as 'sms' | 'email')
      if (!otpResult.success) {
        // Log failed OTP verification
        await supabaseDatabase.logAuthEvent({
          user_id: user.id,
          action: 'otp_verified',
          success: false,
          ip_address: request.headers.get('x-forwarded-for') || undefined,
          user_agent: request.headers.get('user-agent') || undefined,
          details: {
            method: method as 'email' | 'mobile',
            otp_type: method as 'sms' | 'email',
            failure_reason: 'Invalid OTP'
          }
        })

        return NextResponse.json(
          { error: otpResult.message || 'Invalid OTP' },
          { status: 400 }
        )
      }

      // Log successful OTP verification
      await supabaseDatabase.logAuthEvent({
        user_id: user.id,
        action: 'otp_verified',
        success: true,
        ip_address: request.headers.get('x-forwarded-for') || undefined,
        user_agent: request.headers.get('user-agent') || undefined,
        details: {
          method: method as 'email' | 'mobile',
          otp_type: method as 'sms' | 'email'
        }
      })
    }

    // Update user's last login and activity
    await supabaseDatabase.updateUser(user.id, {
      last_login: new Date().toISOString(),
      last_active: new Date().toISOString()
    })

    // Increment session count
    await supabaseDatabase.incrementSessionCount(user.id)

    // Log successful signin
    await supabaseDatabase.logAuthEvent({
      user_id: user.id,
      action: 'signin',
      success: true,
      ip_address: request.headers.get('x-forwarded-for') || undefined,
      user_agent: request.headers.get('user-agent') || undefined,
      details: {
        method: method as 'email' | 'mobile'
      }
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        createdAt: user.created_at,
        lastLogin: user.last_login,
        stats: user.stats
      }
    })
  } catch (error) {
    console.error('Authentication error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 