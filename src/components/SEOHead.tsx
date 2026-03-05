import { useEffect } from "react";

const BASE_URL = "https://autronis-bloom.lovable.app";
const OG_IMAGE = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5dbe20cc-6391-43fb-8083-b6f9d16fe356/id-preview-0e3d4c60--1ea61a22-1939-426f-b87d-cfadab734899.lovable.app-1771852282557.png";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const setMeta = (attr: string, key: string, content: string) => {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setLink = (rel: string, href: string) => {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const SEOHead = ({ title, description, path, type = "website", jsonLd }: SEOHeadProps) => {
  useEffect(() => {
    const fullUrl = `${BASE_URL}${path}`;

    // Title
    document.title = title;

    // Meta
    setMeta("name", "description", description);
    setMeta("name", "robots", "index, follow");

    // Canonical
    setLink("canonical", fullUrl);

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", fullUrl);
    setMeta("property", "og:type", type);
    setMeta("property", "og:image", OG_IMAGE);
    setMeta("property", "og:site_name", "Autronis");
    setMeta("property", "og:locale", "nl_NL");

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", OG_IMAGE);

    // JSON-LD
    const scriptId = "seo-jsonld";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (jsonLd) {
      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd);
    } else if (script) {
      script.remove();
    }

    return () => {
      // Cleanup JSON-LD on unmount
      const s = document.getElementById(scriptId);
      if (s) s.remove();
    };
  }, [title, description, path, type, jsonLd]);

  return null;
};

export default SEOHead;

// Shared JSON-LD schemas
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Autronis",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description: "Autronis automatiseert processen, integreert systemen en bouwt realtime data-inzichten voor groeiende bedrijven.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: "Dutch",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Autronis",
  url: BASE_URL,
  description: "Systeemarchitectuur & automatisering voor groeiende bedrijven.",
  publisher: { "@type": "Organization", name: "Autronis" },
};
