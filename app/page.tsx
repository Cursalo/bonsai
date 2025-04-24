import Link from 'next/link'
import Image from 'next/image'
import ThemeToggle from './components/ThemeToggle'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section with Bonsai Tree Background */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Inverted Bonsai Tree Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/90 via-primary-800/80 to-primary-700/70 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-700/70 z-10"></div>
          <div className="absolute inset-0 bg-cover bg-center filter invert" style={{ backgroundImage: 'url(/images/fotobonsai.png)' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <nav className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="mr-3 relative w-10 h-10">
                <Image 
                  src="/images/hoja1.png" 
                  alt="Bonsai Leaf" 
                  width={40} 
                  height={40} 
                  className="object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold text-white">Bonsai Prep</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="#how-it-works" className="text-white hover:text-primary-300 transition duration-300">
                How It Works
              </Link>
              <div className="relative group">
                <button className="text-white hover:text-primary-300 transition duration-300 flex items-center">
                  Resources
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-20 transform scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300 origin-top">
                  <div className="py-2">
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      SAT Practice Tests
                    </Link>
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Study Guides
                    </Link>
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Video Library
                    </Link>
                  </div>
                </div>
              </div>
              <Link href="#" className="text-white hover:text-primary-300 transition duration-300">
                Pricing
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/login" className="px-4 py-2 rounded-md text-white border border-white/30 hover:bg-white/10 transition duration-300">
                Log In
              </Link>
              <Link href="/register" className="px-4 py-2 rounded-md bg-primary-500 text-white hover:bg-primary-600 transition duration-300">
                Sign Up
              </Link>
            </div>
          </nav>
          
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                Ace Your <span className="text-primary-300">SAT & PSAT</span> with AI-Powered Tutoring
              </h2>
              <p className="mt-6 text-xl text-gray-200">
                Boost your scores with personalized SAT/PSAT tutoring, practice tests, and AI-generated video lessons tailored to your learning style.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/login" className="px-8 py-3 text-lg rounded-md bg-primary-500 text-white hover:bg-primary-600 transition duration-300 text-center">
                  Start Prep Now
                </Link>
                <Link href="#how-it-works" className="px-8 py-3 text-lg rounded-md border border-white/30 text-white hover:bg-white/10 transition duration-300 text-center">
                  Learn More
                </Link>
              </div>
              
              {/* Added testimonial badge */}
              <div className="mt-12 inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <span className="text-yellow-400 mr-2">★★★★★</span>
                <span className="text-white text-sm">Trusted by 10,000+ students</span>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="relative h-[500px] w-full">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full relative flex flex-col items-center justify-center">
                      {/* Bonsai image - large and centered */}
                      <div className="relative w-[600px] h-[600px] z-20 -mt-[100px] ml-[50px]">
                        <Image
                          src="/bonsai1024.png"
                          alt="Bonsai Logo"
                          width={600}
                          height={600}
                          priority
                          className="object-contain"
                        />
                      </div>
                      
                      {/* Trunk below the bonsai */}
                      <div className="absolute bottom-0 w-1 h-1/3 bg-primary-400"></div>
                      <div className="absolute bottom-0 w-32 h-32">
                        <Image
                          src="/images/tronco.png"
                          alt="Bonsai Tree Trunk"
                          width={128}
                          height={128}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Added decorative elements */}
                  <div className="absolute top-8 right-8 w-20 h-20 rounded-full bg-primary-500/20 backdrop-blur-sm"></div>
                  <div className="absolute bottom-12 left-8 w-16 h-16 rounded-full bg-primary-300/20 backdrop-blur-sm"></div>
                  <div className="absolute top-1/3 left-12 w-8 h-8 rounded-full bg-primary-400/30 backdrop-blur-sm"></div>
                </div>
                
                {/* Floating leaves animation */}
                <div className="absolute top-1/4 left-1/4 w-12 h-12 animate-float-slow">
                  <Image src="/images/hoja2.png" alt="Leaf" fill className="object-contain" />
                </div>
                <div className="absolute top-1/3 right-1/4 w-10 h-10 animate-float-medium">
                  <Image src="/images/hoja3.png" alt="Leaf" fill className="object-contain" />
                </div>
                <div className="absolute bottom-1/3 right-1/3 w-8 h-8 animate-float-fast">
                  <Image src="/images/hoja4.png" alt="Leaf" fill className="object-contain" />
                </div>
                <div className="absolute bottom-1/4 left-1/3 w-14 h-14 animate-float-medium">
                  <Image src="/images/hoja5.png" alt="Leaf" fill className="object-contain" />
                </div>
                
                {/* Added more floating elements */}
                <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-primary-300/30 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-primary-400/30 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
          
          {/* SAT Score Improvement Banner */}
          <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/10">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white">Students using Bonsai Prep see an average</h3>
              <p className="mt-2 text-4xl font-extrabold text-primary-300">
                +215 point increase
              </p>
              <p className="mt-2 text-gray-200">
                on their SAT scores after just 8 weeks
              </p>
              
              {/* Added CTA button */}
              <div className="mt-6">
                <Link href="/register" className="inline-flex items-center px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition duration-300">
                  <span>Join them today</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
              
              {/* Limited time offer countdown */}
              <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <p className="text-white text-sm mb-2">Limited time offer ends in:</p>
                <div className="flex justify-center space-x-4">
                  <div className="flex flex-col items-center">
                    <div className="bg-primary-600 text-white w-10 h-10 rounded-md flex items-center justify-center text-xl font-bold">2</div>
                    <span className="text-xs text-white mt-1">Days</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-primary-600 text-white w-10 h-10 rounded-md flex items-center justify-center text-xl font-bold">18</div>
                    <span className="text-xs text-white mt-1">Hours</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-primary-600 text-white w-10 h-10 rounded-md flex items-center justify-center text-xl font-bold">45</div>
                    <span className="text-xs text-white mt-1">Minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Floating Chat Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-primary-500 hover:bg-primary-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      </div>

      {/* Features Section */}
      <section id="how-it-works" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block mb-6">
              <div className="relative w-16 h-16 mx-auto">
                <Image src="/images/hoja1.png" alt="Bonsai Leaf" fill className="object-contain" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How Our SAT/PSAT Prep Works</h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our AI-driven platform helps you master the SAT and PSAT through personalized practice and feedback.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 transform transition duration-500 hover:scale-105">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-300 mb-6">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Practice SAT Questions</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Complete daily SAT/PSAT practice questions and submit your answers for AI analysis.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 transform transition duration-500 hover:scale-105">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-300 mb-6">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">AI-Powered Analysis</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Our AI identifies your specific weaknesses in Math, Reading, and Writing sections.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 transform transition duration-500 hover:scale-105">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-300 mb-6">
                <span className="text-2xl">🎥</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">SAT Video Lessons</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Watch custom video tutorials that target your specific SAT/PSAT knowledge gaps.
              </p>
            </div>
          </div>

          {/* SAT Topics Coverage */}
          <div className="mt-20 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Comprehensive SAT/PSAT Coverage</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Our platform covers all sections and topics on the latest SAT and PSAT exams.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-600">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-300 mr-3">
                    <span className="text-xl">📊</span>
                  </div>
                  <h4 className="font-bold text-primary-600 dark:text-primary-400 text-lg">Math</h4>
                </div>
                <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Algebra & Functions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Problem Solving</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Data Analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Geometry & Trigonometry</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-600">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-300 mr-3">
                    <span className="text-xl">📖</span>
                  </div>
                  <h4 className="font-bold text-primary-600 dark:text-primary-400 text-lg">Reading</h4>
                </div>
                <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Information & Ideas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Rhetoric</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Synthesis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Vocabulary in Context</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-600">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-300 mr-3">
                    <span className="text-xl">✏️</span>
                  </div>
                  <h4 className="font-bold text-primary-600 dark:text-primary-400 text-lg">Writing</h4>
                </div>
                <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Expression of Ideas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Standard English Conventions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Grammar & Punctuation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Rhetorical Skills</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 rounded-full bg-primary-100 dark:bg-primary-900 opacity-50"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 rounded-full bg-primary-100 dark:bg-primary-900 opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-block mb-6">
              <div className="relative w-16 h-16 mx-auto">
                <Image src="/images/hoja3.png" alt="Bonsai Leaf" fill className="object-contain" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">SAT/PSAT Prep Pricing</h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Affordable SAT tutoring that costs less than traditional prep courses.
            </p>
          </div>

          <div className="mt-16 max-w-md mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-primary-100 dark:border-primary-800 transform transition duration-500 hover:scale-105">
              <div className="bg-primary-50 dark:bg-primary-900 px-6 py-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">SAT/PSAT Prep Package</h3>
                <div className="mt-4 flex justify-center">
                  <span className="text-5xl font-extrabold text-gray-900 dark:text-white">$50</span>
                  <span className="ml-2 text-xl font-medium text-gray-500 dark:text-gray-400 self-end">/month</span>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">Up to 50 personalized SAT/PSAT video lessons</p>
              </div>
              <div className="bg-white dark:bg-gray-800 px-6 py-8">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-green-500 flex-shrink-0 text-lg">✓</span>
                    <span className="ml-3 text-gray-600 dark:text-gray-300">Daily SAT/PSAT practice questions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 flex-shrink-0 text-lg">✓</span>
                    <span className="ml-3 text-gray-600 dark:text-gray-300">AI analysis of your answers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 flex-shrink-0 text-lg">✓</span>
                    <span className="ml-3 text-gray-600 dark:text-gray-300">Personalized SAT/PSAT video lessons</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 flex-shrink-0 text-lg">✓</span>
                    <span className="ml-3 text-gray-600 dark:text-gray-300">Progress tracking with score predictions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 flex-shrink-0 text-lg">✓</span>
                    <span className="ml-3 text-gray-600 dark:text-gray-300">Additional practice packs available</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link href="/login" className="block w-full py-3 px-4 rounded-md bg-primary-600 text-white text-center font-medium hover:bg-primary-700 transition duration-300 shadow-md">
                    Start SAT Prep Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center">
                <div className="mr-3 relative w-8 h-8">
                  <Image src="/images/hoja5.png" alt="Bonsai Leaf" fill className="object-contain" />
                </div>
                <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400">Bonsai Prep</h3>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Specialized SAT and PSAT preparation with AI-powered tutoring.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">Quick Links</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition duration-300">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition duration-300">
                    Start SAT Prep
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition duration-300">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">Contact</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="mailto:sat@bonsaiprep.com" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition duration-300">
                    sat@bonsaiprep.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              &copy; {new Date().getFullYear()} Bonsai Prep. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
} 