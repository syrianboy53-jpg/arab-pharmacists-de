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
        </Routes>
      </Suspense>
    </Layout>
  )
}
