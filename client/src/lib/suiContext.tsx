import React, { createContext, useContext, useState, useEffect } from 'react';
import { SuiClient } from '@mysten/sui.js/client';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { TransactionBlock } from '@mysten/sui.js/transactions';

// Define the network
export const SUI_NETWORK = 'https://fullnode.devnet.sui.io';

// Type definitions
interface SuiContextType {
  provider: SuiClient | null;
  connected: boolean;
  connecting: boolean;
  address: string | null;
  balance: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  sendSui: (recipient: string, amount: number) => Promise<string | null>;
  refreshBalance: () => Promise<void>;
  error: string | null;
}

// Create context with default values
const SuiContext = createContext<SuiContextType>({
  provider: null,
  connected: false,
  connecting: false,
  address: null,
  balance: '0',
  connectWallet: async () => {},
  disconnectWallet: () => {},
  sendSui: async () => null,
  refreshBalance: async () => {},
  error: null,
});

// Custom hook to use the Sui context
export const useSui = () => useContext(SuiContext);

export const SuiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [provider, setProvider] = useState<SuiClient | null>(null);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState('0');
  const [keypair, setKeypair] = useState<Ed25519Keypair | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize provider
  useEffect(() => {
    // Create a provider for the Sui network
    const provider = new SuiClient({ url: SUI_NETWORK });
    setProvider(provider);

    // Check local storage for saved wallet
    const savedAddress = localStorage.getItem('suiWalletAddress');
    const savedKeypair = localStorage.getItem('suiWalletKeypair');
    
    if (savedAddress && savedKeypair) {
      try {
        const keyData = JSON.parse(savedKeypair);
        const restoredKeypair = Ed25519Keypair.fromSecretKey(new Uint8Array(keyData));
        setKeypair(restoredKeypair);
        setAddress(savedAddress);
        setConnected(true);
      } catch (e) {
        console.error("Failed to restore wallet:", e);
        localStorage.removeItem('suiWalletAddress');
        localStorage.removeItem('suiWalletKeypair');
      }
    }
  }, []);

  // Load balance whenever address changes
  useEffect(() => {
    if (address && provider) {
      refreshBalance();
    }
  }, [address, provider]);

  // Refresh wallet balance
  const refreshBalance = async () => {
    if (!provider || !address) return;
    
    try {
      const balanceResponse = await provider.getBalance({
        owner: address,
      });
      
      // Convert from MIST to SUI (1 SUI = 10^9 MIST)
      const totalBalance = balanceResponse.totalBalance;
      const balanceInSui = Number(totalBalance) / 10**9;
      setBalance(balanceInSui.toFixed(4));
    } catch (e) {
      console.error("Failed to get balance:", e);
      setError("Failed to get balance");
    }
  };

  // Connect wallet function
  const connectWallet = async () => {
    if (connecting || connected) return;
    
    setConnecting(true);
    setError(null);
    
    try {
      // Generate a new keypair for this session
      const newKeypair = new Ed25519Keypair();
      const newAddress = newKeypair.getPublicKey().toSuiAddress();
      
      // Save to state
      setKeypair(newKeypair);
      setAddress(newAddress);
      setConnected(true);
      
      // Save to localStorage (for demo purposes - not secure for production)
      localStorage.setItem('suiWalletAddress', newAddress);
      localStorage.setItem('suiWalletKeypair', JSON.stringify(Array.from(newKeypair.export().privateKey)));
      
      // Request test tokens if on devnet
      if (SUI_NETWORK.includes('devnet')) {
        try {
          // Actually request tokens from Sui devnet faucet using v2 endpoint
          const faucetResponse = await fetch('https://faucet.devnet.sui.io/v2/gas', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              recipient: newAddress,
            })
          });
          
          if (faucetResponse.ok) {
            console.log("Successfully requested test tokens from faucet");
          } else {
            const errorData = await faucetResponse.json();
            console.error("Faucet request failed:", errorData);
          }
        } catch (e) {
          console.error("Failed to request test tokens:", e);
        }
      }
    } catch (e) {
      console.error("Failed to connect wallet:", e);
      setError("Failed to connect wallet");
    } finally {
      setConnecting(false);
    }
  };

  // Disconnect wallet function
  const disconnectWallet = () => {
    setKeypair(null);
    setAddress(null);
    setConnected(false);
    setBalance('0');
    localStorage.removeItem('suiWalletAddress');
    localStorage.removeItem('suiWalletKeypair');
  };

  // Send SUI function
  const sendSui = async (recipient: string, amount: number): Promise<string | null> => {
    if (!provider || !keypair || !address) {
      setError("Wallet not connected");
      return null;
    }

    try {
      // Convert SUI to MIST (1 SUI = 10^9 MIST)
      const amountInMist = BigInt(Math.floor(amount * 10**9));
      
      // Create a transaction block
      const tx = new TransactionBlock();
      
      // Add a transfer operation
      tx.transferObjects([
        tx.splitCoins(tx.gas, [tx.pure(amountInMist)]),
      ], tx.pure(recipient));
      
      // Sign and execute the transaction
      const result = await provider.signAndExecuteTransactionBlock({
        signer: keypair,
        transactionBlock: tx,
      });
      
      // Refresh balance after transfer
      await refreshBalance();
      
      return result.digest;
    } catch (e) {
      console.error("Failed to send SUI:", e);
      setError(`Failed to send SUI: ${e instanceof Error ? e.message : String(e)}`);
      return null;
    }
  };

  // Context value
  const value = {
    provider,
    connected,
    connecting,
    address,
    balance,
    connectWallet,
    disconnectWallet,
    sendSui,
    refreshBalance,
    error,
  };

  return (
    <SuiContext.Provider value={value}>
      {children}
    </SuiContext.Provider>
  );
};