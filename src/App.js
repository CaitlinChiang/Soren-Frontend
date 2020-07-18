import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/01-Navbar'
import Homepage from './components/02-Homepage'
import Shop from './components/03-Shop'
import Cart from './components/04-Cart'
import Order from './components/05-Order'


class App extends Component {
	state = { }

	render() {
		return (
			<Router>
				<Navbar />
				<Route path="/" exact component={Homepage} />
				<Route path="/shop" component={Shop} />
				<Route path="/cart" component={Cart} />
				<Route path="/order" component={Order} />
			</Router>
		)
	}
}

export default App