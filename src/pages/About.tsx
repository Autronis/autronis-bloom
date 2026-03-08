// Layout is provided by App.tsx
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Shield, Users, Handshake } from "lucide-react";
import SEOHead from "@/components/SEOHead";

import { useState, useEffect } from "react";
import fotoSyb from "@/assets/foto_syb.jpg";
import fotoSem from "@/assets/foto_sem.jpg";

if (typeof window !== "undefined") {
  const sybPreload = new Image();
  sybPreload.src = fotoSyb;
}

const values = [
  { icon: Target, title: "Results-driven", description: "We measure success in saved hours, fewer errors, and faster processes — not in delivered features." },
  { icon: Shield, title: "Transparent", description: "No hidden costs, no black boxes. You understand what we build and why. Everything is documented and transferable." },
  { icon: Users, title: "Personal", description: "No account managers, no middle layers. You work directly with the engineers who design and build your systems." },
  { icon: Handshake, title: "Long-term partnership", description: "We're not a vendor but your automation partner. Your growth is our growth — we think along, even after delivery." },
];

const team = [
  {
    name: "Syb Sprenkeler",
    role: "Co-founder",
    photo: fotoSyb,
    priority: true,
    description: "Syb has a keen eye for technical detail and is the driving force behind the build. He always thinks one step ahead and ensures every system not only works but is also scalable and future-proof.",
  },
  {
    name: "Sem Gijsberts",
    role: "Co-founder",
    photo: fotoSem,
    description: "Sem builds alongside, thinks ahead, and maintains oversight. From the first client conversation to the delivered system — he's involved in every step and makes sure nothing falls through the cracks.",
  },
];

const TeamCard = ({ member }: { member: typeof team[0] }) => {
  const [hovered, setHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.src = member.photo;

    if (img.complete) {
      setImageLoaded(true);
      return;
    }

    img.onload = () => {
      if (!cancelled) setImageLoaded(true);
    };
    img.onerror = () => {
      if (!cancelled) setImageLoaded(true);
    };

    return () => {
      cancelled = true;
    };
  }, [member.photo]);

  return (
    <div
      className="relative rounded-xl border border-border bg-card overflow-hidden group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={member.photo}
          alt={member.name}
          className={`w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? "opacity-100 blur-0" : "opacity-80 blur-[2px]"
          }`}
          loading={member.priority ? "eager" : "lazy"}
          fetchPriority={member.priority ? "high" : "auto"}
          decoding={member.priority ? "sync" : "async"}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
        <div
          className={`absolute inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-6 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-sm text-white leading-relaxed text-center">
            {member.description}
          </p>
        </div>
      </div>
      <div className="p-4 text-center">
        <p className="font-semibold">{member.name}</p>
        <p className="text-sm text-muted-foreground">{member.role}</p>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <>
      <SEOHead
        title="Autronis | About Us — System Architecture & Automation"
        description="Learn more about Autronis: our team, our values, and our mission to help businesses grow with scalable automation."
        path="/about"
      />
      <section className="pt-16 pb-24 relative overflow-hidden">
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Intro */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">About Us</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              Systems that <span className="text-gradient">come to life</span>
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Autronis was founded with one mission: freeing businesses from repetitive manual work. We believe that every predictable process can be automated.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              We are Sem and Syb. You work directly with the builders — the people who design, build, and optimize your systems.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our team combines deep technical expertise with business insight. We don't build tools for the sake of building — we build solutions that deliver directly measurable impact on your operations.
            </p>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8">Our values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((v) => (
                <div key={v.title} className="rounded-xl border border-border bg-card p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <v.icon size={20} />
                  </div>
                  <h3 className="font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8">The team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
              {team.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-3">Ready to work together?</h2>
            <p className="text-muted-foreground mb-6">Let's get acquainted and explore what we can automate.</p>
            <Button asChild size="lg">
              <Link to="/book">Schedule Automation Scan <ArrowRight size={18} /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
