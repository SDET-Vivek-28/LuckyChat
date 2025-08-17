import { NextRequest, NextResponse } from 'next/server'
import { supabaseDatabase } from '@/lib/supabase-database'

// GET /api/users - Get all users with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const role = searchParams.get('role')
    const search = searchParams.get('search')

    let users

    if (search) {
      users = await supabaseDatabase.searchUsers(search)
    } else if (role) {
      users = await supabaseDatabase.getUsersByRole(role as 'user' | 'admin' | 'owner')
    } else {
      const result = await supabaseDatabase.getAllUsers(page, limit)
      return NextResponse.json(result)
    }

    return NextResponse.json({
      users,
      total: users.length,
      page: 1,
      totalPages: 1
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()

    // Validate required fields
    if (!userData.name || !userData.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await supabaseDatabase.findUserByEmail(userData.email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Create user
    const user = await supabaseDatabase.createUser({
      name: userData.name,
      email: userData.email,
      mobile: userData.mobile,
      password_hash: userData.password_hash,
      role: userData.role || 'user'
    })

    // Log the signup event
    await supabaseDatabase.logAuthEvent({
      user_id: user.id,
      action: 'signup',
      success: true,
      ip_address: request.headers.get('x-forwarded-for') || undefined,
      user_agent: request.headers.get('user-agent') || undefined,
      details: {
        method: 'email'
      }
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.created_at
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 