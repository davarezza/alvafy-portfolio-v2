import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Typewriter from 'typewriter-effect';
import { Typewriter as SimpleTypewriter } from 'react-simple-typewriter'
import ProfileCard from '../ProfileCard';
import Aurora from '../aurorabg';
import { Github, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';

// CUSTOM TIKTOK ICON
const TiktokIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 1 0 1-.22V21h3.45v-4.26a8.47 8.47 0 0 0 5-1.65v-4.04z"/>
    </svg>
);

const HomePage = React.memo(({ t, navigate }) => { 
    const { ref: sectionRef, inView } = useInView({ threshold: 0, rootMargin: "200px 0px 0px 0px" });
    const [startAnim, setStartAnim] = useState(false);

    useEffect(() => { if (inView) setStartAnim(true); }, [inView]);

    const animClass = (delay) => startAnim ? `animate-fade-up ${delay}` : 'opacity-0';

    return (
        <section id="home" ref={sectionRef} className="relative w-full min-h-[85vh] flex flex-col justify-start items-center overflow-visible pt-4 md:pt-10 pb-20">
            
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-[#1a1a1a]">
                {inView ? ( <Aurora colorStops={["#1d8c77", "#264d94", "#7c214c"]} blend={0.9} amplitude={1.2} speed={0.6} /> ) : null}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 w-full grid md:grid-cols-2 gap-8 items-center relative z-10 pt-24">
                <div className="mt-4 md:mt-8">
                    
                    {/* Greeting */}
                    <div key={t.hero.greeting} className={`text-xl text-gray-400 font-medium mb-2 tracking-widest uppercase text-sm ${animClass('delay-100')}`}>
                        {t.hero.greeting}
                    </div>

                    {/* Nama */}
                    <div className="mb-4 text-white tracking-tight drop-shadow-sm">
                        <h1 className={`text-5xl font-extrabold leading-none ${animClass('delay-200')}`}>Muhammad Dava</h1>
                        <h1 className={`text-5xl font-extrabold leading-none mt-1 ${animClass('delay-300')}`}>Al Rezza</h1>
                    </div>

                    {/* Role */}
                    <h2 className={`text-3xl text-gray-400 mb-6 font-extrabold flex flex-wrap gap-2 ${animClass('delay-400')}`}>
                        <span>{t.hero.role1}</span>
                        <span className="border-b-2 border-teal-400/50 text-white">
                            <SimpleTypewriter
                                words={t.hero.roles}
                                loop={0}               // 0 = infinite
                                cursor
                                cursorStyle="|"
                                typeSpeed={80}
                                deleteSpeed={50}
                                delaySpeed={1500}
                            />
                        </span>
                    </h2>
                    
                    {/* Sosmed */}
                    <div className={`flex items-center gap-6 mb-8 ${animClass('delay-500')}`}>
                        <a href={t.hero.social.github} target="_blank" rel="noopener noreferrer" aria-label="Github" className="text-gray-400 hover:text-teal-400 hover:scale-110 transition-all duration-300"><Github className="w-6 h-6" /></a>
                        <a href={t.hero.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-[#0077b5] hover:scale-110 transition-all duration-300"><Linkedin className="w-6 h-6" /></a>
                        <a href={t.hero.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-[#E1306C] hover:scale-110 transition-all duration-300"><Instagram className="w-6 h-6" /></a>
                        {/* <a href={t.hero.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-gray-400 hover:text-[#ff0050] hover:scale-110 transition-all duration-300"><TiktokIcon className="w-6 h-6" /></a> */}
                    </div>

                    {/* Typewriter */}
                    <div className="mb-8 text-lg max-w-lg text-gray-300 leading-relaxed font-light min-h-[5rem]">
                        <Typewriter key={t.hero.desc} options={{ delay: 20, cursor: '|', loop: false }} onInit={(typewriter) => { typewriter.pauseFor(500).typeString(t.hero.desc).start(); }} />
                    </div>

                    {/* Tombol  */}
                    <div className={`flex space-x-5 transition-all duration-500 ease-out ${animClass('delay-500')}`}>
                        <button onClick={() => navigate('projects')} className="group relative px-8 py-3 bg-teal-500/10 backdrop-blur-sm border border-teal-500/20 rounded-full overflow-hidden transition-all duration-300 hover:border-teal-400/50">
                            <div className="absolute inset-0 bg-teal-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                            <span key={t.hero.btnProject} className="relative font-semibold text-teal-100 group-hover:text-white tracking-wide flex items-center animate-fade-up">
                                {t.hero.btnProject} <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </span>
                        </button>
                        <button onClick={() => navigate('contact')} className="group px-8 py-3 border border-gray-600 rounded-full text-gray-400 font-medium hover:bg-gray-800 hover:text-white hover:border-gray-400 transition-all duration-300">
                            <span key={t.hero.btnContact} className="animate-fade-up">{t.hero.btnContact}</span>
                        </button>
                    </div>
                </div>
                
                {/*UBAH PROFILE CARD DI SINI*/}
                <div className={`flex justify-center md:justify-end transition-all duration-500 ease-out ${animClass('delay-500')}`}>
                    <ProfileCard name="Dava Rezza" title="Software Engineer" handle="rezza_dava" status="Online" contactText="Contact Me" avatarUrl="/avatar.webp" miniAvatarUrl="/miniavatar.webp" showUserInfo={true} enableTilt={true} enableMobileTilt={false} onContactClick={() => navigate('contact')} />
                </div>
            </div>
        </section>
    );
});
export default HomePage;