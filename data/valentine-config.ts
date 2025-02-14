export interface ValentineConfig {
  recipient: {
    name: string
  }
  sender: {
    name: string
  }
  letter: {
    content: string[]
  }
  game: {
    reward: {
      code: string
      amount: number
      currency: string
    }
  }
  lang?: 'en' | 'zh'
}

export const DEFAULT_VALENTINE_CONFIG: ValentineConfig = {
  recipient: {
    name: 'Valentine',
  },
  sender: {
    name: 'Secret Admirer',
  },
  letter: {
    content: [
      'Every moment with you is a gift that I cherish deeply. Your smile brightens my days, and your love makes my world complete.',
      'On this special day, I want to remind you how much you mean to me and how grateful I am to have you in my life.',
    ],
  },
  game: {
    reward: {
      code: 'LOVE2025',
      amount: 520,
      currency: '$',
    },
  },
  lang: 'en',
}

export const DEFAULT_VALENTINE_CONFIG_ZH: ValentineConfig = {
  recipient: {
    name: '亲爱的',
  },
  sender: {
    name: '你的爱人',
  },
  letter: {
    content: [
      '与你在一起的每一刻都是我珍藏的礼物。你的微笑照亮了我的生活，你的爱让我的世界完整。',
      '在这特别的日子里，我想告诉你，你对我来说有多重要，以及我有多感激生命中有你的陪伴。',
    ],
  },
  game: {
    reward: {
      code: 'LOVE2025',
      amount: 520,
      currency: '¥',
    },
  },
  lang: 'zh',
}
