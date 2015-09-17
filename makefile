./dest/index.js: ./dest build-js
	./node_modules/.bin/browserify ./build/index.js > ./dest/index.js

build-js: ./build ./src/index.js ./src/get-touch-position.js ./src/is-mobile.js ./src/set-style.js
	./node_modules/.bin/babel ./src -d ./build

./dest:
	mkdir ./dest

./build:
	mkdir ./build

.PHONY: build-js
