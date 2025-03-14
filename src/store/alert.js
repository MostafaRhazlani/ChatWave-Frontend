import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
  state: () => ({
    message: '',
    type: '',
    visible: false
  }),

  actions: {
    setAlert(message, type) {
        this.message = message;
        this.type = type;
        this.visible = true;

        setTimeout(() => {
            this.visible = false;
        }, 3000);
    },

    clearAlert() {
        this.message = '';
        this.type = '';
        this.visible = false;
        
    },

    triggerAlert(message, type) {
        this.setAlert(message, type);
    },
  },
});

