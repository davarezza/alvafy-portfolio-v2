// src/components/UI.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast'; 
import {
    Globe, Menu, X, Linkedin, Github, Twitter, Figma, Instagram,
    User, Download, PencilRuler, LayoutDashboard, ServerCog, Database,
    LayoutGrid, ArrowUpRight, ShoppingCart, BarChart2, Mail, Phone, MapPin, Send, ArrowUp, CheckCircle,
    Code2, Terminal, Cpu, Layers, Palette, GitBranch, Globe2, Command, Video, FileCode, Wifi, Radio,
    Lock, ChevronUp, Edit, Trash2, Save, PlusCircle, PenTool, Zap, Brush
} from 'lucide-react';

// --- ICON MAP ---
export const iconMap = {
    globe: Globe, menu: Menu, x: X, linkedin: Linkedin, github: Github,
    twitter: Twitter, figma: Figma, instagram: Instagram, user: User, 
    download: Download, pencilruler: PencilRuler, layoutdashboard: LayoutDashboard,
    servercog: ServerCog, database: Database, layoutgrid: LayoutGrid, arrowupright: ArrowUpRight,
    shoppingcart: ShoppingCart, barchart2: BarChart2, mail: Mail, phone: Phone,
    mappin: MapPin, send: Send, arrowup: ArrowUp, checkcircle: CheckCircle, code2: Code2,
    terminal: Terminal, cpu: Cpu, layers: Layers, palette: Palette, gitbranch: GitBranch,
    globe2: Globe2, command: Command, video: Video, filecode: FileCode, wifi: Wifi, radio: Radio,
    lock: Lock, chevronup: ChevronUp, edit: Edit, trash2: Trash2, pluscircle: PlusCircle,
    save: Save, pentool: PenTool, zap: Zap, brush: Brush
};

export const Icon = ({ name, className }) => {
    const iconKey = name && typeof name === 'string' ? name.toLowerCase() : 'user'; 
    const LucideIcon = iconMap[iconKey] || User; 
    return <LucideIcon className={className} />;
};

export const getIconComponent = (iconName) => {
    const iconKey = iconName && typeof iconName === 'string' ? iconName.toLowerCase() : 'user';
    return iconMap[iconKey] || User;
};

// --- SPOTLIGHT CARD ---
export const SimpleSpotlightCard = ({ children, className = "", spotlightColor = "teal" }) => {
    let colorClass = 'border-teal-500/60 hover:border-teal-400/50';
    let shadowClass = 'hover:shadow-teal-500/20';

    if (spotlightColor === 'indigo') {
        colorClass = 'border-indigo-500 hover:border-indigo-400'; 
        shadowClass = ''; 
    } else if (spotlightColor === 'rose') {
         colorClass = 'border-rose-500/60 hover:border-rose-400/50';
        shadowClass = 'hover:shadow-rose-500/20';
    }

    return (
        <div className={`h-full relative rounded-3xl bg-[#1a1a1a] transition-all duration-300 overflow-hidden border ${colorClass} transform hover:scale-[1.02] ${shadowClass} ${className}`}>
            {children}
        </div>
    );
};

// --- PROJECT IMAGE ---
export const SimpleProjectImage = ({ src, alt }) => (
    <div className="relative w-full h-full overflow-hidden bg-[#0f172a]">
        <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 z-0" loading="lazy"/>
    </div>
);

// --- ANIMATED COUNTER ---
export const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
    
    useEffect(() => {
        if (inView) {
            let start = 0;
            const increment = end / (duration / 16);
            const timer = setInterval(() => { start += increment; if (start >= end) { setCount(end); clearInterval(timer); } else { setCount(Math.ceil(start)); } }, 16);
            return () => clearInterval(timer);
        }
    }, [inView, end, duration]); 

    return <span ref={ref}>{count}{suffix}</span>;
};

// --- INPUTS ---
export const Input = ({ id, label, value, name, onChange, type = "text" }) => (
    <div className="relative group">
        <input type={type} id={id} name={name} value={value} onChange={onChange} required
            className="w-full pl-4 pr-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-gray-200 outline-none focus:border-teal-500 outline-none text-center tracking-widest placeholder-transparent transition-all" placeholder={label} />
        <label htmlFor={id} className={`absolute left-4 top-3 text-gray-500 text-sm transition-all pointer-events-none transform origin-top-left ${value ? 'translate-y-[-1.5rem] text-xs text-teal-400' : 'group-focus-within:translate-y-[-1.5rem] group-focus-within:text-xs group-focus-within:text-teal-400'}`}>{label}</label>
    </div>
);

export const Textarea = ({ id, label, value, name, onChange }) => (
    <div className="relative group pt-4">
        <label className="text-sm font-semibold text-gray-300 mb-1 block">{label}</label>
        <textarea id={id} name={name} value={value} onChange={onChange} rows="3" required
            className="w-full p-4 bg-black/50 border border-gray-700 rounded-xl text-gray-200 outline-none focus:border-teal-500/50 transition-all resize-none" placeholder={label}></textarea>
    </div>
);

// --- DRAG DROP UPLOADER ---
export const DragDropUploader = ({ onFileChange, currentImageUrl, label }) => {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const handleFileProcess = (file) => {
        if (!file || !file.type.startsWith('image/')) { toast.error("File harus berupa gambar."); return; }
        const fileUrl = URL.createObjectURL(file);
        onFileChange(fileUrl, null); 
        toast.success("Preview berhasil!", {duration: 2000});
    }
    const handleDrag = useCallback((e) => { e.preventDefault(); e.stopPropagation(); if (e.type === "dragenter" || e.type === "dragover") setDragActive(true); else if (e.type === "dragleave") setDragActive(false); }, []);
    const handleDrop = useCallback((e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFileProcess(e.dataTransfer.files[0]); }, []);
    const handleChange = useCallback((e) => { if (e.target.files && e.target.files[0]) handleFileProcess(e.target.files[0]); }, []);

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-300">{label} (Preview Lokal)</label>
            <div className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${dragActive ? 'border-teal-500 bg-teal-500/10' : 'border-gray-700 hover:border-teal-500/50 bg-black/20'}`}
                onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} onClick={() => inputRef.current.click()}>
                <input ref={inputRef} type="file" className="hidden" onChange={handleChange} accept="image/*" />
                {currentImageUrl && !currentImageUrl.includes('placeholder') ? (
                    <img src={currentImageUrl} alt="Preview" className="w-full h-32 object-cover rounded-lg mb-2 border border-white/10" />
                ) : ( <Globe2 className="w-8 h-8 text-gray-500 mb-2" /> )}
                <p className="text-sm text-gray-400 text-center">Seret & lepas foto untuk preview.</p>
            </div>
        </div>
    );
};