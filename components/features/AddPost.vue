<script setup lang="ts">
import type { IPostInput } from '~/types'
const emit = defineEmits(['submit'])
const sending = ref<boolean>(false)
const form = reactive<IPostInput>({
  title: '',
  body: ''
})
const { createPost } = usePostsStore()
async function handleSubmit() {
  sending.value = true
  await createPost(form)
  emit('submit')
  sending.value = false
}
</script>

<template>
  <form class="p-4 md:p-5" @submit.prevent="handleSubmit">
    <div class="grid gap-4 mb-4 grid-cols-2">
      <div class="col-span-2">
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900"
          >Title</label
        >
        <input
          v-model="form.title"
          type="text"
          name="title"
          id="title"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder="Title"
        />
      </div>
      <div class="col-span-2">
        <label for="body" class="block mb-2 text-sm font-medium text-gray-900"
          >Body</label
        >
        <textarea
          v-model="form.body"
          id="body"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
          placeholder="Body"
        ></textarea>
      </div>
    </div>
    <button
      type="submit"
      class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-blue-700 disabled:opacity-50"
      :disabled="!form.body || !form.title || sending"
    >
      <svg
        class="me-1 -ms-1 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clip-rule="evenodd"
        ></path>
      </svg>
      Add new post
    </button>
  </form>
</template>
