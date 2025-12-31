// src/seedData.js

import { db } from './firebaseConfig';
import { collection, setDoc, doc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

// --- DATA TOOLS & PROJECTS LAMA ANDA ---

const hardcodedTechStack = [
    { id: uuidv4(), name: "HTML", type: "Language", iconName: "file-code", color: "text-orange-500" },
    { id: uuidv4(), name: "CSS", type: "Language", iconName: "palette", color: "text-blue-500" },
    { id: uuidv4(), name: "JavaScript", type: "Language", iconName: "code2", color: "text-yellow-400" },
    { id: uuidv4(), name: "React JS", type: "Framework", iconName: "code2", color: "text-blue-400" },
    { id: uuidv4(), name: "Next JS", type: "Framework", iconName: "globe2", color: "text-white" },
    { id: uuidv4(), name: "Tailwind", type: "CSS Framework", iconName: "palette", color: "text-teal-400" },
    { id: uuidv4(), name: "Node JS", type: "Runtime", iconName: "server-cog", color: "text-green-500" },
    { id: uuidv4(), name: "Firebase", type: "Backend", iconName: "database", color: "text-yellow-500" },
    { id: uuidv4(), name: "MySQL", type: "Database", iconName: "database", color: "text-blue-600" },
    { id: uuidv4(), name: "MongoDB", type: "Database", iconName: "database", color: "text-green-400" },
    { id: uuidv4(), name: "Figma", type: "Design Tool", iconName: "figma", color: "text-purple-400" },
    { id: uuidv4(), name: "Canva", type: "Design Tool", iconName: "layout-dashboard", color: "text-blue-400" },
    { id: uuidv4(), name: "CapCut", type: "Video Editing", iconName: "layers", color: "text-white" },
    { id: uuidv4(), name: "Alight Motion", type: "Motion Graphic", iconName: "command", color: "text-green-400" },
    { id: uuidv4(), name: "Git", type: "Version Control", iconName: "gitbranch", color: "text-orange-500" },
    { id: uuidv4(), name: "VS Code", type: "Editor", iconName: "terminal", color: "text-blue-500" },
];

const hardcodedProjects = [
    {
        id: uuidv4(),
        title: "Aplikasi Manajemen Proyek",
        tech: "React, Node.js, MongoDB",
        desc: "Platform kolaborasi tim dengan fitur drag-and-drop dan manajemen tugas realtime.",
        icon: "layout-grid",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
    },
    {
        id: uuidv4(),
        title: "Situs E-commerce Kopi",
        tech: "Vue.js, Firebase",
        desc: "Toko online responsif dengan integrasi pembayaran gateway dan dashboard admin.",
        icon: "shopping-cart",
        img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2157&auto=format&fit=crop"
    },
    {
        id: uuidv4(),
        title: "Dashboard Analitik Data",
        tech: "Angular, D3.js",
        desc: "Dashboard interaktif untuk visualisasi data penjualan dengan grafik dinamis.",
        icon: "bar-chart-2",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    }
];

// FUNGSI UTAMA UNTUK MENGUNGGAH DATA
const seedData = async () => {
    try {
        console.log("Memulai proses seeding data ke Firestore...");

        // --- 1. UPLOAD TOOLS ---
        const toolsCollection = collection(db, 'tools');
        const toolPromises = hardcodedTechStack.map(async (tool) => {
            const { id, ...dataToSave } = tool;
            await setDoc(doc(toolsCollection, id), dataToSave);
        });
        await Promise.all(toolPromises);
        console.log(`✅ Berhasil mengunggah ${hardcodedTechStack.length} Tools.`);

        // --- 2. UPLOAD PROJECTS ---
        const projectsCollection = collection(db, 'projects');
        const projectPromises = hardcodedProjects.map(async (project) => {
            const { id, ...dataToSave } = project;
            await setDoc(doc(projectsCollection, id), dataToSave);
        });
        await Promise.all(projectPromises);
        console.log(`✅ Berhasil mengunggah ${hardcodedProjects.length} Proyek.`);

        console.log("\n>>> Proses Seeding Selesai! Data portofolio Anda sudah terisi di Firestore.");

    } catch (error) {
        console.error("❌ ERROR SAAT SEEDING:", error);
        console.log("Pastikan aturan Firebase Anda mengizinkan write: if true;");
    }
};

// Panggil fungsi seeding.
// Anda harus menjalankannya SECARA MANUAL (lihat Langkah 2)
// Ini adalah file ekspor dummy agar tidak ada error import di React.
export default seedData;