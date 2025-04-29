import { defineStore } from "pinia";
import axios from "axios";
export const useApiStore = defineStore("apiStore", {
  state: () => ({
    posts: [],
    userPosts: [],
    postId: 0,
    post: {},
    userInfo: {},
    typePost: '',
    showModal: false,
    isLoading: false,
    followStatuses: {},
    contacts: [],
    firstFriend: null,
    notifications: [],
    statusMessages: [],
    user_status: [],
    savedPosts: [],
  }),

  actions: {

    async postsList(showLoader = true) {
      if (showLoader) this.isLoading = true

      try {
        const response = await axios.get('posts');
        this.posts = response.data.posts
      } catch (error) {
        console.log(error);
        
      } finally {
        if (showLoader) this.isLoading = false
      }
    },

    async openModelDetailsPost(postId) {
      this.postId = postId;

      const response = await axios.get(`post/${this.postId}/show`);
      this.post = response.data.post
      this.typePost = response.data.post.type
      this.showModal = true;
    },

    // get all posts user
    async showProfileUser(userId, showLoader = true) {
      if (showLoader) this.isLoading = true
      try {
        const response = await axios.get(`user/${userId}/show`);
        if(response.status === 200 && response.data.userInfo) {
          this.userInfo = response.data.userInfo;
          this.userPosts = response.data.userInfo.posts
        }
          
      } catch (error) {
          console.log(error);
      } finally {
        if (showLoader) this.isLoading = false
      }
    },

    async handleFollowStatus (userId) {
      const response = await axios.get(`user/${userId}/follow-status`);
      this.followStatuses[userId] = {
        isFollowHim: response.data.isFollowHim,
        isFollowMe: response.data.isFollowMe
      }
    },

    async handleToggleFollow (userId) {
      await axios.post(`user/${userId}/toggle-follow`);
      await this.handleFollowStatus(userId);
      await this.showProfileUser(userId, false);
    },

    async listContacts (showLoader = true) {
      if(showLoader) this.isLoading = true
      try {
          const response = await axios.get('contacts');
          this.contacts = response.data.contacts
          this.firstFriend = response.data.contacts[0].id
      } catch (error) {
          console.log(error);
          
      } finally {
        if(showLoader) this.isLoading = false
      }
    },

    async getAllNotifications () {
      try {
        const response = await axios.get(`/user/notifications`);
        if(response.status === 200) {
            this.notifications = response.data.notifications
        }
      } catch (error) {
          console.log(error);
          
      }
    },
 
    async getStatusMessage () {
      try {
        const response = await axios.get(`/messages/status`);
        if(response.status === 200) {
            this.statusMessages = response.data.statusMessages
        }
      } catch (error) {
        console.log(error); 
      }
    },

    async mySavedPosts () {
      try {
        const response = await axios.get('my-saved/posts');
        this.savedPosts = response.data.savedPosts
      } catch (error) {
        console.log(error); 
      }
  }
  },
});

