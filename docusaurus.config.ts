import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

import tailwindPlugin from "./plugins/tailwind-config.cjs";

const config: Config = {
  title: "Niko Blog",
  tagline: "Niko typing...",
  favicon: "img/logo.jpg",

  // Set the production url of your site here
  url: "https://blog.0xniko.dev",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "niko0xdev", // Usually your GitHub org/user name.
  projectName: "0xblog", // Usually your repo name.

  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: false,
        gtag: {
          trackingID: "G-8J84G37YMT",
          anonymizeIP: true,
        },
        blog: {
          routeBasePath: "/",
          blogSidebarTitle: "Recent posts",
          blogSidebarCount: 3,
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } as any,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/logo.jpg",
    navbar: {
      title: "Niko Blog",
      logo: {
        alt: "Niko Blog Logo",
        src: "img/logo.jpg",
      },
      items: [
        { to: "https://0xniko.dev", label: "About me", position: "left" },
        {
          href: "https://github.com/niko0xdev",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Readee",
          items: [
            {
              label: "RSS",
              to: "/rss.xml",
            },
            {
              label: "ATOM",
              to: "/atom.xml",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/duyluongphung/",
            },
            {
              label: "Twitter",
              href: "https://x.com/nikoderdev",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/niko0xdev/0xblog",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Niko Blog.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    mermaid: {
      theme: { light: "neutral", dark: "forest" },
    },
  } satisfies Preset.ThemeConfig,

  plugins: [tailwindPlugin],

  markdown: {
    mermaid: true,
  },

  themes: ["@docusaurus/theme-mermaid"],
};

export default config;
