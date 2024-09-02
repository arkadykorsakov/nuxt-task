<script setup lang="ts">
import { useSortableTable } from '~/composables/useSortableTable'
interface IColumn {
  key: string
  label: string
  sortable?: boolean
}
type RowFromColumns<C extends IColumn[]> = {
  [K in C[number]['key']]: any
}
interface IProps<C extends IColumn[]> {
  columns: C
  rows: RowFromColumns<C>[]
  itemsOnPage?: number
}
const props = withDefaults(defineProps<IProps<IColumn[]>>(), {
  itemsOnPage: 10
})
const { activeIconSort, activeKeySort, setActiveKey, sortedRows } =
  useSortableTable(props.rows)
const currentPage = ref<number>(1)
const paginatedRows = computed(
  () =>
    useChunk(sortedRows.value, props.itemsOnPage) as RowFromColumns<IColumn[]>[]
)
</script>

<template>
  <div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th
              scope="col "
              class="px-6 py-3"
              v-for="(col, colIdx) in columns"
              :key="colIdx"
            >
              <div
                class="flex items-center gap-1 whitespace-nowrap"
                v-if="!col.sortable"
              >
                {{ col.label }}
              </div>
              <button
                type="button"
                v-else
                class="flex items-center gap-1 whitespace-nowrap cursor-pointer"
                @click="setActiveKey(col.key)"
              >
                {{ col.label }}
                <Icon
                  :name="
                    col.key === activeKeySort
                      ? activeIconSort
                      : 'heroicons:arrows-up-down-20-solid'
                  "
                  style="color: black"
                />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b"
            v-for="(row, rowIdx) in paginatedRows[currentPage - 1]"
            :key="rowIdx"
          >
            <td
              class="px-6 py-4"
              v-for="(col, colIdx) in columns"
              :key="colIdx"
            >
              {{ row[`${col.key}`] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <SharedPagination
      v-if="paginatedRows?.length > 1"
      v-model="currentPage"
      :total-pages="paginatedRows.length"
    />
  </div>
</template>
