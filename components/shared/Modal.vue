<script lang="ts" setup>
interface IProps {
  show: boolean
  title: string
}
const props = defineProps<IProps>()
const emit = defineEmits(['close'])
const { trapRef } = useFocusTrap()
const modalEl = ref<HTMLElement | null>(null)
const closeModalKeydownEsc = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}
onMounted(() => {
  window.addEventListener('keydown', closeModalKeydownEsc)
  nextTick(() => {
    modalEl.value?.focus()
  })
  onUnmounted(() => {
    window.removeEventListener('keydown', closeModalKeydownEsc)
  })
})
watch(
  () => props.show,
  () => {
    if (props.show) document?.documentElement.classList.add('overflow-hidden')
    else document?.documentElement.classList.remove('overflow-hidden')
  },
  { immediate: true }
)
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div
        v-if="show"
        tabindex="0"
        ref="modalEl"
        aria-hidden="true"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 min-h-dvh bg-[#0f172acc]"
        @click="emit('close')"
      >
        <div class="relative p-4 w-full max-w-md max-h-full" ref="trapRef">
          <div class="relative bg-white rounded-lg shadow" @click.stop>
            <div
              class="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
            >
              <h3 class="text-lg font-semibold text-gray-900">
                {{ title }}
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                @click="emit('close')"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
