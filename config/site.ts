export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "My CRUD App",
  description: "A simple CRUD application built with Next.js",
  navItems: [
    { label: "Home", href: "/" }
  ],
  links: {
    github: "https://github.com",
    docs: "https://nextjs.org/docs"
  }
};
