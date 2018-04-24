# DO NOT ADD TASKS TO THIS MAKEFILE
# these tasks exist for principle-of-least-surprise purposes for people coming
# here from next-land. this makefile should not be used for anything else.
# instead, use per-package npm scripts

install:
	@printf "\n  \e[1;34m☞\e[0m this is the same as running \e[3;36mnpm install\e[0m\n\n"
	@sleep 3
	npm install

run:
	@printf "\n  \e[1;34m☞\e[0m this is the same as running \e[3;36mnpm start\e[0m\n\n"
	@sleep 3
	npm start

build:
	@printf "\n  \e[1;34m☞\e[0m this is the same as running \e[3;36mnpm run build\e[0m\n\n"
	@sleep 3
	npm run build
