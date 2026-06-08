/** @type {import('expo/config').ExpoConfig} */
module.exports = {
  expo: {
    name: "Skill Path",
    slug: "skill-path",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "skill-path-mobile",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "io.skillpath.mobile",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: "io.skillpath.mobile",
      usesCleartextTraffic: true,
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          resizeMode: "contain",
          imageWidth: 170,
          backgroundColor: "#ffffff",
        },
      ],
      "expo-font",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      apiEnv: process.env.EXPO_PUBLIC_API_ENV ?? "prod",
      apiBaseUrl:
        process.env.EXPO_PUBLIC_API_BASE_URL ??
        "https://skill-path-api-production.up.railway.app/api",
    },
  },
};
