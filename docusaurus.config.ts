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

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        gtag: {
          trackingID: "GTM-K96M6NZP",
          anonymizeIP: true,
        },
      },
      "@docusaurus/plugin-content-blog",
      {
        docs: false,
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
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Niko Blog",
      logo: {
        alt: "Niko Blog Logo",
        src: "img/logo.jpg",
      },
      items: [
        { to: "https://work.0xniko.dev", label: "About me", position: "left" },
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
  } satisfies Preset.ThemeConfig,

  plugins: [tailwindPlugin],
};

export default config;
