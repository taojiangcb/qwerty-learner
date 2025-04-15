export * from './resource'

export type PronunciationType = 'us' | 'uk' | 'romaji' | 'zh' | 'ja' | 'de' | 'hapin' | 'kk' | 'id'
export type PhoneticType = 'us' | 'uk' | 'romaji' | 'zh' | 'ja' | 'de' | 'hapin' | 'kk' | 'id'
export type LanguageType = 'en' | 'romaji' | 'zh' | 'ja' | 'code' | 'de' | 'kk' | 'hapin' | 'id'
export type LanguageCategoryType = 'en' | 'ja' | 'de' | 'code' | 'kk' | 'id'

type Pronunciation2PhoneticMap = Record<PronunciationType, PhoneticType>

export const PRONUNCIATION_PHONETIC_MAP: Pronunciation2PhoneticMap = {
  us: 'us',
  uk: 'uk',
  romaji: 'romaji',
  zh: 'zh',
  ja: 'ja',
  de: 'de',
  hapin: 'hapin',
  kk: 'kk',
  id: 'id',
}

// 单词数据结构：定义单词的基本信息
export type Word = {
  name: string // 单词本身
  trans: string[] // 单词的翻译/释义列表
  usphone: string // 美式音标
  ukphone: string // 英式音标
  notation?: string // 可选的注释说明（如：用法、语法等补充信息）
}

export type WordWithIndex = Word & {
  // 在 chapter 中的原始索引
  index: number
}

// 信息面板类型：定义可显示的信息面板种类
export type InfoPanelType = 'donate' | 'vsc' | 'community' | 'redBook' // 捐赠面板|VSCode面板|社区面板|小红书面板

// 信息面板状态：使用映射类型记录每个面板的显示状态
export type InfoPanelState = {
  [key in InfoPanelType]: boolean // 每个面板对应一个布尔值，true表示显示，false表示隐藏
}

export type LoopWordTimesOption = 1 | 3 | 5 | 8 | typeof Number.MAX_SAFE_INTEGER

export type WordDictationType = 'hideAll' | 'hideVowel' | 'hideConsonant' | 'randomHide'
/**
 * 标记用户是手动打开默写模式，还是通过点击 resultScreen 中的默写本章按钮打开的
 *
 * 预期行为是，在进入下一章节时，如果是手动打开的默写模式，则保持设定
 * 如果是通过点击 resultScreen 中的默写本章按钮打开的，则关闭默写模式
 */
export type WordDictationOpenBy = 'user' | 'auto'
