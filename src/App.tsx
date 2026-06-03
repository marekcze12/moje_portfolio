// src/App.tsx
import { useState } from 'react';
import profilePic from './assets/ja.jpg';

// 1. Definice typu pro projekt (TypeScript rozhraní)
interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  category: string;
}

// 2. Statická data tvých projektů
const projectsData: Project[] = [
  {
    title: "CryptoVision Pro",
    description: "Dashboard pro vizualizaci kryptoměn v reálném čase. Aplikace využívá živá data a interaktivní grafy pro přehledné sledování trhu.",
    tags: ["React", "TypeScript", "Chart.js"],
    githubUrl: "https://github.com/TVUJ_GITHUB/cryptovision-pro",
    image: "https://placehold.co/600x400/18181b/34d399?text=CryptoVision",
    category: "Webové Aplikace"
  },
  {
    title: "NexusPad",
    description: "Rozhraní pro interakci s PDF dokumenty pomocí umělé inteligence. Zapojení OpenAI API pro chytré dotazování nad textem.",
    tags: ["React", "OpenAI API"],
    githubUrl: "https://github.com/TVUJ_GITHUB/nexuspad",
    image: "https://placehold.co/600x400/18181b/34d399?text=NexusPad",
    category: "Webové Aplikace"
  },
  {
    title: "Chasa v Březí",
    description: "Moderní webová prezentace vytvořená na míru pro lokální folklorní spolek. Od návrhu ve Figmě až po finální kód.",
    tags: ["React", "CSS", "Figma"],
    liveUrl: "https://tvoje-domena.cz/chasa",
    image: "https://placehold.co/600x400/18181b/34d399?text=Chasa+v+Brezi",
    category: "Webové Prezentace"
  },
  {
    title: "Tréninkový deník",
    description: "Webová aplikace sloužící sportovnímu klubu pro evidenci a plánování tréninkových jednotek.",
    tags: ["Front-end", "UI/UX"],
    liveUrl: "https://treninkovy-denik.onrender.com/",
    image: "https://placehold.co/600x400/18181b/34d399?text=Treninkovy+Denik",
    category: "Webové Aplikace"
  }
];

// 3. Data pro nekonečné plovoucí pásy dovedností
const skillsRow1 = [
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "📘" },
  { name: "JavaScript (ES6+)", icon: "💛" },
  { name: "Tailwind CSS", icon: "🌊" },
  { name: "HTML5", icon: "🎨" },
  { name: "CSS3", icon: "🚀" },
];

const skillsRow2 = [
  { name: "Git & GitHub", icon: "🐙" },
  { name: "Vite", icon: "⚡" },
  { name: "Figma (UI/UX)", icon: "📐" },
  { name: "VS Code", icon: "💻" },
  { name: "Responsive Design", icon: "📱" },
  { name: "RAG Systems Focus", icon: "🤖" },
];

export default function App() {
  const [result, setResult] = useState<string>("");
  const [filter, setFilter] = useState<string>("Vše");
  
  const categories = ["Vše", ...Array.from(new Set(projectsData.map(p => p.category)))];
  const filteredProjects = filter === "Vše" ? projectsData : projectsData.filter(p => p.category === filter);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Odesílám...");
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "46da37fb-4a1b-4dfd-8534-d6a670a8dee5");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setResult("Zpráva byla úspěšně odeslána! Ozvu se co nejdříve.");
        event.currentTarget.reset(); 
      } else {
        setResult("Něco se pokazilo: " + data.message);
      }
    } catch (error) {
      setResult("Chyba připojení. Zkuste to prosím znovu.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-emerald-500/30 overflow-x-hidden relative">
      
      {/* 
        ========================================
        GLOBÁLNÍ ANIMOVANÉ POZADÍ 
        ========================================
      */}
      <style>{`
        /* Animace pro vznášející se "mlhoviny" v pozadí */
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite alternate;
        }
        
        /* Animace pro nekonečný pás dovedností */
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marquee-left 30s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marquee-right 30s linear infinite;
        }
        .marquee-container:hover .animate-marquee-left,
        .marquee-container:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}</style>

      {/* Fixní vrstva pozadí, která zůstává na místě při scrollování */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Jemná nekonečná mřížka */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        {/* Animované barevné mlhoviny (Blobs) */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-600/20 blur-[120px] animate-blob"></div>
        <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[150px] animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-emerald-500/15 blur-[150px] animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* 
        ========================================
        HLAVNÍ OBSAH (Musí být z-10, aby byl nad pozadím)
        ========================================
      */}
      <div className="relative z-10">
        
        {/* Navigační menu */}
        <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
          <div className="text-3xl font-black tracking-widest text-emerald-400">
            MM
          </div>
          <ul className="flex space-x-8 font-medium">
            <li><a href="#o-mne" className="hover:text-emerald-400 transition-colors">O mně</a></li>
            <li><a href="#projekty" className="hover:text-emerald-400 transition-colors">Projekty</a></li>
            <li><a href="#kontakt" className="hover:text-emerald-400 transition-colors">Kontakt</a></li>
          </ul>
        </nav>

        {/* Hero Sekce */}
        <main className="flex flex-col lg:flex-row items-center justify-between pt-20 pb-20 px-6 max-w-6xl mx-auto min-h-[85vh] gap-16">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight text-zinc-50">
              Ahoj, jsem Marek
            </h1>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 pb-2">
              Front-end Vývojář
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10">
              Tvorba moderních, responzivních a uživatelsky přívětivých webových aplikací v Reactu s vášní pro detail a čistý kód.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <a href="/zivotopis.pdf" download className="flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-950 font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] hover:-translate-y-1">
                Stáhnout CV
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </a>
              <div className="flex gap-4">
                <a href="#kontakt" className="flex items-center justify-center w-12 h-12 bg-zinc-900/80 border border-zinc-700/80 hover:border-emerald-400 hover:text-emerald-400 rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(52,211,153,0.3)] backdrop-blur-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center mt-8 lg:mt-0">
            <div className="relative w-72 h-72 md:w-[400px] md:h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur-[80px] opacity-30 animate-pulse"></div>
              <div className="relative w-full h-full p-2 bg-gradient-to-tr from-zinc-800 to-zinc-700 rounded-full shadow-2xl">
                <img src={profilePic} alt="Marek" className="w-full h-full object-cover rounded-full border-4 border-zinc-900" />
              </div>
              <div className="absolute -bottom-4 right-4 md:right-8 bg-zinc-900/90 p-4 rounded-full border border-zinc-700 shadow-2xl backdrop-blur-md animate-[bounce_4s_infinite]">
                <svg className="w-8 h-8 text-[#61DAFB]" viewBox="0 0 24 24" fill="currentColor"><path d="M11.95 7.425c-2.35 0-4.663.388-6.663 1.125-2.025.75-3.325 1.813-3.325 2.95s1.3 2.2 3.325 2.95c2 .738 4.313 1.125 6.663 1.125s4.663-.387 6.663-1.125c2.025-.75 3.325-1.812 3.325-2.95s-1.3-2.2-3.325-2.95c-2-.738-4.313-1.125-6.663-1.125zm0 1.25c2.163 0 4.188.35 5.863.95 1.587.575 2.412 1.25 2.412 1.875s-.825 1.3-2.412 1.875c-1.675.6-3.7.95-5.863.95s-4.188-.35-5.863-.95C4.475 12.8 3.65 12.125 3.65 11.5s.825-1.3 2.412-1.875c1.675-.6 3.7-.95 5.863-.95zM11.95 2c-3.788 0-6.863 3.075-6.863 6.863s3.075 6.862 6.863 6.862 6.863-3.075 6.863-6.863-3.075-6.862-6.863-6.862zm0 1.25c3.1 0 5.613 2.512 5.613 5.612s-2.513 5.613-5.613 5.613-5.612-2.513-5.612-5.613S8.85 3.25 11.95 3.25z"/></svg>
              </div>
              <div className="absolute top-4 -left-4 md:-left-8 bg-zinc-900/90 p-4 rounded-full border border-zinc-700 shadow-2xl backdrop-blur-md animate-[bounce_5s_infinite_0.5s]">
                <svg className="w-8 h-8 text-[#E34F26]" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.212-2.279H6.551l.33 4.102 5.097 1.384 5.134-1.374.71-8.036H8.531z"/></svg>
              </div>
            </div>
          </div>
        </main>

        {/* Sekce O mně */}
        <section id="o-mne" className="py-24 px-6 max-w-6xl mx-auto scroll-mt-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-zinc-50">O mně</h2>
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur-[90px] opacity-20"></div>
              <img src={profilePic} alt="Marek Maněk" className="relative w-full h-full object-cover rounded-full border border-zinc-700/50 shadow-2xl" />
            </div>

            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Jsem Marek Maněk
              </h3>
              <p className="text-zinc-300 font-medium mb-4">
                Student aplikované informatiky na VŠPJ a front-end vývojář z Břeclavi.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-10 text-sm md:text-base">
                Specializuji se na tvorbu moderních, na míru šitých uživatelských rozhraní v Reactu a TypeScriptu. Mimo psaní kódu působím jako trenér stolního tenisu pro děti a ve své bakalářské práci se věnuji analýze přesnosti AI a RAG systémů.
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-emerald-500/30 bg-zinc-900/40 hover:bg-emerald-500/10 hover:border-emerald-500/60 transition-all duration-300 group backdrop-blur-sm">
                  <div className="p-2 rounded-lg bg-zinc-800/80 text-emerald-400 group-hover:scale-110 transition-transform"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg></div>
                  <span className="font-medium text-zinc-200">Vývoj moderních webových aplikací (React)</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-emerald-500/30 bg-zinc-900/40 hover:bg-emerald-500/10 hover:border-emerald-500/60 transition-all duration-300 group backdrop-blur-sm">
                  <div className="p-2 rounded-lg bg-zinc-800/80 text-cyan-400 group-hover:scale-110 transition-transform"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg></div>
                  <span className="font-medium text-zinc-200">Responzivní design a Tailwind CSS</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-emerald-500/30 bg-zinc-900/40 hover:bg-emerald-500/10 hover:border-emerald-500/60 transition-all duration-300 group backdrop-blur-sm">
                  <div className="p-2 rounded-lg bg-zinc-800/80 text-emerald-400 group-hover:scale-110 transition-transform"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg></div>
                  <span className="font-medium text-zinc-200">Analytické myšlení a řešení problémů</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sekce Dovednosti */}
        <section id="dovednosti" className="py-20 border-y border-zinc-800/30 bg-zinc-950/20 backdrop-blur-sm overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 mb-12">
            <h2 className="text-4xl font-bold text-center text-zinc-50">
              Technologický <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Stack</span>
            </h2>
          </div>

          <div className="marquee-container flex flex-col gap-6 w-full overflow-hidden mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)">
            <div className="flex w-full overflow-hidden">
              <div className="animate-marquee-left gap-6 pr-6">
                {[...skillsRow1, ...skillsRow1].map((skill, index) => (
                  <div key={index} className="flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/40 hover:bg-zinc-800/80 transition-all duration-300 backdrop-blur-md">
                    <span className="text-lg">{skill.icon}</span>
                    <span className="font-bold text-zinc-200 whitespace-nowrap">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-full overflow-hidden">
              <div className="animate-marquee-right gap-6 pr-6">
                {[...skillsRow2, ...skillsRow2].map((skill, index) => (
                  <div key={index} className="flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-900/60 border border-zinc-800/80 hover:border-cyan-500/40 hover:bg-zinc-800/80 transition-all duration-300 backdrop-blur-md">
                    <span className="text-lg">{skill.icon}</span>
                    <span className="font-bold text-zinc-200 whitespace-nowrap">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sekce Projektů */}
        <section id="projekty" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-zinc-50">Moje Projekty</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === cat ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-950 shadow-[0_0_15px_rgba(52,211,153,0.4)]" : "bg-zinc-900/80 text-zinc-400 border border-zinc-700/50 hover:border-emerald-500/50 hover:text-emerald-400 backdrop-blur-md"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div key={index} className="flex flex-col bg-zinc-900/60 p-5 rounded-3xl border border-zinc-800/80 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,211,153,0.1)] group backdrop-blur-xl">
                <div className="w-full h-52 mb-6 overflow-hidden rounded-2xl">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-zinc-100 group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                  <p className="text-zinc-400 mb-6 leading-relaxed text-sm">{project.description}</p>
                  <div className="mt-auto flex items-center gap-4 pt-6 border-t border-zinc-800/80">
                    {project.githubUrl ? (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-zinc-700 hover:border-emerald-500 text-zinc-300 hover:text-emerald-400 font-medium transition-all duration-300">
                        Repository
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      </a>
                    ) : (<div className="flex-1"></div>)}
                    {project.liveUrl ? (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-950 font-bold hover:shadow-[0_0_15px_rgba(52,211,153,0.4)] transition-all duration-300">
                        Demo
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </a>
                    ) : (<div className="flex-1"></div>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sekce Kontakt */}
        <section id="kontakt" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-zinc-50">Kontakt</h2>
            <form onSubmit={onSubmit} className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 p-8 md:p-10 rounded-3xl shadow-2xl flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-zinc-400 pl-1">Jméno</label>
                <input type="text" id="name" name="name" required className="w-full bg-zinc-950/60 border border-zinc-800 rounded-2xl px-5 py-4 text-zinc-200 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/80 transition-all duration-300" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-400 pl-1">E-mail</label>
                <input type="email" id="email" name="email" required className="w-full bg-zinc-950/60 border border-zinc-800 rounded-2xl px-5 py-4 text-zinc-200 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/80 transition-all duration-300" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-zinc-400 pl-1">Zpráva</label>
                <textarea id="message" name="message" required rows={5} className="w-full bg-zinc-950/60 border border-zinc-800 rounded-2xl px-5 py-4 text-zinc-200 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/80 transition-all duration-300 resize-none"></textarea>
              </div>
              <button type="submit" className="mt-4 ml-auto w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-950 font-bold py-3.5 px-8 rounded-xl hover:shadow-[0_0_20px_rgba(52,211,153,0.4)] transition-all duration-300 transform hover:-translate-y-0.5">
                Odeslat zprávu
              </button>
              {result && <p className="text-center text-sm font-medium text-emerald-400 mt-2 animate-pulse">{result}</p>}
            </form>

            <div className="flex justify-center gap-5 mt-10">
              <a href="https://github.com/TVUJ_GITHUB" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(52,211,153,0.2)] transition-all duration-300 backdrop-blur-md">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </a>
              <a href="https://linkedin.com/in/TVUJ_LINKEDIN" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 backdrop-blur-md">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://instagram.com/TVUJ_INSTAGRAM" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(52,211,153,0.2)] transition-all duration-300 backdrop-blur-md">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
        </section>

        {/* Patička webu */}
        <footer className="text-center py-8 text-zinc-500 text-sm border-t border-zinc-800/50 mt-12 backdrop-blur-sm bg-zinc-950/40">
          <p>© {new Date().getFullYear()} Moje Portfolio | Developed by Marek Maněk</p>
        </footer>

      </div>
    </div>
  );
}