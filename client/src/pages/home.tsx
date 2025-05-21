import { useState } from "react";
import { Button } from "@/components/ui/button";
import WalletButton from "@/components/wallet/WalletButton";
import NFTCard from "@/components/nft/NFTCard";
import CoinRow from "@/components/coin/CoinRow";
import PostCard from "@/components/social/PostCard";
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
  }
];

// Mock social posts
const mockPosts = [
  {
    id: 1,
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40",
    username: "Alex Trader",
    handle: "@alex_trades",
    timeAgo: "2h ago",
    content: "Just loaded up on $BULL! This meme coin is going to explode with the new SuiVector features coming next week! 🚀",
    likes: 128,
    comments: 24,
    shares: 8,
    token: {
      name: "BULLISH",
      symbol: "BULL",
      emoji: "🚀",
      price: "0.00382",
      change: "+24.6%",
      isPositive: true
    },
    trade: {
      action: "Buy",
      amount: "15,000",
      symbol: "BULL",
      pnl: "+1.42",
      isPnlPositive: true
    }
  },
  {
    id: 2,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40",
    username: "Sarah NFT",
    handle: "@sarah_collects",
    timeAgo: "4h ago",
    content: "Just picked up this amazing NeonWave Rider NFT for my collection! The vector art is so clean and vibrant. Perfect for my digital gallery! ✨",
    likes: 84,
    comments: 15,
    shares: 4,
    nftImage: "https://pixabay.com/get/gdec922e54be978a2e4fc04a113828283fb193f5e929baea3d11a602ed521bbb24d4bef9eba96b704b8ecdb3870a956add7e1024c4ef5cbe924ef65a5c8568722_1280.jpg",
    nftName: "NeonWave Rider #098"
  },
  {
    id: 3,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40",
    username: "Crypto Mike",
    handle: "@crypto_mike",
    timeAgo: "8h ago",
    content: "Dumping my $TACO before it goes lower. This meme coin isn't performing as expected. Cutting losses and moving to $SDOGE which has better fundamentals and community. 📉➡️📈",
    likes: 42,
    comments: 38,
    shares: 5,
    token: {
      name: "TACO TUESDAY",
      symbol: "TACO",
      emoji: "🌮",
      price: "0.00057",
      change: "-8.4%",
      isPositive: false
    },
    trade: {
      action: "Sell",
      amount: "45,000",
      symbol: "TACO",
      pnl: "-0.82",
      isPnlPositive: false
    }
  }
];

export default function HomePage() {
  const [selectedNft, setSelectedNft] = useState<number | null>(null);
  const [isNftModalOpen, setIsNftModalOpen] = useState(false);

  const handleNftClick = (id: number) => {
    setSelectedNft(id);
    setIsNftModalOpen(true);
  };

  return (
    <main className="px-4 py-6 md:px-8 pb-20">
      {/* Top Bar with Connect Wallet Button */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold font-sans hidden md:block">Discover</h2>
        <WalletButton />
      </div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl mb-10">
        <div className="h-56 md:h-80 bg-gradient-to-r from-primary/30 to-secondary/30 relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 flex items-center p-8">
            <div className="z-10 max-w-xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Trade, Create & Connect in the Sui Ecosystem</h1>
              <p className="text-muted-foreground mb-6">The first SocialFi platform for vector NFTs and meme coins on Sui blockchain</p>
              <div className="flex flex-wrap gap-3">
                <Button className="neon-btn bg-accent hover:bg-accent/80 font-medium rounded-full px-6 py-2.5 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M13 18v-6h6"/><rect x="2" y="6" width="16" height="12" rx="2"/><path d="M13 6V5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-1"/></svg>
                  Explore Now
                </Button>
                <Button className="neon-btn bg-muted hover:bg-muted/80 font-medium rounded-full px-6 py-2.5 text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  Create Asset
                </Button>
              </div>
            </div>
          </div>
          
          {/* Abstract vector background elements */}
          <svg className="absolute -bottom-10 -right-10 w-64 h-64 opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="hsl(var(--primary))" d="M43.4,-73.4C54.9,-66.7,62,-52.5,67.9,-38.6C73.8,-24.6,78.4,-12.3,76.2,-1.3C74,9.8,65,19.6,57.8,30.2C50.6,40.8,45.3,52.2,36,59.3C26.8,66.4,13.4,69.2,-0.2,69.5C-13.8,69.8,-27.6,67.7,-38.1,60.8C-48.7,53.9,-56,42.2,-60.9,30C-65.8,17.8,-68.3,5,-67.1,-7.5C-65.9,-19.9,-61,-32,-52.9,-39.9C-44.8,-47.8,-33.5,-51.6,-22.9,-58.6C-12.3,-65.6,-2.3,-75.8,8.8,-79.1C19.9,-82.3,39.8,-78.7,43.4,-73.4Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute -top-20 -left-20 w-80 h-80 opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="hsl(var(--secondary))" d="M35.6,-60.1C45.6,-53.8,53,-43.3,59.5,-31.9C66,-20.5,71.6,-8.2,70.7,3.5C69.8,15.1,62.4,26.1,54.3,36.8C46.2,47.5,37.5,57.8,26.5,63C15.5,68.2,2.2,68.2,-12.1,67.8C-26.3,67.4,-41.6,66.7,-52.6,59.4C-63.7,52.1,-70.5,38.3,-74.4,23.8C-78.3,9.4,-79.2,-5.7,-74.1,-18.2C-69,-30.7,-57.9,-40.5,-45.8,-46.2C-33.7,-51.9,-20.5,-53.5,-8,-59.9C4.5,-66.3,16.9,-77.4,26.7,-76.2C36.5,-75.1,43.6,-61.5,35.6,-60.1Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>
      
      {/* Trending NFTs Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Trending NFTs</h2>
          <a href="#" className="text-primary flex items-center hover:underline">
            View all <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockNfts.map((nft) => (
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
      </section>
      
      {/* Meme Coins Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Trending Meme Coins</h2>
          <a href="#" className="text-primary flex items-center hover:underline">
            View all <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
        
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
              {mockCoins.map((coin) => (
                <CoinRow
                  key={coin.id}
                  name={coin.name}
                  symbol={coin.symbol}
                  price={coin.price}
                  change={coin.change}
                  marketCap={coin.marketCap}
                  emoji={coin.emoji}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
      
      {/* Social Feed Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Social Feed</h2>
          <button className="text-muted-foreground hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
          </button>
        </div>
        
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1 hide-scrollbar">
          {mockPosts.map((post) => (
            <PostCard
              key={post.id}
              avatar={post.avatar}
              username={post.username}
              handle={post.handle}
              timeAgo={post.timeAgo}
              content={post.content}
              likes={post.likes}
              comments={post.comments}
              shares={post.shares}
              nftImage={post.nftImage}
              nftName={post.nftName}
              token={post.token}
              trade={post.trade}
            />
          ))}
        </div>
      </section>
      
      {/* NFT Purchase Modal */}
      {selectedNft && (
        <TradeModal
          isOpen={isNftModalOpen}
          onClose={() => setIsNftModalOpen(false)}
        />
      )}
    </main>
  );
}
