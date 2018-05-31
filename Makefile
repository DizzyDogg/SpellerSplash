# phaser project

NPM = $(shell which npm || echo "npm")

ANDROID_APP_IML = android/app/app.iml

all: node_modules

start: node_modules
	npm start </dev/null

stop:
	killall npm

$(ANDROID_APP_IML):
	npx cap add android

clean_android:
	rm -rf android

run_android: dist $(ANDROID_APP_IML)
	npx cap copy android
	npx cap open android

dist: node_modules
	rm -rf dist
	npm run dist </dev/null

dist_compressed: dist
	npm run dist_compressed </dev/null

node_modules: package.json $(NPM)
	rm -f package-lock.json
	npm install

clean:
	rm -rf node_modules

$(NPM):
	@echo "Need to install npm!"
	@[ ! -e /etc/centos-release ] || make INSTALL_CENTOS
	@uname -a | grep -vi darwin || make INSTALL_OSX
	@which npm || exit 1
	@sleep 2
	make $*

INSTALL_CENTOS:
	@echo Installing epel ...
	@[ -e /etc/yum.repos.d/epel.repo ] || sudo yum install epel-release
	@echo Installing nodejs ...
	@[ ! -e /etc/yum.repos.d/epel.repo ] || sudo yum install nodejs

INSTALL_OSX:
	@echo Installing brew ...
	@which brew || /usr/bin/ruby -e "$$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	@which brew || exit 1
	@echo Installing npm ...
	@which npm || brew install node

.PHONY: all start stop dist dist_compressed node_modules clean run_android clean_android
