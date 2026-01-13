import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Edit, Trash2, ArrowUpRight } from 'lucide-react';
import { projectDefaults } from '../content';

const ProjectsPage = React.memo(({ t, lang, projects, isAdmin, handleEditProject, handleDeleteProject }) => {
    const { ref: sectionRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });
    const shouldAnimate = inView;
    const finalProjects = projects.length > 0 ? projects : t.projects.list.map(dt => ({ ...dt, ...projectDefaults[dt.id] }));

    // --- RUMUS BENTO GRID ---
    const getBentoClass = (i) => {
        const pattern = i % 6; 
        switch (pattern) {
            case 0: return "md:col-span-2 md:row-span-2"; // Besar
            case 1: return "md:col-span-1 md:row-span-1"; // Kecil
            case 2: return "md:col-span-1 md:row-span-2"; // Tinggi
            case 3: return "md:col-span-1 md:row-span-1"; // Kecil
            case 4: return "md:col-span-2 md:row-span-1"; // Lebar
            default: return "md:col-span-1 md:row-span-1"; // Kecil
        }
    };

    return (
        <section id="projects" className="relative w-full min-h-screen flex flex-col justify-center items-center py-2">
            <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>
            
            <div className="text-center mb-16 relative z-20 px-4">
                <h3 className="text-4xl font-bold mb-4 text-white animate-fade-up"> 
                    <span key={`${lang}-proj-title`}>{t.projects.title}</span> <span className="text-teal-400"> {t.projects.subtitle}</span>
                </h3>
                <p key={`${lang}-proj-desc`} className="text-gray-400 text-lg font-light max-w-2xl mx-auto animate-fade-up delay-100"> 
                    {t.projects.desc}
                </p>
                {isAdmin && (<button onClick={() => handleEditProject(null)} className="mt-4 text-teal-400 font-medium">+ TAMBAH PROYEK BARU</button>)}
            </div>
            
            <div className="max-w-7xl mx-auto px-4 w-full relative z-20" ref={sectionRef}> 
                <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
                    
                    {finalProjects.map((project, index) => {
                        const hasLink = project.link && project.link !== '#';
                        const Wrapper = hasLink ? 'a' : 'div';
                        const wrapperProps = hasLink ? { href: project.link, target: "_blank", rel: "noopener noreferrer" } : {};
                        const bentoClass = getBentoClass(index);
                        
                        // LOGIKA DETEKSI "KOTAK KECIL"
                        // Jika class mengandung 'col-span-1' DAN 'row-span-1', berarti itu kotak kecil
                        const isSmallGrid = bentoClass.includes('col-span-1') && bentoClass.includes('row-span-1');

                        return (
                            <div 
                                key={project.id} 
                                className={`relative group rounded-3xl overflow-hidden border border-white/10 shadow-lg transition-all duration-500 hover:border-teal-500/50 ${bentoClass} ${shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: shouldAnimate ? `${index * 100}ms` : '0s' }}
                            >
                                <Wrapper {...wrapperProps} className="block w-full h-full cursor-pointer">
                                    
                                    {/* 1. GAMBAR DENGAN EFEK BW & BLUR */}
                                    <div className="w-full h-full bg-gray-900">
                                        <img 
                                            src={project.img} 
                                            alt={project.title} 
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-all duration-700 
                                            grayscale blur-[2px] scale-100 opacity-80
                                            group-hover:grayscale-0 group-hover:blur-0 group-hover:scale-110 group-hover:opacity-100"
                                        />
                                    </div>

                                    {/* 2. OVERLAY HITAM (Lebih gelap biar teks kebaca) */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* TOMBOL ADMIN */}
                                    {isAdmin && (
                                        <div className="absolute top-4 right-4 z-50 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleEditProject(project); }} className="p-2 bg-teal-500 text-white rounded-full"><Edit className="w-4 h-4" /></button>
                                            <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteProject(project); }} className="p-2 bg-red-500 text-white rounded-full"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    )}

                                    {/* 3. KONTEN TEKS (Ukuran menyesuaikan grid) */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    

                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                            
                                            {/* JUDUL: Kalau kotak kecil, font lebih kecil (text-lg), kalau besar (text-2xl) */}
                                            <h4 className={`font-bold text-white mb-2 leading-tight ${isSmallGrid ? 'text-lg' : 'text-2xl'}`}>
                                                {project.title}
                                            </h4>

                                            {/* DESKRIPSI: Kalau kotak kecil, sembunyikan deskripsi biar gak sempit, atau potong pendek banget */}
                                            <p className={`text-gray-300 mb-4 ${isSmallGrid ? 'text-xs line-clamp-2' : 'text-sm line-clamp-3'}`}>
                                                {project.desc}
                                            </p>
                                            
                                            {/* TECH STACK: Sembunyikan di kotak kecil biar bersih */}
                                            {!isSmallGrid && (
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {(project.tech || '').split(', ').map((tag, i) => (
                                                        <span key={i} className="text-[10px] font-bold px-2 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/20">{tag}</span>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="flex items-center text-sm font-medium text-teal-400">
                                                <span>{t.projects.btnAll.includes('All') ? 'View' : 'Lihat'}</span> 
                                                <ArrowUpRight className="ml-2 w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Wrapper>
                            </div>
                        );
                    })}
                </div>
                
                <div className="mt-16 text-center">
                    <button className="px-8 py-3 rounded-full border border-gray-700 text-gray-300 hover:bg-teal-500/10 hover:text-teal-400 transition-all">
                        <span key={`${lang}-view-all`}>{t.projects.btnAll}</span>
                    </button>
                </div>
            </div>
        </section>
    );
});

export default ProjectsPage;