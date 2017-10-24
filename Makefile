baselayer/README.md:
	git submodule update --init --remote
	$(MAKE) baselayer-update

.PHONY: baselayer-update
baselayer-update:
	./baselayer/tools/submodule_update.sh

log:
	make -C baselayer log

run:
	make -C baselayer run

run_testing:
	make -C baselayer run_testing

run_production:
	make -C baselayer run_production

test_headless:
	make -C baselayer test_headless

test:
	make -C baselayer test
