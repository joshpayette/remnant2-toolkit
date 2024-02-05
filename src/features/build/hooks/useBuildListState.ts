import { useState } from 'react'
import { DBBuild } from '../types'

interface State {
  builds: DBBuild[]
  totalBuildCount: number
  isLoading: boolean
}

const DEFAULT_STATE: State = {
  builds: [],
  totalBuildCount: 0,
  isLoading: false,
}

export default function useBuildListState() {
  const [buildListState, setBuildListState] = useState<State>(DEFAULT_STATE)
  return { buildListState, setBuildListState }
}
