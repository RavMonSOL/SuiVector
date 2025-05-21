import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import NFTCard from "@/components/nft/NFTCard";
import PostCard from "@/components/social/PostCard";

// Mock trending data
const trendingCollections = [
  {
    id: 1,
    name: "VectorPunks",
    creator: "punklabs",
    creatorAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    banner: "https://pixabay.com/get/g27f9f0d7f7f7b9ed6d58d60d35cd2ff92f4ccadaac7cfcf87f878c74a9caaa3e2a4c39da32a0a7f8d1adad8a3c32c8c3c85af23a0c05b50ac9a68cdf7e27d41c_1280.jpg",
    floorPrice: "3.5",
    volume: "1.2K",
    items: 5000
  },
  {
    id: 2,
    name: "NeonWave Riders",
    creator: "cyber_artist",
    creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    banner: "https://pixabay.com/get/gdec922e54be978a2e4fc04a113828283fb193f5e929baea3d11a602ed521bbb24d4bef9eba96b704b8ecdb3870a956add7e1024c4ef5cbe924ef65a5c8568722_1280.jpg",
    floorPrice: "6.2",
    volume: "958",
    items: 2500
  },
  {
    id: 3,
    name: "CyberSui",
    creator: "neon_builder",
    creatorAvatar: "https://images.unsplash.com/photo-1557555187-23d685287bc3",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400",
    floorPrice: "4.8",
    volume: "875",
    items: 3200
  }
];

// Mock trending creators
const trendingCreators = [
  {
    id: 1,
    name: "Wei Johnson",
    handle: "@wei_trades",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    verified: true,
    followers: 24800,
    volume: "45.6K",
    items: 42
  },
  {
    id: 2,
    name: "Sarah NFT",
    handle: "@sarah_collects",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    verified: true,
    followers: 18500,
    volume: "32.1K",
    items: 68
  },
  {
    id: 3,
    name: "Crypto Mike",
    handle: "@crypto_mike",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    verified: true,
    followers: 12900,
    volume: "28.7K",
    items: 36
  },
  {
    id: 4,
    name: "Neon Builder",
    handle: "@neon_builder",
    avatar: "https://images.unsplash.com/photo-1557555187-23d685287bc3",
    verified: false,
    followers: 9600,
    volume: "15.3K",
    items: 24
  },
  {
    id: 5,
    name: "Vector Queen",
    handle: "@vector_queen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    verified: false,
    followers: 8400,
    volume: "12.8K",
    items: 19
  }
];

// Mock trending NFTs
const trendingNfts = [
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
    image: "https://pixabay.com/get/g6f227d35756346e4c5b223bc5eaabd2d66cad0cdc09ddd87cd80163fe166fd013bc34315f0fcd56338b5e48d4db1d7bb5a8521996d0733acd6d8d4d37558b6a5_1280.jpg",
    name: "NeonWave Rider #098",
    creator: "cyber_artist",
    creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=20&h=20",
    price: "6.9",
    likes: 184
  },
  {
    id: 3,
    image: "https://pixabay.com/get/g83e2c7e1db9b2a9f7988e7eb35c2ee0aec50da997d69e1b02e2a1caa5e49bfbc8de7e3dec4b45b55eca7ecd767d4c2797abe5cebe31583d67ebe4fec0d81b94a_1280.jpg",
    name: "Crypto Dreams #089",
    creator: "dreamweaver",
    creatorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=20&h=20",
    price: "9.2",
    likes: 156
  },
  {
    id: 4,
    image: "https://pixabay.com/get/g25ff74cfa09a5a77bb7c3c09f4b15bc10abf8c54ea2d0ec3a61c49fa12f64e23a9d49607c6f32a77cbdc8bdb76f60a6a78c9972d6dfb1b2f09c8c3fc31290d5a_1280.jpg",
    name: "Digital Soul #543",
    creator: "soulcreator",
    creatorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=20&h=20",
    price: "4.8",
    likes: 88
  }
];

// Mock trending posts
const trendingPosts = [
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
  }
];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore</h1>
        <p className="text-muted-foreground">Discover trending NFTs, creators, and collections on SuiVector</p>
      </div>

      <div className="mb-8">
        <Input
          type="text"
          placeholder="Search creators, collections, or NFTs..."
          className="w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8 w-full md:w-96">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="creators">Creators</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="trending">
          {/* Trending Collections */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Trending Collections</h2>
              <a href="#" className="text-primary flex items-center hover:underline">
                View all 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trendingCollections.map((collection) => (
                <Card key={collection.id} className="overflow-hidden card-hover">
                  <div className="aspect-[3/1] w-full overflow-hidden">
                    <img 
                      src={collection.banner} 
                      alt={collection.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <Avatar className="w-10 h-10 border-2 border-background -mt-8 mr-2">
                          <AvatarImage src={collection.creatorAvatar} alt={collection.creator} />
                          <AvatarFallback>{collection.creator[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold">{collection.name}</h3>
                          <p className="text-xs text-muted-foreground">by @{collection.creator}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {collection.items.toLocaleString()} items
                      </Badge>
                    </div>
                    <div className="flex justify-between mt-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Floor Price</p>
                        <p className="font-mono font-medium">{collection.floorPrice} SUI</p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground">Volume</p>
                        <p className="font-mono font-medium">{collection.volume} SUI</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Trending Creators */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Trending Creators</h2>
              <a href="#" className="text-primary flex items-center hover:underline">
                View all 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {trendingCreators.map((creator) => (
                <Card key={creator.id} className="card-hover">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Avatar className="w-16 h-16 mb-3 relative">
                      <AvatarImage src={creator.avatar} alt={creator.name} />
                      <AvatarFallback>{creator.name[0]}</AvatarFallback>
                      {creator.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                      )}
                    </Avatar>
                    <h3 className="font-bold text-sm">{creator.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{creator.handle}</p>
                    
                    <div className="w-full grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-muted rounded-lg p-2 text-center">
                        <p className="text-xs text-muted-foreground">Volume</p>
                        <p className="font-mono text-sm">{creator.volume}</p>
                      </div>
                      <div className="bg-muted rounded-lg p-2 text-center">
                        <p className="text-xs text-muted-foreground">Followers</p>
                        <p className="text-sm">{(creator.followers / 1000).toFixed(1)}K</p>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" x2="20" y1="8" y2="14"/><line x1="23" x2="17" y1="11" y2="11"/></svg>
                      Follow
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Trending NFTs */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Trending NFTs</h2>
              <a href="#" className="text-primary flex items-center hover:underline">
                View all 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trendingNfts.map((nft) => (
                <NFTCard
                  key={nft.id}
                  image={nft.image}
                  name={nft.name}
                  creator={nft.creator}
                  creatorAvatar={nft.creatorAvatar}
                  price={nft.price}
                  likes={nft.likes}
                />
              ))}
            </div>
          </div>

          {/* Hot Posts */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Hot Posts</h2>
              <a href="#" className="text-primary flex items-center hover:underline">
                View all 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>

            <div className="space-y-4">
              {trendingPosts.map((post) => (
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
          </div>
        </TabsContent>

        <TabsContent value="collections">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...trendingCollections, ...trendingCollections].map((collection, index) => (
              <Card key={`${collection.id}-${index}`} className="overflow-hidden card-hover">
                <div className="aspect-[3/1] w-full overflow-hidden">
                  <img 
                    src={collection.banner} 
                    alt={collection.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <Avatar className="w-10 h-10 border-2 border-background -mt-8 mr-2">
                        <AvatarImage src={collection.creatorAvatar} alt={collection.creator} />
                        <AvatarFallback>{collection.creator[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold">{collection.name}</h3>
                        <p className="text-xs text-muted-foreground">by @{collection.creator}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {collection.items.toLocaleString()} items
                    </Badge>
                  </div>
                  <div className="flex justify-between mt-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Floor Price</p>
                      <p className="font-mono font-medium">{collection.floorPrice} SUI</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground">Volume</p>
                      <p className="font-mono font-medium">{collection.volume} SUI</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="creators">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...trendingCreators, ...trendingCreators.slice(0, 3)].map((creator, index) => (
              <Card key={`${creator.id}-${index}`} className="card-hover">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Avatar className="w-16 h-16 mb-3 relative">
                    <AvatarImage src={creator.avatar} alt={creator.name} />
                    <AvatarFallback>{creator.name[0]}</AvatarFallback>
                    {creator.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                    )}
                  </Avatar>
                  <h3 className="font-bold text-sm">{creator.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{creator.handle}</p>
                  
                  <div className="w-full grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-muted rounded-lg p-2 text-center">
                      <p className="text-xs text-muted-foreground">Volume</p>
                      <p className="font-mono text-sm">{creator.volume}</p>
                    </div>
                    <div className="bg-muted rounded-lg p-2 text-center">
                      <p className="text-xs text-muted-foreground">Followers</p>
                      <p className="text-sm">{(creator.followers / 1000).toFixed(1)}K</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" x2="20" y1="8" y2="14"/><line x1="23" x2="17" y1="11" y2="11"/></svg>
                    Follow
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <div className="space-y-4">
            {[...trendingPosts, ...trendingPosts].map((post, index) => (
              <PostCard
                key={`${post.id}-${index}`}
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
