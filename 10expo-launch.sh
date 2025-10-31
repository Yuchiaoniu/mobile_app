#!/bin/bash

echo "🧪 前端啟動與 Expo 診斷整合腳本"

# 專案名稱輸入
read -p "請輸入主專案資料夾名稱（例如 DApp-PC1）： " PROJECT_NAME
if [ -z "$PROJECT_NAME" ]; then
  echo "❌ 未輸入專案名稱"
  exit 1
fi

FRONTEND_PATH="$PROJECT_NAME/frontend"
BACKEND_URL="http://localhost:3000/trees"

# 檢查 frontend 資料夾
if [ ! -d "$FRONTEND_PATH" ]; then
  echo "❌ 找不到 frontend 資料夾：$FRONTEND_PATH"
  exit 1
else
  echo "✅ 找到 frontend 資料夾：$FRONTEND_PATH"
fi

cd "$FRONTEND_PATH" || exit

# 檢查 package.json
if [ ! -f package.json ]; then
  echo "❌ 找不到 package.json，這不是一個有效的 React Native 專案"
  exit 1
else
  echo "✅ package.json 存在"
fi

# 檢查後端 API 是否可連線
echo "🌐 檢查後端 API 是否可連線..."
STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL")
if [ "$STATUS_CODE" != "200" ]; then
  echo "❌ 後端 API 無法連線（$BACKEND_URL 回傳 $STATUS_CODE）"
  echo "請確認 backend/app.js 是否已啟動"
  exit 1
else
  echo "✅ 後端 API 正常運作（$STATUS_CODE）"
fi


# 檢查必要套件
echo "📦 檢查必要套件是否已安裝..."
REQUIRED_PACKAGES=("react-native-paper" "@react-navigation/native")
for PACKAGE in "${REQUIRED_PACKAGES[@]}"; do
  if ! grep -q "$PACKAGE" package.json; then
    echo "❌ 套件未安裝：$PACKAGE"
    echo "請執行：npm install $PACKAGE"
    exit 1
  fi
done
echo "✅ 所有必要套件已安裝"

# 檢查是否已安裝 expo
if grep -q '"expo"' package.json; then
  echo "✅ 專案已安裝 expo"
else
  echo "❌ 專案未安裝 expo，請執行：npm install expo"
  exit 1
fi

# 檢查 node_modules
if [ -d node_modules ]; then
  echo "✅ 已安裝依賴套件"
else
  echo "⚠️ 尚未安裝依賴套件，開始安裝..."
  npm install
  echo "✅ 套件安裝完成"
fi


# 啟動前端
echo ""
echo "🚀 所有檢查通過，啟動前端應用程式..."
npx expo start --web --clear 2>&1 | tee expo.log