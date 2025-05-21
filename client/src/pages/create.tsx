import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function CreatePage() {
  const { toast } = useToast();
  const [nftFormData, setNftFormData] = useState({
    name: "",
    description: "",
    collection: "",
    royalty: 10,
    tags: "",
    imageFile: null as File | null,
    imagePreview: ""
  });
  
  const [tokenFormData, setTokenFormData] = useState({
    name: "",
    symbol: "",
    description: "",
    totalSupply: "1000000",
    liquidity: "100",
    isGovernance: false,
    distributionMethod: "airdrop"
  });
  
  const [uploading, setUploading] = useState(false);
  
  const handleNftImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNftFormData({
          ...nftFormData,
          imageFile: file,
          imagePreview: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleNftSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    
    // Simulate uploading
    setTimeout(() => {
      setUploading(false);
      toast({
        title: "NFT Created!",
        description: `Your NFT "${nftFormData.name}" has been successfully created.`,
      });
      
      // Reset form
      setNftFormData({
        name: "",
        description: "",
        collection: "",
        royalty: 10,
        tags: "",
        imageFile: null,
        imagePreview: ""
      });
    }, 2000);
  };
  
  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    
    // Simulate creating token
    setTimeout(() => {
      setUploading(false);
      toast({
        title: "Token Created!",
        description: `Your token "${tokenFormData.name}" (${tokenFormData.symbol}) has been successfully created.`,
      });
      
      // Reset form
      setTokenFormData({
        name: "",
        symbol: "",
        description: "",
        totalSupply: "1000000",
        liquidity: "100",
        isGovernance: false,
        distributionMethod: "airdrop"
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create</h1>
        <p className="text-muted-foreground">Mint your vector NFTs or launch your own meme coin</p>
      </div>

      <Tabs defaultValue="nft" className="w-full">
        <TabsList className="grid grid-cols-2 mb-8 w-full md:w-64">
          <TabsTrigger value="nft">Create NFT</TabsTrigger>
          <TabsTrigger value="token">Create Token</TabsTrigger>
        </TabsList>

        <TabsContent value="nft">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleNftSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="nftName">NFT Name</Label>
                      <Input 
                        id="nftName" 
                        placeholder="e.g. Neon Vector #123" 
                        value={nftFormData.name}
                        onChange={(e) => setNftFormData({...nftFormData, name: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="nftDescription">Description</Label>
                      <Textarea 
                        id="nftDescription" 
                        placeholder="Describe your NFT..." 
                        className="min-h-32"
                        value={nftFormData.description}
                        onChange={(e) => setNftFormData({...nftFormData, description: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="nftCollection">Collection</Label>
                      <Select 
                        value={nftFormData.collection}
                        onValueChange={(value) => setNftFormData({...nftFormData, collection: value})}
                      >
                        <SelectTrigger id="nftCollection">
                          <SelectValue placeholder="Select collection" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Create New Collection</SelectItem>
                          <SelectItem value="vectorpunks">VectorPunks</SelectItem>
                          <SelectItem value="neonwave">NeonWave Riders</SelectItem>
                          <SelectItem value="cybersui">CyberSui</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="nftRoyalty">Royalty Percentage</Label>
                      <div className="pt-2 px-1">
                        <Slider
                          id="nftRoyalty"
                          defaultValue={[10]}
                          max={15}
                          step={0.5}
                          value={[nftFormData.royalty]}
                          onValueChange={(value) => setNftFormData({...nftFormData, royalty: value[0]})}
                        />
                        <div className="flex justify-between mt-1">
                          <span className="text-xs">0%</span>
                          <span className="text-xs font-medium">{nftFormData.royalty}%</span>
                          <span className="text-xs">15%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="nftTags">Tags (separated by commas)</Label>
                      <Input 
                        id="nftTags" 
                        placeholder="e.g. vector, cyberpunk, neon" 
                        value={nftFormData.tags}
                        onChange={(e) => setNftFormData({...nftFormData, tags: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="space-y-2 mb-6">
                      <Label htmlFor="nftImage">Upload NFT Image</Label>
                      <div className="border-2 border-dashed border-muted rounded-lg p-6 flex flex-col items-center justify-center">
                        {nftFormData.imagePreview ? (
                          <div className="relative w-full">
                            <img 
                              src={nftFormData.imagePreview} 
                              alt="NFT Preview" 
                              className="rounded-lg w-full h-auto max-h-80 object-contain"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => setNftFormData({...nftFormData, imageFile: null, imagePreview: ""})}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                            </Button>
                          </div>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground mb-2"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><line x1="16" x2="22" y1="5" y2="5"/><line x1="19" x2="19" y1="2" y2="8"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                            <p className="text-sm text-muted-foreground mb-2">
                              Drag and drop your file here, or click to browse
                            </p>
                            <p className="text-xs text-muted-foreground mb-4">
                              SVG, PNG, JPEG or GIF (Max 5MB)
                            </p>
                            <Button type="button" variant="outline" size="sm">
                              Choose File
                              <input
                                id="nftImage"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={handleNftImageChange}
                              />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-muted p-4 mb-6">
                      <h4 className="font-semibold mb-2">NFT Creation Details</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Minting Fee:</span>
                          <span className="font-mono">0.0012 SUI</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Storage Fee:</span>
                          <span className="font-mono">0.0008 SUI</span>
                        </li>
                        <li className="flex justify-between font-medium pt-2 border-t border-border">
                          <span>Total:</span>
                          <span className="font-mono">0.0020 SUI</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-muted/30 rounded-lg p-4 border border-primary/20">
                      <div className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                        <div>
                          <h4 className="font-medium text-sm">Create Vector-based NFTs</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Vector-based NFTs look crisp at any size and are perfect for the SuiVector platform. For best results, upload SVG files.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-muted flex justify-end">
                  <Button 
                    type="submit" 
                    className="neon-btn bg-primary hover:bg-primary/80 text-white rounded-xl px-8"
                    disabled={uploading || !nftFormData.name || !nftFormData.imageFile}
                  >
                    {uploading ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                        Creating NFT...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><line x1="16" x2="22" y1="5" y2="5"/><line x1="19" x2="19" y1="2" y2="8"/><path d="M9 15 5 9l4-4"/><path d="m5 9 4 4"/></svg>
                        Create NFT
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="token">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleTokenSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="tokenName">Token Name</Label>
                      <Input 
                        id="tokenName" 
                        placeholder="e.g. Super Sui Coin" 
                        value={tokenFormData.name}
                        onChange={(e) => setTokenFormData({...tokenFormData, name: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tokenSymbol">Token Symbol</Label>
                      <Input 
                        id="tokenSymbol" 
                        placeholder="e.g. SSC" 
                        className="uppercase"
                        maxLength={5}
                        value={tokenFormData.symbol}
                        onChange={(e) => setTokenFormData({...tokenFormData, symbol: e.target.value.toUpperCase()})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tokenDescription">Description</Label>
                      <Textarea 
                        id="tokenDescription" 
                        placeholder="Describe your token..." 
                        className="min-h-32"
                        value={tokenFormData.description}
                        onChange={(e) => setTokenFormData({...tokenFormData, description: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tokenSupply">Total Supply</Label>
                      <Input 
                        id="tokenSupply" 
                        type="number" 
                        min="1"
                        value={tokenFormData.totalSupply}
                        onChange={(e) => setTokenFormData({...tokenFormData, totalSupply: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tokenLiquidity">Initial Liquidity (SUI)</Label>
                      <Input 
                        id="tokenLiquidity" 
                        type="number" 
                        min="0"
                        value={tokenFormData.liquidity}
                        onChange={(e) => setTokenFormData({...tokenFormData, liquidity: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="space-y-2 mb-6">
                      <Label htmlFor="tokenDistribution">Distribution Method</Label>
                      <Select 
                        value={tokenFormData.distributionMethod}
                        onValueChange={(value) => setTokenFormData({...tokenFormData, distributionMethod: value})}
                      >
                        <SelectTrigger id="tokenDistribution">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="airdrop">Airdrop</SelectItem>
                          <SelectItem value="presale">Presale</SelectItem>
                          <SelectItem value="liquidity">Liquidity Only</SelectItem>
                          <SelectItem value="farming">Yield Farming</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="tokenGovernance" className="text-base">Governance Token</Label>
                        <Switch 
                          id="tokenGovernance" 
                          checked={tokenFormData.isGovernance}
                          onCheckedChange={(checked) => setTokenFormData({...tokenFormData, isGovernance: checked})}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Governance tokens enable holders to vote on proposals and participate in decision-making.
                      </p>
                    </div>
                    
                    <div className="rounded-lg bg-muted p-4 mb-6">
                      <h4 className="font-semibold mb-2">Token Creation Summary</h4>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-background rounded-lg p-3 text-center">
                          <p className="text-xs text-muted-foreground mb-1">Total Supply</p>
                          <p className="font-mono text-sm truncate">{parseInt(tokenFormData.totalSupply).toLocaleString()} {tokenFormData.symbol || "TOKENS"}</p>
                        </div>
                        <div className="bg-background rounded-lg p-3 text-center">
                          <p className="text-xs text-muted-foreground mb-1">Initial Liquidity</p>
                          <p className="font-mono text-sm">{parseFloat(tokenFormData.liquidity).toLocaleString()} SUI</p>
                        </div>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Creation Fee:</span>
                          <span className="font-mono">0.5 SUI</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Liquidity Fee:</span>
                          <span className="font-mono">0.2 SUI</span>
                        </li>
                        <li className="flex justify-between font-medium pt-2 border-t border-border">
                          <span>Total Fees:</span>
                          <span className="font-mono">0.7 SUI</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-muted/30 rounded-lg p-4 border border-primary/20">
                      <div className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                        <div>
                          <h4 className="font-medium text-sm">Token Creation Notice</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Creating a token requires liquidity. Make sure you have enough SUI in your wallet to cover both the token creation fee and the initial liquidity.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-muted flex justify-end">
                  <Button 
                    type="submit" 
                    className="neon-btn bg-primary hover:bg-primary/80 text-white rounded-xl px-8"
                    disabled={uploading || !tokenFormData.name || !tokenFormData.symbol}
                  >
                    {uploading ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                        Creating Token...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                        Create Token
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
