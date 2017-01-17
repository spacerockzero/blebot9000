import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

const style ={
	display: 'flex',
	height: '100%',
	width: '100%',
	flexDirection: 'column'
}

const paperStyle = {

}

export default class Index extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
			speed: 200,
			direction: 'Stop'
	  };
	}

	render() {
		const { speed } = this.state;
		return (
			// muiTheme={getMuiTheme(darkBaseTheme)}
			<MuiThemeProvider>
				<div id="indexRoot" style={style}>
					<Paper style={paperStyle}>
						<div>{JSON.stringify(this.state)}</div>
						<Slider min={0} max={255} value={speed} onChange={(e, value) => this.changeSpeed(value)}/>
						<RaisedButton label="Forward" primary={true} onClick={() => this.setDirection('Forward')} />
						<RaisedButton label="Backward" primary={true} onClick={() => this.setDirection('Backward')} />
						<RaisedButton label="Left" primary={true} onClick={() => this.setDirection('Left')} />
						<RaisedButton label="Right" primary={true} onClick={() => this.setDirection('Right')} />
						<RaisedButton label="Stop" primary={true} onClick={() => this.setDirection('Stop')} />
					</Paper>
				</div>
			</MuiThemeProvider>
		);
	}
	changeSpeed(speed) {
		this.setState({speed});
	}
	setDirection(direction) {
		this.setState({direction})
	}

	componentDidUpdate() {
		axios.post('/input',this.state)
	}
}
