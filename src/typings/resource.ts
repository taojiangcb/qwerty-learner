import type { LanguageCategoryType, LanguageType, PronunciationType } from '.'

// 词典资源类型：定义词典的基本信息和属性
export type DictionaryResource = {
  id: string // 词典唯一标识符
  name: string // 词典名称
  description: string // 词典描述
  category: string // 词典分类（如：CET4、TOEFL等）
  tags: string[] // 词典标签（用于分类和筛选）
  url: string // 词典资源链接
  length: number // 词典包含的单词数量
  language: LanguageType // 词典语言类型
  languageCategory: LanguageCategoryType // 语言分类（如：英语、日语等）
  defaultPronIndex?: number // 可选的默认发音索引，覆盖默认发音设置
}

// 词典类型：扩展自 DictionaryResource，增加了运行时计算的属性
export type Dictionary = {
  id: string // 词典唯一标识符
  name: string // 词典名称
  description: string // 词典描述
  category: string // 词典分类
  tags: string[] // 词典标签
  url: string // 词典资源链接
  length: number // 词典单词数量
  language: LanguageType // 词典语言类型
  languageCategory: LanguageCategoryType // 语言分类
  chapterCount: number // 章节数量（在 store 中计算）
  defaultPronIndex?: number // 可选的默认发音索引
}

// 发音配置类型：定义单个发音选项的配置
export type PronunciationConfig = {
  name: string // 发音名称（如：美音、英音）
  pron: PronunciationType // 发音类型
}

// 语言发音映射配置：定义特定语言的发音选项
export type LanguagePronunciationMapConfig = {
  defaultPronIndex: number // 默认发音索引
  pronunciation: PronunciationConfig[] // 可用的发音配置列表
}

// 语言发音映射：将语言类型映射到对应的发音配置
export type LanguagePronunciationMap = {
  [key in LanguageType]: LanguagePronunciationMapConfig
}

// 音效资源类型：定义按键音效等声音资源
export type SoundResource = {
  key: string // 音效唯一标识符
  name: string // 音效名称
  filename: string // 音效文件名
}
