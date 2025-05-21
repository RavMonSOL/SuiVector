import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import NFTCard from "@/components/nft/NFTCard";
import CoinRow from "@/components/coin/CoinRow";
import TradeModal from "@/components/trade/TradeModal";

// Mock NFT data
const mockNfts = [
  {
    id: 1,
    image: "https://pixabay.com/get/gc9e0454fa51fed94b2dc454dd1e7c3819a3f3d2b0a720b070ccd921e4b1418ea8f712d89b3e5b36170f2dd34de0ef813bf2df14cc090704a757cf065ac0167b2_1280.jpg",
    name: "Neon Abstraction #3049",
    creator: "cryptomaster",
    creatorAvatar: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&auto=format&fit=crop&w=20&h=20",
    price: "4.2",
    likes: 128
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    name: "CyberSui #7831",
    creator: "neon_builder",
    creatorAvatar: "https://images.unsplash.com/photo-1557555187-23d685287bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=20&h=20",
    price: "7.8",
    likes: 96
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1608501078713-8e445a709b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    name: "GeoVectors #542",
    creator: "vector_king",
    creatorAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=20&h=20",
    price: "3.5",
    likes: 73
  },
  {
    id: 4,
    image: "https://pixabay.com/get/g6f227d35756346e4c5b223bc5eaabd2d66cad0cdc09ddd87cd80163fe166fd013bc34315f0fcd56338b5e48d4db1d7bb5a8521996d0733acd6d8d4d37558b6a5_1280.jpg",
    name: "NeonWave Rider #098",
    creator: "cyber_artist",
    creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=20&h=20",
    price: "6.9",
    likes: 184
  },
  {
    id: 5,
    image: "https://pixabay.com/get/gdec922e54be978a2e4fc04a113828283fb193f5e929baea3d11a602ed521bbb24d4bef9eba96b704b8ecdb3870a956add7e1024c4ef5cbe924ef65a5c8568722_1280.jpg",
    name: "VectorPunk #2134",
    creator: "punkmaster",
    creatorAvatar: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&auto=format&fit=crop&w=20&h=20",
    price: "5.6",
    likes: 92
  },
  {
    id: 6,
    image: "https://pixabay.com/get/g83e2c7e1db9b2a9f7988e7eb35c2ee0aec50da997d69e1b02e2a1caa5e49bfbc8de7e3dec4b45b55eca7ecd767d4c2797abe5cebe31583d67ebe4fec0d81b94a_1280.jpg",
    name: "Crypto Dreams #089",
    creator: "dreamweaver",
    creatorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=20&h=20",
    price: "9.2",
    likes: 156
  },
  {
    id: 7,
    image: "https://pixabay.com/get/g25ff74cfa09a5a77bb7c3c09f4b15bc10abf8c54ea2d0ec3a61c49fa12f64e23a9d49607c6f32a77cbdc8bdb76f60a6a78c9972d6dfb1b2f09c8c3fc31290d5a_1280.jpg",
    name: "Digital Soul #543",
    creator: "soulcreator",
    creatorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=20&h=20",
    price: "4.8",
    likes: 88
  },
  {
    id: 8,
    image: "https://pixabay.com/get/g27f9f0d7f7f7b9ed6d58d60d35cd2ff92f4ccadaac7cfcf87f878c74a9caaa3e2a4c39da32a0a7f8d1adad8a3c32c8c3c85af23a0c05b50ac9a68cdf7e27d41c_1280.jpg",
    name: "Nexus Grid #742",
    creator: "gridmaster",
    creatorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=20&h=20",
    price: "6.2",
    likes: 103
  }
];

// Mock coin data
const mockCoins = [
  {
    id: 1,
    name: "BULLISH",
    symbol: "BULL",
    price: "0.00382",
    change: "+24.6%",
    marketCap: "2.6M",
    emoji: "🚀"
  },
  {
    id: 2,
    name: "PEPE SUI",
    symbol: "PEPE",
    price: "0.00126",
    change: "+16.2%",
    marketCap: "1.8M",
    emoji: "🐸"
  },
  {
    id: 3,
    name: "TACO TUESDAY",
    symbol: "TACO",
    price: "0.00057",
    change: "-8.4%",
    marketCap: "950K",
    emoji: "🌮"
  },
  {
    id: 4,
    name: "SUIDOGE",
    symbol: "SDOGE",
    price: "0.00095",
    change: "+5.2%",
    marketCap: "3.2M",
    emoji: "🐕"
  },
  {
    id: 5,
    name: "MOON ROCKET",
    symbol: "MOON",
    price: "0.00215",
    change: "+12.8%",
    marketCap: "1.5M",
    emoji: "🌙"
  },
  {
    id: 6,
    name: "DIAMOND HANDS",
    symbol: "DIAM",
    price: "0.00178",
    change: "+7.3%",
    marketCap: "890K",
    emoji: "💎"
  },
  {
    id: 7,
    name: "SPACE CADET",
    symbol: "SPACE",
    price: "0.00042",
    change: "-3.8%",
    marketCap: "560K",
    emoji: "👨‍🚀"
  },
  {
    id: 8,
    name: "NYAN CAT",
    symbol: "NYAN",
    price: "0.00068",
    change: "+9.7%",
    marketCap: "720K",
    emoji: "🐱"
  }
];

export default function MarketplacePage() {
  const [selectedNft, setSelectedNft] = useState<number | null>(null);
  const [isNftModalOpen, setIsNftModalOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleNftClick = (id: number) => {
    setSelectedNft(id);
    setIsNftModalOpen(true);
  };

  // Filter NFTs based on search query and price range
  const filteredNfts = mockNfts.filter(
    (nft) => 
      nft.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
      parseFloat(nft.price) >= priceRange[0] && 
      parseFloat(nft.price) <= priceRange[1]
  );

  // Filter coins based on search query
  const filteredCoins = mockCoins.filter(
    (coin) => 
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
          <p className="text-muted-foreground">Discover and trade NFTs and meme coins on the Sui blockchain</p>
        </div>
        
        <div className="w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search NFTs and tokens..."
            className="w-full md:w-80"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="nfts" className="w-full">
        <TabsList className="grid grid-cols-2 mb-8 w-full md:w-64">
          <TabsTrigger value="nfts">NFTs</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
        </TabsList>

        <TabsContent value="nfts">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters */}
            <Card className="md:w-64 mb-6 md:mb-0 flex-shrink-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Filters</h3>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2">Price Range (SUI)</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 10]}
                      max={10}
                      step={0.1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-2"
                    />
                    <div className="flex justify-between">
                      <span className="text-xs">{priceRange[0]} SUI</span>
                      <span className="text-xs">{priceRange[1]} SUI</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2">Categories</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="abstract" className="mr-2" />
                      <label htmlFor="abstract" className="text-sm">Abstract</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="cyberpunk" className="mr-2" />
                      <label htmlFor="cyberpunk" className="text-sm">Cyberpunk</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="geometric" className="mr-2" />
                      <label htmlFor="geometric" className="text-sm">Geometric</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="pixel" className="mr-2" />
                      <label htmlFor="pixel" className="text-sm">Pixel Art</label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2">Collections</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="vectorpunks" className="mr-2" />
                      <label htmlFor="vectorpunks" className="text-sm">VectorPunks</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="neonwave" className="mr-2" />
                      <label htmlFor="neonwave" className="text-sm">NeonWave</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="cybersui" className="mr-2" />
                      <label htmlFor="cybersui" className="text-sm">CyberSui</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="geodreams" className="mr-2" />
                      <label htmlFor="geodreams" className="text-sm">GeoDreams</label>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-primary hover:bg-primary/80">Apply Filters</Button>
              </CardContent>
            </Card>
            
            {/* NFT Grid */}
            <div className="flex-1">
              {filteredNfts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredNfts.map((nft) => (
                    <NFTCard
                      key={nft.id}
                      image={nft.image}
                      name={nft.name}
                      creator={nft.creator}
                      creatorAvatar={nft.creatorAvatar}
                      price={nft.price}
                      likes={nft.likes}
                      onClick={() => handleNftClick(nft.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground mb-4"><rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18"/><line x1="7" x2="7" y1="2" y2="22"/><line x1="17" x2="17" y1="2" y2="22"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="2" x2="7" y1="7" y2="7"/><line x1="2" x2="7" y1="17" y2="17"/><line x1="17" x2="22" y1="17" y2="17"/><line x1="17" x2="22" y1="7" y2="7"/></svg>
                  <h3 className="text-xl font-bold mb-2">No NFTs Found</h3>
                  <p className="text-muted-foreground text-center max-w-md">No NFTs match your current filters. Try adjusting your search criteria or price range.</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tokens">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-card rounded-xl overflow-hidden">
              <thead className="border-b border-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Token</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">24h</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Market Cap</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted">
                {filteredCoins.length > 0 ? (
                  filteredCoins.map((coin) => (
                    <CoinRow
                      key={coin.id}
                      name={coin.name}
                      symbol={coin.symbol}
                      price={coin.price}
                      change={coin.change}
                      marketCap={coin.marketCap}
                      emoji={coin.emoji}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground mb-4"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                        <h3 className="text-xl font-bold mb-2">No Tokens Found</h3>
                        <p className="text-muted-foreground text-center max-w-md">No tokens match your search criteria. Try a different search term.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      {/* NFT Purchase Modal */}
      {selectedNft && (
        <TradeModal
          isOpen={isNftModalOpen}
          onClose={() => setIsNftModalOpen(false)}
        />
      )}
    </div>
  );
}
