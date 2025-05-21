import React, { useState, useEffect } from 'react';
import { useSui } from '@/lib/suiContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { Loader2, ExternalLink } from 'lucide-react';

interface NFTData {
  id: string;
  name: string;
  description: string;
  url: string;
  owner: string;
}

export const SuiNFTViewer: React.FC = () => {
  const { provider, connected, address, error: suiError } = useSui();
  const [nfts, setNfts] = useState<NFTData[]>([]);
  const [loading, setLoading] = useState(false);
  const [mintingNFT, setMintingNFT] = useState(false);
  const { toast } = useToast();
  
  // Load NFTs when address changes
  useEffect(() => {
    if (connected && provider && address) {
      fetchUserNFTs();
    } else {
      setNfts([]);
    }
  }, [connected, provider, address]);
  
  // Fetch NFTs for the connected wallet
  const fetchUserNFTs = async () => {
    if (!provider || !address) return;
    
    setLoading(true);
    try {
      // Get all objects owned by the address
      const objectsResponse = await provider.getOwnedObjects({
        owner: address,
        options: {
          showContent: true,
          showDisplay: true,
        },
      });
      
      // Filter for NFT objects and map them to our format
      const nftObjects = objectsResponse.data
        .filter(obj => {
          // Skip objects without content
          if (!obj.data?.content) return false;
          
          // Check if it looks like an NFT
          const content = obj.data.content;
          
          if (typeof content === 'object' && 'dataType' in content) {
            if (content.dataType === 'moveObject') {
              const moveObj = content as any;
              // Check for NFT-related types in the type string
              if (moveObj.hasOwnProperty('type')) {
                return (
                  moveObj.type.includes('::devnet_nft::') || 
                  moveObj.type.includes('::nft::') || 
                  moveObj.type.includes('::NFT::')
                );
              }
            }
          }
          return false;
        })
        .map(obj => {
          // Extract NFT metadata
          const display = obj.data?.display?.data;
          const content = obj.data?.content as any;
          
          // Default values
          let name = 'Unnamed NFT';
          let description = 'No description';
          let url = 'https://via.placeholder.com/300';
          
          // Extract from display data (preferred)
          if (display) {
            if (display.name) name = display.name;
            if (display.description) description = display.description;
            if (display.image_url) url = display.image_url;
          }
          
          // Try content fields as fallback
          if (content && content.fields) {
            if (!display?.name && content.fields.name) name = content.fields.name;
            if (!display?.description && content.fields.description) description = content.fields.description;
            if (!display?.image_url) {
              if (content.fields.url) url = content.fields.url;
              else if (content.fields.image_url) url = content.fields.image_url;
            }
          }
          
          return {
            id: obj.data?.objectId || 'unknown',
            name,
            description,
            url,
            owner: address,
          };
        });
      
      setNfts(nftObjects);
    } catch (e) {
      console.error("Failed to fetch NFTs:", e);
      toast({
        title: "Failed to load NFTs",
        description: "There was a problem fetching your NFTs from the Sui network.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Mint a new NFT
  const mintNFT = async () => {
    if (!provider || !address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to mint an NFT.",
        variant: "destructive",
      });
      return;
    }
    
    setMintingNFT(true);
    try {
      // Create transaction to mint a DevNetNFT
      const tx = new TransactionBlock();
      
      tx.moveCall({
        target: '0x2::devnet_nft::mint',
        arguments: [
          tx.pure.string('SuiVector NFT'),
          tx.pure.string('A unique digital asset on SuiVector'),
          tx.pure.string('https://source.unsplash.com/random/300x300/?neon'),
        ],
      });
      
      // Execute the transaction
      const result = await provider.signAndExecuteTransactionBlock({
        transactionBlock: tx,
        options: {
          showEffects: true,
        },
      });
      
      if (result.effects?.status?.status === 'success') {
        toast({
          title: "NFT minted successfully!",
          description: "Your new NFT has been created on the Sui network.",
        });
        
        // Refresh the NFT list
        await fetchUserNFTs();
      } else {
        toast({
          title: "Minting failed",
          description: `Transaction failed: ${result.effects?.status?.error || 'Unknown error'}`,
          variant: "destructive",
        });
      }
    } catch (e: any) {
      console.error("Failed to mint NFT:", e);
      toast({
        title: "Minting failed",
        description: e.message || "There was a problem minting your NFT.",
        variant: "destructive",
      });
    } finally {
      setMintingNFT(false);
    }
  };
  
  // View NFT in explorer
  const viewOnExplorer = (id: string) => {
    const explorerUrl = `https://explorer.sui.io/object/${id}?network=devnet`;
    window.open(explorerUrl, '_blank');
  };
  
  if (!connected) {
    return (
      <Card className="w-full neon-border">
        <CardHeader>
          <CardTitle>Your NFTs on Sui</CardTitle>
          <CardDescription>Connect your wallet to view and manage your NFTs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground mb-4"><path d="M10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v3"/><circle cx="18" cy="18" r="3"/><path d="M18 14v1"/><path d="M18 21v1"/><path d="M22 18h-1"/><path d="M15 18h-1"/><path d="M14.5 16.5l.7.7"/><path d="M20.8 16.5l-.7.7"/><path d="M14.5 19.5l.7-.7"/><path d="M20.8 19.5l-.7-.7"/></svg>
            <p className="text-muted-foreground text-center">
              Connect your wallet to view your NFT collection on the Sui blockchain.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full neon-border">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Your NFTs on Sui</CardTitle>
          <CardDescription>Manage your digital collectibles on the Sui blockchain</CardDescription>
        </div>
        <Button 
          onClick={mintNFT} 
          disabled={mintingNFT}
          className="bg-gradient-to-r from-primary to-accent neon-btn"
        >
          {mintingNFT ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Minting...
            </>
          ) : (
            "Mint NFT"
          )}
        </Button>
      </CardHeader>
      
      <Separator />
      
      <CardContent className="pt-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-4 w-2/3 mb-2" />
                  <Skeleton className="h-3 w-full mb-4" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </Card>
            ))}
          </div>
        ) : nfts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nfts.map((nft) => (
              <Card key={nft.id} className="overflow-hidden card-hover">
                <div className="relative h-48 bg-muted">
                  <img 
                    src={nft.url} 
                    alt={nft.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300?text=NFT+Image';
                    }}
                  />
                  <Badge className="absolute top-2 right-2 bg-primary/80">Sui NFT</Badge>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">{nft.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 h-10">{nft.description}</p>
                  <div className="mt-4 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      onClick={() => viewOnExplorer(nft.id)}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" /> View on Explorer
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">You don't have any NFTs yet</p>
            <p className="text-sm">Mint your first NFT by clicking the "Mint NFT" button above.</p>
          </div>
        )}
      </CardContent>
      
      {suiError && (
        <CardFooter className="border-t border-muted px-6 py-4">
          <div className="w-full bg-destructive/20 text-destructive text-sm rounded-md p-3">
            {suiError}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};