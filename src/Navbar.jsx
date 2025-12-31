import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';


const Navbar = ({ logo, items, activeHref, onItemClick, currentLang, onLangToggle, onSecretLogin }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav 
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
                scrolled 
                ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl' 
                : 'bg-transparent py-6'
            }`}
        >
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                
                {/* LOGO (Tempat Secret Login Ditempatkan: onDoubleClick) */}
                <div 
                    className="text-2xl font-bold text-gray-100 cursor-pointer tracking-tighter hover:text-teal-400 transition-colors"
                    onClick={() => onItemClick('home')}
                    onDoubleClick={onSecretLogin}
                >
                    {logo}<span className="text-teal-500">.</span>
                </div>

                {/* DESKTOP MENU */}
                <div className="hidden md:flex items-center space-x-8">
                    <ul className="flex space-x-8">
                        {items.map((item) => {
                            const isActive = activeHref === item.href;
                            return (
                                <li key={item.href}>
                                    <button
                                        onClick={() => onItemClick(item.href)}
                                        className={`relative text-sm font-medium transition-all duration-300 ${
                                            isActive ? 'text-teal-400' : 'text-gray-400 hover:text-white'
                                        }`}
                                    >
                                        {item.label}
                                        <span className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-teal-500 transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="h-4 w-[1px] bg-gray-700"></div>

                    <button 
                        onClick={onLangToggle}
                        className="flex items-center text-gray-400 hover:text-white transition text-sm font-medium"
                    >
                        <Globe className="w-4 h-4 mr-2" />
                        {currentLang.toUpperCase()}
                    </button>
                </div>

                {/* MOBILE MENU BUTTON */}
                <div className="md:hidden">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-200 hover:text-teal-400">
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-black/95 border-b border-white/10 p-4 shadow-2xl">
                    <ul className="flex flex-col space-y-4 text-center">
                        {items.map((item) => (
                            <li key={item.href}>
                                <button
                                    onClick={() => {
                                        onItemClick(item.href);
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`text-lg font-medium ${activeHref === item.href ? 'text-teal-400' : 'text-gray-400'}`}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;