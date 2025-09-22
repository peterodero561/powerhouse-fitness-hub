
import { useEffect, useState } from "react";
import { Dumbbell, Menu, X, ChevronLeft, ChevronRight, Star, Users, Target, Award, Phone, MessageSquare, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { API_BASE_URL } from "@/lib/utils";

interface ReviewType {
  id: number;
  name: string;
  rating: number;
  image: string;
  message: string;
  is_top: boolean;
  createdAt: string;
  updatedAt: string;
}

const Index = () => {

  // Database data
  const [events, setEvents] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [topReviews, setTopReviews] = useState<ReviewType[]>([]);

  // state
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // normalize plans so plan.features is always an array of strings
  const normalizePlan = (p: any) => {
    const f = p.features || {};
    const arr: string[] = [];

    // structural info -> readable strings
    if (f.sessions_included) arr.push(`${f.sessions_included} session${f.sessions_included > 1 ? 's' : ''} included`);
    if (f.validity_days) arr.push(`Valid for ${f.validity_days} day${f.validity_days > 1 ? 's' : ''}`);
    if (f.access) arr.push(`Access: ${f.access}`);
    if (f.trainer_access) arr.push(f.trainer_access ? 'Trainer access included' : 'No trainer access');
    if (Array.isArray(f.equipment) && f.equipment.length) {
      // join as a single bullet or push each equipment item separately:
      arr.push(`Equipment: ${f.equipment.join(', ')}`);
      // OR to push each equipment item as its own list item:
      // f.equipment.forEach((eq: string) => arr.push(eq));
    }
    if (f.notes) arr.push(f.notes);

    // fallback: if nothing, maybe use an empty array
    return { ...p, features: arr };
  };

  // fetch data on loading
  useEffect(() => {
    const fetchData = async () => {
      try{
        setIsLoading(true);

        const eventsRes = await axios.get(`${API_BASE_URL}/api/events`);
        const plansRes = await axios.get(`${API_BASE_URL}/api/plans`);
        const reviewsRes = await axios.get(`${API_BASE_URL}/api/reviews`);
        const topReviewsRes = await axios.get(`${API_BASE_URL}/api/reviews/top`);

        setEvents(eventsRes.data);
        setPlans(plansRes.data.map(normalizePlan));
        setReviews(reviewsRes.data);
        setTopReviews(topReviewsRes.data);

        console.log('Top reviews from databse: ', reviewsRes.data);
        console.log('events', eventsRes.data);
        console.log('plans: ', plansRes.data);

      } catch (error) { console.error("Error fetching data: ", error); }
      finally { setIsLoading(false); }
    };
    fetchData();
  }, []);

  const openDetails = (ev) => {
    setSelectedEvent(ev);
    setModalOpen(true);
  };

  const closeDetails = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  const nextEvent = () => {
    setCurrentEventIndex((prev) => (prev + 1) % events.length);
  };

  const prevEvent = () => {
    setCurrentEventIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (isLoading || !events.length || !plans.length || !reviews.length ) {
    return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
      <p className="text-black text-center mt-4">Loading...</p>
    </div>
    )
  }

  const currentEvent = events[currentEventIndex] || null;

  return (
    <div className="min-h-screen bg-[#0F1108] text-white">
      {/* Hero Section */}
      <div 
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(to left, rgba(15, 17, 8, 0.7), rgba(15, 17, 8, 0.9)), url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop')"
        }}
      >
        {/* Navbar */}
        <nav className="relative z-10 flex items-center justify-between p-6 lg:px-12">
          <div className="flex items-center space-x-3">
            <Dumbbell className="h-8 w-8 text-[#E2C044]" />
            <span className="text-2xl font-bold text-[#E2C044]">PowerHouse Gym</span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex space-x-8 text-[#CAD8DE]">
            <a href="#home" className="hover:text-[#E2C044] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#E2C044] transition-colors">About</a>
            <a href="#events" className="hover:text-[#E2C044] transition-colors">Events</a>
            <a href="#plans" className="hover:text-[#E2C044] transition-colors">Plans</a>
            <a href="#contact" className="hover:text-[#E2C044] transition-colors">Contact</a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[#CAD8DE] focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
        </nav>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-[#0F1108] text-[#CAD8DE] space-y-4 py-4 px-6">
            <a href="#home" onClick={() => setMobileOpen(false)} className="block hover:text-[#E2C044]">Home</a>
            <a href="#about" onClick={() => setMobileOpen(false)} className="block hover:text-[#E2C044]">About</a>
            <a href="#events" onClick={() => setMobileOpen(false)} className="block hover:text-[#E2C044]">Events</a>
            <a href="#plans" onClick={() => setMobileOpen(false)} className="block hover:text-[#E2C044]">Plans</a>
            <a href="#contact" onClick={() => setMobileOpen(false)} className="block hover:text-[#E2C044]">Contact</a>
          </div>
        )}

        {/* Top Reviews - Updated for Mobile Responsiveness */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-12 mt-4 sm:mt-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
            <span className="text-[#CAD8DE] text-sm whitespace-nowrap">Top Rated:</span>
    
            {/* Horizontal scrolling container */}
            <div className="w-full overflow-x-auto pb-2 -mx-4 px-4 hide-scrollbar">
              <div className="flex space-x-3 min-w-max">
                {topReviews.length > 0 ? (
                  topReviews.map((review, index) => (
                    <div 
                    key={index} 
                    className="flex items-center space-x-2 bg-[#637074]/20 rounded-full px-3 py-1 flex-shrink-0"
                    >
                    <img 
                      src="/icons8-person-48.png" 
                      alt={review.name} 
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full" 
                    />
                    <span className="text-xs text-[#CAD8DE] whitespace-nowrap">
                      {review.name}
                    </span>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#E2C044] text-[#E2C044]" 
                      />
                      ))}
                    </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#CAD8DE]">No reviews available</p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Hero Content */}
        <div className="relative z-10 px-6 lg:px-12 mt-16 lg:mt-24 max-w-4xl">
          <h1 className="text-5xl lg:text-7xl font-bold text-[#E2C044] mb-6 leading-tight">
            UNLEASH YOUR<br />
            <span className="text-white">INNER POWER</span>
          </h1>
          <p className="text-xl lg:text-2xl text-[#CAD8DE] mb-8 max-w-2xl">
            Transform your body, mind, and life at PowerHouse Gym. Where champions are made and limits are broken.
          </p>
          <Button className="bg-[#E2C044] text-[#0F1108] hover:bg-[#E2C044]/90 text-lg px-8 py-3 rounded-none font-bold">
            START YOUR JOURNEY
          </Button>
        </div>
      </div>

      {/* Why Us Section */}
      <section id="about" className="py-20 px-6 lg:px-12 bg-[#E5FCF5]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center text-[#0F1108] mb-16">
            WHY CHOOSE <span className="text-[#E2C044]">POWERHOUSE</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-[#E2C044] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Dumbbell className="w-10 h-10 text-[#0F1108]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F1108] mb-4">Best Equipment</h3>
              <p className="text-[#637074] leading-relaxed">
                State-of-the-art fitness equipment from the world's leading manufacturers, maintained to perfection.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-[#E2C044] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-[#0F1108]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F1108] mb-4">Expert Trainers</h3>
              <p className="text-[#637074] leading-relaxed">
                Certified personal trainers with years of experience helping clients achieve their fitness goals.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-[#E2C044] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-10 h-10 text-[#0F1108]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F1108] mb-4">Tailored Sessions</h3>
              <p className="text-[#637074] leading-relaxed">
                Personalized workout plans designed specifically for your fitness level and goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 px-6 lg:px-12 bg-[#0F1108]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center text-[#E2C044] mb-16">
            GYM CHALLENGES & EVENTS
          </h2>
          <div className="relative">
            {currentEvent ? (
            <div onClick={() => openDetails(currentEvent)} className="cursor-pointer">
            <Card className="bg-[#637074]/20 border-[#E2C044] overflow-hidden">
              <div className="relative h-64 lg:h-80 flex-shrink-0">
                <img 
                  src={`/events/weightlifting.jpg`}
                  alt={currentEvent.title}
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    events[currentEventIndex].status === 'upcoming' 
                      ? 'bg-[#E2C044] text-[#0F1108]' 
                      : 'bg-[#637074] text-white'
                  }`}>
                    {events[currentEventIndex].status.toUpperCase()}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-[#E2C044] mb-2">
                  {currentEvent.title}
                </h3>
                <p className="text-[#CAD8DE] mb-4">{currentEvent.date}</p>
                <p className="text-white leading-relaxed">{currentEvent.description}</p>
                <Button className="mt-4 bg-[#E2C044] text-[#0F1108] hover:bg-[#E2C044]/90">
                  Learn More
                </Button>
              </CardContent>
            </Card>
            </div>
            ) : (
              <div className="text-center text-white py-12">No events available</div>
            )}
            <div className="flex justify-center mt-6 space-x-4">
              <Button
                onClick={prevEvent}
                variant="outline"
                size="icon"
                className="bg-transparent border-[#E2C044] text-[#E2C044] hover:bg-[#E2C044] hover:text-[#0F1108]"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                onClick={nextEvent}
                variant="outline"
                size="icon"
                className="bg-transparent border-[#E2C044] text-[#E2C044] hover:bg-[#E2C044] hover:text-[#0F1108]"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div> 
        </div>
      </section>

      {modalOpen && selectedEvent && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4"
        onClick={closeDetails}
        >
        <div
          className="bg-[#0F1108] rounded-lg max-w-lg w-full relative"
          onClick={(e) => e.stopPropagation()}
          >
          <button
            className="absolute top-4 right-4 text-[#CAD8DE]"
            onClick={closeDetails}
            >
            <X className="w-6 h-6" />
          </button>
          <img
            src={`/events/weightlifting.jpg`}
            alt={selectedEvent.title}
            className="w-full h-52 object-contain rounded-t-lg"
          />
          <div className="p-6 text-[#CAD8DE]">
            <h3 className="text-3xl font-bold text-[#E2C044] mb-2">
              {selectedEvent.title}
            </h3>
            <p className="text-sm mb-4">{selectedEvent.date}</p>
            <p className="mb-4">
              {selectedEvent.fullDescription || selectedEvent.description}
            </p>
            {selectedEvent.location && (
              <p><strong>Location:</strong> {selectedEvent.location}</p>
            )}
            {selectedEvent.prize && (
              <p><strong>Prize:</strong> {selectedEvent.prize}</p>
            )}
            {selectedEvent.signupLink && (
              <a
                href={selectedEvent.signupLink}
                className="inline-block mt-4 bg-[#E2C044] text-[#0F1108] px-4 py-2 rounded"
                >
                Sign Up
              </a>
            )}
          </div>
        </div>
      </div>
    )}


      {/* Payment Plans */}
      <section id="plans" className="py-20 px-6 lg:px-12 bg-[#CAD8DE]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center text-[#0F1108] mb-16">
            MEMBERSHIP <span className="text-[#E2C044]">PLANS</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative overflow-hidden ${
                plan.popular 
                  ? 'bg-[#0F1108] border-[#E2C044] border-2 transform scale-105' 
                  : 'bg-[#0F1108] border-[#637074]'
              }`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-[#E2C044] text-[#0F1108] px-4 py-1 text-sm font-bold">
                    POPULAR
                  </div>
                )}
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-[#E2C044] mb-4">{plan.type}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-[#CAD8DE] ml-2">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-[#CAD8DE] flex items-center justify-center">
                        <Award className="w-4 h-4 text-[#E2C044] mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${
                    plan.popular 
                      ? 'bg-[#E2C044] text-[#0F1108] hover:bg-[#E2C044]/90' 
                      : 'bg-transparent border border-[#E2C044] text-[#E2C044] hover:bg-[#E2C044] hover:text-[#0F1108]'
                  }`}>
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-6 lg:px-12 bg-[#E5FCF5]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center text-[#0F1108] mb-16">
            MEMBER <span className="text-[#E2C044]">REVIEWS</span>
          </h2>
          <Card className="bg-white border-[#E2C044] p-8">
            {reviews.length > 0 ? (
              <div className="flex items-start space-x-4">
                <img 
                  src="/icons8-person-48.png" 
                  alt={reviews[currentReviewIndex].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-[#0F1108] mb-1">
                    {reviews[currentReviewIndex].name}
                  </h4>
                  <div className="flex mb-4">
                    {[...Array(reviews[currentReviewIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#E2C044] text-[#E2C044]" />
                    ))}
                  </div>
                  <p className="text-[#637074] leading-relaxed text-lg">
                    "{reviews[currentReviewIndex].message}"
                  </p>
                </div>
              </div>
              ) : (
                <div className="text-center py-8">No reviews available</div>
              )}
          </Card>
          <div className="flex justify-center mt-6 space-x-4">
            <Button
              onClick={prevReview}
              variant="outline"
              size="icon"
              className="bg-transparent border-[#E2C044] text-[#E2C044] hover:bg-[#E2C044] hover:text-[#0F1108]"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              onClick={nextReview}
              variant="outline"
              size="icon"
              className="bg-transparent border-[#E2C044] text-[#E2C044] hover:bg-[#E2C044] hover:text-[#0F1108]"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 lg:px-12 bg-[#0F1108]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#E2C044] mb-8">
            GET IN TOUCH
          </h2>
          <p className="text-xl text-[#CAD8DE] mb-12">
            Ready to start your fitness journey? Contact us today!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* WhatsApp Contact */}
            <a href="https://wa.me/0729284775" className="group" target='_blank' rel='noopener noreferrer'>
              <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <span className="text-[#CAD8DE] group-hover:text-[#E2C044] transition-colors">WhatsApp Us</span>
              <p className="text-sm mt-1 text-[#637074]">+254 729 284 775</p>
            </a>

            {/* TikTok contact */}
            <a href="https://tiktok.com/powerhousegym" className="group" target="_blank" rel='noopener noreferrer'>
              <div className="w-16 h-16 bg-[#000000] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </div>
              <span className="text-[#CAD8DE] group-hover:text-[#69C9D0] transition-colors">TikTok</span>
              <p className="text-sm mt1 text-[#637074]">@powerhousegym</p>
            </a>

            {/* Email contact */}
            <a href="mailto:info@powerhousegym.com" className="group">
              <div className="w-16 h-16 bg-[#D44638] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <span className="text-[#CAD8DE] group-hover:text-[#E2C044] transition-colors">Email Us</span>
              <p className="text-sm mt-1 text-[#637074]">info@powerhousegym.com</p>
            </a>

            {/* <a href="https://youtube.com" className="group">
              <div className="w-16 h-16 bg-[#E2C044] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Youtube className="w-8 h-8 text-[#0F1108]" />
              </div>
              <span className="text-[#CAD8DE] group-hover:text-[#E2C044] transition-colors">YouTube</span>
            </a> */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F1108] border-t border-[#637074] py-8 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Dumbbell className="h-6 w-6 text-[#E2C044]" />
            <span className="text-xl font-bold text-[#E2C044]">PowerHouse Gym</span>
          </div>
          <p className="text-[#CAD8DE]">© {new Date().getFullYear()} PowerHouse Gym. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
