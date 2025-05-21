import React from 'react';
import { SuiWalletManager } from '@/components/wallet/SuiWalletManager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function WalletPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Sui Wallet</h1>
        <p className="text-muted-foreground">
          Connect your wallet and manage your Sui tokens
        </p>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <SuiWalletManager />
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">About Sui Wallet</CardTitle>
              <CardDescription>
                SuiVector uses the Sui blockchain for secure, fast transactions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Features</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Connect to Sui Devnet</li>
                  <li>Check your SUI balance</li>
                  <li>Send SUI to other addresses</li>
                  <li>View transaction history</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">What is Sui?</h3>
                <p className="text-sm">
                  Sui is a high-performance Layer 1 blockchain designed to enable creators and developers 
                  to build experiences that scale with demand. For SuiVector, we use Sui to power our 
                  NFT marketplace and social trading features.
                </p>
              </div>
              
              <div className="bg-muted rounded-lg p-3">
                <h3 className="font-medium mb-2 text-warning">Development Mode</h3>
                <p className="text-xs">
                  You're connected to the Sui Devnet. Tokens on this network have no real value and 
                  are used for testing only. In a production environment, this would connect to Sui Mainnet.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}