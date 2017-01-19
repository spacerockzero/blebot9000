video in action: https://youtu.be/A1P5zveYVzo

https://www.hackster.io/29284/ble-bot-9000-c150b8

1. follow directions below for 'running control script'
 1. make sure to give node permissions for bluetooth
 1. install dependencies for noble (bluetooth nodejs dependency)
1. `npm install` to prepare
1. `npm start` to execute

to start the command line version: `node startConsole.js`
 - `w` for forward
 - `d` for reverse
 - `a` to rotate left
 - `d` to rotate right
 - `r` to increase speed for the next command
 - `f` to decrease speed for the next command
 - `q` to stop

to start the http version: `node startWeb.js`
 - browse to http://localhost:3000
 - slider controls speed immediately
 - directional buttons similar to the console version

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
i have not managed to get it working on my windows 10 desktop (crazy usb error with bluetooth-hci-socket), however it works on my laptop with windows 10.

 - install visual studio community edition with C++ addon
 - install node gyp `npm install -g node-gyp`

 - if there are issues installing bluetooth-hci-socket, refer to the project's readme:
 - https://github.com/sandeepmistry/node-bluetooth-hci-socket

 - making the control script work mainly depends on if you can get noble to work with your bluetooth adapter.


## OS X
 - xcodebuild is required, and automatically installed by npm
 - i didn't have a mac at the time to test on, however i could work on proper OS X instructions if needed

## arduino stuff
 - install intel curie board support
 - install adafruit motorshield v2 library
 - // there are a few more required libraries, but i forgot what they were. please amend this readme!
 - flash firmata BLE sketch

## TODO
 - add support for gamepads on the web version
 - properly flowtype all code (some newer stuff was hastily patched together at the hacker event)
 - get it working on the PiGrrl 2
