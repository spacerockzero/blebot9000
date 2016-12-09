/* @flow */
//-----------------------------------
//	author: Monofuel
//	website: japura.net
'use strict';

const DEVICE_NAME = 'FIRMATA';

//optional: manually specify your device uuid
//const ADDRESS = '98:4F:EE:0F:A1:EF';
const ADDRESS = null;

const five = require('johnny-five');
const BleSerialPort = require('ble-serialport').SerialPort;
const keypress = require('keypress');

function ready() {
  console.log('ready');
  const blebot = new Bot();
  //console.log(blebot);
  console.log('bot initialized');

  keypress(process.stdin);
  // $FlowFixMe: adsfsdf
  process.stdin.setRawMode(true);
  process.stdin.on('keypress',(ch,key) => blebot.input(ch,key));
}

class Bot {
  motor;
  constructor() {
    const configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2;
    this.motor = [];
    this.motor.push(new five.Motor(configs.M1));
    this.motor.push(new five.Motor(configs.M2));
    this.motor.push(new five.Motor(configs.M3));
    this.motor.push(new five.Motor(configs.M4));
  }
  forward(speed: number) {
    this.motor[0].reverse(speed);
    this.motor[1].forward(speed);
    this.motor[2].forward(speed);
    this.motor[3].reverse(speed);
  }
  reverse(speed: number) {
    this.motor[0].forward(speed);
    this.motor[1].reverse(speed);
    this.motor[2].reverse(speed);
    this.motor[3].forward(speed);
  }
  left(speed: number) {
    this.motor[0].forward(speed);
    this.motor[1].forward(speed);
    this.motor[2].forward(speed);
    this.motor[3].forward(speed);
  }
  right(speed: number) {
    this.motor[0].reverse(speed);
    this.motor[1].reverse(speed);
    this.motor[2].reverse(speed);
    this.motor[3].reverse(speed);
  }
  stop() {
    this.motor[0].stop();
    this.motor[1].stop();
    this.motor[2].stop();
    this.motor[3].stop();
  }
  input(ch,key) {
    if (!key) {
      return;
    }

    //make it so you can close the process with ctrl-c...
    if (key.ctrl && key.name == 'c') {
      console.log('exiting');
      process.exit();
    }

    if (key.name == 'w') {
      this.forward(255);
      console.log('forward command');
    }

    if (key.name == 's') {
      this.reverse(255);
      console.log('reverse command');
    }

    if (key.name == 'a') {
      this.left(255);
      console.log('left command');
    }

    if (key.name == 'd') {
      this.right(255);
      console.log('right command');
    }

    if (key.name == 'q') {
      this.stop();
      console.log('stop');
    }
  }
}

async function init() {

  console.log('make sure you arent already paired and connected!');

  let ble;
  if (ADDRESS) {
    console.log('connecting to',DEVICE_NAME,'|',ADDRESS);
    ble = new BleSerialPort({name:DEVICE_NAME,address:ADDRESS});
  } else {
    console.log('connecting to',DEVICE_NAME);
    ble = new BleSerialPort({name:DEVICE_NAME});
  }

  await ble.connect();
  console.log('connected to firmata');
  let board = new five.Board({port:ble,repl:false});
  console.log('waiting for ready');
  board.on('ready',ready);
}

init().catch((err) => {
  console.error(err);
});
