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
const BLESerialPort = require('ble-serial').SerialPort;
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
  speed;
  constructor() {
    const configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2;
    this.motor = [];
    this.motor.push(new five.Motor(configs.M1));
    this.motor.push(new five.Motor(configs.M2));
    this.motor.push(new five.Motor(configs.M3));
    this.motor.push(new five.Motor(configs.M4));
    this.speed = 100;
  }
  forward() {
    this.motor[0].reverse(this.speed);
    this.motor[1].forward(this.speed);
    this.motor[2].forward(this.speed);
    this.motor[3].reverse(this.speed);
  }
  reverse(speed: number) {
    this.motor[0].forward(this.speed);
    this.motor[1].reverse(this.speed);
    this.motor[2].reverse(this.speed);
    this.motor[3].forward(this.speed);
  }
  left(speed: number) {
    this.motor[0].forward(this.speed);
    this.motor[1].forward(this.speed);
    this.motor[2].forward(this.speed);
    this.motor[3].forward(this.speed);
  }
  right(speed: number) {
    this.motor[0].reverse(this.speed);
    this.motor[1].reverse(this.speed);
    this.motor[2].reverse(this.speed);
    this.motor[3].reverse(this.speed);
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
      this.forward();
      console.log('forward command');
    }

    if (key.name == 's') {
      this.reverse();
      console.log('reverse command');
    }

    if (key.name == 'a') {
      this.left();
      console.log('left command');
    }

    if (key.name == 'd') {
      this.right();
      console.log('right command');
    }

    if (key.name == 'q') {
      this.stop();
      console.log('stop');
    }
    if (key.name == 'f') {
      this.speed -= 10;
      if (this.speed < 10) {
        this.speed = 10;
      }
      console.log('speed set to',this.speed);
    }
    if (key.name == 'r') {
      this.speed += 10;
      if (this.speed > 255) {
        this.speed = 255;
      }
      console.log('speed set to',this.speed);
    }
  }
}

async function init() {

  console.log('connecting to',DEVICE_NAME);
  const ble = new BLESerialPort({
    localName: DEVICE_NAME
  });

  let board = new five.Board({port:ble,repl:false});
  console.log('waiting for ready');
  board.on('ready',ready);
}

init().catch((err) => {
  console.error(err);
});
