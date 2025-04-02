import pic from '../images/hero1.jpg'
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export const Hero = () => {
  const navigate = useNavigate();
  return <section className="pt-32 pb-20 px-4 md:pt-40 md:pb-28 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50 opacity-70"></div>
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
        <div className="absolute top-1/4 left-1/3 h-64 w-64 rounded-full bg-green-200 opacity-20 blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-blue-200 opacity-20 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/4 h-56 w-56 rounded-full bg-teal-200 opacity-20 blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Empower Change. Build a Circular Future.
          </h1>
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Join a community transforming waste into worth. Learn, collaborate,
            and act for sustainability.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => navigate('/signup')} className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full text-lg font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all">
              Explore Resources
            </button>
            <button onClick={() => navigate('/signup')} className="px-8 py-4 bg-white text-gray-800 rounded-full text-lg font-medium border border-gray-200 hover:border-green-500 hover:shadow-lg flex items-center justify-center gap-2 transform hover:-translate-y-1 transition-all">
              Join the Community
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent z-10 h-20 bottom-0 left-0 right-0"></div>
          <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-4xl mx-auto">
            <img src={pic} alt="Students collaborating on circular economy projects" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>
    </section>;
};