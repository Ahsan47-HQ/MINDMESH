import { Link } from "react-router-dom";
import {
  Brain,
  Lock,
  Zap,
  Globe,
  Search,
  Layers,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-slate-50 dark:from-background dark:via-background dark:to-slate-900">
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold gradient-text leading-tight">
              Your Private AI Mind
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Cortex is a privacy-first browser assistant that understands your
              digital life. Semantic memory, proactive intelligence, and complete
              offline control—all running 100% locally on your device.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Launch Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center px-6 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative h-96 lg:h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
            <div className="relative w-full max-w-sm space-y-4">
              <div className="glass p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold">Semantic Memory</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Remember every page you visit with AI-powered understanding
                </p>
              </div>
              <div className="glass p-6 rounded-2xl space-y-3 ml-8">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold">100% Private</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  All processing happens locally. No cloud, no servers.
                </p>
              </div>
              <div className="glass p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold">Instant Insights</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get relevant suggestions and connections in real time
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Core Capabilities</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to understand your digital life, powered by
            on-device AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900/50 border border-border hover:border-primary/50 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Search className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Semantic Search</h3>
            <p className="text-muted-foreground">
              Search your browsing history by meaning, not just keywords. "Show
              me pages about React performance" finds relevant content instantly.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900/50 border border-border hover:border-primary/50 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Layers className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Tab Clustering</h3>
            <p className="text-muted-foreground">
              Automatically organize tabs by topic. Eliminate clutter and stay
              focused on what matters with intelligent grouping.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900/50 border border-border hover:border-primary/50 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Proactive Intelligence</h3>
            <p className="text-muted-foreground">
              Get relevant reminders, research suggestions, and context-aware
              insights based on your current browsing.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900/50 border border-border hover:border-primary/50 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Privacy Dashboard</h3>
            <p className="text-muted-foreground">
              Complete control over your data. Pause capture, selective forget by
              domain, export your memory anytime.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900/50 border border-border hover:border-primary/50 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Explainable AI</h3>
            <p className="text-muted-foreground">
              Every suggestion shows its reasoning. See similarity scores, shared
              keywords, and context matches transparently.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900/50 border border-border hover:border-primary/50 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Memory Graph</h3>
            <p className="text-muted-foreground">
              Semantic embeddings create a knowledge graph of your digital life,
              linking related concepts and ideas.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12 md:p-16 border border-primary/20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8">
            Built on Trust
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Zero Cloud Processing</h3>
                <p className="text-muted-foreground">
                  Everything runs on your device. No data leaves your browser.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Manifest V3 Ready</h3>
                <p className="text-muted-foreground">
                  Future-proof extension architecture compliant with latest web
                  standards.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Offline First</h3>
                <p className="text-muted-foreground">
                  Works completely offline. No internet required for core
                  features.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Full User Control</h3>
                <p className="text-muted-foreground">
                  You own your data. Export anytime. Delete selectively. Your
                  choice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          Ready to Take Control?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Experience the power of semantic memory and on-device AI. No signup
          required, no data collection.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-lg"
        >
          Launch Cortex Dashboard
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>
            Cortex (MindMesh) • Privacy-First AI • 100% Local Processing • No
            Telemetry
          </p>
        </div>
      </footer>
    </div>
  );
}
