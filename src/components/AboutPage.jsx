import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { SimpleSpotlightCard, AnimatedCounter, Icon, getIconComponent } from './UI';
import Lanyard from '../Lanyard'; 
import TechStack from "./TechStack";

const AboutPage = React.memo(({ t, tools }) => { 
    const { ref: bioStatRef, inView: bioStatInView } = useInView({ threshold: 0.5, triggerOnce: true }); 
    const { ref: toolsRef, inView: toolsInView } = useInView({ threshold: 0.2, triggerOnce: true }); 
    const { ref: titleRef, inView: titleInView } = useInView({ threshold: 0.2, triggerOnce: true });

    const shouldAnimateBioStat = bioStatInView; 
    const shouldAnimateTools = toolsInView; 
    const animClass = (inView, delay) => inView ? `animate-fade-up ${delay}` : 'opacity-0';

    const [isDesktop, setIsDesktop] = useState(false);
    const [hasScrolledToAbout, setHasScrolledToAbout] = useState(false); 
    const { ref: sectionRef, inView: sectionInView } = useInView({ threshold: 0.1, triggerOnce: true });

    useEffect(() => { if (sectionInView) setHasScrolledToAbout(true); }, [sectionInView]);
    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section id="about" ref={sectionRef} className="relative w-full flex flex-col justify-center items-center py-20 overflow-visible">
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="max-w-6xl w-full mx-auto px-4 relative z-20">
                <div ref={titleRef}>
                    <SimpleSpotlightCard className="p-8 md:p-12 min-h-[600px] mb-12" spotlightColor="indigo">
                        {isDesktop && hasScrolledToAbout && ( <div className="absolute top-0 left-0 md:left-8 w-32 md:w-64 h-[650px] z-50 pointer-events-auto fade-in-3d"><div style={{ width: '100%', height: '100%' }}><Lanyard transparent={true} /></div></div> )}
                        <div className="relative z-10 grid md:grid-cols-[250px_1fr] gap-8 h-full">
                            <div className="hidden lg:block"></div>
                            <div className="flex flex-col justify-center text-left">
                                <div className="mb-6 mt-12 md:mt-0">
                                    <h3 className={`text-4xl font-bold mb-4 text-white ${animClass(titleInView, '')}`}>
                                        <span key={t.about.title}>{t.about.title}</span> <span key={t.about.subtitle} className="text-indigo-400"> {t.about.subtitle}</span>
                                    </h3>
                                    <p key={t.about.desc} className={`text-gray-400 text-lg font-light border-l-2 border-indigo-500/70 pl-4 italic ${animClass(titleInView, 'delay-100')}`}>{t.about.desc}</p>
                                </div>
                                <div className={`space-y-6 text-gray-300 font-light leading-relaxed text-lg mb-8 ${animClass(titleInView, 'delay-200')}`}>
                                    <p key={t.about.bio1}>{t.about.bio1}<br/><br/>{t.about.bio2}</p>
                                </div>
                                
                                {/* STATS DENGAN ANIMASI LABEL */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10 border-t border-b border-gray-800 py-6" ref={bioStatRef}>
                                    <div className={`flex flex-col items-start transition-opacity duration-700 ${shouldAnimateBioStat ? 'opacity-100' : 'opacity-0'}`}>
                                        <span className="text-4xl md:text-5xl font-bold text-indigo-400 mb-1"><AnimatedCounter end={1} suffix="+" /></span>
                                        {/* Key disini biar labelnya animasi ulang */}
                                        <span key={t.about.stats.exp} className="text-sm text-gray-500 uppercase tracking-wider font-medium animate-fade-up">{t.about.stats.exp}</span>
                                    </div>
                                    <div className={`flex flex-col items-start transition-opacity duration-700 delay-200 ${shouldAnimateBioStat ? 'opacity-100' : 'opacity-0'}`}>
                                        <span className="text-4xl md:text-5xl font-bold text-indigo-400 mb-1"><AnimatedCounter end={10} suffix="+" /></span>
                                        <span key={t.about.stats.proj} className="text-sm text-gray-500 uppercase tracking-wider font-medium animate-fade-up">{t.about.stats.proj}</span>
                                    </div>
                                    <div className={`flex flex-col items-start transition-opacity duration-700 delay-400 ${shouldAnimateBioStat ? 'opacity-100' : 'opacity-0'}`}>
                                        <span className="text-4xl md:text-5xl font-bold text-indigo-400 mb-1"><AnimatedCounter end={5} suffix="+" /></span>
                                        <span key={t.about.stats.client} className="text-sm text-gray-500 uppercase tracking-wider font-medium animate-fade-up">{t.about.stats.client}</span>
                                    </div>
                                </div>

                                <div className={`${animClass(titleInView, 'delay-300')}`}>
                                    <a href={t.about.cvUrl} target="_blank" rel="noopener noreferrer" className="flex items-center w-fit px-8 py-3 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-100 hover:bg-teal-500/20 hover:border-teal-400/50 transition group cursor-pointer backdrop-blur-sm shadow-lg hover:shadow-teal-500/20">
                                        <span key={t.about.download} className="animate-fade-up">{t.about.download}</span> 
                                        <Icon name="download" className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100 group-hover:text-teal-300" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </SimpleSpotlightCard>
                </div>
                <TechStack
                    title={t.about.techTitle}
                    tools={t.about.tools}
                    shouldAnimate={shouldAnimateTools}
                />
            </div>
        </section>
    );
});
export default AboutPage;