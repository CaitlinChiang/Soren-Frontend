import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Homepage from './02-Homepage'
import Shop from './03-Shop'
import Cart from './04-Cart'
import Order from './05-OrderForm'
import Mask_Products from '../products/Masks_Page'
import Shirt_Products from '../products/Shirts_Page'
import ShopItem from '../products/ShopItem_Page'

class Client extends Component {
	state = {
		cart: []
	}

	// Update Global Cart State
	updateCart_add = item => this.setState({ cart: this.state.cart.concat(item) })

	updateCart_delete = item_timestamp => {
		const { cart } = this.state

		for (let i = 0; i < cart.length; i++) {
			if (cart[i].timestamp === item_timestamp) {
				cart.splice(cart[i], 1)
			}
		}
	}

	render() {
		const { cart } = this.state

		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route exact path="/products" component={Shop} />
					<Route exact path="/products/masks" component={Mask_Products} />
					<Route exact path="/products/shirts" component={Shirt_Products} />
					<Route exact path="/products/:id" render={(props) => <ShopItem {...props} cart={cart} updateCart_add={this.updateCart_add} />} />
					<Route exact path="/cart" render={() => <Cart cart={cart} updateCart_delete={this.updateCart_delete} />} />
					<Route exact path="/order" render={() => <Order cart={cart} />} />
				</Switch>
			</Router>
		)
	}
}

export default Client