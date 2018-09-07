# DO NOT ADD TASKS TO THIS MAKEFILE
# these tasks exist for principle-of-least-surprise purposes for people coming
# here from next-land. this makefile should not be used for anything else.
# instead, use per-package npm scripts

clean:
	npm run clean

install:
	npm i --no-save
	npx athloi exec -- npm i --no-save

build:
	npm run build

test:
	npm run test
