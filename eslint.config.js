const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const globals = require("globals");

module.exports = defineConfig([
  // 1. Expo 기본 설정 적용
  expoConfig,

  // 2. Prettier와 ESLint 연결 (Prettier 위반을 에러로 표시)
  eslintPluginPrettierRecommended,

  // 3. 특정 설정 파일들을 위한 Node.js 환경 설정
  {
    files: ["babel.config.js", "metro.config.js", "app.config.js"],
    languageOptions: {
      globals: {
        ...globals.node, // 여기서 __dirname 같은 노드 변수를 허용해줍니다.
      },
    },
  },

  // 4. 무시할 폴더 설정
  {
    ignores: ["dist/*"],
  },
]);
