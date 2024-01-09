import { useState } from 'react'
import { BuildState, initialBuildState } from '../types'
import { buildStateToCsvData, buildStateToMasonryItems } from '../utils'

export default function useDBBuildState() {
  const [dbBuildState, setDBBuildState] =
    useState<BuildState>(initialBuildState)

  /**
   * Converts the build state to CSV data.
   */
  const csvItems = buildStateToCsvData(dbBuildState).filter(
    (item) => item?.name !== '',
  )

  /**
   * Populates the masonry grid with the items from the build state.
   */
  const masonryItems = buildStateToMasonryItems(dbBuildState)

  function updateDBBuildState() {
    // TODO
  }

  return { csvItems, masonryItems, dbBuildState, updateDBBuildState }
}
