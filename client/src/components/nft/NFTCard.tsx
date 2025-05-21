import { Card, CardContent } from "@/components/ui/card";

interface NFTCardProps {
  image: string;
  name: string;
  creator: string;
  creatorAvatar: string;
  price: string;
  likes: number;
  onClick?: () => void;
}

export default function NFTCard({ 
  image, 
  name, 
  creator, 
  creatorAvatar, 
  price, 
  likes,
  onClick
}: NFTCardProps) {
  return (
    <Card 
      className="card-hover rounded-xl overflow-hidden bg-card border border-muted cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-square w-full overflow-hidden relative">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-background/70 rounded-full px-2 py-0.5 text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-destructive mr-1 inline-block"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          {likes}
        </div>
      </div>
      <CardContent className="p-3">
        <h3 className="font-medium text-sm truncate">{name}</h3>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <img src={creatorAvatar} alt={`${creator} avatar`} className="w-5 h-5 rounded-full mr-1" />
            <span className="text-xs text-muted-foreground">@{creator}</span>
          </div>
          <div className="text-xs font-mono font-medium">
            <span className="text-secondary">{price} SUI</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
