echo "> lint"
./lint.sh
echo "> Type Script Compile"
tsc
echo "> Type Script alias"
./node_modules/.bin/tsc-alias
echo "> Copy Files"
cp -rP src/public ./build
cp -r src/api-doc-components ./build
echo "> Start Server"
DEBUG=bgp:* node --trace-warnings  ./build/server
