export class Theme {
  constructor(theme) {
    switch (theme) {
      case "custom":
        this.backgroundColor;
        this.inputBackgroundColor;
        this.color;
        break;

      case "black":
        this.backgroundColor = "#000000";
        this.inputBackgroundColor = "#333333";
        this.color = "#ffffff";
        break;

      case "dark":
        this.backgroundColor = "#222222";
        this.inputBackgroundColor = "#555555";
        this.color = "#ffffff";
        break;

      case "darkBlue":
        this.backgroundColor = "#002152";
        this.inputBackgroundColor = "#3066BE";
        this.color = "#ffffff";
        break;

      case "grey":
        this.backgroundColor = "#6E6E6E";
        this.inputBackgroundColor = "#A2A7A5";
        this.color = "#000000";
        break;

      case "light":
        this.backgroundColor = "#eeeeee";
        this.inputBackgroundColor = "#ffffff";
        this.color = "#333333";
    }
  }
  custom(backgroundColor, inputBackgroundColor, color) {
    this.backgroundColor = backgroundColor;
    this.inputBackgroundColor = inputBackgroundColor;
    this.color = color;
  }
}
