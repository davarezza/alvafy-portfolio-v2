import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser'; // Import EmailJS
import { SimpleSpotlightCard } from './UI';
import { Mail, MessageCircle, Wifi, Radio, Send, User, ArrowUpRight } from 'lucide-react';

const ContactPage = React.memo(({ t, lang }) => {
    const formRef = useRef(); // Ref untuk form
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => { 
        const { name, value } = e.target; 
        setFormData(prev => ({ ...prev, [name]: value })); 
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading("Mengirim pesan...");

        // --- GANTI KODE DI BAWAH INI DENGAN ID DARI EMAILJS ANDA ---
        // AGAR FITUR EMAIL FORM INI BEKERJA
        // Cara dapat: Login EmailJS -> Create Service (Gmail) -> Create Template
        const SERVICE_ID = '-';  // Ganti dengan Service ID Anda
        const TEMPLATE_ID = '-'; // Ganti dengan Template ID Anda
        const PUBLIC_KEY = '-';    // Ganti dengan Public Key Anda
        // -----------------------------------------------------------

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
            .then((result) => {
                toast.success("Pesan terkirim! Saya akan segera membalas.", { id: toastId });
                setFormData({ name: '', email: '', message: '' }); 
                setLoading(false);
            }, (error) => {
                console.error(error);
                toast.error("Gagal mengirim. Coba hubungi via WhatsApp.", { id: toastId });
                setLoading(false);
            });
    };
    
    // Siapkan Link WhatsApp
    // Jika waNumber tidak ada di content.js, dia akan ambil dari phone dan hapus spasi/+
    const waNumber = t.contact.contactInfo.waNumber || t.contact.contactInfo.phone.replace(/[^0-9]/g, '');
    const waLink = `-`;

    return (
        <section id="contact" className="relative w-full flex flex-col justify-center items-center py-20 overflow-hidden">
            <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>
            
            <div className="max-w-5xl mx-auto px-4 text-center w-full relative z-20">
                <h3 className="text-4xl font-bold mb-8 text-white animate-fade-up"> 
                    <span key={`${lang}-contact-title`}>{t.contact.title}</span> <span className="text-teal-400"> {t.contact.subtitle}</span>
                </h3>
                <p key={`${lang}-contact-desc`} className="text-gray-400 text-lg font-light mb-12 max-w-2xl mx-auto animate-fade-up delay-100"> 
                    {t.contact.desc}
                </p>

                <div> 
                    <SimpleSpotlightCard spotlightColor="rose" className="p-0 overflow-hidden">
                        <div className="grid md:grid-cols-5 h-full">
                            
                            {/* KIRI: INFO KONTAK */}
                            <div className="md:col-span-2 bg-black/40 p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
                                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(79,70,229,0.05)_50%,transparent_100%)] animate-scan pointer-events-none"></div>
                                <div>
                                    <div className="flex items-center space-x-2 mb-8">
                                        <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span></span>
                                        <span className="text-rose-400 text-sm font-bold tracking-wider">SYSTEM STATUS: ONLINE</span>
                                    </div>
                                    <div className="space-y-4 relative z-10">
                                        {/* EMAIL BUTTON */}
                                        <a href={`mailto:${t.contact.contactInfo.email}`} className="group flex items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-teal-500/50 hover:bg-teal-500/10 transition-all duration-300">
                                            <div className="p-3 rounded-lg bg-black/40 text-teal-400 mr-4 group-hover:scale-110 transition"><Mail className="w-6 h-6" /></div>
                                            <div className="text-left">
                                                <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Email Me</div>
                                                <div className="text-gray-200 group-hover:text-teal-300 transition font-semibold text-sm break-all">{t.contact.contactInfo.email}</div>
                                            </div>
                                        </a>

                                        {/* WHATSAPP BUTTON (Menggantikan Secure Line biasa) */}
                                        <a href={waLink} target="_blank" rel="noopener noreferrer" className="group flex items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-teal-500/50 hover:bg-teal-500/10 transition-all duration-300 cursor-pointer">
                                            <div className="p-3 rounded-lg bg-black/40 text-green-400 mr-4 group-hover:scale-110 transition">
                                                {/* Ikon MessageCircle mirip WA */}
                                                <MessageCircle className="w-6 h-6" />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Chat WhatsApp</div>
                                                <div className="text-gray-200 group-hover:text-green-300 transition font-semibold">{t.contact.contactInfo.phone}</div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-10 flex items-center space-x-4 text-gray-600 opacity-50"><Wifi className="w-5 h-5 animate-pulse" /><Radio className="w-5 h-5 animate-pulse delay-300" /><span className="text-xs tracking-widest font-mono">ESTABLISHING UPLINK...</span></div>
                            </div>

                            {/* KANAN: FORM INPUT */}
                            <div className="md:col-span-3 p-8 md:p-10 relative">
                                <h4 className="text-xl font-bold text-white mb-6 flex items-center"><Send className="w-5 h-5 mr-3 text-rose-400" /> INITIATE DATA TRANSMISSION</h4>
                                
                                <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="relative group">
                                        <User className="absolute left-0 bottom-3 text-gray-500 w-5 h-5 transition-colors group-focus-within:text-indigo-400" />
                                        <input type="text" name="name" id="name" aria-label="Nama Lengkap" value={formData.name} onChange={handleChange} required className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-gray-700 text-gray-200 outline-none focus:border-indigo-500 placeholder-gray-500 transition-all" placeholder=" " />
                                        <label htmlFor="name" className="absolute left-8 top-3 text-gray-500 text-sm transition-all group-focus-within:-top-3 group-focus-within:text-xs group-focus-within:text-indigo-400 pointer-events-none">
                                            <span key={`${lang}-form-name`} className="animate-fade-up">{t.contact.form.name}</span>
                                        </label>
                                    </div>

                                    <div className="relative group">
                                        <Mail className="absolute left-0 bottom-3 text-gray-500 w-5 h-5 transition-colors group-focus-within:text-rose-400" />
                                        <input type="email" name="email" id="email" aria-label="Alamat Email" value={formData.email} onChange={handleChange} required className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-gray-700 text-gray-200 outline-none focus:border-rose-500 placeholder-gray-500 transition-all" placeholder=" " />
                                        <label htmlFor="email" className="absolute left-8 top-3 text-gray-500 text-sm transition-all group-focus-within:-top-3 group-focus-within:text-xs group-focus-within:text-rose-400 pointer-events-none">
                                            <span key={`${lang}-form-email`} className="animate-fade-up">{t.contact.form.email}</span>
                                        </label>
                                    </div>

                                    <div className="relative group pt-4">
                                        <textarea rows="3" name="message" id="message" aria-label="Pesan Anda" value={formData.message} onChange={handleChange} required className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-gray-200 outline-none focus:border-teal-500/50 focus:bg-black/40 placeholder-gray-500 transition-all resize-none" placeholder={t.contact.form.msg}></textarea>
                                    </div>

                                    <button disabled={loading} type="submit" className="group relative w-full py-4 bg-rose-500 text-[#0a192f] rounded-xl font-bold overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                                        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.4),transparent)] -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                                        <span className="relative z-10 flex items-center justify-center tracking-wider">
                                            {loading ? 'SENDING...' : (
                                                <>
                                                    <span key={`${lang}-form-btn`} className="animate-fade-up">{t.contact.form.btn}</span> 
                                                    <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </SimpleSpotlightCard>
                </div>
            </div>
        </section>
    );
});
export default ContactPage;