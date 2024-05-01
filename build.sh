./node_modules/.bin/tsc  
./node_modules/.bin/tsc-alias
rm -rf build/public 
cp -r src/public build 
cp -r src/api-doc-components ./build