import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectWalletModal({ isOpen, onClose }: ConnectWalletModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border border-muted">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Connect Wallet</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Connect your wallet to access SuiVector and start trading NFTs and meme coins.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          <Button 
            variant="outline" 
            className="w-full justify-between bg-muted hover:bg-muted/80 transition-colors rounded-xl p-6 border border-muted h-auto"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M6 2 2 6"/><path d="m16 2 4 4"/><rect width="20" height="12" x="2" y="8" rx="2"/><path d="M6 16v-4"/><path d="M18 16v-4"/><path d="M12 12v4"/><path d="M2 4h20"/></svg>
              </div>
              <div className="text-left">
                <div className="font-medium">Sui Wallet</div>
                <div className="text-xs text-muted-foreground">The official Sui wallet</div>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="m9 18 6-6-6-6"/></svg>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-between bg-muted hover:bg-muted/80 transition-colors rounded-xl p-6 border border-muted h-auto"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
              <div className="text-left">
                <div className="font-medium">Suiet Wallet</div>
                <div className="text-xs text-muted-foreground">All-in-one Sui wallet</div>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="m9 18 6-6-6-6"/></svg>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-between bg-muted hover:bg-muted/80 transition-colors rounded-xl p-6 border border-muted h-auto"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M12 22a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/><path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M6 5.3V3"/><path d="M18 5.3V3"/><path d="M12 2v2"/></svg>
              </div>
              <div className="text-left">
                <div className="font-medium">Slush Wallet</div>
                <div className="text-xs text-muted-foreground">Secure & intuitive wallet</div>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="m9 18 6-6-6-6"/></svg>
          </Button>
          
          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-muted"></div>
            <span className="flex-shrink mx-4 text-muted-foreground text-sm">or</span>
            <div className="flex-grow border-t border-muted"></div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full justify-center items-center gap-3 bg-muted hover:bg-muted/80 transition-colors rounded-xl p-6 border border-muted h-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z"/>
            </svg>
            <span className="font-medium">Continue with Google</span>
          </Button>
        </div>
        
        <div className="text-center text-xs text-muted-foreground">
          By connecting a wallet, you agree to SuiVector's <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
        </div>
      </DialogContent>
    </Dialog>
  );
}
