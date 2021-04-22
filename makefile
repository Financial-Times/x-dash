# DO NOT ADD TASKS TO THIS MAKEFILE
# these tasks exist for principle-of-least-surprise purposes for people coming
# here from next-land. this makefile should not be used for anything else.
# instead, use per-package npm scripts

clean:
	npm run clean

install:
	npm i --no-package-lock

build:
	npm run build

build-%:
	npm run build-only -- --filter $*

test:
	npm run test

update-snapshots:
	npm run jest -- --updateSnapshot
