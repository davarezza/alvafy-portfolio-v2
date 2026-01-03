
// --- DATA GAMBAR DEFAULT PROYEK ---
    export const projectDefaults = {
    'proj-1': { img: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000', link: '#' },
    'proj-2': { img: 'https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=1000', link: '#' },
    'proj-3': { img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000', link: '#' },
    'proj-4': { img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000', link: '#' },
    'proj-5': { img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000', link: '#' },
};

// --- DATA KONTEN WEBSITE ---
export const content = {
    // --- DATA ID (INDONESIA) ---
    id: {
        nav: [
            { label: "Beranda", href: "home" },
            { label: "Tentang", href: "about" },
            { label: "Proyek", href: "projects" },
            { label: "Kontak", href: "contact" }
        ],
        hero: {
            greeting: "Halo, Saya",
            role1: "Seorang",
            roles: ["Backend Developer", "DevOps Enthusiast", "Computer Science Student"],
            desc: "Membangun arsitektur backend yang kokoh dan memastikan sistem tetap stabil, aman, dan siap tumbuh tanpa batas.",
            btnProject: "Lihat Proyek",
            btnContact: "Kontak Saya",
            social: {
                github: "https://github.com/davarezza",
                linkedin: "https://www.linkedin.com/in/m-dava-al-rezza/",
                instagram: "",
                tiktok: "",
            }
        },
        about: {
            title: "Tentang",
            subtitle: "Saya",
            desc: "Backend Engineer & Infrastructure Explorer",
            bio1: "Perjalanan teknologi saya dimulai sejak SMK. Sebagai developer pembelajar mandiri, saya terbiasa memecahkan masalah secara independen dan memandang koding sebagai seni menyusun logika \"hidup\" yang tangguh.",
            bio2: "Saat ini saya menempuh studi Teknik Informatika, di mana saya menjembatani celah antara pengembangan server-side yang kokoh dan praktik DevOps modern untuk membangun sistem yang tidak hanya fungsional, tapi juga skalabel dan aman.",
            download: "Unduh CV",
            cvUrl: "https://drive.google.com/file/d/188doqS3_pTOLf_f4hx1JC3r02350bOls/view?usp=sharing", 
            stats: { exp: "Tahun Pengalaman Kerja", proj: "Proyek Selesai", client: "Kolaborasi Klien" },
            techTitle: "Creative & Tech Stack",
            tools: [
                { id: 'dev-1', name: 'React', type: 'Frontend Lib', iconName: 'code2', color: 'text-cyan-400' }, 
                { id: 'dev-2', name: 'Tailwind', type: 'CSS Framework', iconName: 'palette', color: 'text-teal-400' }, 
                { id: 'dev-3', name: 'Firebase', type: 'Backend Service', iconName: 'servercog', color: 'text-orange-400' }, 
                { id: 'dev-4', name: 'Next.js', type: 'Web Framework', iconName: 'globe2', color: 'text-white' },
                { id: 'dev-5', name: 'VS Code', type: 'Code Editor', iconName: 'terminal', color: 'text-blue-500' },
                { id: 'dev-6', name: 'Git / Github', type: 'Version Control', iconName: 'gitbranch', color: 'text-red-500' },
                { id: 'des-1', name: 'Figma', type: 'UI/UX Design', iconName: 'figma', color: 'text-purple-400' },
                { id: 'des-2', name: 'Photoshop', type: 'Image Editing', iconName: 'layers', color: 'text-blue-600' },
                { id: 'des-3', name: 'Lightroom', type: 'Color Grading', iconName: 'brush', color: 'text-cyan-300' },
                { id: 'des-4', name: 'Illustrator', type: 'Vector Art', iconName: 'pentool', color: 'text-orange-500' },
                { id: 'des-5', name: 'Canva', type: 'Layout Design', iconName: 'layoutdashboard', color: 'text-cyan-500' },
                { id: 'des-6', name: 'Sketch', type: 'Prototyping', iconName: 'pencilruler', color: 'text-yellow-500' },
                { id: 'vid-1', name: 'Premiere Pro', type: 'Video Editing', iconName: 'video', color: 'text-purple-600' },
                { id: 'vid-2', name: 'After Effects', type: 'Motion VFX', iconName: 'zap', color: 'text-indigo-500' },
                { id: 'vid-3', name: 'CapCut', type: 'Mobile Editing', iconName: 'phone', color: 'text-white' },
                { id: 'vid-4', name: 'DaVinci', type: 'Colorist', iconName: 'palette', color: 'text-pink-500' },
                { id: 'vid-5', name: 'Audition', type: 'Audio Mixing', iconName: 'radio', color: 'text-green-400' },
                { id: 'vid-6', name: 'OBS Studio', type: 'Streaming', iconName: 'wifi', color: 'text-gray-400' },
            ]
        },
        projects: {
            title: "Proyek",
            subtitle: "Terpilih",
            desc: "Beberapa karya yang menyoroti keahlian saya.",
            btnAll: "Lihat Semua Proyek",
            list: [
                { id: 'proj-1', title: 'Toko Online E-commerce', desc: 'Platform penjualan online yang responsif dengan fitur keranjang dan checkout terintegrasi.', tech: 'React, Tailwind, Firebase' },
                { id: 'proj-2', title: 'Dashboard Analitik', desc: 'Dashboard interaktif untuk memvisualisasikan data dan metrik bisnis secara real-time.', tech: 'React, Chart.js' },
                { id: 'proj-3', title: 'Portofolio Pribadi', desc: 'Situs portofolio ini, dirancang untuk menunjukkan keterampilan dan proyek-proyek terbaru.', tech: 'React, OGL, Firebase' },
                { id: 'proj-4', title: 'Aplikasi Daftar Tugas', desc: 'Aplikasi sederhana untuk manajemen tugas harian dengan fitur drag-and-drop.', tech: 'React, LocalStorage' },
            ]
        },
        contact: {
    title: "Mari", subtitle: "Terhubung",
    desc: "Saya selalu terbuka untuk peluang baru dan pertukaran ide. Kirimkan pesan Anda.",
    headline: "MULAI KIRIM PESAN",
    contactInfo: {
         email: "dapva2728@gmail.com",
         phone: "+62 838 3583 922",
         waNumber: "628383583922",
         message: "Hi Dava, "        
    },
            form: { name: "ID Pengirim / Nama", email: "Frekuensi Email", title: "Judul Pesan", msg: "Isi Pesan", btn: "KIRIM PESAN", success: "Pesan Anda telah berhasil terkirim!" }
        }
    },
    // --- DATA EN (INGGRIS) ---
    en: {
        nav: [
            { label: "Home", href: "home" },
            { label: "About", href: "about" },
            { label: "Projects", href: "projects" },
            { label: "Contact", href: "contact" }
        ],
        hero: { 
            greeting: "Hello, I am", role1: "A", roles: ["Backend Developer", "DevOps Enthusiast", "Computer Science Student"], 
            desc: "Building robust backend architectures and ensure systems stay stable, secure, and ready to scale without limits.", 
            btnProject: "View Projects", btnContact: "Contact Me",
            social: {
                github: "https://github.com/davarezza",
                linkedin: "https://www.linkedin.com/in/m-dava-al-rezza/",
                instagram: "",
                tiktok: "",
            }
        },
        about: {
            title: "About",
            subtitle: "Me",
            desc: "Backend Engineer & Infrastructure Explorer",
            bio1: "My journey in technology began in Vocational High School. As a self-taught developer, I’ve mastered the art of independent problem-solving and view coding as the craft of structuring resilient, \"living\" logic.",
            bio2: "Currently pursuing a degree in Computer Science, I am bridging the gap between robust server-side development and modern DevOps practices to build systems that are not only functional but also scalable and secure.",
            download: "Download CV",
            cvUrl: "https://drive.google.com/file/d/188doqS3_pTOLf_f4hx1JC3r02350bOls/view?usp=sharing",
            
            stats: { exp: "Years Professional Experience", proj: "Projects Done", client: "Client Collaborations" },
            techTitle: "Creative & Tech Stack",
            tools: [
                { id: 'dev-1', name: 'React', type: 'Frontend Lib', iconName: 'code2', color: 'text-cyan-400' }, 
                { id: 'dev-2', name: 'Tailwind', type: 'CSS Framework', iconName: 'palette', color: 'text-teal-400' }, 
                { id: 'dev-3', name: 'Firebase', type: 'Backend Service', iconName: 'servercog', color: 'text-orange-400' }, 
                { id: 'dev-4', name: 'Next.js', type: 'Web Framework', iconName: 'globe2', color: 'text-white' },
                { id: 'dev-5', name: 'VS Code', type: 'Code Editor', iconName: 'terminal', color: 'text-blue-500' },
                { id: 'dev-6', name: 'Git / Github', type: 'Version Control', iconName: 'gitbranch', color: 'text-red-500' },
                { id: 'des-1', name: 'Figma', type: 'UI/UX Design', iconName: 'figma', color: 'text-purple-400' },
                { id: 'des-2', name: 'Photoshop', type: 'Image Editing', iconName: 'layers', color: 'text-blue-600' },
                { id: 'des-3', name: 'Lightroom', type: 'Color Grading', iconName: 'brush', color: 'text-cyan-300' },
                { id: 'des-4', name: 'Illustrator', type: 'Vector Art', iconName: 'pentool', color: 'text-orange-500' },
                { id: 'des-5', name: 'Canva', type: 'Layout Design', iconName: 'layoutdashboard', color: 'text-cyan-500' },
                { id: 'des-6', name: 'Sketch', type: 'Prototyping', iconName: 'pencilruler', color: 'text-yellow-500' },
                { id: 'vid-1', name: 'Premiere Pro', type: 'Video Editing', iconName: 'video', color: 'text-purple-600' },
                { id: 'vid-2', name: 'After Effects', type: 'Motion VFX', iconName: 'zap', color: 'text-indigo-500' },
                { id: 'vid-3', name: 'CapCut', type: 'Mobile Editing', iconName: 'phone', color: 'text-white' },
                { id: 'vid-4', name: 'DaVinci', type: 'Colorist', iconName: 'palette', color: 'text-pink-500' },
                { id: 'vid-5', name: 'Audition', type: 'Audio Mixing', iconName: 'radio', color: 'text-green-400' },
                { id: 'vid-6', name: 'OBS Studio', type: 'Streaming', iconName: 'wifi', color: 'text-gray-400' },
            ]
        },
        projects: {
            title: "Selected",
            subtitle: "Projects",
            desc: "Some works that highlight my expertise.",
            btnAll: "View All Projects",
            list: [
                { id: 'proj-1', title: 'E-commerce Store', desc: 'Responsive online sales platform with integrated cart and checkout features.', tech: 'React, Tailwind, Firebase' },
                { id: 'proj-2', title: 'Analytics Dashboard', desc: 'Interactive dashboard for visualizing real-time business data and metrics.', tech: 'React, Chart.js' },
                { id: 'proj-3', title: 'Personal Portfolio Site', desc: 'This portfolio site, designed to showcase latest skills and projects.', tech: 'React, OGL, Firebase' },
                { id: 'proj-4', title: 'To-Do List Application', desc: 'Simple application for daily task management with drag-and-drop features.', tech: 'React, LocalStorage' },
            ]
        },
        contact: {
            title: "Let's", 
            subtitle: "Connect",
            desc: "I am open to collaborations, new ideas, or just a chat. Feel free to reach out",
            headline: "INITIATE SEND MESSAGE",
            contactInfo: {
                 email: "dapva2728@gmail.com",
                 phone: "+62 838 3583 922",
                 waNumber: "628383583922",
                 message: "Hi Dava, "        
            },
            form: { 
                name: "Sender ID / Name", 
                email: "Email Frequency",
                title: "Message Title", 
                msg: "Message Content", 
                btn: "SEND MESSAGE", 
                success: "Your message has been successfully sent!" 
            } 
        }
    }
};