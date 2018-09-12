NODE_MODULES ?= ./node_modules
JS_SENTINAL ?= $(NODE_MODULES)/sentinal

$(JS_SENTINAL): package.json
	rm -rf $(NODE_MODULES) package-lock.json
	npm install
	touch $(JS_SENTINAL)

build: $(JS_SENTINAL)
	GENERATE_SOURCEMAP="false" npm run build

dev: $(JS_SENTINAL)
	npm run dev

eslint: $(JS_SENTINAL)
	npm run eslint

test: $(JS_SENTINAL)
	npm run test

clean:
	rm -rf $(NODE_MODULES) build

.PHONY: clean build
