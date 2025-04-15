// 前缀接口：描述词根前的词缀
interface MorphemePrefix {
  segment: string // 前缀片段
  meaning: string // 前缀含义
  origin: string // 词源（如：来自拉丁语、古希腊语等）
  linguisticRegister?: 'formal' | 'informal' // 语言使用场合：正式或非正式
}

// 词根接口：描述单词的核心词根
interface MorphemeRoot {
  segment: string // 词根片段
  meaning: string // 词根含义
  origin: string // 词源
  variantForms?: string[] // 变体形式（如：vis/vid 是同源词根的不同形式）
}

// 后缀接口：描述词根后的词缀
interface MorphemeSuffix {
  segment: string // 后缀片段
  function: string // 词性功能（如：形容词化、名词化等）
  productivity?: 'high' | 'medium' | 'low' // 生产力：表示该后缀的使用频率和能产性
  origin?: string // 词源（可选）
  meaning: string // 后缀含义
}

// 词素分析接口：完整的词素分析结构
interface MorphemeAnalysis {
  prefixes: MorphemePrefix[] // 前缀列表
  roots: MorphemeRoot[] // 词根列表
  suffixes: MorphemeSuffix[] // 后缀列表
}

// 同源词接口：记录相关的同源词
interface Cognate {
  word: string // 同源词
  type: 'noun' | 'verb' | 'adjective' | 'adverb' // 词性
  meaning: string // 含义
}

// 语义演变接口：记录词义的历史演变
interface SemanticEvolution {
  literal: string // 字面原始含义
  modern: string // 现代含义
  path?: string // 演变路径（可选）
}

// 使用示例接口：中英文对照的例句
interface UsageExamples {
  en: string // 英文例句
  zh: string // 中文翻译
}

// 词语用法接口：包含例句和同源词
interface WordUsage {
  examples: UsageExamples[] // 使用示例列表
  cognates: Cognate[] // 同源词列表
}

// 输出接口：完整的单词分析结果
export interface MorphemeAnalysisOutput {
  word: string // 目标单词
  morphemes: MorphemeAnalysis // 词素分析
  semanticEvolution: SemanticEvolution // 语义演变
  usage: WordUsage // 用法示例
  warnings?: string[] // 警告信息（如有）
}
