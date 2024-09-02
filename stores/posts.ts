import { defineStore } from 'pinia'
import type { IPostInput } from '~/types'
interface IPost {
  id: number
  userId: number
  title: string
  body: string
}
export const usePostsStore = defineStore('posts', () => {
  const posts = ref<IPost[]>([])
  const loading = ref<boolean>(true)
  const error = ref<string>()

  async function getPosts() {
    try {
      const data = await $fetch<IPost[] | null>(
        'https://jsonplaceholder.typicode.com/posts'
      )
      if (data) posts.value = [...data]
      return data
    } catch (e) {
      if (e instanceof Error) {
        error.value = e.message
      }
    } finally {
      loading.value = false
    }
  }

  async function createPost(input: IPostInput) {
    try {
      const data = await $fetch<IPost>(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          body: {
            ...input,
            userId: 1
          },
          responseType: 'json'
        }
      )
      posts.value.push(data)
    } catch (e) {
      console.error(e)
    }
  }

  return {
    posts,
    loading,
    error,
    getPosts,
    createPost
  }
})
