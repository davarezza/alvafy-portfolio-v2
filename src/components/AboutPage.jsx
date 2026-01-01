import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { SimpleSpotlightCard, AnimatedCounter, Icon, getIconComponent } from './UI';
import Lanyard from '../Lanyard'; 

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
                <div className="w-full mt-20" ref={toolsRef}>
                    <div className="text-center mb-10 flex flex-col items-center">
                        <h3 key={t.about.techTitle} className="text-2xl font-bold text-white mb-2 animate-fade-up">{t.about.techTitle}</h3>
                        <div className={`h-1 w-20 mx-auto rounded-full mb-4 transition-all duration-700 ease-out transform origin-left ${shouldAnimateTools ? 'scale-x-100 bg-indigo-500' : 'scale-x-0 bg-gray-700'}`}></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {tools.map((tech, index) => {
                            const TechIcon = getIconComponent(tech.iconName); 
                            const delayMs = 100 + Math.floor(index / 4) * 150; 
                            return (
                                <div key={tech.id} className={`group p-4 bg-[#1a1a1a]/50 border border-white/30 rounded-xl transition-all duration-500 flex flex-col items-center justify-center space-y-3 cursor-default relative ${shouldAnimateTools ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: shouldAnimateTools ? `${delayMs}ms` : '0s' }}>
                                    <div className={`p-3 rounded-lg bg-black/40 group-hover:scale-110 transition-transform duration-300 ${tech.color || 'text-white'}`}><TechIcon className="w-8 h-8" /></div>
                                    <div className="flex flex-col items-center text-center"><span className="text-gray-200 font-semibold text-sm group-hover:text-teal-400 transition-colors">{tech.name}</span><span className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">{tech.type}</span></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
});
export default AboutPage;