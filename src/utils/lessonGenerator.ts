export type QuestionType = 'translate_de_ar' | 'translate_ar_de' | 'listen_choose'

export interface VocabWord {
  de: string
  ar: string
  example?: string
}

export interface LessonQuestion {
  id: string
  type: QuestionType
  word: VocabWord
  options: string[] // 4 options
  correctAnswer: string // matches one of the options
}

/**
 * Shuffles an array in place
 */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Generates a random set of lesson questions based on a word list.
 */
export function generateLesson(words: VocabWord[], questionCount: number = 10): LessonQuestion[] {
  if (!words || words.length === 0) return []
  
  const questions: LessonQuestion[] = []
  const questionTypes: QuestionType[] = ['translate_de_ar', 'translate_ar_de', 'listen_choose']
  
  // Pick random words for this session
  const sessionWords = shuffleArray(words).slice(0, Math.min(questionCount, words.length))

  sessionWords.forEach((word, index) => {
    const qType = questionTypes[Math.floor(Math.random() * questionTypes.length)]
    
    let correctAnswer = ''
    let optionsPool: string[] = []

    if (qType === 'translate_de_ar') {
      correctAnswer = word.ar
      optionsPool = words.filter(w => w.ar !== word.ar).map(w => w.ar)
    } else {
      correctAnswer = word.de
      optionsPool = words.filter(w => w.de !== word.de).map(w => w.de)
    }

    const wrongOptions = shuffleArray(optionsPool).slice(0, 3)
    const finalOptions = shuffleArray([correctAnswer, ...wrongOptions])

    // Fallback if not enough words in category
    while (finalOptions.length < 4) {
      finalOptions.push(finalOptions[0] + ' (' + finalOptions.length + ')')
    }

    questions.push({
      id: `q-${index}-${Date.now()}`,
      type: qType,
      word,
      options: finalOptions,
      correctAnswer
    })
  })

  // Fill up if we need more questions
  while (questions.length < questionCount) {
    const w = sessionWords[Math.floor(Math.random() * sessionWords.length)]
    const qType = questionTypes[Math.floor(Math.random() * questionTypes.length)]
    
    let correctAnswer = qType === 'translate_de_ar' ? w.ar : w.de
    let optionsPool = qType === 'translate_de_ar' 
      ? words.filter(x => x.ar !== w.ar).map(x => x.ar)
      : words.filter(x => x.de !== w.de).map(x => x.de)

    const wrongOptions = shuffleArray(optionsPool).slice(0, 3)
    const finalOptions = shuffleArray([correctAnswer, ...wrongOptions])

    while (finalOptions.length < 4) {
      finalOptions.push(finalOptions[0] + ' (' + finalOptions.length + ')')
    }

    questions.push({
      id: `q-extra-${questions.length}-${Date.now()}`,
      type: qType,
      word: w,
      options: finalOptions,
      correctAnswer
    })
  }

  return shuffleArray(questions)
}
