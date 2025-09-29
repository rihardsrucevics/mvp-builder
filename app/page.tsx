'use client'

import { useState } from 'react'
import { 
  ChevronRight, 
  Search,
  Loader2,
  AlertCircle,
  Clock,
  Zap,
  Target,
  Palette,
  Star,
  Shield,
  TestTube,
  Plus,
  X,
  CheckCircle,
  Circle
} from 'lucide-react'
import { ThemeSwitcher } from "@/components/theme-switcher"
import { PrelineInit } from "@/components/preline-init"

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
  credentialValues: { [key: string]: string }
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
  const [userCredentials, setUserCredentials] = useState<{ [key: string]: string }>({})

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
        completed: false,
        credentialValues: {}
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
        completed: false,
        credentialValues: {}
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
        completed: false,
        credentialValues: {}
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
        completed: false,
        credentialValues: {}
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
        completed: false,
        credentialValues: {}
      })
    }

    return items
  }

  // Extract features from project idea
  const extractFeatures = (idea: string): Feature[] => {
    const commonFeatures: Feature[] = [
      { id: 'auth', name: 'User Authentication', description: 'Login/signup functionality' },
      { id: 'dashboard', name: 'Dashboard', description: 'Main user interface' },
      { id: 'data-display', name: 'Data Display', description: 'Show and manage data' },
      { id: 'search', name: 'Search', description: 'Find and filter content' },
      { id: 'settings', name: 'Settings', description: 'User preferences and configuration' }
    ]

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

      setProjectIdea(data.research)
      
    } catch (error: any) {
      setResearchError(error.message)
    } finally {
      setIsResearching(false)
    }
  }

  // Validation
  const canProceedToStep = (step: number): boolean => {
    switch (step) {
      case 2:
        return projectIdea.trim().length > 0
      case 3:
        return Object.values(preferences).every(value => value !== '')
      case 4:
        return true
      case 5:
        return checklist.filter(item => item.required).every(item => item.completed)
      case 6:
        return true
      default:
        return true
    }
  }

  const canResearch = (): boolean => {
    return researchIdea.trim().length > 0 && !isResearching
  }

  const proceedToStep = (step: number) => {
    if (step === 5 && checklist.length === 0) {
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
      { number: 4, label: 'Summary' },
      { number: 5, label: 'Setup' },
      { number: 6, label: 'Prompts' }
    ]

    return (
      <div className="flex items-center justify-center space-x-2 mb-8 max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
              step.number < currentStep ? 'bg-blue-600 border-blue-600' :
              step.number === currentStep ? 'border-blue-600 bg-blue-100 dark:bg-blue-900/30' : 
              'border-gray-300 dark:border-neutral-600 bg-transparent'
            }`} />
            <span className={`ml-2 text-sm font-medium hidden sm:block ${
              step.number <= currentStep ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-neutral-400'
            }`}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <ChevronRight className="w-4 h-4 text-gray-400 dark:text-neutral-600 mx-2" />
            )}
          </div>
        ))}
      </div>
    )
  }

  const renderStep1 = () => (
    <div className="animate-fade-in space-y-8">
      <div className="text-center space-y-4">
        <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white">
          Start your journey with <span className="text-blue-600">MVP Builder</span>
        </h1>
        <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400">
          Build products with AI - Step 1: Tell us your idea and we&apos;ll research it for you
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-8 dark:bg-neutral-800 dark:border-neutral-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
            What do you want to build?
          </h2>
          <p className="text-gray-600 dark:text-neutral-400 mb-6 text-center">
            Describe your product idea in a few words, and our AI will research and create a detailed specification for you
          </p>
          
          <div className="space-y-4">
            <textarea
              value={researchIdea}
              onChange={(e) => setResearchIdea(e.target.value)}
              placeholder="For example: 'A task management app for remote teams' or 'A social media platform for pet owners'..."
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              rows={4}
            />

            <button
              onClick={handleResearch}
              disabled={!canResearch()}
              className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none w-full justify-center ${
                !canResearch() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isResearching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  AI is researching your idea...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Research This Idea
                </>
              )}
            </button>

            {/* Research Error */}
            {researchError && (
              <div className="bg-red-50 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900/20 dark:text-red-500">
                <div className="flex items-start gap-x-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Research Failed</p>
                    <p className="mt-1">{researchError}</p>
                    <button
                      onClick={() => setResearchError(null)}
                      className="mt-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 underline text-xs"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Show research result if available */}
            {projectIdea && !isResearching && (
              <div className="border-t border-gray-200 dark:border-neutral-700 pt-6">
                <div className="bg-green-50 border border-green-200 text-sm text-green-800 rounded-lg p-4 dark:bg-green-800/10 dark:border-green-900/20 dark:text-green-500">
                  <div className="flex items-start gap-x-2">
                    <div className="text-green-600 dark:text-green-400 mt-0.5">
                      ✅
                    </div>
                    <div>
                      <p className="font-medium">Research Complete!</p>
                      <p className="mt-1 mb-3">
                        Our AI has researched your idea and created a detailed specification. Ready to continue?
                      </p>
                      <button
                        onClick={() => proceedToStep(2)}
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:bg-green-700"
                      >
                        Continue to Preferences
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Set Your Preferences
        </h1>
        <p className="text-gray-600 dark:text-neutral-400">
          Help us understand how you want your product built
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-8 dark:bg-neutral-800 dark:border-neutral-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
            Choose your preferences
          </h2>
          <p className="text-gray-600 dark:text-neutral-400 mb-6">
            Select your preferences to customize your MVP. Each option includes time estimates.
          </p>
          
          <div className="space-y-8">
            {Object.entries(preferenceOptions).map(([key, options]) => (
              <div key={key}>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {options.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => handlePreferenceChange(key as keyof ProjectPreferences, option.value)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        preferences[key as keyof ProjectPreferences] === option.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-800 dark:text-white">{option.label}</h4>
                        <div className="flex items-center text-sm text-gray-500 dark:text-neutral-400">
                          <Clock className="w-4 h-4 mr-1" />
                          {option.time}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-neutral-400">{option.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={() => proceedToStep(3)}
              disabled={!canProceedToStep(3)}
              className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none ${
                !canProceedToStep(3) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Continue to Review
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Review & Edit
        </h1>
        <p className="text-gray-600 dark:text-neutral-400">
          Review your project details and make any adjustments
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-8 dark:bg-neutral-800 dark:border-neutral-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Project Title</h2>
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="Enter project title"
          />
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-8 dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Features</h2>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add new feature"
                className="py-2 px-3 block border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
              />
              <button
                onClick={handleAddFeature}
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            {features.map((feature) => (
              <div key={feature.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-neutral-700">
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">{feature.name}</h3>
                  <p className="text-gray-600 dark:text-neutral-400 text-sm">{feature.description}</p>
                </div>
                <button
                  onClick={() => handleRemoveFeature(feature.id)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-8 dark:bg-neutral-800 dark:border-neutral-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Project Summary</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{features.length}</div>
              <div className="text-gray-600 dark:text-neutral-400">Features</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{calculateEstimatedTime()} weeks</div>
              <div className="text-gray-600 dark:text-neutral-400">Estimated Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 capitalize">{preferences.scope}</div>
              <div className="text-gray-600 dark:text-neutral-400">Complexity</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8 max-w-4xl mx-auto">
        <button
          onClick={() => setCurrentStep(2)}
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        >
          Back
        </button>
        <button
          onClick={() => proceedToStep(4)}
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          Continue to Summary
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Project Summary
        </h1>
        <p className="text-gray-600 dark:text-neutral-400">
          Here&apos;s your complete project specification
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-8 dark:bg-neutral-800 dark:border-neutral-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{projectTitle}</h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">What You&apos;re Building</h3>
            <p className="text-gray-600 dark:text-neutral-400 mb-4 whitespace-pre-wrap">{projectIdea}</p>
            
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Core Features</h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-neutral-400 mb-4">
              {features.map((feature) => (
                <li key={feature.id}>{feature.name}: {feature.description}</li>
              ))}
            </ul>
            
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Technical Stack</h3>
            <p className="text-gray-600 dark:text-neutral-400 mb-4">
              Next.js 14, TypeScript, Tailwind CSS, and additional services based on your requirements.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Estimated Scope</h3>
            <div className="grid grid-cols-2 gap-4 text-gray-600 dark:text-neutral-400">
              <div>Complexity: <span className="font-medium capitalize">{preferences.scope}</span></div>
              <div>Design: <span className="font-medium capitalize">{preferences.designStyle}</span></div>
              <div>Quality: <span className="font-medium capitalize">{preferences.qualityLevel}</span></div>
              <div>Testing: <span className="font-medium capitalize">{preferences.testingStrategy}</span></div>
            </div>
            <p className="mt-4 text-gray-600 dark:text-neutral-400">
              <strong>Estimated Development Time: {calculateEstimatedTime()} weeks</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8 max-w-4xl mx-auto">
        <button
          onClick={() => setCurrentStep(3)}
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        >
          Back
        </button>
        <button
          onClick={() => proceedToStep(5)}
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          Looks Good, Continue to Setup
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )

  const renderStep5 = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Setup Checklist
        </h1>
        <p className="text-gray-600 dark:text-neutral-400">
          Complete these setup tasks to prepare for development
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {['Dev Environment', 'Hosting', 'Backend', 'API Credentials'].map((category) => {
          const categoryItems = checklist.filter(item => item.category === category)
          if (categoryItems.length === 0) return null

          return (
            <div key={category} className="bg-white border border-gray-200 shadow-sm rounded-xl p-8 dark:bg-neutral-800 dark:border-neutral-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{category}</h2>
              <div className="space-y-4">
                {categoryItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-neutral-900 rounded-lg">
                    <button
                      onClick={() => handleChecklistToggle(item.id)}
                      className="mt-1"
                    >
                      {item.completed ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                        {item.required && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs dark:bg-red-900/20 dark:text-red-400">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-neutral-400 text-sm mb-3">{item.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-800 dark:text-white text-sm">Instructions:</h4>
                        <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-neutral-400 text-sm ml-4">
                          {item.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                          ))}
                        </ol>
                      </div>

                      {item.links.length > 0 && (
                        <div className="mt-3">
                          <h4 className="font-medium text-gray-800 dark:text-white text-sm mb-2">Links:</h4>
                          <div className="flex flex-wrap gap-2">
                            {item.links.map((link, index) => (
                              <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-x-1 bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm hover:bg-blue-200 transition-colors dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                              >
                                {link.label}
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.credentials.length > 0 && (
                        <div className="mt-3">
                          <h4 className="font-medium text-gray-800 dark:text-white text-sm mb-2">Save these credentials:</h4>
                          <div className="flex flex-wrap gap-2">
                            {item.credentials.map((cred, index) => (
                              <span
                                key={index}
                                className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-mono dark:bg-yellow-900/20 dark:text-yellow-400"
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

      <div className="flex justify-between mt-8 max-w-4xl mx-auto">
        <button
          onClick={() => setCurrentStep(4)}
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        >
          Back
        </button>
        <button
          onClick={() => proceedToStep(6)}
          disabled={!canProceedToStep(5)}
          className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none ${
            !canProceedToStep(5) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Continue to Prompts
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )

  const renderStep6 = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Build Prompts
        </h1>
        <p className="text-gray-600 dark:text-neutral-400">
          Use these prompts with Claude Code to build your product step by step
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-8 dark:bg-neutral-800 dark:border-neutral-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">How to use these prompts:</h2>
          <div className="space-y-2 text-gray-600 dark:text-neutral-400">
            <p>1. Copy each prompt one at a time</p>
            <p>2. Paste it into Claude Code</p>
            <p>3. Follow the instructions Claude provides</p>
            <p>4. Move to the next prompt when ready</p>
            <p>5. Ask Claude for help if you get stuck</p>
          </div>
        </div>

        <div className="space-y-6">
          {[
            {
              phase: 'Phase 1: Planning & Architecture',
              prompt: `I want to build: ${projectTitle || 'My MVP'}

Project Description:
${projectIdea}

Please help me plan the architecture and create a detailed technical specification. Include:
1. Technology stack recommendations
2. Database schema design
3. API structure
4. Component architecture
5. File structure
6. Development workflow`
            },
            {
              phase: 'Phase 2: Start Development',
              prompt: `Let's start building: ${projectTitle || 'My MVP'}

Project Description:
${projectIdea}

Please help me:
1. Set up the project structure
2. Install necessary dependencies
3. Create the basic app shell
4. Implement core routing
5. Set up basic styling and layout
6. Create initial components

Start with the foundation and we'll build features step by step.`
            },
            {
              phase: 'Phase 3: Continue Development',
              prompt: `Continuing development of: ${projectTitle || 'My MVP'}

Project Description:
${projectIdea}

Based on our current progress, please help me:
1. Implement the main features
2. Add user interactions
3. Connect to APIs/databases
4. Handle data flow
5. Add error handling
6. Implement responsive design

Focus on making it functional and user-friendly.`
            }
          ].map((prompt, index) => (
            <div key={index} className="bg-white border border-gray-200 shadow-sm rounded-xl p-8 dark:bg-neutral-800 dark:border-neutral-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{prompt.phase}</h3>
                <button
                  onClick={() => navigator.clipboard.writeText(prompt.prompt)}
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                >
                  Copy
                </button>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 dark:bg-black">
                <pre className="text-gray-100 text-sm whitespace-pre-wrap font-mono">
                  {prompt.prompt}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => setCurrentStep(1)}
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          Start New Project
        </button>
      </div>
    </div>
  )

  return (
    <>
      <PrelineInit />
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
        {/* Header with theme switcher */}
        <div className="flex justify-end p-4">
          <ThemeSwitcher />
        </div>
        
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {renderProgressIndicator()}
          
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
          {currentStep === 6 && renderStep6()}
        </div>
      </div>
    </>
  )
}
