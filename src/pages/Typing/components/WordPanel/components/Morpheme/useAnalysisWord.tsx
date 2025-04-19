import { currentWordAnalysis } from '@/store'
import type { Word } from '@/typings'
import type { MorphemeAnalysisOutput } from '@/typings/morphemeAnalysis'
import { useMorphemeAnalysis } from '@/utils/db/morpheme'
import { useAtom } from 'jotai'
import React, { useCallback, useEffect, useRef, useState } from 'react'

const LLM_API = import.meta.env.VITE_LANGCHAIN_API_URL

function useAnalysisWord(word: Word): [boolean, MorphemeAnalysisOutput | undefined, () => void, unknown] {
  const [analysis, setAnalysis] = useAtom(currentWordAnalysis)
  const { saveMorphemeAnalysis, getMorphemeAnalysis } = useMorphemeAnalysis()
  const [isPending, setPending] = useState(false)
  const [error, setError] = useState<unknown>()

  const cRef = useRef<AbortController>()

  const fetchAnalysis = React.useCallback(
    async (word: Word): Promise<(() => void) | undefined> => {
      if (!word) return
      try {
        const cachedAnalysis = await getMorphemeAnalysis(word.name)
        if (cachedAnalysis) {
          setAnalysis(cachedAnalysis)
          return
        }

        setPending(true)

        const controller = new AbortController()
        const signal = controller.signal
        cRef.current = controller

        const response = await fetch(`${LLM_API}/api/analyze-word`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ word: word.name }),
          signal, // 添加 signal 以支持中断
        })
        const data = await response.json()
        const newAnalysis = data.data.analysis

        if (!signal.aborted) {
          // 检查是否已被中断
          await saveMorphemeAnalysis(newAnalysis)
          setAnalysis(newAnalysis)
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          console.log('请求被中断')
        } else {
          console.error('词素分析失败:', error)
          setError(error)
        }
      } finally {
        setPending(false)
      }
    },
    [getMorphemeAnalysis, saveMorphemeAnalysis],
  )

  const reload = useCallback(() => {
    setAnalysis(undefined)
    setError(undefined)
    if (cRef.current) {
      const controller = cRef.current
      controller.abort() // 中断请求
    }
    fetchAnalysis(word)
  }, [fetchAnalysis, word])

  useEffect(() => {
    setAnalysis(undefined)
    setError(undefined)
    fetchAnalysis(word)
    return () => {
      if (cRef.current) {
        const controller = cRef.current
        controller.abort() // 中断请求
      }
    }
  }, [fetchAnalysis, word])

  return [isPending, analysis, reload, error]
}

export default useAnalysisWord
