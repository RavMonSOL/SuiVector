import { Link, useLocation } from "wouter";

export default function MobileNav() {
  const [location] = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-muted flex items-center justify-around py-2 px-4 z-30">
      <Link href="/">
        <a className={`flex flex-col items-center p-2 ${location === '/' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span className="text-xs mt-1">Home</span>
        </a>
      </Link>
      
      <Link href="/marketplace">
        <a className={`flex flex-col items-center p-2 ${location === '/marketplace' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-store"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7"/><path d="M18 12V7"/><path d="M14 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7"/><path d="M10 12V7"/><path d="M6 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7"/><path d="M2 12V7"/></svg>
          <span className="text-xs mt-1">Market</span>
        </a>
      </Link>
      
      <Link href="/create">
        <a className="flex flex-col items-center p-2">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center -mt-5 glow-effect">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          </div>
        </a>
      </Link>
      
      <Link href="/explore">
        <a className={`flex flex-col items-center p-2 ${location === '/explore' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-compass"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
          <span className="text-xs mt-1">Explore</span>
        </a>
      </Link>
      
      <Link href="/profile">
        <a className={`flex flex-col items-center p-2 ${location === '/profile' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
          <span className="text-xs mt-1">Profile</span>
        </a>
      </Link>
    </div>
  );
}
