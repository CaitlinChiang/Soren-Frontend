import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './01-Navbar'
import Homepage from './02-Homepage'
import Shop from './03-Shop'
import ShopItem from '../products/ShopItem_Page'
import Cart from './04-Cart'
import Order from './05-OrderForm'

class Client extends Component {
	state = {
		cart: []
	}

	// Update Global Cart State
	updateCart_add = item => this.setState({ cart: this.state.cart.concat(item) })

	updateCart_delete = item_timestamp => {
		const { cart } = this.state

		for (let i = cart.length - 1; i >= 0; i--) {
			if (cart[i].timestamp === item_timestamp) {
				cart.splice(i, 1)
				this.setState({ cart })
			}
		}
	}

	render() {
		const { cart } = this.state

		return (
			<Router>
				<Navbar />
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route exact path="/products" component={Shop} />
					<Route exact path="/products/:id" render={(props) => <ShopItem {...props} cart={cart} updateCart_add={this.updateCart_add} />} />
					<Route exact path="/cart" render={() => <Cart cart={cart} updateCart_delete={this.updateCart_delete} />} />
					<Route exact path="/order" render={() => <Order cart={cart} />} />
				</Switch>
			</Router>
		)
	}
}

export default Client