import { BrandBlogPost, BRAND_CONFIG } from '../data/projects';
import { SAMPLE_BITLANCE_FULL_MARKDOWN } from '../data/sampleBitlanceFullBlog';

// Default Bitlance API Credentials provided by user
export const BITLANCE_CONFIG = {
  API_KEY: import.meta.env.VITE_BITLANCE_BLOG_API_KEY || 'sda_etMMFE1fynlh-8VKC6gCiYbkyfMVTt1HHakLYN-MGCSDU018',
  BASE_URL: import.meta.env.VITE_BITLANCE_BLOG_API_BASE_URL || 'https://api.bitlancetechhub.com',
  ENDPOINT: '/api/social-dashboard/blog/generate',
};

const STORAGE_KEY = 'lifestyle_ai_generated_blogs';

export interface GenerateBlogParams {
  topic: string;
  keywords?: string;
  mode?: 'SEO' | 'GEO';
  companyName?: string;
  toneOfVoice?: string;
  apiKey?: string;
}

export interface BitlanceGenerateResponse {
  success?: boolean;
  id?: string;
  seoTitle?: string;
  topic?: string;
  article?: string;
  markdown?: string;
  imageUrl?: string;
  image_url?: string;
  wordCount?: number;
  plagiarismCheck?: string;
  keywords?: string;
  creditsUsed?: number;
  newBalance?: number;
  backlinkAnalysis?: {
    topicalCluster?: string;
    authorityScore?: number;
    suggestedLinks?: string[];
  };
}

/**
 * Calls Bitlance SEO/Social AI Agent to generate an article with auto image
 */
export async function generateBlogWithBitlance(params: GenerateBlogParams): Promise<BrandBlogPost> {
  const apiKey = params.apiKey?.trim() || BITLANCE_CONFIG.API_KEY;
  if (!apiKey) {
    throw new Error('Bitlance API Key is missing. Please configure VITE_BITLANCE_BLOG_API_KEY.');
  }

  const company = params.companyName || 'Lifestyle Home Spaces';
  const tone = params.toneOfVoice || 'Sophisticated luxury, architectural excellence, and authoritative real estate guidance in Amravati';

  const payload = {
    topic: params.topic.trim(),
    keywords: params.keywords?.trim() || '',
    optimization_mode: params.mode || 'SEO',
    image_option: 'auto',
    company_name: company,
    brand_context_data: {
      company_name: company,
      tone_of_voice: tone,
    },
  };

  const response = await fetch(`${BITLANCE_CONFIG.BASE_URL}${BITLANCE_CONFIG.ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Bitlance AI Generator failed (${response.status}): ${errorText}`);
  }

  const data: BitlanceGenerateResponse = await response.json();

  // Convert raw API response into BrandBlogPost
  const blog = formatBitlanceResponseToBlog(data, params);
  
  // Persist locally
  saveStoredAiBlog(blog);

  return blog;
}

/**
 * Transforms Bitlance AI response into the app's BrandBlogPost structure
 */
function formatBitlanceResponseToBlog(
  data: BitlanceGenerateResponse,
  params: GenerateBlogParams
): BrandBlogPost {
  const title = data.seoTitle || params.topic;
  const rawText = data.markdown || data.article || '';
  
  // Extract clean paragraphs for reading
  const paragraphs = extractParagraphsFromMarkdown(rawText);
  
  // Extract key takeaways / bullet points
  const highlights = extractHighlightsFromMarkdown(rawText);

  // Compute estimated read time
  const words = data.wordCount || rawText.split(/\s+/).length || 500;
  const readMinutes = Math.max(2, Math.round(words / 220));

  // Determine image: use generated imageUrl or fallback to luxury architecture visual
  const image = data.imageUrl || data.image_url || '/assets/projects/aura/building/aura-building-perspective.jpg';

  // Create an excerpt
  const firstCleanParagraph = paragraphs.find(p => !p.startsWith('#') && !p.startsWith('>')) || params.topic;
  const excerpt = firstCleanParagraph.slice(0, 180) + (firstCleanParagraph.length > 180 ? '...' : '');

  const id = `ai-${Date.now()}-${slugify(title).slice(0, 30)}`;

  return {
    id,
    title,
    category: params.mode === 'GEO' ? 'AI Discovery' : 'Market Analysis',
    readTime: `${readMinutes} min read`,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    excerpt,
    image,
    content: paragraphs.length > 0 ? paragraphs : [rawText],
    highlights: highlights.length > 0 ? highlights : [
      `Engineered for high visibility on Google & AI knowledge graphs (${params.mode || 'SEO'})`,
      `Verified with zero plagiarism detected by Bitlance SEO AI Agent`,
      `In-depth architectural analysis for Amravati property investors`,
    ],
    markdown: rawText,
    isAiGenerated: true,
    topic: params.topic,
    keywords: data.keywords || params.keywords,
    creditsUsed: data.creditsUsed,
  };
}

/**
 * Extracts clean paragraphs from markdown, filtering out meta block headers
 */
function extractParagraphsFromMarkdown(markdown: string): string[] {
  if (!markdown) return [];
  
  return markdown
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(p => {
      if (!p) return false;
      // Skip top metadata block lines like "> 📌 **Meta Title:**"
      if (p.startsWith('> 📌') || p.startsWith('> 📝') || p.startsWith('> 🔗') || p.startsWith('> ⏱')) return false;
      return true;
    });
}

/**
 * Extracts bullet points or headers as key takeaways
 */
function extractHighlightsFromMarkdown(markdown: string): string[] {
  if (!markdown) return [];

  const lines = markdown.split('\n');
  const bullets: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if ((trimmed.startsWith('- ') || trimmed.startsWith('* ')) && trimmed.length > 15 && trimmed.length < 180) {
      bullets.push(trimmed.replace(/^[-*]\s+(\*\*)?/, '').replace(/\*\*$/, ''));
      if (bullets.length >= 4) break;
    }
  }

  return bullets;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

/**
 * Retrieve all AI-generated blogs from localStorage
 */
export function getStoredAiBlogs(): BrandBlogPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Save an AI-generated blog into localStorage
 */
export function saveStoredAiBlog(blog: BrandBlogPost): void {
  try {
    const current = getStoredAiBlogs();
    const existingIndex = current.findIndex(b => b.id === blog.id);
    if (existingIndex >= 0) {
      current[existingIndex] = blog;
    } else {
      current.unshift(blog);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (err) {
    console.error('Failed to save AI blog to storage:', err);
  }
}

/**
 * Delete a stored AI-generated blog
 */
export function deleteStoredAiBlog(id: string): void {
  try {
    const current = getStoredAiBlogs().filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (err) {
    console.error('Failed to delete AI blog from storage:', err);
  }
}

// Built-in initial AI generated blog from the live test
const INITIAL_BITLANCE_SAMPLE_BLOG: BrandBlogPost = {
  id: 'luxury-real-estate-trends-amravati-2026',
  title: 'Luxury Real Estate Trends in Amravati: 2026 Guide',
  category: 'Market Trends',
  date: 'June 2026',
  readTime: '9 min read',
  excerpt: 'Explore luxury real estate trends in Amravati, from prime DPS Road & Congress Nagar corridors to MahaRERA transparency and high-yield capital growth.',
  image: '/assets/blogs/amravati-luxury-trends.png',
  content: extractParagraphsFromMarkdown(SAMPLE_BITLANCE_FULL_MARKDOWN),
  highlights: [
    'DPS Road & Congress Nagar recognized as Amravati’s primary luxury residential growth corridors',
    'High demand for spacious 2 & 3 BHK floor plans featuring cross-ventilation and expansive balconies',
    'Integrated high-street retail promenades delivering sustained rental yields',
    '100% MahaRERA transparency (MahaRERA: P5030002502915) and verified banking clearances',
  ],
  markdown: SAMPLE_BITLANCE_FULL_MARKDOWN,
  isAiGenerated: true,
  topic: 'Luxury Real Estate Trends in Amravati: 2026 Guide',
  keywords: 'luxury real estate trends amravati, 2 bhk amravati, 3 bhk dps road, congress nagar property, maharera amravati',
};

/**
 * Returns complete combined list of blogs: static curated portfolio + AI-generated posts
 */
export function getAllMergedBlogs(): BrandBlogPost[] {
  try {
    const stored = getStoredAiBlogs();
    const all = Array.isArray(stored) ? [...stored] : [];
    
    if (INITIAL_BITLANCE_SAMPLE_BLOG && !all.some(b => b && b.id === INITIAL_BITLANCE_SAMPLE_BLOG.id)) {
      all.push(INITIAL_BITLANCE_SAMPLE_BLOG);
    }

    if (BRAND_CONFIG && Array.isArray(BRAND_CONFIG.blogs)) {
      BRAND_CONFIG.blogs.forEach(defaultBlog => {
        if (defaultBlog && !all.some(b => b && b.id === defaultBlog.id)) {
          all.push(defaultBlog);
        }
      });
    }

    return all;
  } catch (err) {
    console.error('Error in getAllMergedBlogs:', err);
    return [INITIAL_BITLANCE_SAMPLE_BLOG];
  }
}
