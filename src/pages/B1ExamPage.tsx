import LevelExamPage from '../components/LevelExamPage'
import { b1Models } from '../data/b1Full'

export default function B1ExamPage() {
  return (
    <LevelExamPage
      models={b1Models}
      level="B1"
      emoji="🎓"
      accentColor="text-sky-600 dark:text-sky-400"
      accentBg="bg-sky-500/10"
      accentBorder="border-sky-500/20"
      subtitle="Goethe / telc / DTZ"
    />
  )
}
