import { Button } from "@/components/ui/button";
import { useState } from "react";
import TradeModal from "@/components/trade/TradeModal";

interface CoinRowProps {
  name: string;
  symbol: string;
  price: string;
  change: string;
  marketCap: string;
  emoji: string;
}

export default function CoinRow({ name, symbol, price, change, marketCap, emoji }: CoinRowProps) {
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const isPositive = change.startsWith('+');
  
  return (
    <>
      <tr className="hover:bg-muted transition-colors">
        <td className="px-4 py-3 whitespace-nowrap">
          <div className="flex items-center">
            <div className={`h-8 w-8 rounded-full ${isPositive ? 'bg-accent' : 'bg-destructive'} flex items-center justify-center mr-3`}>
              <span className="text-xs">{emoji}</span>
            </div>
            <div>
              <div className="font-medium">{name}</div>
              <div className="text-xs text-muted-foreground">${symbol}</div>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-right font-mono">
          {price} SUI
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-right">
          <span className={isPositive ? 'text-success' : 'text-destructive'}>{change}</span>
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-right font-mono">
          {marketCap} SUI
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-right">
          <Button 
            className="neon-btn bg-primary hover:bg-primary/80 px-3 py-1 rounded-full text-sm h-auto"
            onClick={() => setIsTradeModalOpen(true)}
          >
            Trade
          </Button>
        </td>
      </tr>
      
      <TradeModal 
        isOpen={isTradeModalOpen} 
        onClose={() => setIsTradeModalOpen(false)} 
        coin={{
          name,
          symbol,
          price,
          change,
          emoji
        }}
      />
    </>
  );
}
