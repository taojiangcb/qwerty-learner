import type { MorphemeAnalysisOutput } from '../../typings/morphemeAnalysis'
import { db } from './index'
import { useCallback } from 'react'

export function useMorphemeAnalysis() {
  const saveMorphemeAnalysis = useCallback(async (analysis: MorphemeAnalysisOutput) => {
    try {
      const existingAnalysis = await db.morphemeAnalysis.where('word').equals(analysis.word).first()
      if (!existingAnalysis) {
        const recordToSave = {
          ...analysis,
          timestamp: Date.now(),
        }
        await db.morphemeAnalysis.add(recordToSave)
      }
      return true
    } catch (error) {
      console.error('保存词素分析失败:', error)
      return false
    }
  }, [])

  const getMorphemeAnalysis = useCallback(async (word: string) => {
    try {
      const analysis = await db.morphemeAnalysis.where('word').equals(word).first()
      return analysis
    } catch (error) {
      console.error('获取词素分析失败:', error)
      return null
    }
  }, [])

  return { saveMorphemeAnalysis, getMorphemeAnalysis }
}
