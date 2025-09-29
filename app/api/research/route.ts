import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { 
          error: 'ANTHROPIC_API_KEY not configured. Please add it to your environment variables.',
          type: 'missing_api_key'
        },
        { status: 500 }
      )
    }

    const { idea } = await request.json()

    if (!idea || idea.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide an idea to research' },
        { status: 400 }
      )
    }

    // Research prompt template
    const researchPrompt = `Do comprehensive product research for: "${idea}"

Please provide:

1. **Competitor Analysis**
   - Find similar products/services
   - What features do they have?
   - What do users love/hate?
   - Pricing models

2. **Core Features** (Must-Have for MVP)
   - List 5-8 essential features
   - Why each is necessary
   - Prioritize them

3. **User Workflows**
   - How will users interact?
   - Main user journey
   - Key actions step-by-step

4. **Technical Requirements**
   - APIs/services needed
   - Technical challenges
   - Database schema suggestions

5. **Product Differentiation**
   - How to be better than competitors
   - Unique value propositions

6. **MVP Scope Recommendation**
   - Phase 1 (build first)
   - Phase 2 (add later)
   - What to skip

Format the response as a detailed product specification that can be pasted into the builder. Make it comprehensive but actionable, with clear sections and specific recommendations.`

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 4000,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: researchPrompt
        }
      ]
    })

    const researchResult = message.content[0]
    
    if (researchResult.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    return NextResponse.json({
      success: true,
      research: researchResult.text
    })

  } catch (error: any) {
    console.error('Research API error:', error)

    // Handle specific Anthropic API errors
    if (error.status === 401) {
      return NextResponse.json(
        { 
          error: 'Invalid API key. Please check your ANTHROPIC_API_KEY.',
          type: 'invalid_api_key'
        },
        { status: 401 }
      )
    }

    if (error.status === 429) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again in a few minutes.',
          type: 'rate_limit'
        },
        { status: 429 }
      )
    }

    if (error.status === 500) {
      return NextResponse.json(
        { 
          error: 'Claude API is currently unavailable. Please try again later.',
          type: 'api_unavailable'
        },
        { status: 500 }
      )
    }

    // Generic error
    return NextResponse.json(
      { 
        error: 'Failed to research idea. Please try again.',
        type: 'generic_error'
      },
      { status: 500 }
    )
  }
}
