<script lang="ts" setup>
import { usePostsStore } from './stores/posts'
const columns = [
  { label: 'Id', key: 'id', sortable: true },
  { label: 'Title', key: 'title', sortable: true },
  { label: 'Body', key: 'body' },
  { label: 'User Id', key: 'userId' }
]
const postsStore = usePostsStore()
const { posts, loading } = storeToRefs(postsStore)
await useAsyncData(() => postsStore.getPosts())
const showModalAdditionalPost = ref(false)
</script>

<template>
  <main class="py-10">
    <SharedLoading v-if="loading" />
    <section v-else-if="posts?.length">
      <div class="container mx-auto px-5">
        <div class="flex justify-end mb-5">
          <button
            class="block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="button"
            @click="showModalAdditionalPost = true"
          >
            Add Post
          </button>
          <SharedModal
            title="Add new post"
            :show="showModalAdditionalPost"
            @close="showModalAdditionalPost = false"
          >
            <FeaturesAddPost @submit="showModalAdditionalPost = false" />
          </SharedModal>
        </div>
        <SharedTable :rows="posts" :columns="columns" />
      </div>
    </section>
    <div v-else>Ошибка</div>
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
body {
  font-family: 'Roboto', sans-serif;
}
</style>
