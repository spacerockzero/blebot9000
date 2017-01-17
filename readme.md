video in action: https://youtu.be/A1P5zveYVzo

https://www.hackster.io/29284/ble-bot-9000-c150b8

1. follow directions below for 'running control script', mainly
 1. give node permissions for bluetooth
 1. install dependencies for noble (bluetooth dependency)
1. `npm install` to prepare
1. `npm start` to execute

main points:

uses pvanallen's branch of the ble-serial branch so that it can connect to device by name.

the regular version of ble-serial connects to the first device it finds (very dumb)

# Linux
## flashing the arduino firmata
https://www.arduino.cc/en/Guide/Arduino101 run dfu-utils script

`sudo ~/.arduino15/packages/Intel/tools/arduino101load/1.6.4+1.18/scripts/create_dfu_udev_rule`

may differ depending on package version.

## running the control script
give node permission to do stuff, or run it as root instead

https://github.com/sandeepmistry/noble#running-on-linux

``sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)``

dependencies for noble:

https://github.com/sandeepmistry/noble

`sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev`


# Windows
	i have not managed to get it working on my windows desktop (crazy usb error), but here are a few steps to get close:

		install visual studio community edition with C++ addon
		install node gyp `npm install -g node-gyp`

		fancy junk might be needed to make it work
		https://github.com/sandeepmistry/node-bluetooth-hci-socket

		it seems highly dependent on if you can get noble to work with your bluetooth adapter.


## OS X
	xcodebuild is required, and automatically installed by npm

	i don't have a mac to work on so i have no idea what is involved.


## arduino stuff
	install intel curie board
	install adafruit motorshield v2
