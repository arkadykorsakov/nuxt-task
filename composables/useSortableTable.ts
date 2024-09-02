import type { Direction } from '~/types'

export function useSortableTable(rows: any) {
  const activeKeySort = ref<string>('')
  const activeDirectionSort = ref<Direction>('')
  const activeIconSort = computed((): string =>
    activeDirectionSort.value === ''
      ? 'heroicons:arrows-up-down-20-solid'
      : activeDirectionSort.value === 'asc'
      ? 'heroicons:bars-arrow-down-20-solid'
      : 'heroicons:bars-arrow-up-20-solid'
  )
  function setActiveKey(key: string) {
    if (!activeKeySort.value) {
      activeKeySort.value = key
      activeDirectionSort.value = 'desc'
    } else {
      if (activeKeySort.value === key) {
        if (activeDirectionSort.value === 'desc')
          activeDirectionSort.value = 'asc'
        else if (activeDirectionSort.value === 'asc') {
          activeDirectionSort.value = ''
          activeKeySort.value = ''
        }
      } else {
        activeKeySort.value = key
        activeDirectionSort.value = 'desc'
      }
    }
  }
  const sortedRows = computed(() => {
    if (!activeKeySort.value) return [...rows]
    else {
      return universalSort(
        [...rows],
        activeKeySort.value,
        activeDirectionSort.value
      )
    }
  })

  function universalSort(arr: any, key: string, order: Direction = 'asc') {
    return arr.sort((a: any, b: any) => {
      let comparison = 0
      const valA = a[key]
      const valB = b[key]
      if (typeof valA === 'number' && typeof valB === 'number')
        comparison = valA - valB
      else if (typeof valA === 'string' && typeof valB === 'string')
        comparison = valA.localeCompare(valB)
      else comparison = String(valA).localeCompare(String(valB))
      return order === 'desc' ? -comparison : comparison
    })
  }

  return {
    activeKeySort,
    activeIconSort,
    setActiveKey,
    sortedRows
  }
}
