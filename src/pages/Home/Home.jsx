import AvailableLoans from '../../components/HomeComponents/AvailableLoans/AvailableLoans'
import CustomerFeedback from '../../components/HomeComponents/CustomerFeedback/CustomerFeedback'
import FAQSection from '../../components/HomeComponents/FAQSection/FAQSection'
import HeroBanner from '../../components/HomeComponents/HeroBanner/HeroBanner'
import HowItWorks from '../../components/HomeComponents/HowItWorks/HowItWorks'
import WhyChooseUs from '../../components/HomeComponents/WhyChooseUs/WhyChooseUs'

const Home = () => {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <AvailableLoans></AvailableLoans>
      <HowItWorks></HowItWorks>
      <CustomerFeedback></CustomerFeedback>
      <WhyChooseUs></WhyChooseUs>
      <FAQSection></FAQSection>
    </div>
  )
}

export default Home
