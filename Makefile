.DEFAULT_GOAL := run

-include baselayer/Makefile  # always clone baselayer if it doesn't exist

baselayer/Makefile:
	git submodule update --init --remote

