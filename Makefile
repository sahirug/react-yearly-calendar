
BIN = node_modules/.bin

publish:
	$(BIN)/babel  --presets es2015,react src/ --out-dir lib/; find lib -name __tests__ -type d -print0 | xargs -0 rm -r --

test:
	mocha src/__tests__

.PHONY: test
