import { Routes, Route, Navigate } from 'react-router-dom'
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
const DTZPage = lazy(() => import('./pages/DTZPage'))
const MockExamPlayer = lazy(() => import('./pages/levels/MockExamPlayer'))
const LebenPage = lazy(() => import('./pages/LebenPage'))
const B2Page = lazy(() => import('./pages/B2Page'))
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'))
const SprachbausteinePage = lazy(() => import('./pages/SprachbausteinePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const ChatSimulatorPage = lazy(() => import('./pages/ChatSimulatorPage'))
const SlangPage = lazy(() => import('./pages/SlangPage'))
const EinstufungPage = lazy(() => import('./pages/EinstufungPage'))
const SatzbauPage = lazy(() => import('./pages/SatzbauPage'))
const DrillPage = lazy(() => import('./pages/DrillPage'))
const SynonymsPage = lazy(() => import('./pages/SynonymsPage'))
const FehlerPage = lazy(() => import('./pages/FehlerPage'))
const ExamSimulationPage = lazy(() => import('./pages/ExamSimulationPage'))
const ExamsPage = lazy(() => import('./pages/ExamsPage'))
const FlashcardsPage = lazy(() => import('./pages/FlashcardsPage'))
const PronunciationLabPage = lazy(() => import('./pages/PronunciationLabPage'))
const BriefCorrectorPage = lazy(() => import('./pages/BriefCorrectorPage'))

// Levels Hubs
const A1Page = lazy(() => import('./pages/levels/A1Page'))
const A2Page = lazy(() => import('./pages/levels/A2Page'))
const B1HubPage = lazy(() => import('./pages/levels/B1HubPage'))
const B2HubPage = lazy(() => import('./pages/levels/B2HubPage'))
const B2BridgePage = lazy(() => import('./pages/levels/B2BridgePage'))
const B2InteractivePage = lazy(() => import('./pages/levels/B2InteractivePage'))
const C1Page = lazy(() => import('./pages/levels/C1Page'))

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
const EscapeRoomPage = lazy(() => import('./pages/EscapeRoomPage'))
const MagicLetterPage = lazy(() => import('./pages/MagicLetterPage'))
const DictationPage = lazy(() => import('./pages/DictationPage'))
const HangmanPage = lazy(() => import('./pages/HangmanPage'))

// New pages — Phase 7: Games + Content
const WheelPage = lazy(() => import('./pages/WheelPage'))
const SpeedRushPage = lazy(() => import('./pages/SpeedRushPage'))
const StoriesPage = lazy(() => import('./pages/StoriesPage'))
const AchievementsPage = lazy(() => import('./pages/AchievementsPage'))

// New pages — Phase 8: Life in Germany
const GermanyMapPage = lazy(() => import('./pages/GermanyMapPage'))
const JobsPage = lazy(() => import('./pages/JobsPage'))
const WohnungPage = lazy(() => import('./pages/WohnungPage'))
const TransportPage = lazy(() => import('./pages/TransportPage'))
const FoodPage = lazy(() => import('./pages/FoodPage'))
const DocsPage = lazy(() => import('./pages/DocsPage'))
const SongsPage = lazy(() => import('./pages/SongsPage'))
const MemoryGamePage = lazy(() => import('./pages/MemoryGamePage'))

// Phase 9: Full Level Exam Pages (A1–C1)
const A1ExamPage = lazy(() => import('./pages/A1ExamPage'))
const A2ExamPage = lazy(() => import('./pages/A2ExamPage'))
const B1ExamPage = lazy(() => import('./pages/B1ExamPage'))
const C1ExamPage = lazy(() => import('./pages/C1ExamPage'))

// Phase 10: New Content Pages
const RedemittelHubPage = lazy(() => import('./pages/RedemittelHubPage'))
const ZahlenTrainerPage = lazy(() => import('./pages/ZahlenTrainerPage'))
const AlltagsDialogePage = lazy(() => import('./pages/AlltagsDialogePage'))
const KulturGuidePage = lazy(() => import('./pages/KulturGuidePage'))
const RedewendungenPage = lazy(() => import('./pages/RedewendungenPage'))

// Phase 11: More Content
const VerbTrainerPage = lazy(() => import('./pages/VerbTrainerPage'))
const PruefungsTippsPage = lazy(() => import('./pages/PruefungsTippsPage'))
const WortschatzSpielPage = lazy(() => import('./pages/WortschatzSpielPage'))

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
          <Route path="/a2" element={<A2Page />} />
          <Route path="/exams" element={<ExamsPage />} />

          {/* TestDaF Hub */}
          <Route path="/grammar" element={<GrammarPage />} />
          <Route path="/grammar/lesson/:lessonId" element={<GrammarLessonPage />} />
          <Route path="/escape-room" element={<EscapeRoomPage />} />
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
          <Route path="/magic-letter" element={<MagicLetterPage />} />
          <Route path="/dictation" element={<DictationPage />} />
          <Route path="/hangman" element={<HangmanPage />} />
          <Route path="/wheel" element={<WheelPage />} />
          <Route path="/speed-rush" element={<SpeedRushPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
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
          <Route path="/mock-exam/:examId" element={<MockExamPlayer />} />

          {/* Levels Hubs */}
          <Route path="/a1" element={<A1Page />} />
          <Route path="/a2" element={<A2Page />} />
          <Route path="/b1" element={<B1HubPage />} />
          <Route path="/b2-hub" element={<B2HubPage />} />
          <Route path="/c1" element={<C1Page />} />
          
          <Route path="/b2-bridge" element={<B2BridgePage />} />
          <Route path="/b2-interactive" element={<B2InteractivePage />} />

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
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/*" element={<AdminDashboardPage />} />
          
          {/* Phase 8: Life in Germany */}
          <Route path="/germany-map" element={<GermanyMapPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/wohnung" element={<WohnungPage />} />
          <Route path="/transport" element={<TransportPage />} />
          <Route path="/food" element={<FoodPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/songs" element={<SongsPage />} />
          <Route path="/memory" element={<MemoryGamePage />} />

          {/* Phase 9: Full Level Exams (A1–C1) */}
          <Route path="/a1-exam" element={<A1ExamPage />} />
          <Route path="/a2-exam" element={<A2ExamPage />} />
          <Route path="/b1-exam" element={<B1ExamPage />} />
          <Route path="/c1-exam" element={<C1ExamPage />} />

          {/* Phase 10: New Content */}
          <Route path="/redemittel-hub" element={<RedemittelHubPage />} />
          <Route path="/zahlen" element={<ZahlenTrainerPage />} />
          <Route path="/dialoge" element={<AlltagsDialogePage />} />
          <Route path="/kultur" element={<KulturGuidePage />} />
          <Route path="/redewendungen" element={<RedewendungenPage />} />

          {/* Phase 11: More Content */}
          <Route path="/verb-trainer" element={<VerbTrainerPage />} />
          <Route path="/tipps" element={<PruefungsTippsPage />} />
          <Route path="/wortschatz-spiel" element={<WortschatzSpielPage />} />

          {/* Default */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
