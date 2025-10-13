const getLandingImage = (id: any) => {
  switch (id) {
    case "1":
      return require("../res/MoodexLogo.png");
    case "2":
      return require("../res/MoodexLogo.png");
    case "3":
      return require("../res/MoodexLogo.png");
    default:
      return null;
  }
};

export default getLandingImage;