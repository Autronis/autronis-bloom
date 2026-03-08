// Layout is provided by App.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Linkedin, Clock } from "lucide-react";
import { useState } from "react";
import SEOHead from "@/components/SEOHead";

import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

const Contact = () => {
  const [sent, setSent] = useState(false);

  return (
    <>
      <SEOHead
        title="Autronis | Contact — Get in Touch"
        description="Contact Autronis for questions about automation, integrations, or a free Automation Scan. We respond within 24 hours."
        path="/contact"
      />
      <section className="pt-16 pb-24 relative overflow-hidden">
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal className="max-w-2xl mx-auto text-center mb-12">
            <ScrollRevealItem>
              <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Contact</p>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">Let's get acquainted</h1>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Want to automate, scale, or explore what's possible?
                <br />Send us a message or schedule a free Automation Scan directly.
              </p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4">
                <span><span className="text-primary">✓</span> No-obligation advice</span>
                <span><span className="text-primary">✓</span> Response within one business day</span>
                <span><span className="text-primary">✓</span> Direct contact with engineers</span>
              </div>
              <p className="text-xs text-muted-foreground/70">
                We primarily work with growing SMB companies that want to automate processes and make systems work together at scale.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>
          <ScrollReveal className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ScrollRevealItem>
              {sent ? (
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
                  <p className="text-lg font-semibold mb-2">Message sent!</p>
                  <p className="text-sm text-muted-foreground">We'll respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="you@company.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Your company name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <textarea
                      id="message"
                      required
                      placeholder="Briefly describe which process you'd like to automate or what challenges you're currently facing."
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">What happens after you submit?</p>
                    <ul className="text-xs text-muted-foreground/70 space-y-1">
                      <li>• We review your inquiry</li>
                      <li>• You'll receive a response within one business day</li>
                      <li>• If relevant, we'll schedule a short Automation Scan</li>
                    </ul>
                  </div>

                  <Button type="submit" size="lg">Start conversation <ArrowRight size={18} /></Button>
                  <p className="text-xs text-muted-foreground/60">No sales pressure. We first check whether automation actually adds value.</p>
                </form>
              )}
            </ScrollRevealItem>

            <ScrollRevealItem>
              <div className="flex flex-col justify-center space-y-6">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-semibold mb-3">Prefer to schedule directly?</h3>
                  <p className="text-sm text-muted-foreground mb-4">An Automation Scan is the fastest way to gain insight into automation opportunities within your organization.<br />Short, concrete, and completely free of obligation.</p>
                  <Button asChild className="w-full">
                    <Link to="/book">Schedule Automation Scan <ArrowRight size={14} /></Link>
                  </Button>
                  <p className="text-xs text-muted-foreground/60 text-center mt-3">No obligation • No commitments • ~30 minute call</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={16} className="text-primary" />
                    <h3 className="font-semibold">Response within 24 hours</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">We respond to every inquiry within one business day.<br />You'll quickly receive a substantive reply about the possibilities for your situation.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Direct contact</p>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Linkedin size={16} className="text-primary" />
                      <a
                        href="https://www.linkedin.com/company/autronis"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground transition-colors"
                      >
                        linkedin.com/company/autronis
                      </a>
                    </div>
                    <div className="flex items-center gap-2"><Mail size={16} className="text-primary" /> info@autronis.com</div>
                  </div>
                </div>
              </div>
            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Contact;
