// 导入相关依赖和类型定义
import atomForConfig from './atomForConfig'
import { reviewInfoAtom } from './reviewInfoAtom'
import { DISMISS_START_CARD_DATE_KEY, defaultFontSizeConfig } from '@/constants'
import { idDictionaryMap } from '@/resources/dictionary'
import { correctSoundResources, keySoundResources, wrongSoundResources } from '@/resources/soundResource'
import type {
  Dictionary,
  InfoPanelState,
  LoopWordTimesOption,
  PhoneticType,
  PronunciationType,
  WordDictationOpenBy,
  WordDictationType,
} from '@/typings'
import type { ReviewRecord } from '@/utils/db/record'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// 当前词典相关状态
export const currentDictIdAtom = atomWithStorage('currentDict', 'cet4') // 当前词典ID，默认为四级词典
export const currentDictInfoAtom = atom<Dictionary>((get) => {
  const id = get(currentDictIdAtom)
  let dict = idDictionaryMap[id]
  // 如果 dict 不存在，则返回 cet4. Typing 中会检查 DictId 是否存在，如果不存在则会重置为 cet4
  if (!dict) {
    dict = idDictionaryMap.cet4
  }
  return dict
})

// 当前章节状态
export const currentChapterAtom = atomWithStorage('currentChapter', 0)

// 单词循环配置
export const loopWordConfigAtom = atomForConfig<{ times: LoopWordTimesOption }>('loopWordConfig', {
  times: 1,
})

// 按键音效配置
export const keySoundsConfigAtom = atomForConfig('keySoundsConfig', {
  isOpen: true, // 是否开启按键音效
  isOpenClickSound: true, // 是否开启点击音效
  volume: 1, // 音量
  resource: keySoundResources[0], // 音效资源
})

// 提示音效配置
export const hintSoundsConfigAtom = atomForConfig('hintSoundsConfig', {
  isOpen: true, // 是否开启提示音效
  volume: 1, // 音量
  isOpenWrongSound: true, // 是否开启错误提示音
  isOpenCorrectSound: true, // 是否开启正确提示音
  wrongResource: wrongSoundResources[0], // 错误音效资源
  correctResource: correctSoundResources[0], // 正确音效资源
})

// 发音配置
export const pronunciationConfigAtom = atomForConfig('pronunciation', {
  isOpen: true, // 是否开启发音
  volume: 1, // 音量
  type: 'us' as PronunciationType, // 发音类型（美音）
  name: '美音',
  isLoop: false, // 是否循环播放
  isTransRead: false, // 是否朗读翻译
  transVolume: 1, // 翻译音量
  rate: 1, // 播放速率
})

// 字体大小配置
export const fontSizeConfigAtom = atomForConfig('fontsize', defaultFontSizeConfig)

// 发音开关状态
export const pronunciationIsOpenAtom = atom((get) => get(pronunciationConfigAtom).isOpen)
export const pronunciationIsTransReadAtom = atom((get) => get(pronunciationConfigAtom).isTransRead)

// 随机播放配置
export const randomConfigAtom = atomForConfig('randomConfig', {
  isOpen: false,
})

// UI 显示相关配置
export const isShowPrevAndNextWordAtom = atomWithStorage('isShowPrevAndNextWord', true) // 显示上一个/下一个单词
export const isIgnoreCaseAtom = atomWithStorage('isIgnoreCase', true) // 忽略大小写
export const isShowAnswerOnHoverAtom = atomWithStorage('isShowAnswerOnHover', true) // 悬停显示答案
export const isTextSelectableAtom = atomWithStorage('isTextSelectable', false) // 文本是否可选

// 复习模式相关状态
export const reviewModeInfoAtom = reviewInfoAtom({
  isReviewMode: false,
  reviewRecord: undefined as ReviewRecord | undefined,
})
export const isReviewModeAtom = atom((get) => get(reviewModeInfoAtom).isReviewMode)

// 音标配置
export const phoneticConfigAtom = atomForConfig('phoneticConfig', {
  isOpen: true,
  type: 'us' as PhoneticType,
})

// 深色模式配置
export const isOpenDarkModeAtom = atomWithStorage('isOpenDarkModeAtom', window.matchMedia('(prefers-color-scheme: dark)').matches)

// 其他功能开关
export const isShowSkipAtom = atom(false) // 显示跳过按钮
export const isInDevModeAtom = atom(false) // 开发者模式

// 信息面板状态
export const infoPanelStateAtom = atom<InfoPanelState>({
  donate: false, // 捐赠面板
  vsc: false, // VSCode 面板
  community: false, // 社区面板
  redBook: false, // 小红书面板
})

// 单词听写配置
export const wordDictationConfigAtom = atomForConfig('wordDictationConfig', {
  isOpen: false,
  type: 'hideAll' as WordDictationType,
  openBy: 'auto' as WordDictationOpenBy,
})

// 开始卡片显示时间
export const dismissStartCardDateAtom = atomWithStorage<Date | null>(DISMISS_START_CARD_DATE_KEY, null)

// for dev test
//   dismissStartCardDateAtom = atom<Date | null>(new Date())
