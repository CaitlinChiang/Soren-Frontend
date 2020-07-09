import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/01-Navbar'
import Homepage from './components/02-Homepage'


class App extends Component {
	state = {

	}

	render() {
		return (
			<Router>
				<Navbar />
				<Route path="/" exact component={Homepage} />
			</Router>
		)
	}
}

export default App