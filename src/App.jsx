import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster, toast } from 'react-hot-toast'; 
import { v4 as uuidv4 } from 'uuid';
import { ChevronUp } from 'lucide-react';

// --- IMPORTS KOMPONEN (Pastikan Anda sudah membuat file-file ini di langkah sebelumnya) ---
import Navbar from './Navbar';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
const ProjectsPage = React.lazy(() => import('./components/ProjectsPage'));
const ContactPage = React.lazy(() => import('./components/ContactPage'));
import { SecretLoginModal, AdminModal } from './components/Modals';

// --- IMPORT DATA ---
import { content, projectDefaults } from './content'; 
import { db } from './firebaseConfig'; 
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore'; 

// CSS Aurora tetap di-import untuk background HomePage
import './aurorabg.css';

function App() {
    const [lang, setLang] = useState('en');
    const [activePage, setActivePage] = useState('home');
    const [showScrollTop, setShowScrollTop] = useState(false);
    
    // Auth State
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    
    // Data State (Default kosong, nanti otomatis pakai data statis di ProjectsPage)
    const [projectsData, setProjectsData] = useState([]);
    
    // Edit State (Untuk Admin)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null); 
    const [editType, setEditType] = useState(null); 
    const [isScrolled, setIsScrolled] = useState(false); 

    const t = content[lang];
    const toggleLanguage = () => setLang(prev => prev === 'id' ? 'en' : 'id');

    const navigateToSection = (id) => {
        setActivePage(id);
        const element = document.getElementById(id);
        if (element) { element.scrollIntoView({ behavior: 'smooth' }); }
    };

    // --- FETCH DATA (BACKGROUND PROCESS) ---
    const fetchFirestoreData = useCallback(async () => {
    try {
        // Cek dulu apakah Firebase sudah di-setup (Bukan dummy text)
        if (db.app.options.apiKey === "MASUKKAN_API_KEY_ANDA") {
            console.warn("Firebase Config belum di-setup. Menggunakan data lokal.");
            return;
        }

        const projectsCol = collection(db, 'projects');
        const projectsSnapshot = await getDocs(projectsCol);
        let fetchedProjects = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        if (fetchedProjects.length > 0) {
            setProjectsData(fetchedProjects);
        }
    } catch (error) {
        // Error di-handle tanpa bikin web mati
        console.error("Firebase connection failed. UI is safe with fallback data.");
    }
}, []);

    useEffect(() => { 
        fetchFirestoreData(); 
    }, [fetchFirestoreData]);

    // --- CRUD HANDLERS (ADMIN ONLY) ---
    const handleSaveProject = async (updatedProject) => {
        const id = updatedProject.id && updatedProject.id !== 'null' ? updatedProject.id : ('proj-' + uuidv4()); 
        let finalItem = { ...updatedProject, id };
        const toastId = toast.loading("Saving...");
        try {
            const { id: itemId, ...dataToSave } = finalItem; 
            await setDoc(doc(db, 'projects', itemId), dataToSave);
            fetchFirestoreData(); // Refresh data tanpa loading screen
            toast.success("Saved!", { id: toastId });
        } catch (error) {
            console.error("Save Error:", error);
            toast.error("Failed to save. Check permissions.", { id: toastId });
        }
    };

    const handleDeleteProject = async (project) => {
        if (!window.confirm(`Delete '${project.title}'?`)) return;
        const toastId = toast.loading("Deleting...");
        try {
            await deleteDoc(doc(db, 'projects', project.id));
            fetchFirestoreData();
            toast.success("Deleted!", { id: toastId });
        } catch (error) {
            toast.error("Failed to delete.", { id: toastId });
        }
    };

    const handleEditProject = (project) => {
        // Default template jika menambah project baru
        const defaultProject = { id: null, title: '', tech: '', desc: '', icon: 'globe', img: 'https://placehold.co/600x400/9333EA/FFFFFF/png?text=NEW+PROJECT' };
        setEditingItem(project || defaultProject);
        setEditType('project');
        setIsEditModalOpen(true);
    };

    // --- SCROLL LOGIC ---
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100 && !isScrolled) setIsScrolled(true);
            if (window.scrollY > 1000) setShowScrollTop(true); else setShowScrollTop(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isScrolled]);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    // --- RENDER UTAMA ---
    return (
        <HelmetProvider>
            <div className="antialiased w-full min-h-screen flex flex-col bg-[#1a1a1a] relative overflow-x-hidden">
            
            {/* SEO HELMET */}
            <Helmet>
                <meta charSet="utf-8" />
                <title>{lang === 'id' ? 'Dava Rezza | Portfolio' : 'Dava Rezza | Portfolio'}</title>
                <meta name="description" content="Portfolio Backend Developer. Spesialis Laravel, Golang, dan Express." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#14b8a6" />
            </Helmet>

            <Toaster position="bottom-right" reverseOrder={false} />

            {/* TIDAK ADA LAGI LOADING SCREEN DIV DI SINI */}

            <div className="relative z-10 flex flex-col w-full">
                <Navbar 
                    logo="Alvafy" 
                    items={t.nav} 
                    activeHref={activePage} 
                    onItemClick={navigateToSection} 
                    currentLang={lang} 
                    onLangToggle={toggleLanguage} 
                    onSecretLogin={() => setIsLoginModalOpen(true)} 
                    isAdmin={isAdmin} 
                />
                
                <main key={lang} className="flex flex-col w-full pb-0">
                    <HomePage t={t} navigate={navigateToSection} />
                    
                    
                    <AboutPage t={t} tools={t.about.tools} />
                    <Suspense fallback={<div className="py-20 text-center text-teal-500 font-bold">Loading Content...</div>}>
                    
                    <ProjectsPage 
                        t={t} 
                        projects={projectsData} 
                        isAdmin={isAdmin} 
                        handleEditProject={handleEditProject} 
                        handleDeleteProject={handleDeleteProject} 
                        lang={lang}
                    />
                    
                    <ContactPage t={t} 
                    lang={lang}/>
                    
                    </Suspense>
                </main>

                <button 
                    onClick={scrollToTop} 
                    className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-teal-500 text-black shadow-lg hover:bg-teal-400 hover:scale-110 transition-all duration-500 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                    aria-label="Scroll to top"
                >
                    <ChevronUp className="w-6 h-6 font-bold" />
                </button>
                
                {/* MODALS */}
                <SecretLoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={(uid) => { setIsAdmin(true); }} />
                <AdminModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} initialData={editingItem} type={editType} onSave={handleSaveProject} />
            </div>
        </div>
        </HelmetProvider>
    );
}

export default App;