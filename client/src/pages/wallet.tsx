import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SuiNFTViewer } from '@/components/nft/SuiNFTViewer';
import { useSui } from '@/lib/suiContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Copy, CheckCircle2, ArrowRightLeft, Send, Wallet } from 'lucide-react';
import ConnectWalletModal from '@/components/wallet/ConnectWalletModal';

export default function WalletPage() {
  const { connected, address, balance, connectWallet, sendSui, refreshBalance } = useSui();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const { toast } = useToast();
  
  // Handle sending SUI tokens
  const handleSend = async () => {
    if (!recipient.trim() || !amount.trim() || isNaN(parseFloat(amount))) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid recipient address and amount",
        variant: "destructive",
      });
      return;
    }
    
    setSending(true);
    try {
      const txHash = await sendSui(recipient, parseFloat(amount));
      if (txHash) {
        toast({
          title: "Transaction Sent",
          description: `Successfully sent ${amount} SUI to ${recipient.slice(0, 6)}...${recipient.slice(-4)}`,
        });
        
        // Reset form
        setRecipient('');
        setAmount('');
        
        // Refresh balance
        await refreshBalance();
      }
    } catch (error: any) {
      toast({
        title: "Transaction Failed",
        description: error.message || "Failed to send SUI tokens",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };
  
  // Copy address to clipboard
  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Address Copied",
        description: "Your wallet address has been copied to clipboard",
      });
    }
  };
  
  return (
    <div className="container py-6 px-4 md:px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Sui Wallet</h1>
      <p className="text-muted-foreground mb-8">Manage your wallet, tokens, and NFTs on the Sui blockchain</p>
      
      {/* Wallet Connect Banner */}
      {!connected && (
        <Card className="mb-8 bg-gradient-to-r from-gray-900 to-primary/20 neon-border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
                <p className="text-muted-foreground">
                  Connect your wallet to view your balance, send tokens, and manage your NFTs
                </p>
              </div>
              <Button 
                onClick={() => setWalletModalOpen(true)} 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent neon-btn"
              >
                <Wallet className="mr-2 h-5 w-5" /> Connect Wallet
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wallet Info */}
        <div className="col-span-1 md:col-span-1">
          {connected ? (
            <Card className="neon-border h-full">
              <CardHeader>
                <CardTitle>My Wallet</CardTitle>
                <CardDescription>Your Sui blockchain wallet</CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm text-muted-foreground">Wallet Address</Label>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="bg-muted p-2 rounded-md text-xs font-mono w-full overflow-hidden text-ellipsis">
                        {address}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={copyAddress}
                        className="flex-shrink-0"
                      >
                        {copied ? <CheckCircle2 className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm text-muted-foreground">Balance</Label>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="text-2xl font-mono font-bold">{balance} SUI</div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={refreshBalance}
                        className="text-xs"
                      >
                        <ArrowRightLeft className="h-3 w-3 mr-1" /> Refresh
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <Label htmlFor="recipient">Recipient Address</Label>
                    <Input 
                      id="recipient" 
                      value={recipient} 
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="0x..."
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="amount">Amount (SUI)</Label>
                    <Input 
                      id="amount" 
                      value={amount} 
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.01"
                      className="mt-1"
                      type="number"
                      min="0.000001"
                      step="0.000001"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSend} 
                    disabled={sending || !recipient || !amount}
                    className="w-full bg-gradient-to-r from-primary to-accent neon-btn"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send SUI
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full neon-border">
              <CardHeader>
                <CardTitle>My Wallet</CardTitle>
                <CardDescription>Connect to manage your assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-6">
                  <Wallet className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    Please connect your wallet to view your balance and send tokens.
                  </p>
                  <Button 
                    onClick={() => setWalletModalOpen(true)}
                    className="mt-4 bg-gradient-to-r from-primary to-accent neon-btn"
                  >
                    Connect Wallet
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* NFTs and Activity */}
        <div className="col-span-1 md:col-span-2">
          <Tabs defaultValue="nfts">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="nfts">NFTs</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="nfts" className="mt-4">
              <SuiNFTViewer />
            </TabsContent>
            <TabsContent value="activity" className="mt-4">
              <Card className="neon-border">
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Recent activity on your Sui wallet</CardDescription>
                </CardHeader>
                <CardContent>
                  {connected ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        Transaction history will appear here.
                      </p>
                      <p className="text-sm">
                        Try sending SUI or minting an NFT to see your activity.
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        Connect your wallet to view your transaction history.
                      </p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                  <div className="w-full text-center">
                    You can also view your full history on the 
                    <a 
                      href="https://explorer.sui.io/?network=devnet" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary ml-1 hover:underline"
                    >
                      Sui Explorer
                    </a>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Wallet Modal */}
      <ConnectWalletModal isOpen={walletModalOpen} onClose={() => setWalletModalOpen(false)} />
    </div>
  );
}