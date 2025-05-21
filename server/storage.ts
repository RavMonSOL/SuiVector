import { 
  users, type User, type InsertUser,
  nfts, type Nft, type InsertNft,
  tokens, type Token, type InsertToken,
  posts, type Post, type InsertPost,
  groups, type Group, type InsertGroup,
  groupMembers, type GroupMember, type InsertGroupMember
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // NFT operations
  getNft(id: number): Promise<Nft | undefined>;
  getAllNfts(): Promise<Nft[]>;
  getNftsByOwner(ownerId: number): Promise<Nft[]>;
  createNft(nft: InsertNft): Promise<Nft>;
  
  // Token operations
  getToken(id: number): Promise<Token | undefined>;
  getAllTokens(): Promise<Token[]>;
  createToken(token: InsertToken): Promise<Token>;
  
  // Post operations
  getPost(id: number): Promise<Post | undefined>;
  getAllPosts(): Promise<Post[]>;
  getPostsByUser(userId: number): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  
  // Group operations
  getGroup(id: number): Promise<Group | undefined>;
  getAllGroups(): Promise<Group[]>;
  getGroupsByUser(userId: number): Promise<Group[]>;
  createGroup(group: InsertGroup): Promise<Group>;
  
  // Group member operations
  getGroupMember(groupId: number, userId: number): Promise<GroupMember | undefined>;
  getGroupMembers(groupId: number): Promise<GroupMember[]>;
  addGroupMember(member: InsertGroupMember): Promise<GroupMember>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private nfts: Map<number, Nft>;
  private tokens: Map<number, Token>;
  private posts: Map<number, Post>;
  private groups: Map<number, Group>;
  private groupMembers: Map<string, GroupMember>;
  
  private userId: number;
  private nftId: number;
  private tokenId: number;
  private postId: number;
  private groupId: number;
  private groupMemberId: number;

  constructor() {
    this.users = new Map();
    this.nfts = new Map();
    this.tokens = new Map();
    this.posts = new Map();
    this.groups = new Map();
    this.groupMembers = new Map();
    
    this.userId = 1;
    this.nftId = 1;
    this.tokenId = 1;
    this.postId = 1;
    this.groupId = 1;
    this.groupMemberId = 1;
    
    // Initialize with some sample data
    this.initSampleData();
  }

  private initSampleData() {
    // Add a sample user
    this.createUser({
      username: "demo_user",
      password: "password123",
      profilePicture: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      bio: "SuiVector enthusiast",
      walletAddress: "0x123456789abcdef"
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }

  // NFT operations
  async getNft(id: number): Promise<Nft | undefined> {
    return this.nfts.get(id);
  }

  async getAllNfts(): Promise<Nft[]> {
    return Array.from(this.nfts.values());
  }

  async getNftsByOwner(ownerId: number): Promise<Nft[]> {
    return Array.from(this.nfts.values()).filter(
      (nft) => nft.owner === ownerId
    );
  }

  async createNft(insertNft: InsertNft): Promise<Nft> {
    const id = this.nftId++;
    const createdAt = new Date();
    const nft: Nft = { ...insertNft, id, createdAt, likes: 0 };
    this.nfts.set(id, nft);
    return nft;
  }

  // Token operations
  async getToken(id: number): Promise<Token | undefined> {
    return this.tokens.get(id);
  }

  async getAllTokens(): Promise<Token[]> {
    return Array.from(this.tokens.values());
  }

  async createToken(insertToken: InsertToken): Promise<Token> {
    const id = this.tokenId++;
    const createdAt = new Date();
    const token: Token = { ...insertToken, id, createdAt };
    this.tokens.set(id, token);
    return token;
  }

  // Post operations
  async getPost(id: number): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async getAllPosts(): Promise<Post[]> {
    return Array.from(this.posts.values());
  }

  async getPostsByUser(userId: number): Promise<Post[]> {
    return Array.from(this.posts.values()).filter(
      (post) => post.userId === userId
    );
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = this.postId++;
    const createdAt = new Date();
    const post: Post = { 
      ...insertPost, 
      id, 
      createdAt, 
      likes: 0, 
      comments: 0, 
      shares: 0 
    };
    this.posts.set(id, post);
    return post;
  }

  // Group operations
  async getGroup(id: number): Promise<Group | undefined> {
    return this.groups.get(id);
  }

  async getAllGroups(): Promise<Group[]> {
    return Array.from(this.groups.values());
  }

  async getGroupsByUser(userId: number): Promise<Group[]> {
    const memberGroupIds = Array.from(this.groupMembers.values())
      .filter(member => member.userId === userId)
      .map(member => member.groupId);
    
    return Array.from(this.groups.values()).filter(
      group => memberGroupIds.includes(group.id) || group.creatorId === userId
    );
  }

  async createGroup(insertGroup: InsertGroup): Promise<Group> {
    const id = this.groupId++;
    const createdAt = new Date();
    const group: Group = { 
      ...insertGroup, 
      id, 
      createdAt, 
      members: 1, // Creator is the first member
      trades: 0,
      avgPnl: "+0.0%" 
    };
    this.groups.set(id, group);
    
    // Add creator as a member and admin
    await this.addGroupMember({
      groupId: id,
      userId: insertGroup.creatorId,
      isAdmin: true
    });
    
    return group;
  }

  // Group member operations
  async getGroupMember(groupId: number, userId: number): Promise<GroupMember | undefined> {
    const key = `${groupId}-${userId}`;
    return this.groupMembers.get(key);
  }

  async getGroupMembers(groupId: number): Promise<GroupMember[]> {
    return Array.from(this.groupMembers.values()).filter(
      member => member.groupId === groupId
    );
  }

  async addGroupMember(insertMember: InsertGroupMember): Promise<GroupMember> {
    const id = this.groupMemberId++;
    const joinedAt = new Date();
    const member: GroupMember = { ...insertMember, id, joinedAt };
    
    const key = `${insertMember.groupId}-${insertMember.userId}`;
    this.groupMembers.set(key, member);
    
    // Update group member count
    const group = await this.getGroup(insertMember.groupId);
    if (group) {
      group.members++;
      this.groups.set(group.id, group);
    }
    
    return member;
  }
}

export const storage = new MemStorage();
