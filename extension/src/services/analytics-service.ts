/**
 * Analytics Service
 * Provides comprehensive user analytics: daily/monthly/yearly stats, top sites, top categories
 */

import type { MemoryNode } from "@shared/extension-types";
import { cortexStorage } from "../utils/storage";

export interface DailyStats {
  date: string; // YYYY-MM-DD
  count: number;
}

export interface MonthlyStats {
  month: string; // YYYY-MM
  count: number;
}

export interface YearlyStats {
  year: string; // YYYY
  count: number;
}

export interface TopSite {
  domain: string;
  count: number;
  percentage: number;
  lastVisit: number;
}

export interface TopCategory {
  category: string;
  count: number;
  percentage: number;
}

export interface AnalyticsData {
  daily: DailyStats[];
  monthly: MonthlyStats[];
  yearly: YearlyStats[];
  topSites: TopSite[];
  topCategories: TopCategory[];
  totalPages: number;
  uniqueDomains: number;
  dateRange: {
    start: number;
    end: number;
  };
}

export class AnalyticsService {
  /**
   * Get comprehensive analytics data
   */
  async getAnalytics(): Promise<AnalyticsData> {
    try {
      console.log("AnalyticsService: Starting getAnalytics");
      // Add a reasonable limit to prevent loading all nodes at once (causes timeout)
      // 10k most recent nodes should be enough for analytics
      const allNodes = await cortexStorage.getAllMemoryNodes(10000);
      console.log("AnalyticsService: Loaded", allNodes.length, "nodes");
      
      if (allNodes.length === 0) {
        console.log("AnalyticsService: No nodes found, returning empty analytics");
        return {
          daily: [],
          monthly: [],
          yearly: [],
          topSites: [],
          topCategories: [],
          totalPages: 0,
          uniqueDomains: 0,
          dateRange: { start: Date.now(), end: Date.now() },
        };
      }

    // Sort by timestamp
    const sortedNodes = allNodes.sort((a, b) => a.timestamp - b.timestamp);
    const startTime = sortedNodes[0].timestamp;
    const endTime = sortedNodes[sortedNodes.length - 1].timestamp;

    // Calculate daily stats
    const daily = this.calculateDailyStats(allNodes);
    
    // Calculate monthly stats
    const monthly = this.calculateMonthlyStats(allNodes);
    
    // Calculate yearly stats
    const yearly = this.calculateYearlyStats(allNodes);
    
    // Calculate top sites
    const topSites = this.calculateTopSites(allNodes);
    
    // Calculate top categories
    const topCategories = this.calculateTopCategories(allNodes);

    const uniqueDomains = new Set(allNodes.map(n => n.metadata.domain)).size;

    console.log("AnalyticsService: Calculated analytics:", {
      daily: daily.length,
      monthly: monthly.length,
      yearly: yearly.length,
      topSites: topSites.length,
      topCategories: topCategories.length,
      totalPages: allNodes.length
    });

    return {
      daily,
      monthly,
      yearly,
      topSites,
      topCategories,
      totalPages: allNodes.length,
      uniqueDomains,
      dateRange: { start: startTime, end: endTime },
    };
    } catch (error) {
      console.error("AnalyticsService: Error getting analytics:", error);
      throw error;
    }
  }

  private calculateDailyStats(nodes: MemoryNode[]): DailyStats[] {
    const dailyMap = new Map<string, number>();
    
    nodes.forEach((node) => {
      const date = new Date(node.timestamp);
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      dailyMap.set(dateStr, (dailyMap.get(dateStr) || 0) + 1);
    });

    return Array.from(dailyMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  private calculateMonthlyStats(nodes: MemoryNode[]): MonthlyStats[] {
    const monthlyMap = new Map<string, number>();
    
    nodes.forEach((node) => {
      const date = new Date(node.timestamp);
      const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyMap.set(monthStr, (monthlyMap.get(monthStr) || 0) + 1);
    });

    return Array.from(monthlyMap.entries())
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }

  private calculateYearlyStats(nodes: MemoryNode[]): YearlyStats[] {
    const yearlyMap = new Map<string, number>();
    
    nodes.forEach((node) => {
      const yearStr = String(new Date(node.timestamp).getFullYear());
      yearlyMap.set(yearStr, (yearlyMap.get(yearStr) || 0) + 1);
    });

    return Array.from(yearlyMap.entries())
      .map(([year, count]) => ({ year, count }))
      .sort((a, b) => a.year.localeCompare(b.year));
  }

  private calculateTopSites(nodes: MemoryNode[]): TopSite[] {
    const domainMap = new Map<string, { count: number; lastVisit: number }>();
    
    nodes.forEach((node) => {
      const domain = node.metadata.domain;
      const existing = domainMap.get(domain) || { count: 0, lastVisit: 0 };
      domainMap.set(domain, {
        count: existing.count + 1,
        lastVisit: Math.max(existing.lastVisit, node.timestamp),
      });
    });

    const total = nodes.length;
    
    return Array.from(domainMap.entries())
      .map(([domain, data]) => ({
        domain,
        count: data.count,
        percentage: (data.count / total) * 100,
        lastVisit: data.lastVisit,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
  }

  private calculateTopCategories(nodes: MemoryNode[]): TopCategory[] {
    // Import category function from Dashboard (we'll need to share this logic)
    // For now, use a simple domain-based categorization
    const categoryMap = new Map<string, number>();
    
    nodes.forEach((node) => {
      const category = this.categorizeDomain(node.metadata.domain);
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    });

    const total = nodes.length;
    
    return Array.from(categoryMap.entries())
      .map(([category, count]) => ({
        category,
        count,
        percentage: (count / total) * 100,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);
  }

  private categorizeDomain(domain: string): string {
    const domainLower = domain.toLowerCase();
    
    // Priority order matters - check more specific categories first
    // Coding practice sites (check FIRST to avoid misclassification)
    if (domainLower.includes("leetcode") || domainLower.includes("hackerrank") || 
        domainLower.includes("codeforces") || domainLower.includes("codewars") ||
        domainLower.includes("atcoder") || domainLower.includes("topcoder") ||
        domainLower.includes("spoj") || domainLower.includes("projecteuler") ||
        domainLower.includes("codechef")) {
      return "Coding Practice";
    }
    // Developer tools
    if (domainLower.includes("github") || domainLower.includes("gitlab") || 
        domainLower.includes("stackoverflow") || domainLower.includes("cursor") ||
        domainLower.includes("vscode")) {
      return "Developer Tools";
    }
    // AI tools
    if (domainLower.includes("gemini") || domainLower.includes("claude") || 
        domainLower.includes("chatgpt") || domainLower.includes("openai") ||
        domainLower.includes("anthropic") || domainLower.includes("perplexity")) {
      return "AI Tools";
    }
    // Technical documentation
    if (domainLower.includes("docs.") || domainLower.includes("developer.") ||
        domainLower.includes("learn.") || domainLower.includes("api.")) {
      return "Technical Documentation";
    }
    // Job search
    if (domainLower.includes("linkedin") || domainLower.includes("indeed") ||
        domainLower.includes("glassdoor") || domainLower.includes("naukri")) {
      return "Job Search";
    }
    // Shopping
    if (domainLower.includes("amazon") || domainLower.includes("ebay") || 
        domainLower.includes("flipkart") || domainLower.includes("walmart")) {
      return "Shopping";
    }
    // Entertainment (check later to avoid false positives)
    if (domainLower.includes("youtube") || domainLower.includes("netflix") || 
        domainLower.includes("spotify") || domainLower.includes("twitch") ||
        domainLower.includes("hulu") || domainLower.includes("disneyplus")) {
      return "Entertainment";
    }
    
    return "Other";
  }
}

export const analyticsService = new AnalyticsService();

