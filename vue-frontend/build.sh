set -e

echo "[+] Starting build"
if npm run build; then
    echo "Build successful. 🎉"
    rm -rf ../express-backend/public
    mv ./dist/ ../express-backend/public
    echo "[+] Dist updated in backend."
else
    echo "Build failed :("
    exit 1
fi
