import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/Layout'

// Existing pages
const HomePage = lazy(() => import('./pages/HomePage'))
const LesenPage = lazy(() => import('./pages/LesenPage'))
const HoerenPage = lazy(() => import('./pages/HoerenPage'))
const SchreibenPage = lazy(() => import('./pages/SchreibenPage'))
const SprechenPage = lazy(() => import('./pages/SprechenPage'))
const GrammarPage = lazy(() => import('./pages/GrammarPage'))
const GrammarLessonPage = lazy(() => import('./pages/GrammarLessonPage'))
const VocabularyPage = lazy(() => import('./pages/VocabularyPage'))
const VocabLessonPage = lazy(() => import('./pages/VocabLessonPage'))
const LebenPage = lazy(() => import('./pages/LebenPage'))
const B2Page = lazy(() => import('./pages/B2Page'))
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'))
const SprachbausteinePage = lazy(() => import('./pages/SprachbausteinePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ChatSimulatorPage = lazy(() => import('./pages/ChatSimulatorPage'))
const SlangPage = lazy(() => import('./pages/SlangPage'))
const EinstufungPage = lazy(() => import('./pages/EinstufungPage'))
const SatzbauPage = lazy(() => import('./pages/SatzbauPage'))
const DrillPage = lazy(() => import('./pages/DrillPage'))
const SynonymsPage = lazy(() => import('./pages/SynonymsPage'))
const FehlerPage = lazy(() => import('./pages/FehlerPage'))
const ExamSimulationPage = lazy(() => import('./pages/ExamSimulationPage'))
const FlashcardsPage = lazy(() => import('./pages/FlashcardsPage'))
const PronunciationLabPage = lazy(() => import('./pages/PronunciationLabPage'))
const BriefCorrectorPage = lazy(() => import('./pages/BriefCorrectorPage'))

// New pages — Phase 3: Interactive
const DailyChallengePage = lazy(() => import('./pages/DailyChallengePage'))
const LeaderboardPage = lazy(() => import('./pages/LeaderboardPage'))
const ContestsPage = lazy(() => import('./pages/ContestsPage'))
const ReferralPage = lazy(() => import('./pages/ReferralPage'))
const MyPlanPage = lazy(() => import('./pages/MyPlanPage'))
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'))
const EmergencyPage = lazy(() => import('./pages/EmergencyPage'))
const CardSortPage = lazy(() => import('./pages/CardSortPage'))
const CoursesPage = lazy(() => import('./pages/CoursesPage'))
const B1ModelsPage = lazy(() => import('./pages/B1ModelsPage'))
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'))
const SrsReviewPage = lazy(() => import('./pages/SrsReviewPage'))
const ConjugationPage = lazy(() => import('./pages/ConjugationPage'))

// New pages — Phase 4: Exams
const TelcSimPage = lazy(() => import('./pages/TelcSimPage'))
const BildbeschreibungPage = lazy(() => import('./pages/BildbeschreibungPage'))

// New pages — Phase 5: Citizenship + B2
const EinbuergerungPage = lazy(() => import('./pages/EinbuergerungPage'))
const ProblemsPage = lazy(() => import('./pages/ProblemsPage'))
const B2ModelsPage = lazy(() => import('./pages/B2ModelsPage'))
const AiCorrectorPage = lazy(() => import('./pages/AiCorrectorPage'))
const StressListeningPage = lazy(() => import('./pages/StressListeningPage'))
const SpeedReadingPage = lazy(() => import('./pages/SpeedReadingPage'))

// New pages — Phase 6: Tools
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const StudyPlanPage = lazy(() => import('./pages/StudyPlanPage'))
const PrintPage = lazy(() => import('./pages/PrintPage'))
const WordWebPage = lazy(() => import('./pages/WordWebPage'))
const TopicsPage = lazy(() => import('./pages/TopicsPage'))
const TipsPage = lazy(() => import('./pages/TipsPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
    </div>
  )
}

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Basics */}
          <Route path="/grammar" element={<GrammarPage />} />
          <Route path="/grammar/lesson/:lessonId" element={<GrammarLessonPage />} />
          <Route path="/vocabulary" element={<VocabularyPage />} />
          <Route path="/vocabulary/lesson/:catId" element={<VocabLessonPage />} />
          <Route path="/lesen" element={<LesenPage />} />
          <Route path="/hoeren" element={<HoerenPage />} />
          <Route path="/schreiben" element={<SchreibenPage />} />
          <Route path="/sprechen" element={<SprechenPage />} />
          <Route path="/satzbau" element={<SatzbauPage />} />
          <Route path="/sprachbausteine" element={<SprachbausteinePage />} />

          {/* Interactive Training */}
          <Route path="/daily" element={<DailyChallengePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/contests" element={<ContestsPage />} />
          <Route path="/referral" element={<ReferralPage />} />
          <Route path="/my-plan" element={<MyPlanPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/synonyms" element={<SynonymsPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/fehler" element={<FehlerPage />} />
          <Route path="/b1-models" element={<B1ModelsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/conjugation" element={<ConjugationPage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/pronunciation" element={<PronunciationLabPage />} />
          <Route path="/brief-corrector" element={<BriefCorrectorPage />} />

          {/* Games & Drill */}
          <Route path="/card-sort" element={<CardSortPage />} />
          <Route path="/srs-review" element={<SrsReviewPage />} />
          <Route path="/drill" element={<DrillPage />} />
            
          {/* DTZ Hub */}
          <Route path="/dtz" element={<DTZPage />} />

          {/* Exam Simulation */}
          <Route path="/telc-sim" element={<TelcSimPage />} />
          <Route path="/exam-simulation" element={<ExamSimulationPage />} />
          <Route path="/einstufung" element={<EinstufungPage />} />
          <Route path="/bildbeschreibung" element={<BildbeschreibungPage />} />
          <Route path="/chat-simulator" element={<ChatSimulatorPage />} />

          {/* Citizenship */}
          <Route path="/leben" element={<LebenPage />} />
          <Route path="/einbuergerung" element={<EinbuergerungPage />} />
          <Route path="/problems" element={<ProblemsPage />} />

          {/* B2 Advanced */}
          <Route path="/b2" element={<B2Page />} />
          <Route path="/b2-models" element={<B2ModelsPage />} />
          <Route path="/ai-corrector" element={<AiCorrectorPage />} />
          <Route path="/stress-listening" element={<StressListeningPage />} />
          <Route path="/speed-reading" element={<SpeedReadingPage />} />

          {/* Tools */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/study-plan" element={<StudyPlanPage />} />
          <Route path="/print" element={<PrintPage />} />
          <Route path="/word-web" element={<WordWebPage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/tips" element={<TipsPage />} />

          {/* Misc */}
          <Route path="/slang" element={<SlangPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/*" element={<AdminDashboardPage />} />
          
          {/* Default */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
