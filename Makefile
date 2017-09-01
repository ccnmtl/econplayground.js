NODE_MODULES ?= ./node_modules
JS_SENTINAL ?= $(NODE_MODULES)/sentinal

$(JS_SENTINAL): package.json
	rm -rf $(NODE_MODULES)
	npm install
	touch $(JS_SENTINAL)

runserver: $(JS_SENTINAL)
	npm run start

build: $(JS_SENTINAL) build/bundle.js
	npm run build

dev: $(JS_SENTINAL)
	npm run dev

eslint: $(JS_SENTINAL)
	npm run eslint

test: $(JS_SENTINAL)
	npm run test

clean:
	rm -rf $(NODE_MODULES)

.PHONY: clean
