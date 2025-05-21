import React from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { ConnectButton } from '@mysten/dapp-kit';

const SuiWalletButton: React.FC = () => {
  // Simple component that uses ConnectButton from dapp-kit
  // This will automatically handle wallet connections with Slush, Phantom, etc.
  return (
    <ConnectButton connectText="Connect Wallet">
      <Button 
        variant="default"
        className="bg-primary hover:bg-primary/90"
      >
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    </ConnectButton>
  );
};

export default SuiWalletButton;