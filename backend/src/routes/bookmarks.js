import express from 'express';
import fetch from 'node-fetch';
import { requireAuth } from '../middleware/auth.js';
import Bookmark from '../model/bookmarks.js';

const router = express.Router();

// List all bookmarks for logged‑in user
router.get('/', requireAuth, async (req, res) => {
  const list = await Bookmark.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(list);
});

// Add a new bookmark
router.post('/', requireAuth, async (req, res) => {
  try {
    const { url } = req.body;

    // Fetch page HTML
    const pageResp = await fetch(url);
    const html = await pageResp.text();

    // Extract <title>
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : url;

    // Infer favicon
    const favicon = new URL('/favicon.ico', url).href;

    // Generate summary via Jina AI Reader API
    // Option 1: Use the direct Reader API (simpler, no auth needed)
    const readerUrl = `https://r.jina.ai/${encodeURIComponent(url)}`;
    const summaryResp = await fetch(readerUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.JINA_API_KEY}`,
        'Accept': 'application/json',
        'X-With-Generated-Alt': 'true', // Optional: include image descriptions
        'X-With-Links-Summary': 'true', // Optional: include links summary
        'X-With-Images-Summary': 'true' // Optional: include images summary
      }
    });

    if (!summaryResp.ok) {
      throw new Error(`Jina API error: ${summaryResp.status} ${summaryResp.statusText}`);
    }

    const summaryData = await summaryResp.json(); // Parse as JSON
    console.log('Jina Reader API response:', JSON.stringify(summaryData, null, 2)); // Pretty print for easier inspection

    // Try to extract summary string from the response (prefer summary, then description, then a snippet from content)
    let summary = summaryData.data?.summary;
    if (!summary) {
      summary = summaryData.data?.description;
    }
    if (!summary) {
      // Fallback: take the first 2 sentences from content
      const content = summaryData.data?.content;
      if (content) {
        const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
        summary = sentences.slice(0, 2).join('. ') + (sentences.length > 2 ? '.' : '');
      }
    }
    if (!summary) {
      summary = 'No summary available';
    }

    // Save to DB
    const bm = await Bookmark.create({
      user: req.userId,
      url,
      title,
      favicon,
      summary
    });

    res.status(201).json(bm);
  } catch (err) {
    console.error('Error creating bookmark:', err);
    res.status(500).json({ error: 'Failed to save bookmark' });
  }
});

export default router;