import LevelExamPage from '../components/LevelExamPage'
import { a2Models } from '../data/a2Full'

export default function A2ExamPage() {
  return (
    <LevelExamPage
      models={a2Models}
      level="A2"
      emoji="☀️"
      accentColor="text-amber-600 dark:text-amber-400"
      accentBg="bg-amber-500/10"
      accentBorder="border-amber-500/20"
      subtitle="Goethe-Zertifikat A2"
    />
  )
}
