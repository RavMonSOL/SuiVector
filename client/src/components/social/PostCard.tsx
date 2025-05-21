import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Trade {
  action: string;
  amount: string;
  symbol: string;
  pnl: string;
  isPnlPositive: boolean;
}

interface Token {
  name: string;
  symbol: string;
  emoji: string;
  price: string;
  change: string;
  isPositive: boolean;
}

interface PostCardProps {
  avatar: string;
  username: string;
  handle: string;
  timeAgo: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  nftImage?: string;
  nftName?: string;
  trade?: Trade;
  token?: Token;
}

export default function PostCard({ 
  avatar, 
  username, 
  handle, 
  timeAgo, 
  content, 
  likes, 
  comments, 
  shares,
  nftImage,
  nftName,
  trade,
  token
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
    }
  };

  return (
    <Card className="bg-card rounded-xl border border-muted">
      <CardContent className="p-4">
        <div className="flex items-start">
          <Avatar className="w-10 h-10 mr-3">
            <AvatarImage src={avatar} alt={username} />
            <AvatarFallback>{username.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">{username}</span>
                <span className="text-muted-foreground text-xs ml-2">{handle}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-muted-foreground">{timeAgo}</span>
                <button className="ml-2 text-muted-foreground hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-horizontal"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                </button>
              </div>
            </div>
            
            <div className="mt-2">
              <p className="text-sm">{content}</p>
              
              {nftImage && (
                <div className="mt-3">
                  <img src={nftImage} alt={nftName} className="rounded-lg w-full h-auto" />
                </div>
              )}
              
              {(token || trade) && (
                <div className="mt-3 p-3 bg-muted rounded-lg border border-muted">
                  {token && (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center mr-2">
                            <span className="text-xs">{token.emoji}</span>
                          </div>
                          <div>
                            <div className="font-medium">{token.name}</div>
                            <div className="text-xs text-muted-foreground">${token.symbol}</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`${token.isPositive ? 'text-success' : 'text-destructive'} font-medium`}>{token.change}</div>
                        <div className="text-xs font-mono">{token.price} SUI</div>
                      </div>
                    </div>
                  )}
                  
                  {nftName && !token && (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{nftName}</div>
                        <div className="text-xs text-muted-foreground">Purchased from @cyber_artist</div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="font-medium">6.9 SUI</div>
                      </div>
                    </div>
                  )}
                  
                  {trade && (
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-muted text-xs text-muted-foreground">
                      <div>Trade: <span className="font-mono">{trade.action} {trade.amount} ${trade.symbol}</span></div>
                      <div className={`${trade.isPnlPositive ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'} rounded-full px-2 py-0.5`}>
                        PnL: {trade.pnl} SUI
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-5">
                  <button 
                    className={`flex items-center ${isLiked ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                    onClick={handleLike}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                    <span className="text-xs">{likesCount}</span>
                  </button>
                  <button className="flex items-center text-muted-foreground hover:text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    <span className="text-xs">{comments}</span>
                  </button>
                  <button className="flex items-center text-muted-foreground hover:text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M3 15v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                    <span className="text-xs">{shares}</span>
                  </button>
                </div>
                <Button className="neon-btn bg-primary hover:bg-primary/80 px-3 py-1 rounded-full text-xs font-medium h-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg> Follow
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
