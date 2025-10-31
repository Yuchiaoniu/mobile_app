#!/bin/bash

echo "🚀 開始執行後端伺服器啟動前檢查與啟動程序..."

# 1. 讀取使用者輸入的主專案名稱
read -p "請輸入主專案資料夾名稱（例如 MyAppProject）： " PROJECT_NAME
BACKEND_DIR="$PROJECT_NAME/backend"

# 2. 驗證資料夾並進入
if [ ! -d "$BACKEND_DIR" ]; then
    echo "❌ 錯誤：找不到後端資料夾 '$BACKEND_DIR'。"
    exit 1
fi

echo "✅ 進入後端資料夾：$BACKEND_DIR"
cd "$BACKEND_DIR" || { echo "❌ 無法進入 $BACKEND_DIR"; exit 1; }


# 3. 檢查關鍵檔案
echo "🔍 檢查關鍵後端檔案是否存在..."
if [ ! -f "app.js" ] || [ ! -f "package.json" ]; then
    echo "❌ 錯誤：app.js 或 package.json 遺失。請重新執行生成腳本。"
    exit 1
else
    echo "✅ app.js 與 package.json 確認存在。"
fi


# 4. 檢查依賴套件是否已安裝 (檢查 node_modules)
echo "🔍 檢查依賴套件是否已安裝..."
if [ ! -d "node_modules" ]; then
    echo "⚠️ 警告：node_modules 資料夾不存在。這表示 npm install 可能未成功執行。"
    read -r -p "是否要現在執行 npm install？ (y/N) " INSTALL_CHOICE
    case "$INSTALL_CHOICE" in
        [yY])
            echo "🔧 正在執行 npm install..."
            if npm install; then
                echo "✅ 依賴套件安裝成功。"
            else
                echo "❌ 依賴套件安裝失敗。請檢查網路連線。"
                exit 1
            fi
            ;;
        *)
            echo "❌ 啟動失敗：缺少依賴套件，請手動執行 npm install 後再啟動。"
            exit 1
            ;;
    esac
else
    echo "✅ 依賴套件 (node_modules) 確認存在。"
fi


# 5. 啟動伺服器 (使用 nodemon 進行熱重載開發)
echo "-------------------------------------"
echo "🎉 準備啟動 Node.js 伺服器！"
echo "🚀 正在使用 'npm run dev' 啟動伺服器..."
echo "💡 (如果這是您第一次啟動，請忽略可能出現的 nodemon 警告)"
echo "-------------------------------------"

npm run dev

# 腳本結束後，您的終端機將會被 nodemon 伺服器佔用
