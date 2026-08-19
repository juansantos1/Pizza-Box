import Hero from '../components/Hero'
import AuthorityBar from '../components/AuthorityBar'
import Manifesto from '../components/Manifesto'
import Specialties from '../components/Specialties'
import ReviewsSection from '../components/ReviewsSection'
import Locations from '../components/Locations'

export default function Home() {
  return (
    <>
      <Hero />
      <AuthorityBar />
      <Manifesto />
      <Specialties />
      <ReviewsSection />
      <Locations />
    </>
  )
}
