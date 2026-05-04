import { Header } from "../components/Header"
import { Hero } from "../components/Hero"
import { Stats } from "../components/Stats"
import { Philosophy } from "../components/Philosophy"
import { Projects } from "../components/Projects"
import { Expertise } from "../components/Expertise"
import { LeadForm } from "../components/LeadForm"
import { FAQ } from "../components/FAQ"
import { CallToAction } from "../components/CallToAction"
import { Footer } from "../components/Footer"

export default function Index() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Stats />
      <Philosophy />
      <Projects />
      <Expertise />
      <LeadForm />
      <FAQ />
      <CallToAction />
      <Footer />
    </main>
  )
}