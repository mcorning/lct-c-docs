module.exports = {
  title: "Local Contact Tracing",
  description:
    "A COVID-19 Early Warning System for small communities and large organizations.",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: "",
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: false,
    nav: [
      {
        text: "Guide",
        link: "/guide/",
      },
      {
        text: "Spec",
        link: "/spec/",
      },
      {
        text: "Config",
        link: "/config/",
      },
      {
        text: "LCT-Sisters",
        link: "https://lct-c2.herokuapps.com",
      },
    ],
    sidebar: {
      "/guide/": [
        {
          title: "User Guide",
          collapsable: false,
        },
      ],
      "/spec/": [
        {
          title: "Technical Docs",
        },
      ],
    },
  },
};
