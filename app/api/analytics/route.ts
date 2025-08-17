import { NextRequest, NextResponse } from 'next/server'
import { supabaseDatabase } from '@/lib/supabase-database'

// GET /api/analytics - Get analytics summary
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const type = searchParams.get('type') || 'summary'

    if (type === 'user' && userId) {
      // Get user-specific analytics
      const userStats = await supabaseDatabase.getUserStats(userId)
      if (!userStats) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        analytics: {
          userId,
          stats: userStats
        }
      })
    }

    // Get overall analytics summary
    const analytics = await supabaseDatabase.getAnalyticsSummary()
    
    // Update daily stats
    await supabaseDatabase.updateDailyStats()

    return NextResponse.json({
      success: true,
      analytics
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/analytics - Update analytics (increment counters, etc.)
export async function POST(request: NextRequest) {
  try {
    const { action, userId, data } = await request.json()

    if (!action || !userId) {
      return NextResponse.json(
        { error: 'Action and userId are required' },
        { status: 400 }
      )
    }

    switch (action) {
      case 'increment_message':
        await supabaseDatabase.incrementMessageCount(userId)
        break
      
      case 'increment_session':
        await supabaseDatabase.incrementSessionCount(userId)
        break
      
      case 'update_user_stats':
        if (data) {
          const today = new Date().toISOString().split('T')[0]
          await supabaseDatabase.updateUserAnalytics(userId, today, data)
        }
        break
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      message: `Analytics updated: ${action}`
    })
  } catch (error) {
    console.error('Error updating analytics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 