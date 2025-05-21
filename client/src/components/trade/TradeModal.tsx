import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  coin?: {
    name: string;
    symbol: string;
    price: string;
    change: string;
    emoji: string;
  };
}

export default function TradeModal({ isOpen, onClose, coin }: TradeModalProps) {
  const [amount, setAmount] = useState("10.0");
  const [receiveAmount, setReceiveAmount] = useState("2,617.8");
  
  if (!coin) {
    coin = {
      name: "BULLISH",
      symbol: "BULL",
      price: "0.00382",
      change: "+24.6%",
      emoji: "🚀"
    };
  }
  
  const isPositiveChange = coin.change.startsWith('+');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border border-muted">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Trade ${coin.symbol}</DialogTitle>
        </DialogHeader>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center mr-3">
                <span className="text-sm">{coin.emoji}</span>
              </div>
              <div>
                <div className="font-medium">{coin.name}</div>
                <div className="text-xs text-muted-foreground">${coin.symbol}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium font-mono">{coin.price} SUI</div>
              <div className={`text-xs ${isPositiveChange ? 'text-success' : 'text-destructive'}`}>{coin.change} (24h)</div>
            </div>
          </div>
          
          <div className="bg-muted rounded-xl p-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground text-sm">Amount</span>
              <span className="text-xs text-muted-foreground">Balance: <span className="font-mono">245.87 SUI</span></span>
            </div>
            <div className="flex items-center bg-background rounded-lg p-2">
              <Input
                type="text"
                className="bg-transparent border-none outline-none text-foreground flex-1 font-mono text-lg"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <span className="text-muted-foreground font-medium">SUI</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-muted-foreground text-xs">≈ $4.20 USD</span>
              <button className="text-primary text-xs">MAX</button>
            </div>
          </div>
          
          <div className="bg-muted rounded-xl p-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground text-sm">You will receive (estimated)</span>
            </div>
            <div className="flex items-center bg-background rounded-lg p-2">
              <Input
                type="text"
                className="bg-transparent border-none outline-none text-foreground flex-1 font-mono text-lg"
                placeholder="0.00"
                value={receiveAmount}
                readOnly
              />
              <span className="text-muted-foreground font-medium">{coin.symbol}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-muted-foreground text-xs">1 {coin.symbol} ≈ {coin.price} SUI</span>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Slippage Tolerance</span>
              <span className="font-medium">1.0%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Network Fee</span>
              <span className="font-mono">0.000421 SUI</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Route</span>
              <span className="font-medium">SUI → {coin.symbol}</span>
            </div>
          </div>
        </div>
        
        <Button className="neon-btn w-full bg-primary hover:bg-primary/80 py-6 rounded-xl font-medium text-primary-foreground transition-all">
          Confirm Trade
        </Button>
        
        <div className="mt-4 text-center text-xs text-muted-foreground">
          By confirming this trade, you agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a>.
        </div>
      </DialogContent>
    </Dialog>
  );
}
