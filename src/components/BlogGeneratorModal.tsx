import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Loader2, Key, Search, Globe, CheckCircle2, AlertCircle, ArrowRight, Wand2, Lock } from 'lucide-react';
import { BrandBlogPost } from '../data/projects';
import { generateBlogWithBitlance, BITLANCE_CONFIG } from '../services/blogGeneratorService';

interface BlogGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBlogGenerated: (blog: BrandBlogPost) => void;
}

const TOPIC_SUGGESTIONS = [
  'Why Amravati is Maharashtra’s Emerging Luxury Real Estate Capital',
  '2 BHK vs 3 BHK: Space Optimization & Resale Value in Vidarbha',
  'Commercial Retail promenades: Why High-Street Arcades Outperform Malls',
  'The Homebuyer’s MahaRERA Verification Checklist for 2026',
  'How Modern Cross-Ventilation & Vastu Architecture Shape Luxury Living',
];

export const BlogGeneratorModal: React.FC<BlogGeneratorModalProps> = ({
  isOpen,
  onClose,
  onBlogGenerated,
}) => {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [mode, setMode] = useState<'SEO' | 'GEO'>('SEO');
  const [apiKey, setApiKey] = useState(BITLANCE_CONFIG.API_KEY);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Security Verification Guard
  let isAdmin = false;
  try {
    const raw = localStorage.getItem('lifestyle_user');
    const u = raw ? JSON.parse(raw) : null;
    isAdmin = Boolean(u?.isAdmin || u?.role === 'admin');
  } catch {
    isAdmin = false;
  }


  const steps = [
    'Authenticating with Bitlance AI SEO Agent...',
    'Analyzing real estate search intent & keyword clusters...',
    'Writing deep architectural insights & local market data...',
    'Running originality & plagiarism verification...',
    'Synthesizing architectural cover visual...',
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setError(null);
    setIsGenerating(true);
    setCurrentStep(0);

    // Simulate step progression while async API request completes
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 5500);

    try {
      const generatedBlog = await generateBlogWithBitlance({
        topic: topic.trim(),
        keywords: keywords.trim(),
        mode,
        apiKey: apiKey.trim(),
      });

      clearInterval(stepInterval);
      setCurrentStep(steps.length - 1);

      // Brief delay to show completion then return
      setTimeout(() => {
        setIsGenerating(false);
        onBlogGenerated(generatedBlog);
        onClose();
      }, 800);
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsGenerating(false);
      setError(err?.message || 'Failed to generate blog. Please verify your API key and connection.');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[85] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={!isGenerating ? onClose : undefined}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#0E0E12] border border-[#D4AF37]/40 rounded-3xl shadow-2xl text-left flex flex-col z-10 overflow-hidden font-sans text-white my-auto"
        >
          {/* Header */}
          <div className="bg-[#14141A] px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/35 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-cinzel font-light text-white tracking-wide">
                    Bitlance AI Article Generator
                  </h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                    Active
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-light">
                  Publish SEO & GEO optimized articles directly to Lifestyle Home Spaces
                </p>
              </div>
            </div>

            {!isGenerating && (
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close generator"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
            {!isAdmin ? (
              <div className="py-12 px-6 text-center space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
                  <Lock className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-cinzel text-white">Administrator Access Required</h3>
                  <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto leading-relaxed">
                    Article generation with the Bitlance SEO AI Agent is restricted to authorized staff. Please sign in via the Admin Portal to access publishing controls.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : error ? (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-xs text-red-200">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <strong className="block font-semibold">Generation Error</strong>
                  <span>{error}</span>
                </div>
              </div>
            ) : null}

            {isAdmin && isGenerating ? (

              <div className="py-10 px-4 text-center space-y-6">
                <div className="relative w-20 h-20 mx-auto">
                  <div className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/20 animate-ping" />
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/50 flex items-center justify-center">
                    <Loader2 className="w-9 h-9 text-[#D4AF37] animate-spin" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-cinzel text-white">Synthesizing Official Publication</h3>
                  <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto">
                    Bitlance AI SEO Agent is compiling architectural analysis, local real estate trends, and generating custom visuals.
                  </p>
                </div>

                {/* Progress Stepper */}
                <div className="max-w-md mx-auto space-y-2.5 text-left pt-2">
                  {steps.map((st, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 p-2.5 rounded-lg text-xs transition-all ${
                        idx === currentStep
                          ? 'bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-white font-medium'
                          : idx < currentStep
                          ? 'text-[#D4AF37] opacity-80'
                          : 'text-zinc-600'
                      }`}
                    >
                      {idx < currentStep ? (
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                      ) : idx === currentStep ? (
                        <Loader2 className="w-4 h-4 text-[#D4AF37] animate-spin flex-shrink-0" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-zinc-700 text-[10px] flex items-center justify-center font-mono flex-shrink-0">
                          {idx + 1}
                        </span>
                      )}
                      <span className="truncate">{st}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : isAdmin ? (
              <form onSubmit={handleGenerate} className="space-y-6">

                {/* Optimization Mode */}
                <div>
                  <label className="text-xs uppercase font-mono tracking-widest text-[#D4AF37] block mb-2">
                    Optimization Engine
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setMode('SEO')}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        mode === 'SEO'
                          ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/10'
                          : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider block">SEO Mode</span>
                        <Search className="w-3.5 h-3.5 text-[#D4AF37]" />
                      </div>
                      <span className="text-[11px] text-zinc-400 block mt-1">
                        Search visibility · Google Rank
                      </span>
                      <span className="text-[10px] font-mono text-[#D4AF37] block mt-1">10 credits</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMode('GEO')}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        mode === 'GEO'
                          ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/10'
                          : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider block">GEO Mode</span>
                        <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                      </div>
                      <span className="text-[11px] text-zinc-400 block mt-1">
                        Generative Engine Discovery
                      </span>
                      <span className="text-[10px] font-mono text-[#D4AF37] block mt-1">15 credits</span>
                    </button>
                  </div>
                </div>

                {/* Topic Input */}
                <div>
                  <label htmlFor="blog-topic-input" className="text-xs uppercase font-mono tracking-widest text-[#D4AF37] block mb-2">
                    Article Topic <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="blog-topic-input"
                    type="text"
                    required
                    maxLength={300}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Why Amravati is Becoming Maharashtra’s Next Real Estate Investment Hub"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white text-sm placeholder:text-zinc-500 outline-none transition-all"
                  />
                  
                  {/* Suggestions */}
                  <div className="mt-3">
                    <span className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider block mb-1.5">
                      Recommended Topics for Lifestyle Home Spaces:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {TOPIC_SUGGESTIONS.map((sugg, sIdx) => (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => setTopic(sugg)}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#D4AF37]/20 text-zinc-300 hover:text-white border border-white/10 hover:border-[#D4AF37]/40 transition-colors text-left"
                        >
                          + {sugg}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Target Keywords */}
                <div>
                  <label htmlFor="blog-keywords-input" className="text-xs uppercase font-mono tracking-widest text-[#D4AF37] block mb-2">
                    Target Keywords <span className="text-zinc-500 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    id="blog-keywords-input"
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="e.g. Amravati luxury apartments, DPS Road flats, RERA approved, 3 BHK floor plan"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white text-sm placeholder:text-zinc-500 outline-none transition-all"
                  />
                </div>

                {/* API Key */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="blog-apikey-input" className="text-xs uppercase font-mono tracking-widest text-[#D4AF37] flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Bitlance API Key</span>
                    </label>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      Endpoint: api.bitlancetechhub.com
                    </span>
                  </div>
                  <input
                    id="blog-apikey-input"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sda_..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white text-xs font-mono placeholder:text-zinc-600 outline-none transition-all"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">
                    Est. Generation: ~25-35s · Includes Visual
                  </span>

                  <button
                    type="submit"
                    disabled={!topic.trim()}
                    className="px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Wand2 className="w-4 h-4" />
                    <span>Generate & Publish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : null}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
