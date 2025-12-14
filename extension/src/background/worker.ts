/**
 * Cortex Background Service Worker
 * 
 * Handles messages from content scripts and web dashboard.
 * Manages IndexedDB operations and coordinates with web workers.
 */

import type { ExtensionMessage, PageContext, MemoryNode } from "@shared/extension-types";
import { generateMemoryId } from "@client/lib/text-utils";

interface MessageHandler {
  [key: string]: (message: ExtensionMessage) => Promise<unknown>;
}

/**
 * Initialize message handler
 */
function initializeMessageHandler() {
  const handlers: MessageHandler = {
    async PAGE_CAPTURED(message: ExtensionMessage) {
      if (message.type !== "PAGE_CAPTURED") return;

      const pageContext = message.payload as PageContext;

      // Check if capture is enabled
      const settings = await chrome.storage.local.get("captureSettings");
      if (!settings.captureSettings?.enabled) {
        return { success: false, reason: "Capture disabled" };
      }

      // Check exclusion rules
      if (await isPageExcluded(pageContext)) {
        return { success: false, reason: "Page excluded by privacy rules" };
      }

      // Create memory node
      const memoryNode: MemoryNode = {
        id: generateMemoryId(pageContext.url, pageContext.timestamp),
        url: pageContext.url,
        title: pageContext.title,
        readableText: pageContext.readableText,
        timestamp: pageContext.timestamp,
        keywords: [],
        metadata: {
          domain: pageContext.url.split("/")[2] || "",
          favicon: pageContext.favicon,
          tabId: pageContext.tabId,
          sessionId: pageContext.sessionId,
        },
      };

      // Store in IndexedDB
      await storeMemoryNode(memoryNode);

      // Trigger embedding generation in web worker
      generateEmbedding(memoryNode);

      return { success: true, memoryId: memoryNode.id };
    },

    async SEARCH_MEMORY(message: ExtensionMessage) {
      if (message.type !== "SEARCH_MEMORY") return;

      const { query, limit = 10 } = message.payload;
      const results = await searchMemory(query, limit);

      return { success: true, results };
    },

    async GET_SUGGESTIONS(message: ExtensionMessage) {
      if (message.type !== "GET_SUGGESTIONS") return;

      const { currentUrl, limit = 5 } = message.payload;
      const suggestions = await getSuggestions(currentUrl, limit);

      return { success: true, suggestions };
    },

    async FORGET_DATA(message: ExtensionMessage) {
      if (message.type !== "FORGET_DATA") return;

      const { ruleId } = message.payload;
      const deleted = await applyForgetRule(ruleId);

      return { success: true, deleted };
    },

    async EXPORT_MEMORY() {
      const allMemory = await getAllMemory();
      return {
        success: true,
        data: allMemory,
        exportedAt: new Date().toISOString(),
      };
    },

    async UPDATE_CAPTURE_SETTINGS(message: ExtensionMessage) {
      if (message.type !== "UPDATE_CAPTURE_SETTINGS") return;

      const newSettings = message.payload;
      const current = await chrome.storage.local.get("captureSettings");

      await chrome.storage.local.set({
        captureSettings: {
          ...current.captureSettings,
          ...newSettings,
        },
      });

      return { success: true };
    },
  };

  chrome.runtime.onMessage.addListener((message: ExtensionMessage, sender, sendResponse) => {
    const handler = handlers[message.type];
    if (handler) {
      handler(message)
        .then((response) => {
          sendResponse(response);
        })
        .catch((error) => {
          console.error("Cortex: Message handler error", error);
          sendResponse({ success: false, error: error.message });
        });

      return true; // Keep channel open for async response
    }
  });
}

/**
 * Check if page should be excluded from capture
 */
async function isPageExcluded(pageContext: PageContext): Promise<boolean> {
  const settings = await chrome.storage.local.get("captureSettings");
  const captureSettings = settings.captureSettings || {};

  // Check excluded domains
  if (captureSettings.excludeDomains?.includes(pageContext.url.split("/")[2])) {
    return true;
  }

  // Check excluded keywords
  if (captureSettings.excludeKeywords) {
    const excludedKeywords = captureSettings.excludeKeywords as string[];
    const textLower = pageContext.readableText.toLowerCase();
    for (const keyword of excludedKeywords) {
      if (textLower.includes(keyword.toLowerCase())) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Store memory node in IndexedDB
 */
async function storeMemoryNode(node: MemoryNode): Promise<string> {
  // This would interact with IndexedDB via a dedicated storage module
  // For now, using chrome.storage as fallback
  const key = `memory:${node.id}`;
  await chrome.storage.local.set({ [key]: node });
  return node.id;
}

/**
 * Generate embedding for memory node
 */
async function generateEmbedding(node: MemoryNode) {
  // In production, this would spawn a Web Worker
  // that uses WASM embedding model (onnxruntime-web or ggml-wasm)
  console.log("Cortex: Would generate embedding for", node.id);
}

/**
 * Search memory
 */
async function searchMemory(query: string, limit: number): Promise<MemoryNode[]> {
  // This would query IndexedDB with vector similarity
  console.log("Cortex: Searching memory for", query);
  return [];
}

/**
 * Get suggestions for current page
 */
async function getSuggestions(currentUrl: string, limit: number): Promise<MemoryNode[]> {
  // This would find related pages based on semantic similarity
  console.log("Cortex: Getting suggestions for", currentUrl);
  return [];
}

/**
 * Apply forget rule
 */
async function applyForgetRule(ruleId: string): Promise<number> {
  // This would apply a privacy rule to delete matching data
  console.log("Cortex: Applying forget rule", ruleId);
  return 0;
}

/**
 * Get all memory
 */
async function getAllMemory(): Promise<MemoryNode[]> {
  // This would retrieve all stored memory nodes
  console.log("Cortex: Exporting all memory");
  return [];
}

// Initialize on extension load
initializeMessageHandler();

console.log("Cortex: Service worker initialized");
