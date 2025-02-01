export const SITE_METADATA = {
  title: `Rui Tao's Portfolio – MS Student in ECE @ UW`,
  author: 'Rui Tao',
  headerTitle: `Rui Tao's Portfolio`,
  description:
    'MS Student in Electrical and Computer Engineering at University of Washington, with experience in Full-Stack Development, Game Development, and AI.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://ruit.me',
  siteRepo: 'https://github.com/skymore/ruit.me',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.jpg`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.jpeg`,
  email: 'realruitao@gmail.com',
  github: 'https://github.com/skymore',
  youtube: 'https://www.youtube.com/@realruitao',
  linkedin: 'https://www.linkedin.com/in/ruit/',
  x: 'https://x.com/Rui1223456',
  locale: 'en-US',
  stickyNav: true,
  resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL || '/static/resume.pdf', // Cloud storage URL for resume, fallback to local file
  goodreadsFeedUrl: 'https://www.goodreads.com/review/list_rss/10000000000000000000',
  goodreadsBookshelfUrl: 'https://www.goodreads.com/review/list/your-user-id',
  imdbRatingsList: 'https://www.imdb.com/user/your-user-id/ratings',
  analytics: {
    umamiAnalytics: {
      websiteId: process.env.NEXT_UMAMI_ID,
      src: process.env.NEXT_UMAMI_URL,
      shareUrl: 'https://cloud.umami.is/share/iKe3AMTcVZgtnyO8/ruit.me',
    },
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  comments: {
    giscusConfigs: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO!,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID!,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY!,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!,
      mapping: 'title', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
    },
  },
  search: {
    kbarConfigs: {
      // path to load documents to search
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
} as const
