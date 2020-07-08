import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/01-Navbar'


class App extends Component {
	state = {

	}

	render() {
		return (
			<Router>
				<Navbar />

			</Router>
		)
	}
}

export default App