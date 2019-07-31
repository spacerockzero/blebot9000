/* @flow */
//-----------------------------------
//	author: Monofuel
//	website: japura.net

import express from 'express';
import { Bot } from './main';
import bodyParser from 'body-parser';
const five = require('johnny-five');
const BLESerialPort = require('ble-serial').SerialPort;

const DEVICE_NAME = 'FIRMATA';

export async function init() {

	console.log('connecting to',DEVICE_NAME);
  const ble = new BLESerialPort({
    localName: DEVICE_NAME
  });

  let board = new five.Board();
  console.log('waiting for ready');
  board.on('ready',() => {

			console.log('ready');
		  const blebot = new Bot();
		  //console.log(blebot);
		  console.log('bot initialized');

			const server = new WebServer(blebot);
	});

}

class WebServer {
	app;
	bot;
	constructor(bot) {
			this.app = express();
			this.bot = bot;
			this.app.use(bodyParser.json())

			this.app.post('/input', (req, res) => {
				const body = req.body;
				console.log(body.speed, body.direction);
				bot.speed = body.speed;
				switch (body.direction) {
					case 'Forward':
						bot.forward();
						break;
					case 'Backward':
						bot.reverse();
						break;
					case 'Left':
						bot.left();
						break;
					case 'Right':
						bot.right();
						break;
					case 'Stop':
						bot.stop();
						break;
				}
				res.send();
			})
			this.app.get('/right', (req,res)=>{
				bot.right();
				res.send('turning right')
			})
			this.app.get('/stop', (req,res)=>{
				bot.stop();
				res.send('stopping')
			})
			this.app.use(express.static('public'));

			this.app.listen(3000, function () {
			  console.log('website listening on port 3000!')
			});
	}
}
