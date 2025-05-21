import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

// Mock trading groups data
const tradingGroups = [
  {
    id: 1,
    name: "SUI Whales",
    description: "A private community of experienced Sui traders sharing alpha and coordinating moves.",
    members: 124,
    trades: 867,
    avgPnl: "+16.4%",
    privacy: "Private",
    tags: ["Alpha", "Signals", "High Volume"],
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
  },
  {
    id: 2,
    name: "Vector Art Collectors",
    description: "For enthusiasts of vector-based NFTs. We discuss new collections, floor prices, and trading strategies.",
    members: 245,
    trades: 1532,
    avgPnl: "+8.2%",
    privacy: "Public",
    tags: ["NFTs", "Art", "Collections"],
    avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
  },
  {
    id: 3,
    name: "Degen Meme Traders",
    description: "High risk, high reward meme coin trading. Not for the faint of heart. 🚀",
    members: 356,
    trades: 2456,
    avgPnl: "+24.5%",
    privacy: "Private",
    tags: ["Meme Coins", "High Risk", "YOLO"],
    avatar: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c"
  },
  {
    id: 4,
    name: "Trading Algorithms",
    description: "A community for algorithmic traders developing strategies on the Sui network.",
    members: 87,
    trades: 965,
    avgPnl: "+11.8%",
    privacy: "Private",
    tags: ["Algorithms", "Technical", "Bots"],
    avatar: "https://images.unsplash.com/photo-1639322537228-f710d846310a"
  },
  {
    id: 5,
    name: "NFT Flippers Club",
    description: "Quick buys, quick sells. We spot undervalued NFTs and flip them for profit.",
    members: 192,
    trades: 1846,
    avgPnl: "+19.2%",
    privacy: "Public",
    tags: ["NFTs", "Flipping", "Quick Trades"],
    avatar: "https://images.unsplash.com/photo-1608501078713-8e445a709b39"
  },
  {
    id: 6,
    name: "Sui Ecosystem Investors",
    description: "Long-term investors in the Sui blockchain ecosystem. We focus on fundamental analysis.",
    members: 315,
    trades: 523,
    avgPnl: "+5.7%",
    privacy: "Public",
    tags: ["Long-term", "Fundamentals", "Ecosystem"],
    avatar: "https://images.unsplash.com/photo-1642790551116-18e150f248e5"
  }
];

// Mock my groups
const myGroups = [
  {
    id: 2,
    name: "Vector Art Collectors",
    description: "For enthusiasts of vector-based NFTs. We discuss new collections, floor prices, and trading strategies.",
    members: 245,
    trades: 1532,
    avgPnl: "+8.2%",
    privacy: "Public",
    tags: ["NFTs", "Art", "Collections"],
    avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
    unreadMessages: 8
  },
  {
    id: 5,
    name: "NFT Flippers Club",
    description: "Quick buys, quick sells. We spot undervalued NFTs and flip them for profit.",
    members: 192,
    trades: 1846,
    avgPnl: "+19.2%",
    privacy: "Public",
    tags: ["NFTs", "Flipping", "Quick Trades"],
    avatar: "https://images.unsplash.com/photo-1608501078713-8e445a709b39",
    unreadMessages: 0
  },
  {
    id: 6,
    name: "Sui Ecosystem Investors",
    description: "Long-term investors in the Sui blockchain ecosystem. We focus on fundamental analysis.",
    members: 315,
    trades: 523,
    avgPnl: "+5.7%",
    privacy: "Public",
    tags: ["Long-term", "Fundamentals", "Ecosystem"],
    avatar: "https://images.unsplash.com/photo-1642790551116-18e150f248e5",
    unreadMessages: 12
  }
];

export default function GroupsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newGroupData, setNewGroupData] = useState({
    name: "",
    description: "",
    isPrivate: false,
    tags: "",
    entryFee: "0"
  });
  
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<(typeof tradingGroups)[0] | null>(null);
  
  // Filter groups based on search query
  const filteredGroups = tradingGroups.filter(
    (group) => 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleCreateGroup = () => {
    toast({
      title: "Group Created!",
      description: `Your trading group "${newGroupData.name}" has been created successfully.`,
    });
    
    setIsCreateDialogOpen(false);
    setNewGroupData({
      name: "",
      description: "",
      isPrivate: false,
      tags: "",
      entryFee: "0"
    });
  };
  
  const handleJoinGroup = () => {
    if (selectedGroup) {
      toast({
        title: "Group Joined!",
        description: `You've successfully joined the "${selectedGroup.name}" trading group.`,
      });
      
      setIsJoinDialogOpen(false);
      setSelectedGroup(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Trading Groups</h1>
          <p className="text-muted-foreground">Join private trading groups to share strategies and coordinate moves</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="neon-btn bg-primary hover:bg-primary/80">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Trading Group</DialogTitle>
              <DialogDescription>
                Start a new trading group to collaborate with like-minded traders
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="groupName">Group Name</Label>
                <Input 
                  id="groupName" 
                  placeholder="Enter a name for your group" 
                  value={newGroupData.name}
                  onChange={(e) => setNewGroupData({...newGroupData, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="groupDescription">Description</Label>
                <Textarea 
                  id="groupDescription" 
                  placeholder="What is this group about?" 
                  value={newGroupData.description}
                  onChange={(e) => setNewGroupData({...newGroupData, description: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="groupTags">Tags (separated by commas)</Label>
                <Input 
                  id="groupTags" 
                  placeholder="e.g. NFTs, Meme Coins, Technical Analysis" 
                  value={newGroupData.tags}
                  onChange={(e) => setNewGroupData({...newGroupData, tags: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isPrivate" className="text-base cursor-pointer">Private Group</Label>
                  <Switch 
                    id="isPrivate" 
                    checked={newGroupData.isPrivate}
                    onCheckedChange={(checked) => setNewGroupData({...newGroupData, isPrivate: checked})}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Private groups require approval to join and can hide their activity from public feeds.
                </p>
              </div>
              
              {newGroupData.isPrivate && (
                <div className="space-y-2">
                  <Label htmlFor="entryFee">Entry Fee (SUI)</Label>
                  <Input 
                    id="entryFee" 
                    type="number" 
                    min="0"
                    step="0.1"
                    placeholder="0.0"
                    value={newGroupData.entryFee}
                    onChange={(e) => setNewGroupData({...newGroupData, entryFee: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">
                    Optional fee to join your group. This can help filter for serious members.
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <Button 
                className="bg-primary hover:bg-primary/80"
                disabled={!newGroupData.name || !newGroupData.description}
                onClick={handleCreateGroup}
              >
                Create Group
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* My Groups Section */}
      {myGroups.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">My Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myGroups.map((group) => (
              <Card key={group.id} className="card-hover">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={group.avatar} alt={group.name} />
                        <AvatarFallback>{group.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {group.name}
                          {group.unreadMessages > 0 && (
                            <Badge className="bg-primary text-primary-foreground">{group.unreadMessages}</Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="line-clamp-1">{group.privacy}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className={`bg-primary/10 text-primary border-primary/20 ${group.avgPnl.startsWith('+') ? 'bg-success/10 text-success border-success/20' : 'bg-destructive/10 text-destructive border-destructive/20'}`}>
                      {group.avgPnl}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{group.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {group.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-muted text-muted-foreground">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-muted-foreground">Members:</span> {group.members}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Trades:</span> {group.trades}
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4 bg-primary hover:bg-primary/80">
                    Enter Group
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Discover Groups Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Discover Groups</h2>
        <Input
          type="text"
          placeholder="Search for trading groups..."
          className="w-full mb-6"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => (
              <Card key={group.id} className="card-hover">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={group.avatar} alt={group.name} />
                        <AvatarFallback>{group.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <CardDescription>{group.privacy}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className={`bg-primary/10 text-primary border-primary/20 ${group.avgPnl.startsWith('+') ? 'bg-success/10 text-success border-success/20' : 'bg-destructive/10 text-destructive border-destructive/20'}`}>
                      {group.avgPnl}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{group.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {group.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-muted text-muted-foreground">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-muted-foreground">Members:</span> {group.members}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Trades:</span> {group.trades}
                    </div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full mt-4"
                        variant={group.privacy === "Private" ? "outline" : "default"}
                        onClick={() => {
                          setSelectedGroup(group);
                          setIsJoinDialogOpen(true);
                        }}
                      >
                        {group.privacy === "Private" ? "Request to Join" : "Join Group"}
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 flex flex-col items-center justify-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground mb-4"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <h3 className="text-xl font-bold mb-2">No Groups Found</h3>
              <p className="text-muted-foreground text-center max-w-md">We couldn't find any trading groups matching your search. Try different keywords or create your own group!</p>
              <Button 
                className="mt-4 bg-primary hover:bg-primary/80"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                Create a Group
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Join Group Dialog */}
      <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Join {selectedGroup?.name}</DialogTitle>
            <DialogDescription>
              {selectedGroup?.privacy === "Private" 
                ? "This is a private group. Your request will need to be approved by the group admin."
                : "You're about to join this trading group"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm mb-4">{selectedGroup?.description}</p>
            
            {selectedGroup?.privacy === "Private" && (
              <div className="space-y-2 mb-4">
                <Label htmlFor="joinMessage">Message to Group Admin (Optional)</Label>
                <Textarea 
                  id="joinMessage" 
                  placeholder="Tell the admin why you want to join this group..."
                />
              </div>
            )}
            
            <div className="rounded-lg bg-muted p-4 mb-4">
              <h4 className="font-semibold mb-2">Group Stats</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Members:</span>
                  <span>{selectedGroup?.members}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Total Trades:</span>
                  <span>{selectedGroup?.trades}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Average PnL:</span>
                  <span className={selectedGroup?.avgPnl.startsWith('+') ? 'text-success' : 'text-destructive'}>{selectedGroup?.avgPnl}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsJoinDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/80"
              onClick={handleJoinGroup}
            >
              {selectedGroup?.privacy === "Private" ? "Submit Request" : "Join Group"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
