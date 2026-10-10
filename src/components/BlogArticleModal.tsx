import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Clock,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Share2,
  Building2,
  Globe,
  MapPin,
  ShieldCheck,
  BookOpen,
  FileText,
  AlertTriangle,
  Lightbulb,
  Award,
  ChevronRight,
} from 'lucide-react';
import { BrandBlogPost, BRAND_CONFIG } from '../data/projects';
import { captureLeadInCRM } from '../services/crmLeadService';

interface BlogArticleModalProps {
  blog: BrandBlogPost | null;
  onClose: () => void;
  onOpenEnquiry: (pref?: string) => void;
}

function extractMetaDetails(markdown?: string) {
  const meta: {
    metaTitle?: string;
    metaDescription?: string;
    urlSlug?: string;
    readingTime?: string;
    lastUpdated?: string;
  } = {};

  if (!markdown) return meta;

  const lines = markdown.split('\n');
  for (const line of lines) {
    if (line.includes('Meta Title:')) {
      meta.metaTitle = line.replace(/.*Meta Title:\*\*\s*/, '').trim();
    } else if (line.includes('Meta Description:')) {
      meta.metaDescription = line.replace(/.*Meta Description:\*\*\s*/, '').trim();
    } else if (line.includes('URL Slug:')) {
      meta.urlSlug = line.replace(/.*URL Slug:\*\*\s*`?/, '').replace(/`?.*/, '').trim();
    } else if (line.includes('Reading Time:')) {
      const parts = line.split('|');
      meta.readingTime = parts[0]?.replace(/.*Reading Time:\*\*\s*/, '').trim();
      meta.lastUpdated = parts[1]?.replace(/.*Last Updated:\*\*\s*/, '').trim();
    }
  }
  return meta;
}

export const BlogArticleModal: React.FC<BlogArticleModalProps> = ({
  blog,
  onClose,
  onOpenEnquiry,
}) => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryNote, setInquiryNote] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [activeTocId, setActiveTocId] = useState<string>('');

  if (!blog) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleArticleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await captureLeadInCRM({
        name: inquiryName,
        phone: inquiryPhone,
        project: 'Lifestyle Home Spaces',
        source: `Article Inquiry (${blog.title})`,
        notes: inquiryNote,
      });
    } catch (err) {
      console.error('CRM capture error:', err);
    }

    const msg = `Hello Lifestyle Team,\n\nI was reading your publication: *"${blog.title}"* and would like to request further details, floor plans, and pricing for this development.\n\n*Name:* ${inquiryName || 'Interested Reader'}\n*WhatsApp:* ${inquiryPhone || 'Not specified'}\n*Query/Note:* ${inquiryNote || 'Please share brochure and schedule an appointment.'}`;

    window.open(`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Extract meta block details if present in markdown
  const markdownText = blog.markdown || (blog.content ? blog.content.join('\n\n') : '');
  const metaDetails = extractMetaDetails(blog.markdown);

  const scrollToSection = (id: string) => {
    setActiveTocId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl max-h-[92vh] bg-[#0C0C10] border border-[#D4AF37]/35 rounded-3xl shadow-2xl text-left flex flex-col z-10 overflow-hidden font-sans text-white my-auto"
        >
          {/* Header Bar */}
          <div className="bg-[#121217] px-6 py-4 border-b border-white/10 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                {blog.category}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/35">
                <Globe className="w-3 h-3" />
                <span>SEO & GEO Amravati Edition</span>
              </span>
              {blog.readTime && (
                <span className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{blog.readTime}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-[#D4AF37] transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
                title="Share Article Link"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-[11px] hidden sm:inline">{isCopied ? 'Link Copied!' : 'Share'}</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Article Scrollable Body */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-10 space-y-8">
            
            {/* SEO & GEO Intelligence Dossier Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-black/60 to-[#181824] border border-[#D4AF37]/30 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="font-mono text-[#D4AF37] uppercase tracking-wider text-[11px] font-semibold">
                    Geo-Targeted Corridor
                  </span>
                  <span className="text-zinc-300">DPS Road · Congress Nagar · Parvati Nagar · Amravati</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1 text-[#D4AF37]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>MahaRERA Verified</span>
                  </span>
                  <span>•</span>
                  <span>Updated 2026</span>
                </div>
              </div>
            </div>

            {/* Title & Excerpt */}
            <div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-light font-cinzel text-white leading-tight">
                {blog.title}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#C5BBAA] font-light leading-relaxed">
                {metaDetails.metaDescription || blog.excerpt}
              </p>
            </div>

            {/* Featured Hero Visual */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl max-h-[380px]">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover max-h-[380px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-zinc-300">
                <span className="font-mono text-[#D4AF37] text-xs uppercase tracking-widest font-semibold">
                  Lifestyle Architectural Insights · Amravati
                </span>
                <span className="font-mono text-[10px] text-zinc-300 bg-black/70 px-2.5 py-1 rounded border border-white/10">
                  Full Buyer Research Edition
                </span>
              </div>
            </div>

            {/* Rendered Comprehensive Long-Form Markdown Content */}
            <div className="article-body">
              {renderFullMarkdownArticle(markdownText, scrollToSection)}
            </div>

            {/* Key Takeaways & Highlights */}
            {blog.highlights && blog.highlights.length > 0 && (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#14141C] border border-[#D4AF37]/40 shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#D4AF37]">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Key Architectural & Investment Takeaways</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {blog.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Author Credential & Review Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-sm font-cinzel font-semibold text-white">
                  Lifestyle Home Spaces Editorial & Engineering Desk
                </h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Published in accordance with MahaRERA disclosures, municipal zoning standards, and structural specifications by Lifestyle Home Spaces, Amravati.
                </p>
                <div className="mt-2 text-[11px] font-mono text-[#D4AF37] flex items-center justify-center sm:justify-start gap-3">
                  <span>Fact-Checked & Reviewed</span>
                  <span>•</span>
                  <span>Amravati Regional Portfolio</span>
                </div>
              </div>
            </div>

            {/* Dedicated Post-Article Contact & Enquiry Form */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="bg-gradient-to-br from-[#16161E] to-[#101016] p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/40 shadow-2xl">
                <div className="text-center max-w-lg mx-auto mb-6">
                  <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#D4AF37] block mb-1">
                    NEXT STEPS & SITE VISITS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-light font-cinzel text-white">
                    Request Full Brochure & Schedule Visit
                  </h3>
                  <p className="mt-2 text-xs text-zinc-400">
                    Connect directly with our senior development desk regarding residences and retail spaces featured in this article.
                  </p>
                </div>

                {localStorage.getItem('lifestyle_user') && JSON.parse(localStorage.getItem('lifestyle_user')!).verified ? (
                  <div className="text-center pt-2">
                    <p className="text-sm text-zinc-300 mb-6 font-light">
                      You are a verified client. You can directly request the brochure and schedule a visit.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenEnquiry(blog.title);
                      }}
                      className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs uppercase tracking-[0.15em] font-bold bg-[#D4AF37] text-black hover:bg-white transition-all mx-auto flex items-center justify-center gap-2 shadow-xl shadow-[#D4AF37]/20 cursor-pointer"
                    >
                      <span>Contact Us / Schedule Visit</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleArticleInquiry} className="max-w-md mx-auto space-y-3.5">
                    <div>
                      <input
                        type="text"
                        required
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder="Your Full Name"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] text-white text-xs outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        placeholder="Your WhatsApp Number (e.g. 9876543210)"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] text-white text-xs outline-none transition-colors font-mono"
                      />
                    </div>
                    <div>
                      <textarea
                        rows={2}
                        value={inquiryNote}
                        onChange={(e) => setInquiryNote(e.target.value)}
                        placeholder="Any specific preference or questions (Optional)"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] text-white text-xs outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl text-xs uppercase tracking-[0.15em] font-bold bg-[#D4AF37] text-black hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send Inquiry via WhatsApp</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

/**
 * Full Markdown Document Parser & Magazine-Grade Renderer
 */
function renderFullMarkdownArticle(
  markdown: string,
  onScrollToSection: (id: string) => void
): React.ReactNode {
  if (!markdown) return null;

  // Split raw markdown into paragraphs/blocks separated by double newlines
  const rawBlocks = markdown.split(/\n\s*\n/);
  const elements: React.ReactNode[] = [];

  let tableBuffer: string[] = [];
  let blockIndex = 0;

  const flushTable = () => {
    if (tableBuffer.length > 0) {
      elements.push(renderTableBlock(tableBuffer, blockIndex++));
      tableBuffer = [];
    }
  };

  for (const block of rawBlocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    // Check if this block is part of a markdown table (lines starting with '|')
    const lines = trimmed.split('\n').map((l) => l.trim());
    const isTable = lines.length >= 2 && lines[0].startsWith('|') && lines[1].includes('|---');

    if (isTable) {
      flushTable();
      elements.push(renderTableBlock(lines, blockIndex++));
      continue;
    }

    // Skip the top meta block quotes ("> 📌 Meta Title:", etc.) since they are rendered in the top dossier
    if (
      trimmed.startsWith('> 📌') ||
      trimmed.startsWith('> 📝') ||
      trimmed.startsWith('> 🔗') ||
      trimmed.startsWith('> ⏱')
    ) {
      continue;
    }

    // Table of contents detection
    if (trimmed.startsWith('## Table of Contents')) {
      flushTable();
      elements.push(renderTableOfContents(trimmed, blockIndex++, onScrollToSection));
      continue;
    }

    // Headings
    if (trimmed.startsWith('# ')) {
      flushTable();
      const text = trimmed.replace(/^#\s+/, '');
      const id = slugifyHeading(text);
      elements.push(
        <h1
          key={blockIndex++}
          id={id}
          className="text-2xl sm:text-3xl font-light font-cinzel text-white pt-6 pb-2 border-b border-[#D4AF37]/30 scroll-mt-6"
        >
          {renderInlineFormatting(text)}
        </h1>
      );
      continue;
    }

    if (trimmed.startsWith('## ')) {
      flushTable();
      const text = trimmed.replace(/^##\s+/, '');
      const id = slugifyHeading(text);
      elements.push(
        <div key={blockIndex++} id={id} className="pt-8 pb-2 border-b border-[#D4AF37]/20 scroll-mt-6">
          <h2 className="text-xl sm:text-2xl font-light font-cinzel text-[#F3E5AB] flex items-center gap-2">
            <span className="w-1.5 h-5 bg-[#D4AF37] rounded-full inline-block" />
            <span>{renderInlineFormatting(text)}</span>
          </h2>
        </div>
      );
      continue;
    }

    if (trimmed.startsWith('### ')) {
      flushTable();
      const text = trimmed.replace(/^###\s+/, '');
      const id = slugifyHeading(text);
      elements.push(
        <h3
          key={blockIndex++}
          id={id}
          className="text-base sm:text-lg font-cinzel font-medium text-white pt-4 pb-1 text-[#D4AF37] flex items-center gap-2"
        >
          <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
          <span>{renderInlineFormatting(text)}</span>
        </h3>
      );
      continue;
    }

    // Step-by-Step Practical Guide Card
    if (/^\d+\.\s+\*\*Step\s+\d+:/.test(trimmed)) {
      flushTable();
      elements.push(renderStepCard(trimmed, blockIndex++));
      continue;
    }

    // Blockquotes / Stat Highlight Quotes
    if (trimmed.startsWith('> ')) {
      flushTable();
      elements.push(renderQuoteBlock(trimmed, blockIndex++));
      continue;
    }

    // Unordered List of Bullets
    if (lines.every((l) => l.startsWith('- ') || l.startsWith('* '))) {
      flushTable();
      elements.push(
        <ul key={blockIndex++} className="space-y-2 my-4 pl-2">
          {lines.map((l, lIdx) => (
            <li key={lIdx} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-zinc-300 font-light leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0" />
              <span>{renderInlineFormatting(l.replace(/^[-*]\s+/, ''))}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered List
    if (lines.every((l) => /^\d+\.\s+/.test(l))) {
      flushTable();
      elements.push(
        <ol key={blockIndex++} className="space-y-2.5 my-4 pl-2">
          {lines.map((l, lIdx) => {
            const num = l.match(/^(\d+)\.\s+/)?.[1] || `${lIdx + 1}`;
            const cleanText = l.replace(/^\d+\.\s+/, '');
            return (
              <li key={lIdx} className="flex items-start gap-3 text-sm sm:text-[15px] text-zinc-300 font-light leading-relaxed">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-mono font-bold flex-shrink-0 mt-0.5">
                  {num}
                </span>
                <span>{renderInlineFormatting(cleanText)}</span>
              </li>
            );
          })}
        </ol>
      );
      continue;
    }

    // Real World Use Case or Case Study Section
    if (trimmed.includes('**The Problem:**') && trimmed.includes('**The Solution:**')) {
      flushTable();
      elements.push(renderCaseStudyBlock(trimmed, blockIndex++));
      continue;
    }

    // Standard Rich Paragraph
    flushTable();
    elements.push(
      <p
        key={blockIndex++}
        className="text-sm sm:text-[15px] text-zinc-300 font-light leading-relaxed first-letter:text-xl sm:first-letter:text-2xl first-letter:font-cinzel first-letter:text-[#D4AF37] first-letter:mr-0.5"
      >
        {renderInlineFormatting(trimmed)}
      </p>
    );
  }

  flushTable();
  return <div className="space-y-5">{elements}</div>;
}

/**
 * Renders Table of Contents with jump links
 */
function renderTableOfContents(
  block: string,
  key: number,
  onScrollToSection: (id: string) => void
): React.ReactNode {
  const lines = block.split('\n');
  const items: { label: string; id: string }[] = [];

  for (const line of lines) {
    const match = line.match(/\[(.*?)\]\(#(.*?)\)/);
    if (match) {
      items.push({ label: match[1], id: match[2] });
    }
  }

  if (items.length === 0) return null;

  return (
    <div key={key} className="p-6 rounded-2xl bg-[#14141A] border border-[#D4AF37]/30 my-6 shadow-xl">
      <div className="flex items-center gap-2 mb-3 text-xs font-mono tracking-widest uppercase text-[#D4AF37]">
        <BookOpen className="w-4 h-4 text-[#D4AF37]" />
        <span>Table of Contents · Quick Section Navigator</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onScrollToSection(item.id)}
            className="text-left text-xs text-zinc-400 hover:text-[#D4AF37] flex items-center gap-2 py-1 transition-colors cursor-pointer group"
          >
            <span className="text-[10px] font-mono text-[#D4AF37]/60 group-hover:text-[#D4AF37]">
              {String(idx + 1).padStart(2, '0')}.
            </span>
            <span className="line-clamp-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Renders Responsive Dark Tables with Gold Accents
 */
function renderTableBlock(lines: string[], key: number): React.ReactNode {
  if (lines.length < 2) return null;
  const headerLine = lines[0];
  const headers = headerLine
    .split('|')
    .map((c) => c.trim())
    .filter((c, i, arr) => i > 0 && i < arr.length - 1);

  const rowLines = lines.slice(2);
  const rows = rowLines.map((r) =>
    r
      .split('|')
      .map((c) => c.trim())
      .filter((c, i, arr) => i > 0 && i < arr.length - 1)
  );

  return (
    <div key={key} className="overflow-x-auto my-6 rounded-2xl border border-[#D4AF37]/35 bg-black/50 shadow-2xl">
      <table className="w-full text-left border-collapse text-xs sm:text-sm">
        <thead>
          <tr className="bg-[#181822] border-b border-[#D4AF37]/30">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3.5 font-cinzel text-[#D4AF37] uppercase tracking-wider text-[11px] font-semibold whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-white/[0.04] transition-colors">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="px-4 py-3 text-zinc-300 font-light leading-relaxed">
                  {renderInlineFormatting(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Renders Pullquote & Market Callout Stats
 */
function renderQuoteBlock(text: string, key: number): React.ReactNode {
  const clean = text.replace(/^>\s+/, '').trim();
  const isSource = clean.startsWith('Source:');

  return (
    <div
      key={key}
      className={`my-4 p-4 sm:p-5 rounded-xl border-l-4 border-[#D4AF37] bg-white/[0.02] shadow-md ${
        isSource ? 'text-xs text-[#D4AF37]' : 'text-sm sm:text-base text-zinc-200 italic font-light'
      }`}
    >
      {renderInlineFormatting(clean)}
    </div>
  );
}

/**
 * Renders Numbered Step Guidance Card
 */
function renderStepCard(text: string, key: number): React.ReactNode {
  const match = text.match(/^\d+\.\s+\*\*Step\s+(\d+):\s*(.*?)\*\*\s*(.*)/s);
  if (!match) {
    return <p key={key} className="text-sm text-zinc-300">{renderInlineFormatting(text)}</p>;
  }

  const stepNumber = match[1];
  const stepTitle = match[2];
  const stepContent = match[3];

  return (
    <div key={key} className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/40 transition-colors my-3">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-black font-mono font-bold text-xs flex items-center justify-center">
          {String(stepNumber).padStart(2, '0')}
        </span>
        <h4 className="text-sm sm:text-base font-cinzel font-semibold text-white">
          {stepTitle}
        </h4>
      </div>
      <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed pl-10">
        {renderInlineFormatting(stepContent)}
      </p>
    </div>
  );
}

/**
 * Renders Case Study Problem / Solution / Outcome blocks
 */
function renderCaseStudyBlock(text: string, key: number): React.ReactNode {
  return (
    <div key={key} className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#14141E] to-[#101016] border border-[#D4AF37]/30 my-4 space-y-3">
      <div className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
        <Lightbulb className="w-4 h-4 text-[#D4AF37]" />
        <span>Real-World Application Breakdown</span>
      </div>
      <div className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed space-y-2">
        {renderInlineFormatting(text)}
      </div>
    </div>
  );
}

/**
 * Parses inline markdown: bold, italic, link, code
 */
function renderInlineFormatting(text: string): React.ReactNode {
  const tokens: React.ReactNode[] = [];
  let keyIndex = 0;

  // Regex to match markdown links [label](url), bold **text**, inline code `code`, italic *text*
  const regex = /(\[(.*?)\]\((.*?)\)|\*\*(.*?)\*\*|`([^`]+)`|\*(.*?)\*)/g;
  let match: RegExpExecArray | null;
  let lastIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.substring(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      // Link
      tokens.push(
        <a
          key={keyIndex++}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#D4AF37] hover:text-white underline underline-offset-2 decoration-[#D4AF37]/50 transition-colors"
        >
          {match[2]}
        </a>
      );
    } else if (match[4]) {
      // Bold
      tokens.push(
        <strong key={keyIndex++} className="font-semibold text-white">
          {match[4]}
        </strong>
      );
    } else if (match[5]) {
      // Inline Code
      tokens.push(
        <code key={keyIndex++} className="font-mono text-xs bg-white/10 px-1.5 py-0.5 rounded text-[#D4AF37]">
          {match[5]}
        </code>
      );
    } else if (match[6]) {
      // Italic
      tokens.push(
        <em key={keyIndex++} className="italic text-zinc-300">
          {match[6]}
        </em>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push(text.substring(lastIndex));
  }

  return tokens.length > 0 ? tokens : text;
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}
