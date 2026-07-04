import LevelExamPage from '../components/LevelExamPage'
import { c1Models } from '../data/c1Full'

export default function C1ExamPage() {
  return (
    <LevelExamPage
      models={c1Models}
      level="C1"
      emoji="🏅"
      accentColor="text-rose-600 dark:text-rose-400"
      accentBg="bg-rose-500/10"
      accentBorder="border-rose-500/20"
      subtitle="telc C1 Hochschule / TestDaF"
    />
  )
}
