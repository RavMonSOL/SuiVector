import React from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { ConnectButton, useCurrentWallet } from '@mysten/dapp-kit';

const SuiWalletButton: React.FC = () => {
  const { currentWallet } = useCurrentWallet();
  const isConnected = !!currentWallet;

  if (isConnected) {
    return (
      <Button 
        onClick={() => currentWallet.disconnect()}
        variant="default"
        className="bg-success hover:bg-success/90"
      >
        <Wallet className="mr-2 h-4 w-4" />
        Disconnect Wallet
      </Button>
    );
  }

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