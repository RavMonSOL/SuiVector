import { Link, useLocation } from "wouter";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();

  return (
    <div 
      className={`${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:translate-x-0 md:w-64'} 
                  bg-card flex-shrink-0 fixed md:static h-full z-40 overflow-y-auto 
                  transition-all duration-300 transform`}
    >
      <div className="p-4 flex items-center justify-between border-b border-muted">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-vector-pen"><path d="M17 3h4v4"/><path d="m21 3-7.5 7.5"/><path d="M11 21H7v-4"/><path d="m3 21 7.5-7.5"/><path d="m17 21 4-4"/><path d="M3 7l4-4"/></svg>
          </div>
          <h1 className="text-2xl font-bold font-sans text-foreground">Sui<span className="text-primary">Vector</span></h1>
        </div>
        <button 
          onClick={onClose}
          className="md:hidden text-muted-foreground hover:text-primary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      
      <div className="py-4">
        <ul>
          <li>
            <Link href="/">
              <a className={`sidebar-item ${location === '/' ? 'active' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                <span className="font-medium">Home</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/marketplace">
              <a className={`sidebar-item ${location === '/marketplace' ? 'active' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${location === '/marketplace' ? 'text-primary' : 'text-muted-foreground'}`}><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7"/><path d="M18 12V7"/><path d="M14 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7"/><path d="M10 12V7"/><path d="M6 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7"/><path d="M2 12V7"/></svg>
                <span className="font-medium">Marketplace</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/create">
              <a className={`sidebar-item ${location === '/create' ? 'active' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${location === '/create' ? 'text-primary' : 'text-muted-foreground'}`}><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                <span className="font-medium">Create</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <a className={`sidebar-item ${location === '/profile' ? 'active' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${location === '/profile' ? 'text-primary' : 'text-muted-foreground'}`}><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
                <span className="font-medium">Profile</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/groups">
              <a className={`sidebar-item ${location === '/groups' ? 'active' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${location === '/groups' ? 'text-primary' : 'text-muted-foreground'}`}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span className="font-medium">Groups</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/explore">
              <a className={`sidebar-item ${location === '/explore' ? 'active' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${location === '/explore' ? 'text-primary' : 'text-muted-foreground'}`}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
                <span className="font-medium">Explore</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/wallet">
              <a className={`sidebar-item ${location === '/wallet' ? 'active' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${location === '/wallet' ? 'text-primary' : 'text-muted-foreground'}`}><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/></svg>
                <span className="font-medium">Wallet</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="px-4 py-6 mt-auto border-t border-muted">
        <div className="rounded-lg bg-muted p-4">
          <p className="text-sm text-muted-foreground mb-3">Your portfolio balance</p>
          <div className="flex items-center">
            <h3 className="text-xl font-mono font-bold">245.87 SUI</h3>
            <span className="ml-2 text-success text-xs bg-success bg-opacity-20 px-2 py-1 rounded-full">+5.8%</span>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <button className="neon-btn bg-primary hover:bg-opacity-80 text-primary-foreground rounded-lg px-3 py-2 text-sm flex-1 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg> Deposit
            </button>
            <button className="neon-btn bg-muted hover:bg-muted/80 text-foreground rounded-lg px-3 py-2 text-sm flex-1 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
