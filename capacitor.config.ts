import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.dermpath.navigator",
  appName: "DermPath Navigator",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
