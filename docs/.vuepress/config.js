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
        text: "Users",
        link: "/guide/",
      },
      {
        text: "Devs",
            prefix: "/spec/",
        items: [
          {
            text: "Introduction",
            items: [
              { text: "Architecture", link: "Architecture/" },
              { text: "Setup", link: "Setup/" },
              { text: "Heroku", link: "Heroku/" },
            ],
          },

          {
            text: "Map Component",
            items: [
              { text: "Map Overview", link: "MapOverview/" },
              { text: "Map Details", link: "MapDetails/" },
            ],
          },
          {
            text: "Calendar Component",
            items: [
              { text: "Calendar Overview", link: "CalendarOverview/" },
            ],
          },
        ],
      },
      {
        text: "Admins",
        link: "/admin/",
      },
      {
        text: "Policy",
        link: "/policy/",
      },
      {
        text: "LCT-Sisters",
        link: "/sisters/",
      },
    ],
    sidebar: ["/", "/guide/", "/spec/", "/admin/", "/policy/"],
  },
};
