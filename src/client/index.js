import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Client Views
import Homepage from './02-Homepage'
import Shop     from './03-Shop'
import Cart     from './04-Cart'
import Order    from './05-Order'

// Product Pages
import Mask_Products       from '../products/Masks_Page'
import Shirt_Products      from '../products/Shirts_Page'
import ShopItem_Individual from '../products/ShopItem_Page'


class Client extends Component {
	state = {
		cart: []
	}

	componentDidMount = () => {
		
	}

	updateCart_add = (item) => this.setState({ cart: this.state.cart.concat(item) })

	updateCart_delete = (item_timestamp) => {
		for (let i = 0; i < this.state.cart.length; i++) {
			if (this.state.cart[i].timestamp === item_timestamp) {
				this.state.cart.splice(this.state.cart[i], 1)
			}
		}
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/"       component={Homepage} />
					<Route exact path="/cart"   render={() => <Cart cart={this.state.cart} updateCart_delete={this.updateCart_delete} />} />
					<Route exact path="/order"  render={() => <Order cart={this.state.cart} />} />

					<Route exact path="/shop"   component={Shop} />
					<Route exact path="/masks"  component={Mask_Products} />
					<Route exact path="/shirts" component={Shirt_Products} />

					<Route exact path="/product/:id"  render={(props) => <ShopItem_Individual {...props} cart={this.state.cart} updateCart_add={this.updateCart_add} />} />
				</Switch>
			</Router>
		)
	}
}

export default Client