import useAnalysisWord from './useAnalysisWord'
import { LoadingUI } from '@/components/Loading'
import { Button } from '@/components/ui/button'
// import Loading from '@/components/Loading'
import { Word } from '@/typings'
import React, { PropsWithChildren, useEffect, useState, useMemo, ReactElement } from 'react'

interface MorphemeParseProps extends PropsWithChildren {
  word: Word
}

const MorphemeParse: React.FC<MorphemeParseProps> = (props) => {
  const { word } = props
  const [isPending, analysis, reload, error] = useAnalysisWord(word)

  const ui_morphemes = useMemo(() => {
    const parts: ReactElement[] = []
    let composed: string = ''
    if (error) {
      return (
        <div>
          <div className="text-sm">词素分析失败</div>
          <Button onClick={reload}>重新分析</Button>
        </div>
      )
    }

    if (isPending) {
      return (
        <div>
          <LoadingUI />
        </div>
      )
    }

    if (analysis) {
      const prefixes = analysis?.morphemes?.prefixes || []
      const suffixes = analysis?.morphemes?.suffixes || []
      const roots = analysis?.morphemes?.roots || []

      // 如果没有前缀和后缀，就不显示
      if (!prefixes.length && !suffixes.length && Number(roots.length) <= 1) {
        return <span></span>
      }

      const literals = [...prefixes, ...roots, ...suffixes]
      literals.forEach((item) => {
        parts.push(
          <div key={item.segment}>
            <span>{item.segment}</span>
            <span className="text-[12px] text-gray-300">{item.meaning}</span>
            {item.function && <span className="text-[12px] text-gray-300">({item.function})</span>}
          </div>,
        )
      })
      composed = literals
        .map((item) => item.segment)
        .join('')
        .replaceAll('--', '-')
    }
    return (
      <div>
        <div className="text-center text-sm">{composed}</div>
        <div className="flex gap-3">{parts}</div>
      </div>
    )
  }, [isPending, analysis, error, reload])
  return <div className="m-auto text-3xl text-gray-300">{ui_morphemes}</div>
}

export default MorphemeParse
