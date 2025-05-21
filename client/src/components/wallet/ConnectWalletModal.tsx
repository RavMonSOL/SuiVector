import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useSui } from '@/lib/suiContext';
import { Wallet, CircleDollarSign } from 'lucide-react';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectWalletModal({ isOpen, onClose }: ConnectWalletModalProps) {
  const { connectWallet } = useSui();
  
  const handleConnectWallet = async () => {
    await connectWallet();
    onClose();
  };
  
  const walletOptions = [
    {
      name: 'Sui Wallet',
      icon: <Wallet className="h-6 w-6" />,
      description: 'Connect using Sui Wallet browser extension',
      action: handleConnectWallet,
    },
    {
      name: 'Demo Wallet',
      icon: <CircleDollarSign className="h-6 w-6" />,
      description: 'Use a demo wallet for testing purposes',
      action: handleConnectWallet,
    }
  ];
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Connect your wallet to interact with the Sui blockchain
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {walletOptions.map((wallet) => (
            <Button
              key={wallet.name}
              variant="outline"
              className="flex justify-start items-center gap-3 p-4 h-auto hover:bg-muted/50 relative overflow-hidden group"
              onClick={wallet.action}
            >
              <div className="rounded-full p-2 bg-primary/10 text-primary">
                {wallet.icon}
              </div>
              <div className="flex flex-col items-start">
                <span className="font-medium">{wallet.name}</span>
                <span className="text-xs text-muted-foreground">{wallet.description}</span>
              </div>
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          ))}
        </div>
        
        <div className="flex text-xs text-muted-foreground mt-2 text-center justify-center">
          <p>
            First time using a blockchain wallet? <a href="https://docs.sui.io/guides/wallet" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Learn more</a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}