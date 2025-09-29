'use client'

import { useState } from 'react'
import { 
  ChevronRight, 
  Copy, 
  Plus, 
  X, 
  CheckCircle, 
  Circle,
  Clock,
  Zap,
  Target,
  Palette,
  Star,
  Shield,
  TestTube,
  ExternalLink,
  Lightbulb,
  Search,
  Loader2,
  AlertCircle,
  RefreshCw
} from 'lucide-react'

// Types
interface ProjectPreferences {
  scope: string
  designStyle: string
  featurePriority: string
  qualityLevel: string
  testingStrategy: string
}

interface ChecklistItem {
  id: string
  category: string
  title: string
  description: string
  instructions: string[]
  links: { label: string; url: string }[]
  credentials: string[]
  required: boolean
  completed: boolean
}

interface Feature {
  id: string
  name: string
  description: string
}

export default function MVPBuilder() {
  // State management
  const [currentStep, setCurrentStep] = useState(1)
  const [projectIdea, setProjectIdea] = useState('')
  const [inputMode, setInputMode] = useState<'manual' | 'research'>('manual')
  const [researchIdea, setResearchIdea] = useState('')
  const [isResearching, setIsResearching] = useState(false)
  const [researchError, setResearchError] = useState<string | null>(null)
  const [preferences, setPreferences] = useState<ProjectPreferences>({
    scope: '',
    designStyle: '',
    featurePriority: '',
    qualityLevel: '',
    testingStrategy: ''
  })
  const [projectTitle, setProjectTitle] = useState('')
  const [features, setFeatures] = useState<Feature[]>([])
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [newFeature, setNewFeature] = useState('')

  // Preference options with time estimates
  const preferenceOptions = {
    scope: [
      { value: 'minimal', label: 'Minimal MVP', time: '1-2 weeks', description: 'Core features only, basic UI' },
      { value: 'balanced', label: 'Balanced', time: '3-4 weeks', description: 'Essential features + polish' },
      { value: 'complete', label: 'Complete', time: '6-8 weeks', description: 'Full feature set with advanced UI' }
    ],
    designStyle: [
      { value: 'minimal', label: 'Minimal', time: '+1 week', description: 'Clean, simple, functional' },
      { value: 'bold', label: 'Bold', time: '+2 weeks', description: 'Vibrant colors, animations' },
      { value: 'professional', label: 'Professional', time: '+1.5 weeks', description: 'Corporate, polished' },
      { value: 'playful', label: 'Playful', time: '+2 weeks', description: 'Fun, creative, engaging' }
    ],
    featurePriority: [
      { value: 'mvp', label: 'MVP Features', time: 'Base time', description: 'Essential functionality only' },
      { value: 'enhanced', label: 'Enhanced', time: '+2 weeks', description: 'MVP + key improvements' },
      { value: 'full', label: 'Full Feature Set', time: '+4 weeks', description: 'All features + extras' }
    ],
    qualityLevel: [
      { value: 'prototype', label: 'Prototype', time: 'Base time', description: 'Quick build, basic testing' },
      { value: 'production', label: 'Production Ready', time: '+2 weeks', description: 'Full testing, optimization' },
      { value: 'enterprise', label: 'Enterprise Grade', time: '+4 weeks', description: 'Advanced security, monitoring' }
    ],
    testingStrategy: [
      { value: 'local', label: 'Local Testing', time: 'Base time', description: 'Manual testing during development' },
      { value: 'preview', label: 'Preview Deployments', time: '+1 week', description: 'Staging environment testing' },
      { value: 'production', time: '+2 weeks', label: 'Production Testing', description: 'Full CI/CD with automated tests' }
    ]
  }

  // Smart checklist generation based on project idea
  const generateChecklist = (idea: string): ChecklistItem[] => {
    const items: ChecklistItem[] = [
      {
        id: 'cursor',
        category: 'Dev Environment',
        title: 'Install Cursor Editor',
        description: 'Download and install Cursor for AI-powered development',
        instructions: [
          'Visit cursor.sh and download the editor',
          'Install Cursor on your system',
          'Sign up for an account if needed'
        ],
        links: [{ label: 'Download Cursor', url: 'https://cursor.sh' }],
        credentials: [],
        required: true,
        completed: false
      },
      {
        id: 'github',
        category: 'Dev Environment',
        title: 'Create GitHub Repository',
        description: 'Set up version control for your project',
        instructions: [
          'Create a new repository on GitHub',
          'Initialize with a README file',
          'Note down the repository URL'
        ],
        links: [{ label: 'Create Repository', url: 'https://github.com/new' }],
        credentials: ['Repository URL'],
        required: true,
        completed: false
      },
      {
        id: 'vercel',
        category: 'Hosting',
        title: 'Set up Vercel Account',
        description: 'Deploy your app to Vercel for production',
        instructions: [
          'Sign up for Vercel account',
          'Connect your GitHub account',
          'Prepare for deployment'
        ],
        links: [{ label: 'Sign up for Vercel', url: 'https://vercel.com' }],
        credentials: ['Vercel account email'],
        required: true,
        completed: false
      }
    ]

    // Smart detection based on keywords
    const lowerIdea = idea.toLowerCase()

    if (lowerIdea.includes('auth') || lowerIdea.includes('login') || lowerIdea.includes('user')) {
      items.push({
        id: 'supabase',
        category: 'Backend',
        title: 'Set up Supabase',
        description: 'Database and authentication backend',
        instructions: [
          'Create a new project on Supabase',
          'Copy the project URL and anon key',
          'Set up authentication tables if needed'
        ],
        links: [{ label: 'Create Supabase Project', url: 'https://supabase.com' }],
        credentials: ['SUPABASE_URL', 'SUPABASE_ANON_KEY'],
        required: true,
        completed: false
      })
    }

    if (lowerIdea.includes('reddit')) {
      items.push({
        id: 'reddit-api',
        category: 'API Credentials',
        title: 'Reddit API Setup',
        description: 'Get Reddit API credentials for data access',
        instructions: [
          'Go to reddit.com/prefs/apps',
          'Create a new app (script type)',
          'Copy client ID and secret'
        ],
        links: [{ label: 'Reddit API Setup', url: 'https://reddit.com/prefs/apps' }],
        credentials: ['REDDIT_CLIENT_ID', 'REDDIT_CLIENT_SECRET'],
        required: true,
        completed: false
      })
    }

    if (lowerIdea.includes('bluesky')) {
      items.push({
        id: 'bluesky',
        category: 'API Credentials',
        title: 'Bluesky API Setup',
        description: 'Get Bluesky API credentials',
        instructions: [
          'Create a Bluesky account',
          'Generate an app password',
          'Note down your handle and password'
        ],
        links: [{ label: 'Bluesky Signup', url: 'https://bsky.app' }],
        credentials: ['BLUESKY_HANDLE', 'BLUESKY_APP_PASSWORD'],
        required: true,
        completed: false
      })
    }

    if (lowerIdea.includes('openai') || lowerIdea.includes('gpt') || lowerIdea.includes('ai')) {
      items.push({
        id: 'openai',
        category: 'API Credentials',
        title: 'OpenAI API Setup',
        description: 'Get OpenAI API key for AI features',
        instructions: [
          'Sign up for OpenAI account',
          'Go to API keys section',
          'Create a new API key'
        ],
        links: [{ label: 'OpenAI API Keys', url: 'https://platform.openai.com/api-keys' }],
        credentials: ['OPENAI_API_KEY'],
        required: true,
        completed: false
      })
    }

    if (lowerIdea.includes('payment') || lowerIdea.includes('stripe')) {
      items.push({
        id: 'stripe',
        category: 'API Credentials',
        title: 'Stripe Payment Setup',
        description: 'Set up Stripe for payment processing',
        instructions: [
          'Create Stripe account',
          'Get your publishable and secret keys',
          'Set up webhook endpoints'
        ],
        links: [{ label: 'Stripe Dashboard', url: 'https://dashboard.stripe.com' }],
        credentials: ['STRIPE_PUBLISHABLE_KEY', 'STRIPE_SECRET_KEY'],
        required: true,
        completed: false
      })
    }

    return items
  }

  // Generate build prompts
  const generatePrompts = () => {
    const envVars = checklist
      .filter(item => item.credentials.length > 0)
      .flatMap(item => item.credentials)

    const envVarsText = envVars.length > 0 
      ? `\n\nWhen you need these environment variables, ask the user to paste the values:\n${envVars.map(v => `- ${v}`).join('\n')}`
      : ''

    const featuresText = features.length > 0 
      ? `\n\nFeatures to implement:\n${features.map(f => `- ${f.name}: ${f.description}`).join('\n')}`
      : ''

    const preferencesText = `
Scope: ${preferences.scope}
Design Style: ${preferences.designStyle}
Feature Priority: ${preferences.featurePriority}
Quality Level: ${preferences.qualityLevel}
Testing Strategy: ${preferences.testingStrategy}`

    return [
      {
        phase: 'Phase 1: Planning & Architecture',
        prompt: `I want to build: ${projectTitle || 'My MVP'}

Project Description:
${projectIdea}

Preferences:${preferencesText}${featuresText}

Please help me plan the architecture and create a detailed technical specification. Include:
1. Technology stack recommendations
2. Database schema design
3. API structure
4. Component architecture
5. File structure
6. Development workflow

${envVarsText}`
      },
      {
        phase: 'Phase 2: Start Development',
        prompt: `Let's start building: ${projectTitle || 'My MVP'}

Project Description:
${projectIdea}

Preferences:${preferencesText}${featuresText}

Please help me:
1. Set up the project structure
2. Install necessary dependencies
3. Create the basic app shell
4. Implement core routing
5. Set up basic styling and layout
6. Create initial components

Start with the foundation and we'll build features step by step.

${envVarsText}`
      },
      {
        phase: 'Phase 3: Continue Development',
        prompt: `Continuing development of: ${projectTitle || 'My MVP'}

Project Description:
${projectIdea}

Preferences:${preferencesText}${featuresText}

Based on our current progress, please help me:
1. Implement the main features
2. Add user interactions
3. Connect to APIs/databases
4. Handle data flow
5. Add error handling
6. Implement responsive design

Focus on making it functional and user-friendly.

${envVarsText}`
      },
      {
        phase: 'Phase 4: Checkpoint Review',
        prompt: `Mid-development review for: ${projectTitle || 'My MVP'}

Project Description:
${projectIdea}

Preferences:${preferencesText}${featuresText}

Please help me:
1. Review current implementation
2. Identify any issues or improvements
3. Optimize performance
4. Improve code quality
5. Add missing features
6. Fix bugs

Let's make sure everything is working well before final polish.

${envVarsText}`
      },
      {
        phase: 'Phase 5: Error Recovery',
        prompt: `Need help with issues in: ${projectTitle || 'My MVP'}

Project Description:
${projectIdea}

Preferences:${preferencesText}${featuresText}

I'm encountering some issues. Please help me:
1. Debug current problems
2. Fix broken functionality
3. Resolve deployment issues
4. Handle edge cases
5. Improve error handling
6. Test thoroughly

Focus on making the app stable and reliable.

${envVarsText}`
      },
      {
        phase: 'Phase 6: Pre-Deployment Testing',
        prompt: `Final testing for: ${projectTitle || 'My MVP'}

Project Description:
${projectIdea}

Preferences:${preferencesText}${featuresText}

Please help me:
1. Test all functionality thoroughly
2. Check responsive design
3. Optimize for performance
4. Add final polish
5. Prepare for deployment
6. Create deployment checklist

Let's make sure everything is perfect before going live.

${envVarsText}`
      },
      {
        phase: 'Phase 7: Production Deployment',
        prompt: `Deploy to production: ${projectTitle || 'My MVP'}

Project Description:
${projectIdea}

Preferences:${preferencesText}${featuresText}

Please help me:
1. Deploy to Vercel
2. Set up environment variables
3. Configure domain (if needed)
4. Set up monitoring
5. Test production deployment
6. Go live!

Let's get this app running in production.

${envVarsText}`
      }
    ]
  }

  // Extract features from project idea
  const extractFeatures = (idea: string): Feature[] => {
    // Simple feature extraction - in a real app, this could be more sophisticated
    const commonFeatures: Feature[] = [
      { id: 'auth', name: 'User Authentication', description: 'Login/signup functionality' },
      { id: 'dashboard', name: 'Dashboard', description: 'Main user interface' },
      { id: 'data-display', name: 'Data Display', description: 'Show and manage data' },
      { id: 'search', name: 'Search', description: 'Find and filter content' },
      { id: 'settings', name: 'Settings', description: 'User preferences and configuration' }
    ]

    // Add features based on keywords
    const features: Feature[] = []
    const lowerIdea = idea.toLowerCase()

    if (lowerIdea.includes('auth') || lowerIdea.includes('login')) {
      features.push(commonFeatures[0])
    }
    if (lowerIdea.includes('dashboard') || lowerIdea.includes('home')) {
      features.push(commonFeatures[1])
    }
    if (lowerIdea.includes('data') || lowerIdea.includes('list') || lowerIdea.includes('table')) {
      features.push(commonFeatures[2])
    }
    if (lowerIdea.includes('search') || lowerIdea.includes('filter')) {
      features.push(commonFeatures[3])
    }
    if (lowerIdea.includes('settings') || lowerIdea.includes('preferences')) {
      features.push(commonFeatures[4])
    }

    // If no specific features found, add basic ones
    if (features.length === 0) {
      features.push(commonFeatures[1], commonFeatures[2])
    }

    return features
  }

  // Calculate estimated time
  const calculateEstimatedTime = () => {
    let baseTime = 2 // weeks
    let additionalTime = 0

    // Add time based on scope
    if (preferences.scope === 'minimal') additionalTime += 0
    else if (preferences.scope === 'balanced') additionalTime += 2
    else if (preferences.scope === 'complete') additionalTime += 4

    // Add time based on design style
    if (preferences.designStyle === 'minimal') additionalTime += 1
    else if (preferences.designStyle === 'bold') additionalTime += 2
    else if (preferences.designStyle === 'professional') additionalTime += 1.5
    else if (preferences.designStyle === 'playful') additionalTime += 2

    // Add time based on feature priority
    if (preferences.featurePriority === 'enhanced') additionalTime += 2
    else if (preferences.featurePriority === 'full') additionalTime += 4

    // Add time based on quality level
    if (preferences.qualityLevel === 'production') additionalTime += 2
    else if (preferences.qualityLevel === 'enterprise') additionalTime += 4

    // Add time based on testing strategy
    if (preferences.testingStrategy === 'preview') additionalTime += 1
    else if (preferences.testingStrategy === 'production') additionalTime += 2

    return Math.max(baseTime + additionalTime, 1)
  }

  // Step validation
  const canProceedToStep = (step: number): boolean => {
    switch (step) {
      case 2:
        return projectIdea.trim().length > 0
      case 3:
        return Object.values(preferences).every(value => value !== '')
      case 4:
        return checklist.filter(item => item.required).every(item => item.completed)
      case 5:
        return true
      default:
        return true
    }
  }

  // Check if research button should be enabled
  const canResearch = (): boolean => {
    return researchIdea.trim().length > 0 && !isResearching
  }

  // Event handlers
  const handlePreferenceChange = (key: keyof ProjectPreferences, value: string) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      const feature: Feature = {
        id: Date.now().toString(),
        name: newFeature.trim(),
        description: 'Custom feature'
      }
      setFeatures(prev => [...prev, feature])
      setNewFeature('')
    }
  }

  const handleRemoveFeature = (id: string) => {
    setFeatures(prev => prev.filter(f => f.id !== id))
  }

  const handleChecklistToggle = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  // Research function
  const handleResearch = async () => {
    if (!researchIdea.trim()) return

    setIsResearching(true)
    setResearchError(null)

    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea: researchIdea }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to research idea')
      }

      // Set the researched content as the project idea
      setProjectIdea(data.research)
      setInputMode('manual') // Switch to manual mode to show the result
      
    } catch (error: any) {
      setResearchError(error.message)
    } finally {
      setIsResearching(false)
    }
  }

  // Initialize checklist when moving to step 4
  const proceedToStep = (step: number) => {
    if (step === 4 && checklist.length === 0) {
      const newChecklist = generateChecklist(projectIdea)
      setChecklist(newChecklist)
    }
    if (step === 3 && features.length === 0) {
      const extractedFeatures = extractFeatures(projectIdea)
      setFeatures(extractedFeatures)
      if (!projectTitle) {
        setProjectTitle('My MVP')
      }
    }
    setCurrentStep(step)
  }

  const renderProgressIndicator = () => {
    const steps = [
      { number: 1, label: 'Idea' },
      { number: 2, label: 'Preferences' },
      { number: 3, label: 'Review' },
      { number: 4, label: 'Setup' },
      { number: 5, label: 'Prompts' }
    ]

    return (
      <div className="flex items-center justify-center space-x-4 mb-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`progress-dot ${
              step.number < currentStep ? 'completed' :
              step.number === currentStep ? 'current' : 'upcoming'
            }`} />
            <span className={`ml-2 text-sm font-medium ${
              step.number <= currentStep ? 'text-white' : 'text-white/60'
            }`}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <ChevronRight className="w-4 h-4 text-white/40 mx-4" />
            )}
          </div>
        ))}
      </div>
    )
  }

  const renderStep1 = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 text-shadow">
          MVP Builder
        </h1>
        <p className="text-xl text-white/80 mb-2">
          Build products with AI
        </p>
        <p className="text-white/60">
          Step 1: Tell us about your product idea
        </p>
      </div>

      <div className="glass-card p-8 mb-6">
        <h2 className="text-2xl font-semibold text-white mb-6">
          What do you want to build?
        </h2>

        {/* Input Mode Toggle */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setInputMode('manual')}
            className={`flex-1 p-4 rounded-lg border-2 transition-all duration-200 ${
              inputMode === 'manual'
                ? 'border-purple-400 bg-purple-500/20 text-white'
                : 'border-white/20 bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Copy className="w-5 h-5" />
              <span className="font-medium">I have a detailed spec already</span>
            </div>
            <p className="text-sm mt-1 opacity-80">Paste your complete product specification</p>
          </button>

          <button
            onClick={() => setInputMode('research')}
            className={`flex-1 p-4 rounded-lg border-2 transition-all duration-200 ${
              inputMode === 'research'
                ? 'border-purple-400 bg-purple-500/20 text-white'
                : 'border-white/20 bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Search className="w-5 h-5" />
              <span className="font-medium">Research my idea with AI</span>
            </div>
            <p className="text-sm mt-1 opacity-80">AI will research and create a detailed spec</p>
          </button>
        </div>

        {/* Manual Input Mode */}
        {inputMode === 'manual' && (
          <div>
            <textarea
              value={projectIdea}
              onChange={(e) => setProjectIdea(e.target.value)}
              placeholder="Describe your product idea in detail. What problem does it solve? Who is it for? What features should it have? Be as specific as possible..."
              className="glass-textarea w-full h-48 mb-4"
            />
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-3">
                Need inspiration? Here are some examples:
              </h3>
              <div className="grid gap-3">
                {[
                  "A Reddit clone where users can create communities, post content, and vote on posts. Include user authentication, moderation tools, and a clean mobile-responsive design.",
                  "A task management app like Trello with drag-and-drop boards, team collaboration, file attachments, and real-time updates.",
                  "A social media dashboard that aggregates posts from Twitter, Instagram, and Facebook with analytics and scheduling features.",
                  "An e-commerce platform for selling digital products with Stripe payments, user accounts, and an admin dashboard."
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setProjectIdea(example)}
                    className="glass-button text-left p-4 hover:bg-white/20 transition-all duration-200"
                  >
                    <div className="flex items-start space-x-3">
                      <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/90 text-sm">{example}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Research Input Mode */}
        {inputMode === 'research' && (
          <div>
            <textarea
              value={researchIdea}
              onChange={(e) => setResearchIdea(e.target.value)}
              placeholder="Describe your product idea briefly. For example: 'A task management app for remote teams' or 'A social media platform for pet owners'..."
              className="glass-textarea w-full h-32 mb-4"
            />

            {/* Research Button */}
            <button
              onClick={handleResearch}
              disabled={!canResearch()}
              className={`w-full glass-button-primary mb-4 ${
                !canResearch() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isResearching ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>AI is researching your idea...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Search className="w-5 h-5" />
                  <span>Research This Idea</span>
                </div>
              )}
            </button>

            {/* Research Error */}
            {researchError && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-red-300 mb-1">Research Failed</h4>
                    <p className="text-red-200 text-sm mb-3">{researchError}</p>
                    <button
                      onClick={() => setResearchError(null)}
                      className="text-red-300 hover:text-red-200 text-sm underline"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Research Examples */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-3">
                Research examples:
              </h3>
              <div className="grid gap-3">
                {[
                  "A Reddit clone for tech discussions",
                  "Task management app for remote teams",
                  "Social media dashboard with analytics",
                  "E-commerce platform for digital products"
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setResearchIdea(example)}
                    disabled={isResearching}
                    className="glass-button text-left p-4 hover:bg-white/20 transition-all duration-200 disabled:opacity-50"
                  >
                    <div className="flex items-start space-x-3">
                      <Search className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/90 text-sm">{example}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={() => proceedToStep(2)}
          disabled={!canProceedToStep(2)}
          className={`w-full glass-button-primary ${
            !canProceedToStep(2) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Continue to Preferences
        </button>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 text-shadow">
          Set Your Preferences
        </h1>
        <p className="text-white/80">
          Help us understand how you want your product built
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(preferenceOptions).map(([key, options]) => (
          <div key={key} className="glass-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4 capitalize">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handlePreferenceChange(key as keyof ProjectPreferences, option.value)}
                  className={`option-card ${preferences[key as keyof ProjectPreferences] === option.value ? 'selected' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">{option.label}</h4>
                    <div className="flex items-center space-x-1 text-purple-300">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{option.time}</span>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm">{option.description}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCurrentStep(1)}
          className="glass-button"
        >
          Back
        </button>
        <button
          onClick={() => proceedToStep(3)}
          disabled={!canProceedToStep(3)}
          className={`glass-button-primary ${
            !canProceedToStep(3) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Continue to Review
        </button>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 text-shadow">
          Review & Edit
        </h1>
        <p className="text-white/80">
          Review your project details and make any adjustments
        </p>
      </div>

      <div className="space-y-6">
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Project Title</h2>
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="glass-input w-full"
            placeholder="Enter project title"
          />
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Features</h2>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add new feature"
                className="glass-input flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
              />
              <button
                onClick={handleAddFeature}
                className="glass-button-primary p-3"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            {features.map((feature) => (
              <div key={feature.id} className="flex items-center justify-between glass-card p-4">
                <div>
                  <h3 className="font-medium text-white">{feature.name}</h3>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
                <button
                  onClick={() => handleRemoveFeature(feature.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Project Summary</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{features.length}</div>
              <div className="text-white/70">Features</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">{calculateEstimatedTime()} weeks</div>
              <div className="text-white/70">Estimated Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{preferences.scope}</div>
              <div className="text-white/70">Complexity</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCurrentStep(2)}
          className="glass-button"
        >
          Back
        </button>
        <button
          onClick={() => proceedToStep(4)}
          className="glass-button-primary"
        >
          Continue to Setup
        </button>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 text-shadow">
          Setup Checklist
        </h1>
        <p className="text-white/80">
          Complete these setup tasks to prepare for development
        </p>
      </div>

      <div className="space-y-6">
        {['Dev Environment', 'Hosting', 'Backend', 'API Credentials'].map((category) => {
          const categoryItems = checklist.filter(item => item.category === category)
          if (categoryItems.length === 0) return null

          return (
            <div key={category} className="glass-card p-6">
              <h2 className="text-xl font-semibold text-white mb-4">{category}</h2>
              <div className="space-y-4">
                {categoryItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg">
                    <button
                      onClick={() => handleChecklistToggle(item.id)}
                      className="mt-1"
                    >
                      {item.completed ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : (
                        <Circle className="w-6 h-6 text-white/60" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        {item.required && (
                          <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-white/70 text-sm mb-3">{item.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-white/90 text-sm">Instructions:</h4>
                        <ol className="list-decimal list-inside space-y-1 text-white/70 text-sm ml-4">
                          {item.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                          ))}
                        </ol>
                      </div>

                      {item.links.length > 0 && (
                        <div className="mt-3">
                          <h4 className="font-medium text-white/90 text-sm mb-2">Links:</h4>
                          <div className="flex flex-wrap gap-2">
                            {item.links.map((link, index) => (
                              <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-1 bg-purple-500/20 text-purple-300 px-3 py-1 rounded text-sm hover:bg-purple-500/30 transition-colors"
                              >
                                <span>{link.label}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.credentials.length > 0 && (
                        <div className="mt-3">
                          <h4 className="font-medium text-white/90 text-sm mb-2">Save these credentials:</h4>
                          <div className="flex flex-wrap gap-2">
                            {item.credentials.map((cred, index) => (
                              <span
                                key={index}
                                className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-xs font-mono"
                              >
                                {cred}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCurrentStep(3)}
          className="glass-button"
        >
          Back
        </button>
        <button
          onClick={() => proceedToStep(5)}
          disabled={!canProceedToStep(4)}
          className={`glass-button-primary ${
            !canProceedToStep(4) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Continue to Prompts
        </button>
      </div>
    </div>
  )

  const renderStep5 = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 text-shadow">
          Build Prompts
        </h1>
        <p className="text-white/80">
          Use these prompts with Claude Code to build your product step by step
        </p>
      </div>

      <div className="glass-card p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">How to use these prompts:</h2>
        <div className="space-y-2 text-white/80">
          <p>1. Copy each prompt one at a time</p>
          <p>2. Paste it into Claude Code</p>
          <p>3. Follow the instructions Claude provides</p>
          <p>4. Move to the next prompt when ready</p>
          <p>5. Ask Claude for help if you get stuck</p>
        </div>
      </div>

      <div className="space-y-6">
        {generatePrompts().map((prompt, index) => (
          <div key={index} className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">{prompt.phase}</h3>
              <button
                onClick={() => copyToClipboard(prompt.prompt)}
                className="glass-button flex items-center space-x-2"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
            </div>
            <div className="bg-black/20 rounded-lg p-4">
              <pre className="text-white/90 text-sm whitespace-pre-wrap font-mono">
                {prompt.prompt}
              </pre>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => setCurrentStep(1)}
          className="glass-button-primary"
        >
          Start New Project
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-main-gradient">
      <div className="container mx-auto px-4 py-8">
        {renderProgressIndicator()}
        
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
      </div>
    </div>
  )
}
