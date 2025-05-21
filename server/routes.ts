import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const server = createServer(app);
  
  // Sample API route to test server
  app.get("/api/status", (req, res) => {
    res.json({ status: "API is running" });
  });

  // Basic data routes
  app.get("/api/users", async (req, res) => {
    try {
      const user = await storage.getUser(1);
      res.json([user]);
    } catch (error: any) {
      res.status(500).json({ message: "Error getting users" });
    }
  });
  
  app.get("/api/nfts", async (req, res) => {
    try {
      const nfts = await storage.getAllNfts();
      res.json(nfts);
    } catch (error: any) {
      res.status(500).json({ message: "Error getting NFTs" });
    }
  });
  
  app.get("/api/tokens", async (req, res) => {
    try {
      const tokens = await storage.getAllTokens();
      res.json(tokens);
    } catch (error: any) {
      res.status(500).json({ message: "Error getting tokens" });
    }
  });
  
  app.get("/api/posts", async (req, res) => {
    try {
      const posts = await storage.getAllPosts();
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ message: "Error getting posts" });
    }
  });
  
  app.get("/api/groups", async (req, res) => {
    try {
      const groups = await storage.getAllGroups();
      res.json(groups);
    } catch (error: any) {
      res.status(500).json({ message: "Error getting groups" });
    }
  });

  // Return the server
  return server;
}