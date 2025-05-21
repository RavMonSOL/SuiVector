import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";
import NFTCard from "@/components/nft/NFTCard";
import PostCard from "@/components/social/PostCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock user data
const user = {
  id: 1,
  username: "Wei Johnson",
  handle: "@wei_trades",
  avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
  bio: "SUI ecosystem enthusiast | Vector NFT collector | Trading memecoins since 2021 | Always looking for the next 100x",
  followers: 3582,
  following: 842,
  joined: "Mar 2023",
  portfolioValue: "12,845.76",
  portfolioChange: "+8.2%"
};

// Mock NFTs
const ownedNfts = [
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
    image: "https://pixabay.com/get/gdec922e54be978a2e4fc04a113828283fb193f5e929baea3d11a602ed521bbb24d4bef9eba96b704b8ecdb3870a956add7e1024c4ef5cbe924ef65a5c8568722_1280.jpg",
    name: "NeonWave Rider #098",
    creator: "cyber_artist",
    creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=20&h=20",
    price: "6.9",
    likes: 184
  }
];

// Mock trading history data for chart
const tradeData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
  { name: 'Aug', value: 4300 },
  { name: 'Sep', value: 5200 },
  { name: 'Oct', value: 6200 },
  { name: 'Nov', value: 7100 },
  { name: 'Dec', value: 9500 }
];

// Mock posts
const userPosts = [
  {
    id: 1,
    avatar: user.avatar,
    username: user.username,
    handle: user.handle,
    timeAgo: "2d ago",
    content: "Just added NeonWave Rider #098 to my collection! The colors on this one are insane. Vector art is definitely the future of NFTs on Sui! 🔥",
    likes: 128,
    comments: 24,
    shares: 8,
    nftImage: "https://pixabay.com/get/gdec922e54be978a2e4fc04a113828283fb193f5e929baea3d11a602ed521bbb24d4bef9eba96b704b8ecdb3870a956add7e1024c4ef5cbe924ef65a5c8568722_1280.jpg",
    nftName: "NeonWave Rider #098"
  },
  {
    id: 2,
    avatar: user.avatar,
    username: user.username,
    handle: user.handle,
    timeAgo: "5d ago",
    content: "BULLISH on $BULL! Just loaded up my bag. This memecoin has one of the strongest communities on Sui. Expecting 5x from here! 🚀",
    likes: 84,
    comments: 15,
    shares: 4,
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
      amount: "25,000",
      symbol: "BULL",
      pnl: "+2.45",
      isPnlPositive: true
    }
  }
];

export default function ProfilePage() {
  const { theme, setTheme } = useTheme();
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      {/* Profile Header */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="w-24 h-24 border-4 border-primary mb-4">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex gap-4 mb-4">
                <div className="text-center">
                  <p className="text-muted-foreground text-sm">Followers</p>
                  <p className="font-bold">{user.followers.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground text-sm">Following</p>
                  <p className="font-bold">{user.following.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground text-sm">Joined</p>
                  <p className="font-bold">{user.joined}</p>
                </div>
              </div>
              
              {!isEditMode ? (
                <Button 
                  className="neon-btn bg-primary hover:bg-primary/80 rounded-full"
                  onClick={() => setIsEditMode(true)}
                >
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button 
                    className="bg-primary hover:bg-primary/80 rounded-full"
                    onClick={() => setIsEditMode(false)}
                  >
                    Save
                  </Button>
                  <Button 
                    variant="outline"
                    className="rounded-full"
                    onClick={() => setIsEditMode(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold">{user.username}</h1>
                  <p className="text-muted-foreground">{user.handle}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    className={`p-2 rounded-full ${theme === 'dark' ? 'bg-muted' : 'bg-secondary/10'}`}
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                    )}
                  </button>
                </div>
              </div>
              
              <p className="text-sm mb-6">{user.bio}</p>
              
              <div className="bg-muted rounded-xl p-5">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold">Portfolio Value</h3>
                  <span className={`text-sm ${user.portfolioChange.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                    {user.portfolioChange}
                  </span>
                </div>
                <p className="text-2xl font-mono font-bold mb-4">{user.portfolioValue} SUI</p>
                
                <div className="h-28">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={tradeData}
                      margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                      <YAxis hide={true} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          borderColor: 'hsl(var(--border))',
                          color: 'hsl(var(--foreground))' 
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="hsl(var(--primary))" 
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs defaultValue="nfts" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="nfts">NFTs</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="nfts">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ownedNfts.map((nft) => (
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
        </TabsContent>
        
        <TabsContent value="tokens">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center mr-2">
                    <span className="text-xs">🚀</span>
                  </div>
                  BULLISH ($BULL)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Balance:</span>
                  <span className="font-mono">25,000 BULL</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Value:</span>
                  <span className="font-mono">95.5 SUI</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-muted-foreground">Price change:</span>
                  <span className="text-success">+24.6%</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="w-1/2">Sell</Button>
                  <Button className="w-1/2 bg-primary hover:bg-primary/80">Buy More</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-2">
                    <span className="text-xs">🐸</span>
                  </div>
                  PEPE SUI ($PEPE)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Balance:</span>
                  <span className="font-mono">50,000 PEPE</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Value:</span>
                  <span className="font-mono">63.0 SUI</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-muted-foreground">Price change:</span>
                  <span className="text-success">+16.2%</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="w-1/2">Sell</Button>
                  <Button className="w-1/2 bg-primary hover:bg-primary/80">Buy More</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="posts">
          <div className="space-y-4">
            {userPosts.map((post) => (
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
        </TabsContent>
        
        <TabsContent value="rewards">
          <Card>
            <CardHeader>
              <CardTitle>Governance Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="font-bold mb-4">SuiVector Governance Points</h3>
                  <div className="text-4xl font-mono font-bold mb-2 text-primary">1,245</div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Earn points by trading, posting, and engaging with the community. 
                    Redeem for exclusive NFTs and token airdrops.
                  </p>
                  <Button className="w-full bg-primary hover:bg-primary/80">Claim Rewards</Button>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold mb-4">Trading Volume (30d)</h3>
                  <div className="text-4xl font-mono font-bold mb-2">582.4 SUI</div>
                  <p className="text-sm text-muted-foreground mb-4">
                    You're in the top 5% of traders this month! Keep trading to maintain your elite status.
                  </p>
                  <div className="w-full bg-muted rounded-full h-2.5 mt-2 mb-6">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-muted">
                <h3 className="font-bold mb-4">Upcoming Airdrops</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted rounded-xl">
                    <div className="mb-2 font-medium">SuiVector Token</div>
                    <div className="text-sm text-muted-foreground">Eligible: Yes</div>
                    <div className="text-sm text-muted-foreground">ETA: Q2 2023</div>
                  </div>
                  <div className="p-4 bg-muted rounded-xl">
                    <div className="mb-2 font-medium">VectorPunk NFT</div>
                    <div className="text-sm text-muted-foreground">Eligible: Yes</div>
                    <div className="text-sm text-muted-foreground">ETA: 14 days</div>
                  </div>
                  <div className="p-4 bg-muted rounded-xl">
                    <div className="mb-2 font-medium">Mystery Airdrop</div>
                    <div className="text-sm text-muted-foreground">Eligible: Pending</div>
                    <div className="text-sm text-muted-foreground">ETA: TBA</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
