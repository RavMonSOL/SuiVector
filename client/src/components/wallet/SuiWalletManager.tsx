import React, { useState } from 'react';
import { useSui } from '@/lib/suiContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2, RefreshCw, Send, Copy, ExternalLink } from 'lucide-react';

export const SuiWalletManager: React.FC = () => {
  const { 
    connected, 
    connecting, 
    address, 
    balance, 
    connectWallet, 
    disconnectWallet, 
    sendSui, 
    refreshBalance, 
    error 
  } = useSui();
  
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const { toast } = useToast();

  // Format address for display
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Copy address to clipboard
  const copyAddress = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied",
      description: "Your Sui address has been copied to clipboard.",
    });
  };

  // Handle sending SUI
  const handleSendSui = async () => {
    if (!recipient || !amount) {
      toast({
        title: "Invalid input",
        description: "Please enter recipient address and amount.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        throw new Error("Amount must be a positive number");
      }

      const result = await sendSui(recipient, parsedAmount);
      if (result) {
        setTxHash(result);
        toast({
          title: "Transaction successful",
          description: `Successfully sent ${amount} SUI to ${formatAddress(recipient)}`,
        });
        setAmount('');
        setRecipient('');
      } else {
        throw new Error("Transaction failed");
      }
    } catch (e) {
      toast({
        title: "Transaction failed",
        description: e instanceof Error ? e.message : "Failed to send SUI",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  // Refresh wallet balance
  const handleRefreshBalance = async () => {
    await refreshBalance();
    toast({
      title: "Balance updated",
      description: `Your current balance is ${balance} SUI`,
    });
  };

  if (!connected) {
    return (
      <Card className="w-full max-w-md mx-auto neon-border">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Connect to Sui</CardTitle>
          <CardDescription>Connect your wallet to access Sui features</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button 
            onClick={connectWallet} 
            disabled={connecting} 
            className="w-full bg-gradient-to-r from-primary to-accent neon-btn"
          >
            {connecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              "Connect Wallet"
            )}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto neon-border">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Your Sui Wallet</CardTitle>
        <CardDescription>Manage your Sui wallet and tokens</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-1">
          <span className="text-sm text-muted-foreground">Address</span>
          <div className="flex items-center space-x-2">
            <code className="bg-muted px-2 py-1 rounded text-sm flex-1 overflow-hidden text-ellipsis">
              {address}
            </code>
            <Button variant="ghost" size="icon" onClick={copyAddress}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-muted-foreground">Balance</span>
            <p className="text-2xl font-bold">{balance} SUI</p>
          </div>
          <Button variant="outline" size="icon" onClick={handleRefreshBalance}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="pt-4">
          <Button 
            onClick={() => setIsDialogOpen(true)} 
            className="w-full bg-gradient-to-r from-primary to-accent neon-btn"
          >
            <Send className="mr-2 h-4 w-4" /> Send SUI
          </Button>
        </div>

        <div className="pt-2">
          <Button 
            variant="outline" 
            onClick={disconnectWallet} 
            className="w-full"
          >
            Disconnect Wallet
          </Button>
        </div>
      </CardContent>

      {/* Send SUI Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send SUI</DialogTitle>
            <DialogDescription>
              Send SUI tokens to another address on the network
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="recipient" className="text-sm font-medium">
                Recipient Address
              </label>
              <Input
                id="recipient"
                placeholder="0x..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Amount (SUI)
              </label>
              <Input
                id="amount"
                type="number"
                placeholder="0.001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Available: {balance} SUI
              </p>
            </div>
          </div>

          {txHash && (
            <div className="bg-muted p-2 rounded-md">
              <p className="text-xs">Transaction ID:</p>
              <div className="flex items-center gap-2">
                <code className="text-xs truncate">{txHash}</code>
                <a 
                  href={`https://explorer.sui.io/transaction/${txHash}?network=devnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSendSui} 
              disabled={isSending || !recipient || !amount}
              className="bg-gradient-to-r from-primary to-accent"
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Send
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};