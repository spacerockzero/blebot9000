working on getting johnny-five working with the ble bot 9000

https://www.hackster.io/29284/ble-bot-9000-c150b8

1. `npm install` to prepare
1. `node init.js` to execute

main points:

ble-serial seems completely broken, ble-serialport seems better.

this script looks ONLY for devices named 'FIRMATA', and can optionally have a device uuid specified.

currently crashing due to some issue in blue-yeast for some reason.

# Linux
flashing:
run dfu-utils script ( https://www.arduino.cc/en/Guide/Arduino101 )
`sudo ~/.arduino15/packages/Intel/tools/arduino101load/1.6.4+1.18/scripts/create_dfu_udev_rule`

may differ depending on package version.

give node permission to do stuff, or run it as root instead
https://github.com/sandeepmistry/noble#running-on-linux
	sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)

	https://github.com/sandeepmistry/noble
	sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev


# Windows
	i have not managed to get it working on windows, but here are a few steps to get close:

		install visual studio community edition with C++ addon
		install node gyp `npm install -g node-gyp`

		fancy junk might be needed to make it work
		https://github.com/sandeepmistry/node-bluetooth-hci-socket




## OS X
	xcodebuild is required, and automatically installed by npm

	i don't have a mac to work on so i have no idea what is involved.
