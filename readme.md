working on getting johnny-five working with the ble bot 9000

https://www.hackster.io/29284/ble-bot-9000-c150b8

`node init.js` to execute


on windows:
	install visual studio community edition with C++ addon
	install node gyp `npm install -g node-gyp`

	fancy junk might be needed to make it work
	https://github.com/sandeepmistry/node-bluetooth-hci-socket

linux:
  flashing:
  	run dfu-utils script

	running node script:
	https://github.com/sandeepmistry/noble#running-on-linux
	sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)

	https://github.com/sandeepmistry/noble
	sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev


os x:
	xcodebuild is required

https://www.arduino.cc/en/Guide/Arduino101
