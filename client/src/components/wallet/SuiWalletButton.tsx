import React from 'react';
import { Button } from '@/components/ui/button';
import { ConnectButton, useWallet } from '@suiet/wallet-kit';
import { Wallet, Loader2 } from 'lucide-react';

// Custom styled connect button that uses Suiet wallet kit
const SuiWalletButton: React.FC = () => {
  const { account, connected, connecting } = useWallet();
  
  // When not connected, show a custom connect button that opens the wallet selector
  if (!connected) {
    return (
      <ConnectButton>
        {({ connect }) => (
          <Button 
            onClick={connect} 
            disabled={connecting}
            className="bg-gradient-to-r from-primary to-accent neon-btn"
          >
            {connecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-5 w-5" /> Connect Wallet
              </>
            )}
          </Button>
        )}
      </ConnectButton>
    );
  }
  
  // When connected, show a button with the wallet address
  return (
    <Button 
      variant="outline" 
      className="flex items-center gap-2 text-xs font-medium"
    >
      <Wallet className="h-4 w-4" />
      <span className="max-w-[8rem] truncate">{account?.address}</span>
    </Button>
  );
};

export default SuiWalletButton;