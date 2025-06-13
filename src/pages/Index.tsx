
import { useState } from "react";
import { Dumbbell, ChevronLeft, ChevronRight, Star, Users, Target, Award, Phone, MessageSquare, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const topReviews = [
    { name: "Sarah M.", rating: 5, image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=40&h=40&fit=crop&crop=face" },
    { name: "Mike R.", rating: 5, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
    { name: "Jenny L.", rating: 5, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" }
  ];

  const events = [
    {
      id: 1,
      title: "30-Day Transformation Challenge",
      date: "January 15 - February 15",
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      description: "Transform your body in just 30 days with our comprehensive fitness challenge."
    },
    {
      id: 2,
      title: "Powerlifting Championship",
      date: "December 10, 2024",
      status: "previous",
      image: "https://images.unsplash.com/photo-1583500178690-f7b6d3fdc2b3?w=300&h=200&fit=crop",
      description: "Our annual powerlifting competition brought together the strongest athletes."
    },
    {
      id: 3,
      title: "Summer Shred Challenge",
      date: "June 1 - August 31",
      status: "previous",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      description: "Get beach-ready with our intensive summer fitness program."
    }
  ];

  const reviews = [
    {
      name: "Alex Johnson",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      message: "PowerHouse Gym has completely transformed my fitness journey. The trainers are exceptional and the equipment is top-notch!"
    },
    {
      name: "Maria Garcia",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=50&h=50&fit=crop&crop=face",
      message: "I've never felt stronger or more confident. The community here is incredibly supportive and motivating."
    },
    {
      name: "David Chen",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      message: "The personalized training sessions helped me achieve goals I never thought possible. Highly recommend!"
    }
  ];

  const plans = [
    {
      type: "Daily Pass",
      price: "$15",
      period: "per day",
      features: ["Full gym access", "Locker room", "Basic equipment"],
      popular: false
    },
    {
      type: "Weekly Plan",
      price: "$75",
      period: "per week",
      features: ["Full gym access", "Group classes", "Locker room", "Towel service"],
      popular: false
    },
    {
      type: "Monthly Premium",
      price: "$120",
      period: "per month",
      features: ["Full gym access", "Personal trainer session", "Group classes", "Nutrition consultation", "Premium locker"],
      popular: true
    }
  ];

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
          <div className="hidden md:flex space-x-8 text-[#CAD8DE]">
            <a href="#home" className="hover:text-[#E2C044] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#E2C044] transition-colors">About</a>
            <a href="#events" className="hover:text-[#E2C044] transition-colors">Events</a>
            <a href="#plans" className="hover:text-[#E2C044] transition-colors">Plans</a>
            <a href="#contact" className="hover:text-[#E2C044] transition-colors">Contact</a>
          </div>
        </nav>

        {/* Top Reviews */}
        <div className="relative z-10 px-6 lg:px-12 mt-8">
          <div className="flex items-center space-x-6">
            <span className="text-[#CAD8DE] text-sm">Top Rated:</span>
            <div className="flex space-x-4">
              {topReviews.map((review, index) => (
                <div key={index} className="flex items-center space-x-2 bg-[#637074]/20 rounded-full px-3 py-1">
                  <img src={review.image} alt={review.name} className="w-6 h-6 rounded-full" />
                  <span className="text-xs text-[#CAD8DE]">{review.name}</span>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#E2C044] text-[#E2C044]" />
                    ))}
                  </div>
                </div>
              ))}
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
            <Card className="bg-[#637074]/20 border-[#E2C044] overflow-hidden">
              <div className="relative h-64 lg:h-80">
                <img 
                  src={events[currentEventIndex].image} 
                  alt={events[currentEventIndex].title}
                  className="w-full h-full object-cover"
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
                  {events[currentEventIndex].title}
                </h3>
                <p className="text-[#CAD8DE] mb-4">{events[currentEventIndex].date}</p>
                <p className="text-white leading-relaxed">{events[currentEventIndex].description}</p>
                <Button className="mt-4 bg-[#E2C044] text-[#0F1108] hover:bg-[#E2C044]/90">
                  Learn More
                </Button>
              </CardContent>
            </Card>
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
            <div className="flex items-start space-x-4">
              <img 
                src={reviews[currentReviewIndex].image} 
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <a href="tel:+1234567890" className="group">
              <div className="w-16 h-16 bg-[#E2C044] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8 text-[#0F1108]" />
              </div>
              <span className="text-[#CAD8DE] group-hover:text-[#E2C044] transition-colors">Call Us</span>
            </a>
            <a href="sms:+1234567890" className="group">
              <div className="w-16 h-16 bg-[#E2C044] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-8 h-8 text-[#0F1108]" />
              </div>
              <span className="text-[#CAD8DE] group-hover:text-[#E2C044] transition-colors">Text Us</span>
            </a>
            <a href="https://instagram.com" className="group">
              <div className="w-16 h-16 bg-[#E2C044] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Instagram className="w-8 h-8 text-[#0F1108]" />
              </div>
              <span className="text-[#CAD8DE] group-hover:text-[#E2C044] transition-colors">Instagram</span>
            </a>
            <a href="https://youtube.com" className="group">
              <div className="w-16 h-16 bg-[#E2C044] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Youtube className="w-8 h-8 text-[#0F1108]" />
              </div>
              <span className="text-[#CAD8DE] group-hover:text-[#E2C044] transition-colors">YouTube</span>
            </a>
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
          <p className="text-[#CAD8DE]">© 2024 PowerHouse Gym. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
