import { defineStore } from "pinia";

export const useNotificationsStore = defineStore('notifications', {
    state: () => ({
        isNotificationOpen: false,
    }),

    actions: {
        toggleNotification() {
            this.isNotificationOpen = !this.isNotificationOpen
        }
    }
})