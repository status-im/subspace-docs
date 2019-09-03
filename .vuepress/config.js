module.exports = {
  title: 'Phoenix',
  description: 'Reactive ÐApp Development',
  base: '/phoenix-docs/',
  themeConfig: {
    displayAllHeaders: true,
    nav: [
      { text: 'Getting Started', link: '/getting-started/' },
      { text: 'API', link: '/api' },
      { text: 'Integrations', link: '/integrations-overview' },
      { text: 'Github', link: 'https://github.com/status-im/phoenix' },
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
          '/redux',
          '/redux-observables'
        ]
      },
      '/api',
    ]
  },
};
