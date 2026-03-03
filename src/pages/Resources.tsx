import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";


const posts = [
  {
    slug: "5-processen-die-elk-mkb-kan-automatiseren",
    title: "5 processen die elk MKB-bedrijf vandaag kan automatiseren",
    excerpt: "Van factuurverwerking tot lead follow-ups — deze vijf workflows kosten u onnodig tijd en zijn eenvoudig te automatiseren.",
    date: "2026-02-10",
    category: "Gids",
  },
  {
    slug: "roi-van-automatisering-berekenen",
    title: "Hoe berekent u de ROI van automatisering?",
    excerpt: "Een praktisch framework om de business case voor automatisering te onderbouwen — inclusief een gratis rekentool.",
    date: "2026-01-28",
    category: "Business",
  },
  {
    slug: "ai-vs-rpa-wat-past-bij-uw-bedrijf",
    title: "AI vs. RPA: wat past bij uw bedrijf?",
    excerpt: "Niet elke automatisering vereist AI. We leggen uit wanneer AI meerwaarde biedt en wanneer simpele RPA volstaat.",
    date: "2026-01-15",
    category: "Technisch",
  },
];

const Resources = () => {
  return (
    <Layout>
      <section className="pt-16 pb-24 relative overflow-hidden">
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Resources</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Inzichten & gidsen</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Praktische inzichten over automatisering en AI voor MKB-bedrijven. Geen vage theorie — concrete kennis die u direct kunt toepassen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/resources/${post.slug}`}
                className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">{post.category}</span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <h2 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{post.excerpt}</p>
                <span className="mt-4 text-sm text-primary inline-flex items-center gap-1 group-hover:underline">
                  Lees meer <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Resources;
