import { defineStore } from "pinia";
import axios from "axios";
export const useApiStore = defineStore("apiStore", {
  state: () => ({
    posts: [],
    postId: 0,
    post: {},
    typePost: '',
    showModal: false
  }),

  actions: {

    async postsList() {
      const response = await axios.get('posts');
      this.posts = response.data.posts
    },
    async openModelDetailsPost(postId) {

        this.postId = postId;
        const response = await axios.get(`post/${this.postId}/show`);
        this.post = response.data.post
        this.typePost = response.data.post.type
        this.showModal = true;
    }
  },
});

