import { defineStore } from "pinia";

export const useSidebarStore = defineStore('sidebarStore', {
    state: () => ({
        isNotificationOpen: false,
        isSearchOpen: false,
    }),

    actions: {
        toggleNotification() {
            this.isNotificationOpen = !this.isNotificationOpen;
            if(this.isSearchOpen) this.isSearchOpen = false
        },

        toggleSearch() {
            this.isSearchOpen = !this.isSearchOpen;
            if(this.isNotificationOpen) this.isNotificationOpen = false
        }
    }
})