import { defineConfig } from "vitepress";

export default defineConfig({
  title: "TypeFoundry",
  description:
    "Build complex TypeScript types with variants instead of manual unions.",
  cleanUrls: true,
  themeConfig: {
    footer: {
      message: "Please leave a star on Github!",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Get started", link: "/getting-started" },
      { text: "Guide", link: "/guide" },
      { text: "API Reference", link: "/api-reference" },
    ],
    sidebar: [
      {
        text: "TypeFoundry",
        collapsed: false,
        items: [
          { text: "Get started", link: "/getting-started" },
          {
            text: "Guide",
            link: "/guide",
            items: [
              { text: "Basic variants", link: "/guide#basic-variants" },
              {
                text: "Properties attached to an option",
                link: "/guide#properties-attached-to-an-option",
              },
              {
                text: "Common properties",
                link: "/guide#common-properties",
              },
              {
                text: "Combining independent variants",
                link: "/guide#combining-independent-variants",
              },
              {
                text: "Extending an existing type",
                link: "/guide#extending-an-existing-type",
              },
              { text: "Referencing", link: "/guide#referencing" },
              {
                text: "Precedence when keys overlap",
                link: "/guide#precedence-when-keys-overlap",
              },
              { text: "Empty variants", link: "/guide#empty-variants" },
              {
                text: "When to use TypeFoundry",
                link: "/guide#when-to-use-typefoundry",
              },
            ],
          },
          {
            text: "API reference",
            link: "/api-reference",
            items: [
              { text: "TypeFoundry", link: "/api-reference#typefoundry" },
              { text: "Model fields", link: "/api-reference#model-fields" },
              { text: "TypeFoundryRef", link: "/api-reference#typefoundryref" },
              {
                text: "Type-only usage",
                link: "/api-reference#type-only-usage",
              },
            ],
          },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/dozsolti/typefoundry" },
    ],
  },
});
