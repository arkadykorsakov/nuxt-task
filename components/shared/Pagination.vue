<script lang="ts" setup>
interface IProps {
  totalPages: number
  maxVisiblePages?: number
  modelValue: number
}
withDefaults(defineProps<IProps>(), {
  maxVisiblePages: 5
})
const emit = defineEmits<{
  'update:modelValue': [currentPage: number]
}>()
const updateCurrentPage = (currentPage: number) => {
  emit('update:modelValue', currentPage)
}
</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="inline-flex -space-x-px text-base h-10 flex-wrap">
      <li>
        <button
          class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 disabled:opacity-50 disabled:bg-white"
          type="button"
          @click="updateCurrentPage(modelValue - 1)"
          :disabled="modelValue === 1"
        >
          Назад
        </button>
      </li>
      <template v-for="page in totalPages" :key="page">
        <li v-if="page === 1">
          <button
            type="button"
            class="flex items-center justify-center px-4 h-10 leading-tight border border-gray-300"
            :class="
              modelValue === page
                ? 'text-white bg-gray-500'
                : 'text-gray-500 bg-white hover:bg-gray-100'
            "
            @click="updateCurrentPage(1)"
          >
            1
          </button>
        </li>
        <li
          v-if="
            (page >= modelValue - 1 &&
              page < modelValue - 1 + (maxVisiblePages - 2) &&
              modelValue > maxVisiblePages &&
              modelValue <= totalPages - maxVisiblePages) ||
            (modelValue <= maxVisiblePages &&
              page !== 1 &&
              page <= maxVisiblePages) ||
            (modelValue >= totalPages - (maxVisiblePages - 1) &&
              page !== totalPages &&
              page >= totalPages - (maxVisiblePages - 1))
          "
        >
          <button
            type="button"
            class="flex items-center justify-center px-4 h-10 leading-tight border border-gray-300"
            :class="
              modelValue === page
                ? 'text-white bg-gray-500'
                : 'text-gray-500 bg-white hover:bg-gray-100'
            "
            @click="updateCurrentPage(page)"
          >
            {{ page }}
          </button>
        </li>
        <li
          v-if="
            (modelValue > maxVisiblePages && page === maxVisiblePages) ||
            (modelValue < totalPages - maxVisiblePages + 1 &&
              page === totalPages - maxVisiblePages + 1)
          "
        >
          <span
            class="flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 cursor-default"
          >
            ...
          </span>
        </li>
        <li v-if="page === totalPages">
          <button
            type="button"
            class="flex items-center justify-center px-4 h-10 leading-tight border border-gray-300"
            :class="
              modelValue === page
                ? 'text-white bg-gray-500'
                : 'text-gray-500 bg-white hover:bg-gray-100'
            "
            @click="updateCurrentPage(totalPages)"
          >
            {{ totalPages }}
          </button>
        </li>
      </template>
      <li>
        <button
          type="button"
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 disabled:opacity-50 disabled:bg-white"
          @click="updateCurrentPage(modelValue + 1)"
          :disabled="modelValue === totalPages"
        >
          Вперед
        </button>
      </li>
    </ul>
  </nav>
</template>
