import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Components
import Navbar from './components/01-Navbar'
import Homepage from './components/02-Homepage'
import Shop from './components/03-Shop'
import Cart from './components/04-Cart'
import Order from './components/05-Order'

// Product Pages
import Mask_Products from './products/Masks_Page'
import Shirt_Products from './products/Shirts_Page'
import Individual_Item from './products/Item_Page'


class App extends Component {
	state = { }

	render() {
		return (
			<Router>
				<Navbar />

				<Route path="/" exact component={Homepage} />
				<Route path="/cart" component={Cart} />
				<Route path="/order" component={Order} />

				<Route path="/shop" component={Shop} />
				<Route path="/masks" component={Mask_Products} />
				<Route path="/shirts" component={Shirt_Products} />

				<Route path="/product1" component={Individual_Item} />
			</Router>
		)
	}
}

export default App