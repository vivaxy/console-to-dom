build-js: ./dest/index.js ./demo/index.js

./dest/index.js: ./dest
	./node_modules/.bin/browserify ./src/index.js -t babelify > ./dest/index.js

./demo/index.js: ./dest
	./node_modules/.bin/browserify ./demo/index.jsx -t babelify > ./demo/index.js

./dest:
	mkdir ./dest
	
.PHONY: build-js
