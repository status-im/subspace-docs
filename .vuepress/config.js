module.exports = {
  title: 'SUBSPACE',
  description: 'Reactive ÐApp Development',
  base: '/subspace-docs/',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: "/assets/img/logo-small.png",
    displayAllHeaders: true,
    search: false,
    nav: [
      { text: 'Getting Started', link: '/getting-started/' },
      { text: 'Tutorial', link: '/tutorial' },
      { text: 'Integrations', link: '/integrations-overview' },
      { text: 'API', link: '/api' },
      { text: 'Github', link: 'https://github.com/status-im/subspace' },
    ],
    sidebar: [
      '/',
      '/how-it-works',
      '/getting-started',
      {
        title: 'Integrations',
        collapsable: false,
        children: [
          ['/integrations-overview', 'Overview'],
          '/react',
          {
            title: 'Redux',
            collapsable: false,
            children: [
              '/redux',
              '/redux-observable'
            ]
          },
          '/reactive-graphql',
          '/apollo-client'
        ]
      },
      ['/tutorial', 'Tutorial'],
      '/api'
    ]
  },
};
