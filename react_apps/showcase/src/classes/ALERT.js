class Alert {
    constructor() {
      this.state = {
        msg: "",
        mood: "secondary",
        show: false,
      };
    }

    new(message, style) {
      this.state = { ...this.state, msg: message, mood: style, show: true };
    }

    toggle() {
      this.state.show = !this.state.show; 
    }

    show() {
      this.state.show = true 
    }

    hide() {
      this.state.show = false 
    }
  }