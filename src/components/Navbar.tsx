export default function Navbar() {
  return (
    <nav className="bg-[#0A0A0A] border-b border-white/10 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-sm bg-[#FFDD00] flex items-center justify-center font-black text-black text-xs shadow-md shadow-[#FFDD00]/10 group-hover:scale-105 transition-transform">
              AK
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm text-white tracking-tighter leading-none uppercase italic">
                AK DEVELOPMENT<span className="text-[#FFDD00]">.</span>
              </span>
              <span className="text-[9px] text-[#FFDD00] uppercase tracking-[0.2em] font-bold leading-none mt-1">Web Masterclass</span>
            </div>
          </div>

          {/* Editorial Subtitle on the right */}
          <div className="text-xs uppercase tracking-[0.25em] text-white/60 font-medium">
            The ₹499 Masterclass Series
          </div>

        </div>
      </div>
    </nav>
  );
}


