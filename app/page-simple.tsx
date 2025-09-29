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
  TestTube
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
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Project Scope</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { value: 'minimal', label: 'Minimal MVP', time: '1-2 weeks', description: 'Core features only, basic UI' },
                  { value: 'balanced', label: 'Balanced MVP', time: '3-4 weeks', description: 'Essential features with good UX' },
                  { value: 'complete', label: 'Complete MVP', time: '6-8 weeks', description: 'Full feature set with polish' }
                ].map((option) => (
                  <div
                    key={option.value}
                    onClick={() => setPreferences(prev => ({ ...prev, scope: option.value }))}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      preferences.scope === option.value
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
          {currentStep === 3 && <div className="text-center text-gray-800 dark:text-white">Step 3 - Coming Soon</div>}
          {currentStep === 4 && <div className="text-center text-gray-800 dark:text-white">Step 4 - Coming Soon</div>}
          {currentStep === 5 && <div className="text-center text-gray-800 dark:text-white">Step 5 - Coming Soon</div>}
          {currentStep === 6 && <div className="text-center text-gray-800 dark:text-white">Step 6 - Coming Soon</div>}
        </div>
      </div>
    </>
  )
}
