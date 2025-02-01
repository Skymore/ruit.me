import type { Project } from '~/types/data'

const PROJECT_TYPE = {
  WORK: 'work',
  SELF: 'self'
} as const

export const PROJECTS: Project[] = [
  {
    type: PROJECT_TYPE.WORK,
    title: 'Traffic Analysis System at Parkalytics',
    date: '2024-01',
    description:
      'Led UW ECE Capstone Project focused on traffic analysis and vehicle tracking using computer vision and deep learning.\n' +
      'Processed and enhanced video frames with advanced preprocessing techniques, converting tracking datasets to object detection format with corrected annotations.\n' +
      'Engineered comprehensive traffic dataset by merging VisDrone and custom datasets with data augmentation strategies.\n' +
      'Trained and evaluated models using YOLOv8x and GELAN-C architectures, achieving mAP@0.50 of 0.545 and 0.52.\n' +
      'Integrated YOLOv8/9 with ByteTrack for real-time vehicle tracking and counting in video footage.',
    imgSrc: '/static/images/parkalytics.svg',
    builtWith: ['Python', 'TensorFlow', 'YOLOv8', 'ByteTrack', 'Computer Vision', 'Deep Learning'],
    links: [
      { title: 'Internal Project', url: '#' }
    ]
  },
  {
    type: PROJECT_TYPE.WORK,
    title: 'Well Log Analysis Platform at SLB',
    date: '2024-09',
    description:
      'High-performance platform with React/Flask/MongoDB stack on Azure, featuring well log generation, model lifecycle management, and real-time task monitoring.\n' +
      'Engineered parallel task processing system using Python multiprocessing to bypass GIL, achieving 8x throughput for concurrent tasks.\n' +
      'Implemented well log resolution enhancement using Autoencoder-SVR hybrid model with TensorFlow.',
    imgSrc: '/static/images/well-log-analysis.svg',
    builtWith: ['Python', 'React', 'Flask', 'MongoDB', 'TensorFlow', 'Azure', 'Multiprocessing'],
    links: [
      { title: 'Internal Project', url: '#' }
    ]
  },
  {
    type: PROJECT_TYPE.WORK,
    title: 'Game Development at Alibaba',
    date: '2024-06',
    description:
      'Implemented pathfinding system for SLG game using optimized A* algorithm on Lua and C++ hybrid model, capable of handling 1500×1500 hex grid within 200ms, with path smoothing optimization.\n' +
      'Developed a Roguelike Shooter demo using Lua and a custom timer with adjustable timescale, pause, and resume.\n' +
      'Created the game replay system for online card game Morimens, with the server storing game frame instructions and states on an OSS service, and the client retrieving data directly from OSS and replaying.\n' +
      'Optimized the social system for Morimens with segmented caching, asynchronous preloading, and selective retrieval, reducing avg and max RPC times by 83.2% and 99.1%, earning positive feedback.',
    imgSrc: '/static/images/game-development.svg',
    builtWith: ['C++', 'Lua', 'Unity', 'Game Development', 'OSS'],
    links: [
      { title: 'Roguelike Demo', url: 'https://youtu.be/CFG76TDBImw' },
      { title: 'Morimens', url: 'https://store.steampowered.com/app/3052450/Morimens/' }
    ]
  },
  {
    type: PROJECT_TYPE.SELF,
    title: 'AI-Enhanced Mock Interview Platform',
    date: '2024-11',
    description:
      'A microservices platform using React, NestJS, and Python FastAPI, featuring realtime video with WebRTC, AI-driven interview analysis, and deployed on Google Cloud Platform.\n' +
      'Implemented realtime speech recognition and AI-driven post-interview analysis using OpenAI and LangChain.\n' +
      'Designed RESTful APIs with Firebase Auth and MongoDB for data persistence.',
    imgSrc: '/static/images/mock-interview.svg',
    builtWith: ['TypeScript', 'Python', 'React', 'NestJS', 'FastAPI',  'MongoDB', 'OpenAI', 'WebRTC'],
    url: 'https://mocki.ruit.me',
    links: [
      { title: 'Website', url: 'https://mocki.ruit.me' },
      { title: 'Private Project', url: '#' }
    ]
  },
  {
    type: PROJECT_TYPE.SELF,
    title: 'P2P Video On-Demand Web Server',
    date: '2023-12',
    description:
      'High-performance C++ server using Reactor pattern, Epoll, and thread pools, with secure authentication using MySQL and Redis.\n' +
      'Engineered secure user authentication with 5-minute SessionIDs and Bloom filter.\n' +
      'Applied regular expressions and state machines for HTTP request parsing.\n' +
      'Created asynchronous logging system using singleton pattern and blocking queue.',
    imgSrc: '/static/images/vod-server.svg',
    builtWith: ['C++', 'MySQL', 'Redis', 'Thread Pool', 'Epoll', 'UDP', 'Reactor Pattern'],
    repo: 'Skymore/CPP-Based-Asynchronous-Processing-Framework',
    links: [
      { title: 'GitHub', url: 'https://github.com/Skymore/CPP-Based-Asynchronous-Processing-Framework' }
    ]
  },
  {
    type: PROJECT_TYPE.SELF,
    title: 'Developer Social Media',
    date: '2023-09',
    description:
      'An interactive social networking platform for developers built with MERN stack.\n' +
      'Features include secure user authentication, customizable developer profiles, GitHub integration for displaying repositories, and responsive design.\n' +
      'Enables developers to post updates, share insights, and engage in technical discussions.',
    imgSrc: '/static/images/dev-social.svg',
    builtWith: ['JavaScript', 'React', 'Node', 'Express', 'MongoDB', 'GitHub'],
    repo: 'Skymore/DeveloperSocialMedia',
    url: 'https://developer-social-media-3cf4199adb9f.herokuapp.com/',
    links: [
      { title: 'Demo', url: 'https://developer-social-media-3cf4199adb9f.herokuapp.com/' },
      { title: 'GitHub', url: 'https://github.com/Skymore/DeveloperSocialMedia' }
    ]
  },
  {
    type: PROJECT_TYPE.SELF,
    title: 'CUDA-Based Geophysical Simulation',
    date: '2023-06',
    description:
      'Accelerating Three-Dimensional FDTD Wavefield Propagation and Reverse Time Imaging using CUDA parallel programming.\n' +
      'Focused on improving time efficiency of 3D FDTD modeling by refactoring wavefield extension process from Matlab to CUDA.\n' +
      'Achieved 40x faster performance compared to CPU serial programming.',
    imgSrc: '/static/images/cuda-simulation.svg',
    builtWith: ['C++', 'CUDA', 'Matlab', 'Parallel Computing'],
    repo: 'Skymore/CUDA-Based-Geophysical-Simulation-for-Underground-Exploration',
    links: [
      { title: 'GitHub', url: 'https://github.com/Skymore/CUDA-Based-Geophysical-Simulation-for-Underground-Exploration' }
    ]
  },
  {
    type: PROJECT_TYPE.SELF,
    title: 'Adventure Bot: A Tale of Exploration',
    date: '2023-03',
    description:
      'An engaging simulation where a persistent robot navigates through a dynamic landscape with unexpected obstacles and shifting targets.\n' +
      'Features include dynamic exploration, interactive objectives, intelligent obstacle avoidance, and renewable goals.\n' +
      'Built with Docker and uses Elma and Enviro frameworks.',
    imgSrc: '/static/images/adventure-bot.svg',
    builtWith: ['C++', 'Docker', 'Elma', 'Enviro'],
    repo: 'Skymore/Adventure-Bot-A-Tale-of-Exploration',
    links: [
      { title: 'GitHub', url: 'https://github.com/Skymore/Adventure-Bot-A-Tale-of-Exploration' }
    ]
  },
  {
    type: PROJECT_TYPE.SELF,
    title: 'RunTracker',
    date: '2023-01',
    description:
      'Android application developed in Kotlin for tracking running activities.\n' +
      'Features include running route tracking, step counting, calorie calculation, weather information, photo gallery, and activity history.\n' +
      'Implements Material Design and supports dark mode.',
    imgSrc: '/static/images/run-tracker.svg',
    builtWith: ['Android', 'Kotlin', 'Material Design', 'Google Maps API'],
    repo: 'Skymore/run-tracker-kotlin',
    url: 'https://www.youtube.com/watch?v=IA1gVsiLBIU',
    links: [
      { title: 'Demo Video', url: 'https://www.youtube.com/watch?v=IA1gVsiLBIU' },
      { title: 'GitHub', url: 'https://github.com/Skymore/run-tracker-kotlin' }
    ]
  }
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
