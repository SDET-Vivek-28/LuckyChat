'use client'

import React, { useState } from 'react'
import { Code, Play, Copy, Download, BookOpen, Calculator, Zap } from 'lucide-react'

interface CodeGeneratorProps {
  onCodeGenerated: (code: string, language: string, explanation: string) => void
}

export default function CodeGenerator({ onCodeGenerated }: CodeGeneratorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('python')
  const [problemDescription, setProblemDescription] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')
  const [explanation, setExplanation] = useState('')
  const [showExamples, setShowExamples] = useState(false)

  const programmingLanguages = [
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'javascript', label: 'JavaScript', icon: '🟨' },
    { value: 'java', label: 'Java', icon: '☕' },
    { value: 'cpp', label: 'C++', icon: '⚡' },
    { value: 'html', label: 'HTML/CSS', icon: '🌐' },
    { value: 'sql', label: 'SQL', icon: '🗄️' }
  ]

  const mathTopics = [
    { value: 'algebra', label: 'Algebra', icon: '📐' },
    { value: 'calculus', label: 'Calculus', icon: '📊' },
    { value: 'geometry', label: 'Geometry', icon: '🔷' },
    { value: 'statistics', label: 'Statistics', icon: '📈' },
    { value: 'trigonometry', label: 'Trigonometry', icon: '📐' },
    { value: 'number_theory', label: 'Number Theory', icon: '🔢' }
  ]

  const generateCode = async () => {
    if (!problemDescription.trim()) return
    
    setIsGenerating(true)
    
    try {
      // Simulate AI code generation (replace with actual AI service)
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const { code, explanation: exp } = generateCodeForProblem(problemDescription, selectedLanguage)
      setGeneratedCode(code)
      setExplanation(exp)
      
      // Call parent component
      onCodeGenerated(code, selectedLanguage, exp)
      
    } catch (error) {
      console.error('Code generation error:', error)
      setExplanation('Sorry, I encountered an error generating code. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateCodeForProblem = (description: string, language: string) => {
    const lowerDesc = description.toLowerCase()
    
    // Python examples
    if (language === 'python') {
      if (lowerDesc.includes('factorial') || lowerDesc.includes('factorial')) {
        return {
          code: `def factorial(n):
    """Calculate factorial of a number"""
    if n < 0:
        return "Error: Factorial not defined for negative numbers"
    elif n == 0 or n == 1:
        return 1
    else:
        result = 1
        for i in range(2, n + 1):
            result *= i
        return result

# Example usage
number = 5
print(f"Factorial of {number} is: {factorial(number)}")`,
          explanation: 'This Python function calculates the factorial of a number using a loop. It handles edge cases like negative numbers and zero, then iterates from 2 to n to calculate the product.'
        }
      }
      
      if (lowerDesc.includes('fibonacci') || lowerDesc.includes('fibonacci')) {
        return {
          code: `def fibonacci(n):
    """Generate Fibonacci sequence up to n terms"""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    
    sequence = [0, 1]
    for i in range(2, n):
        sequence.append(sequence[i-1] + sequence[i-2])
    return sequence

# Example usage
terms = 10
fib_sequence = fibonacci(terms)
print(f"First {terms} Fibonacci numbers: {fib_sequence}")`,
          explanation: 'This function generates the Fibonacci sequence up to n terms. It starts with [0, 1] and builds the sequence by adding the previous two numbers.'
        }
      }
      
      if (lowerDesc.includes('prime') || lowerDesc.includes('prime')) {
        return {
          code: `def is_prime(n):
    """Check if a number is prime"""
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    
    # Check odd numbers up to square root
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0:
            return False
    return True

def find_primes_up_to(n):
    """Find all prime numbers up to n"""
    primes = []
    for num in range(2, n + 1):
        if is_prime(num):
            primes.append(num)
    return primes

# Example usage
number = 17
print(f"Is {number} prime? {is_prime(number)}")

limit = 50
prime_list = find_primes_up_to(limit)
print(f"Primes up to {limit}: {prime_list}")`,
          explanation: 'This code includes two functions: one to check if a number is prime and another to find all primes up to a given number. It uses optimization techniques like checking only up to the square root and skipping even numbers.'
        }
      }
    }
    
    // JavaScript examples
    if (language === 'javascript') {
      if (lowerDesc.includes('array') || lowerDesc.includes('sort')) {
        return {
          code: `// Array sorting and manipulation
function sortArray(arr, order = 'asc') {
    if (order === 'asc') {
        return [...arr].sort((a, b) => a - b);
    } else {
        return [...arr].sort((a, b) => b - a);
    }
}

function findMaxMin(arr) {
    if (arr.length === 0) return null;
    
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const sum = arr.reduce((acc, val) => acc + val, 0);
    const average = sum / arr.length;
    
    return { max, min, sum, average };
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log('Original array:', numbers);
console.log('Sorted ascending:', sortArray(numbers, 'asc'));
console.log('Sorted descending:', sortArray(numbers, 'desc'));
console.log('Statistics:', findMaxMin(numbers));`,
          explanation: 'This JavaScript code demonstrates array manipulation with sorting and statistical analysis. It includes functions for sorting arrays in ascending or descending order and calculating basic statistics.'
        }
      }
    }
    
    // Math problem examples
    if (lowerDesc.includes('equation') || lowerDesc.includes('solve')) {
      return {
        code: `# Solving quadratic equation: ax² + bx + c = 0
import math

def solve_quadratic(a, b, c):
    """Solve quadratic equation using quadratic formula"""
    if a == 0:
        return "Error: 'a' cannot be zero (not a quadratic equation)"
    
    # Calculate discriminant
    discriminant = b**2 - 4*a*c
    
    if discriminant > 0:
        # Two real roots
        x1 = (-b + math.sqrt(discriminant)) / (2*a)
        x2 = (-b - math.sqrt(discriminant)) / (2*a)
        return f"Two real roots: x₁ = {x1:.2f}, x₂ = {x2:.2f}"
    elif discriminant == 0:
        # One real root (repeated)
        x = -b / (2*a)
        return f"One repeated root: x = {x:.2f}"
    else:
        # Complex roots
        real_part = -b / (2*a)
        imaginary_part = math.sqrt(abs(discriminant)) / (2*a)
        return f"Complex roots: x₁ = {real_part:.2f} + {imaginary_part:.2f}i, x₂ = {real_part:.2f} - {imaginary_part:.2f}i"

# Example usage
print("Solving: 2x² - 5x + 3 = 0")
result = solve_quadratic(2, -5, 3)
print(result)

print("\\nSolving: x² + 4x + 4 = 0")
result = solve_quadratic(1, 4, 4)
print(result)`,
        explanation: 'This Python code solves quadratic equations using the quadratic formula. It handles all cases: two real roots, one repeated root, and complex roots. The discriminant determines the nature of the roots.'
      }
    }
    
    // Default response
    return {
      code: `# ${language.charAt(0).toUpperCase() + language.slice(1)} code for: ${description}
# This is a template - customize based on your specific needs

def solve_problem():
    """
    TODO: Implement your solution here
    Problem: ${description}
    """
    # Your code goes here
    pass

# Example usage
if __name__ == "__main__":
    result = solve_problem()
    print(f"Result: {result}")`,
      explanation: `I've created a basic template for your ${language} problem. To make it more specific, please describe your problem in detail, and I'll generate a complete solution with explanations and examples.`
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
      .then(() => alert('Code copied to clipboard!'))
      .catch(() => alert('Failed to copy code'))
  }

  const downloadCode = () => {
    const extension = getFileExtension(selectedLanguage)
    const blob = new Blob([generatedCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `solution.${extension}`
    link.click()
    URL.revokeObjectURL(url)
  }

  const getFileExtension = (language: string): string => {
    const extensions: { [key: string]: string } = {
      python: 'py',
      javascript: 'js',
      java: 'java',
      cpp: 'cpp',
      html: 'html',
      sql: 'sql'
    }
    return extensions[language] || 'txt'
  }

  const runCode = () => {
    // This would integrate with a code execution service
    alert('Code execution feature coming soon! This will run your code in a safe environment.')
  }

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border">
      <h3 className="text-lg font-semibold text-gray-800">Code Generator & Math Solver</h3>
      
      {/* Language Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Programming Language:</label>
        <div className="grid grid-cols-3 gap-2">
          {programmingLanguages.map((lang) => (
            <button
              key={lang.value}
              onClick={() => setSelectedLanguage(lang.value)}
              className={`p-2 rounded-lg border transition-colors ${
                selectedLanguage === lang.value
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-lg">{lang.icon}</div>
              <div className="text-xs">{lang.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Problem Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Describe your problem or what you want to create:
        </label>
        <textarea
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
          placeholder="e.g., Create a function to find prime numbers, Solve quadratic equation, Sort an array..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={generateCode}
        disabled={isGenerating || !problemDescription.trim()}
        className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isGenerating ? (
          <>
            <Zap className="animate-spin" size={20} />
            <span>Generating Code...</span>
          </>
        ) : (
          <>
            <Code size={20} />
            <span>Generate Code</span>
          </>
        )}
      </button>

      {/* Generated Code */}
      {generatedCode && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-800">Generated Code:</h4>
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 flex items-center space-x-1"
              >
                <Copy size={14} />
                <span>Copy</span>
              </button>
              <button
                onClick={downloadCode}
                className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 flex items-center space-x-1"
              >
                <Download size={14} />
                <span>Download</span>
              </button>
              <button
                onClick={runCode}
                className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600 flex items-center space-x-1"
              >
                <Play size={14} />
                <span>Run</span>
              </button>
            </div>
          </div>
          
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{generatedCode}</code>
          </pre>
        </div>
      )}

      {/* Explanation */}
      {explanation && (
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-medium text-gray-800 mb-2">Explanation:</h4>
          <p className="text-gray-700 text-sm">{explanation}</p>
        </div>
      )}

      {/* Examples Toggle */}
      <button
        onClick={() => setShowExamples(!showExamples)}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm"
      >
        <BookOpen size={16} />
        <span>{showExamples ? 'Hide' : 'Show'} Code Examples</span>
      </button>

      {/* Examples */}
      {showExamples && (
        <div className="bg-white p-4 rounded-lg border space-y-3">
          <h4 className="font-medium text-gray-800">Popular Examples:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <button
              onClick={() => setProblemDescription('Create a factorial function')}
              className="p-2 text-left border rounded hover:bg-gray-50"
            >
              <div className="font-medium">Factorial Function</div>
              <div className="text-gray-600">Calculate n!</div>
            </button>
            <button
              onClick={() => setProblemDescription('Generate Fibonacci sequence')}
              className="p-2 text-left border rounded hover:bg-gray-50"
            >
              <div className="font-medium">Fibonacci Sequence</div>
              <div className="text-gray-600">Generate series</div>
            </button>
            <button
              onClick={() => setProblemDescription('Check if number is prime')}
              className="p-2 text-left border rounded hover:bg-gray-50"
            >
              <div className="font-medium">Prime Number Check</div>
              <div className="text-gray-600">Verify primality</div>
            </button>
            <button
              onClick={() => setProblemDescription('Solve quadratic equation')}
              className="p-2 text-left border rounded hover:bg-gray-50"
            >
              <div className="font-medium">Quadratic Equation</div>
              <div className="text-gray-600">Find roots</div>
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="text-xs text-gray-500 text-center">
        Describe your programming problem or math question in detail.
        <br />
        I'll generate working code with explanations and examples!
      </div>
    </div>
  )
} 