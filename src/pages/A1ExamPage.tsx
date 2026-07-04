import LevelExamPage from '../components/LevelExamPage'
import { a1Models } from '../data/a1Full'

export default function A1ExamPage() {
  return (
    <LevelExamPage
      models={a1Models}
      level="A1"
      emoji="🌱"
      accentColor="text-emerald-600 dark:text-emerald-400"
      accentBg="bg-emerald-500/10"
      accentBorder="border-emerald-500/20"
      subtitle="Start Deutsch 1"
    />
  )
}
