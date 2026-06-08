import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/Layout'

const HomePage = lazy(() => import('./pages/HomePage'))
const LesenPage = lazy(() => import('./pages/LesenPage'))
const HoerenPage = lazy(() => import('./pages/HoerenPage'))
const SchreibenPage = lazy(() => import('./pages/SchreibenPage'))
const SprechenPage = lazy(() => import('./pages/SprechenPage'))
const GrammarPage = lazy(() => import('./pages/GrammarPage'))
const VocabularyPage = lazy(() => import('./pages/VocabularyPage'))
const LebenPage = lazy(() => import('./pages/LebenPage'))
const B2Page = lazy(() => import('./pages/B2Page'))
const PremiumPage = lazy(() => import('./pages/PremiumPage'))
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'))
const SprachbausteinePage = lazy(() => import('./pages/SprachbausteinePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ChatSimulatorPage = lazy(() => import('./pages/ChatSimulatorPage'))
const SlangPage = lazy(() => import('./pages/SlangPage'))

// New Interactive pages
const EinstufungPage = lazy(() => import('./pages/EinstufungPage'))
const SatzbauPage = lazy(() => import('./pages/SatzbauPage'))
const DrillPage = lazy(() => import('./pages/DrillPage'))
const SynonymsPage = lazy(() => import('./pages/SynonymsPage'))
const FehlerPage = lazy(() => import('./pages/FehlerPage'))
const ExamSimulationPage = lazy(() => import('./pages/ExamSimulationPage'))

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-green border-t-transparent"></div>
    </div>
  )
}

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lesen" element={<LesenPage />} />
          <Route path="/hoeren" element={<HoerenPage />} />
          <Route path="/schreiben" element={<SchreibenPage />} />
          <Route path="/sprechen" element={<SprechenPage />} />
          <Route path="/grammar" element={<GrammarPage />} />
          <Route path="/vocabulary" element={<VocabularyPage />} />
          <Route path="/leben" element={<LebenPage />} />
          <Route path="/b2" element={<B2Page />} />
          <Route path="/premium" element={<PremiumPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/sprachbausteine" element={<SprachbausteinePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/chat-simulator" element={<ChatSimulatorPage />} />
          <Route path="/slang" element={<SlangPage />} />
          
          {/* New Interactive routes */}
          <Route path="/einstufung" element={<EinstufungPage />} />
          <Route path="/satzbau" element={<SatzbauPage />} />
          <Route path="/drill" element={<DrillPage />} />
          <Route path="/synonyms" element={<SynonymsPage />} />
          <Route path="/fehler" element={<FehlerPage />} />
          <Route path="/exam-simulation" element={<ExamSimulationPage />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
