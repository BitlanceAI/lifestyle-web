import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Search, Clock, ArrowRight, Wand2, BookOpen, Trash2, Tag, CheckCircle2 } from 'lucide-react';
import { BrandBlogPost } from '../data/projects';
import { getAllMergedBlogs, deleteStoredAiBlog } from '../services/blogGeneratorService';
import { BlogArticleModal } from './BlogArticleModal';
import { BlogGeneratorModal } from './BlogGeneratorModal';
import { VerifiedUser } from '../types/auth';

interface BlogListingPageProps {
  onOpenEnquiry: (pref?: string) => void;
  onSelectProject: (slug: string) => void;
  currentUser?: VerifiedUser | null;
}

export const BlogListingPage: React.FC<BlogListingPageProps> = ({
  onOpenEnquiry,
  onSelectProject,
  currentUser,
}) => {

  const [blogs, setBlogs] = useState<BrandBlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BrandBlogPost | null>(null);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const refreshBlogs = () => {
    setBlogs(getAllMergedBlogs());
  };

  useEffect(() => {
    document.title = 'Blogs & Real Estate Insights | Lifestyle Home Spaces Amravati';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Official real estate publications, sample flat walkthroughs, buyer guides, and AI-powered market analyses for Amravati property investors.'
      );
    }
    refreshBlogs();
  }, []);

  const categories = ['All', 'AI Generated', ...Array.from(new Set(blogs.map((b) => b.category)))];

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeCategory === 'All') return true;
    if (activeCategory === 'AI Generated') return !!b.isAiGenerated;
    return b.category === activeCategory;
  });

  const handleDeleteAiBlog = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Delete this AI-generated blog article from your browser?')) {
      deleteStoredAiBlog(id);
      refreshBlogs();
    }
  };

  return (
    <div className="bg-[#08080A] text-[#F5E6C8] min-h-screen pt-28 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light font-cinzel text-white leading-tight">
            Lifestyle Articles & Buyer Folios
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#C5BBAA] font-light max-w-2xl mx-auto leading-relaxed">
            Market analysis, engineering benchmarks, and intelligent property guides for homebuyers and commercial investors across Amravati and Vidarbha.
          </p>

          {/* Action CTA: Generate with Bitlance AI (Admin Only) */}
          {currentUser?.isAdmin ? (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setIsGeneratorOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 transition-all duration-300 shadow-xl shadow-[#D4AF37]/20 flex items-center gap-2.5 cursor-pointer"
              >
                <Wand2 className="w-4 h-4" />
                <span>Generate Article with Bitlance AI</span>
              </button>
              <div className="text-left text-[11px] text-zinc-400 font-mono border-l border-white/10 pl-4 py-1 hidden sm:block">
                <span className="text-white block font-medium">Administrator Session Active</span>
                <span className="text-[#D4AF37]">Bitlance SEO & GEO Generator Unlocked</span>
              </div>
            </div>
          ) : (
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <span>Official Lifestyle Home Spaces Publications</span>
              </span>
            </div>
          )}
        </div>


        {/* Search & Categories Bar */}
        <div className="max-w-5xl mx-auto mb-12 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by topic..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:border-[#D4AF37] focus:outline-none transition-colors"
              />
            </div>

            {/* Total Count */}
            <div className="text-xs text-zinc-400 font-mono">
              Showing <span className="text-[#D4AF37] font-bold">{filteredBlogs.length}</span> of {blogs.length} publications
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#D4AF37] text-black font-bold shadow-lg shadow-[#D4AF37]/20'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat === 'AI Generated' && <Sparkles className="w-3 h-3 inline mr-1 text-[#25D366]" />}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-20 p-8 rounded-2xl bg-white/[0.02] border border-white/5">
            <BookOpen className="w-12 h-12 text-[#D4AF37]/40 mx-auto mb-4" />
            <h3 className="text-lg font-cinzel text-white">No articles matched your filter</h3>
            <p className="text-xs text-zinc-400 mt-2 mb-6">
              {currentUser?.isAdmin
                ? 'Generate an original real estate publication in seconds with the Bitlance AI Agent.'
                : 'Browse through our curated publications or reset search keywords.'}
            </p>
            {currentUser?.isAdmin && (
              <button
                onClick={() => setIsGeneratorOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-black text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
              >
                + Generate Article Now
              </button>
            )}
          </div>

        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredBlogs.map((blog, idx) => (
              <motion.article
                key={blog.id || idx}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setSelectedBlog(blog)}
                className="rounded-2xl overflow-hidden border border-white/10 bg-[#121216] group flex flex-col justify-between hover:border-[#D4AF37]/60 hover:shadow-2xl hover:shadow-[#D4AF37]/10 transition-all cursor-pointer"
              >
                {/* Visual */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded text-[10px] font-mono tracking-widest uppercase bg-[#D4AF37] text-black font-bold shadow-md">
                      {blog.category}
                    </span>
                    {blog.isAiGenerated && (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-[#25D366] text-black font-bold flex items-center gap-1 shadow-md">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>AI SEO</span>
                      </span>
                    )}
                  </div>

                  {/* Read Time / Delete */}
                  <div className="absolute bottom-3 right-4 flex items-center gap-2">
                    {currentUser?.isAdmin && blog.isAiGenerated && blog.id.startsWith('ai-') && (
                      <button
                        onClick={(e) => handleDeleteAiBlog(e, blog.id)}
                        title="Delete AI article"
                        className="p-1 rounded bg-black/70 hover:bg-red-500/80 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {blog.readTime && (
                      <span className="text-[10px] text-zinc-300 font-mono bg-black/70 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-sm flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D4AF37]" />
                        <span>{blog.readTime}</span>
                      </span>
                    )}
                  </div>

                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-light font-cinzel text-white mb-2 leading-snug line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-[#C5BBAA] font-light leading-relaxed line-clamp-3 mb-4">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] group-hover:text-white transition-colors">
                      <span>Read Publication</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      {blog.date || 'Folio'}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

      </div>

      {/* Reader Modal */}
      <BlogArticleModal
        blog={selectedBlog}
        onClose={() => setSelectedBlog(null)}
        onOpenEnquiry={onOpenEnquiry}
      />

      {/* Bitlance AI Generator Modal */}
      <BlogGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        onBlogGenerated={(newBlog) => {
          refreshBlogs();
          setSelectedBlog(newBlog);
        }}
      />
    </div>
  );
};
