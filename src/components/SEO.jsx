import React, { useEffect } from "react";

const BASE_URL = "https://varshaagro.com";
const DEFAULT_TITLE = "VARSHA AGRO | Foods and Feeds | Layer Poultry & Egg Production";
const DEFAULT_DESC = "VARSHA AGRO produces premium table eggs, layer poultry birds, and farm-made poultry feed with sustainable manure utilization in Dharashiv, Maharashtra.";
const DEFAULT_OG_IMAGE = "https://varshaagro.com/og-image.jpg";

export default function SEO({
  title,
  description = DEFAULT_DESC,
  canonicalPath = "",
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website"
}) {
  const fullTitle = title ? `${title} | VARSHA AGRO` : DEFAULT_TITLE;
  const canonicalUrl = `${BASE_URL}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // 2. Helper to set or create meta tag
    const setMeta = (nameOrProp, key, value) => {
      let el = document.querySelector(`meta[${nameOrProp}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(nameOrProp, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:type", ogType);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // 3. Update Canonical link
    let linkCanonical = document.querySelector("link[rel='canonical']");
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", canonicalUrl);
  }, [fullTitle, description, canonicalUrl, ogImage, ogType]);

  // React 19 native document head elements
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  );
}
