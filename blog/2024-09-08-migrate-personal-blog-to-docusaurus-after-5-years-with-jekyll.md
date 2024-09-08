---
title: From Jekyll to Docusaurus, Why I Migrated My Blog After 5 Years
description: After five years of running my engineering blog on Jekyll, I’ve decided to migrate to Docusaurus
tags: [blog, docusaurus]
authors: [niko]
---

## Reflecting on 5 Years with Jekyll: Why I Migrated My Engineering Blog to Docusaurus

After five years of running my engineering blog on Jekyll, I’ve decided to migrate to Docusaurus. This decision came after extensive evaluation of my blogging needs and the capabilities of various platforms. In this post, I’ll share the reasons behind the migration, the benefits I’ve experienced, and the improvements I’ve seen with Docusaurus.

<!-- truncate -->

### Why Leave Jekyll After 5 Years?

Jekyll has served me well over the years, but as my blog evolved, certain limitations became more apparent. Here’s why I chose to make the switch to Docusaurus:

1. **User Experience Overhaul:**
   Jekyll provided a solid foundation, but its user interface started to feel outdated. Docusaurus offers a modern, sleek design that enhances the reader’s experience. The default theme and customizable options in Docusaurus are more aligned with current web standards, offering a better user experience.

2. **Enhanced Performance:**
   As my blog grew, I noticed performance issues with Jekyll. Docusaurus’s React-based architecture allows for faster page loads and more interactive features. This performance improvement is crucial for retaining readers and improving engagement.

3. **Better Content Management:**
   Jekyll’s content management is straightforward but can be limiting for complex needs. Docusaurus excels in handling structured content, especially for documentation and blog posts, with features like easy content versioning and search capabilities.

4. **Customization Flexibility:**
   Customizing Jekyll themes required a deep dive into Ruby and Liquid templates, which could be cumbersome. Docusaurus, built on React, allows for more flexible and modular customization. Integrating tools like Tailwind CSS has simplified the process of styling my site to match my vision.

5. **Streamlined Deployment and Automation:**
   While Jekyll’s deployment with GitHub Pages was functional, Docusaurus offers a more streamlined approach with automated build processes. I’ve set up GitHub Actions to handle the build and deployment seamlessly, which saves time and reduces manual intervention.

### Migration Process and Key Changes

Here’s a closer look at the steps I took to migrate from Jekyll to Docusaurus and the changes that came with it:

#### 1. **Initiating Docusaurus**

I began by setting up a new Docusaurus site with the `create-docusaurus` command:

```sh
npx create-docusaurus@latest my-blog classic
```

This provided a fresh and modern foundation to build upon. The classic preset includes a ready-to-go blog setup that made the initial transition smoother.

#### 2. **Configuring the New Site**

The `docusaurus.config.js` file was configured to reflect my previous blog’s settings, including site title and URL. The configuration options in Docusaurus are more intuitive and flexible compared to Jekyll’s `_config.yml`:

```js
const config = {
  title: 'Niko Blog',
  tagline: 'Niko typing...',
  url: 'https://blog.0xniko.dev',
  baseUrl: '/',
  favicon: 'img/logo.jpg',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: false,
        blog: {
          routeBasePath: '/',
          blogSidebarTitle: 'Recent posts',
          blogSidebarCount: 3,
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
```

#### 3. **Migrating Content**

Migrating content from Jekyll involved converting Markdown files and adjusting formats. Docusaurus’s Markdown support is robust and easier to work with, making this process smoother.

#### 4. **Customizing the Look and Feel**

Customizing Docusaurus was a breeze compared to Jekyll. I used Tailwind CSS for a modern, responsive design. The integration process is well-documented and straightforward. For details on theme customization, see the [Docusaurus styling guide](https://docusaurus.io/docs/styling-layout).

#### 5. **Automating Deployment**

I set up GitHub Actions to automate the build and deployment process. The new workflow file in `.github/workflows/deploy.yml` ensures that any changes pushed to the `main` branch are automatically built and deployed:

```yaml
name: Build and Deploy Docusaurus Site

on:
  push:
    branches:
      - main

concurrency:
  group: 'docusaurus-${{ github.workflow }}-${{ github.ref }}'
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm install

      - name: Build Docusaurus site
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

### Conclusion

Migrating from Jekyll to Docusaurus has revitalized my blog with modern features, improved performance, and greater flexibility. The transition has been a significant upgrade, aligning better with my current needs and future growth.

If you’re considering a similar move, I hope this guide provides valuable insights. Feel free to reach out with any questions or if you need help with your own migration.

Anyway too love Open Source like Jekyll.

### References

- I publish source code here: [https://github.com/niko0xdev/0xblog](https://github.com/niko0xdev/0xblog)

- Docusaurus documents: [https://docusaurus.io/docs/blog](https://docusaurus.io/docs/blog)