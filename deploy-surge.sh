# Build reactjs app with production mod
npm run build

# Move to build folder
cd build

# Clone index.html into 200.html
cp index.html 200.html

# Start deploying via Surge
npx surge . ultimate-caro.surge.sh