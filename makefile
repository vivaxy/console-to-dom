./dest/index.js: ./dest
	./node_modules/.bin/browserify ./src/index.js -t babelify > ./dest/index.js

./dest:
	mkdir ./dest