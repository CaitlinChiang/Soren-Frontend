import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Client Views
import Navbar   from './01-Navbar'
import Homepage from './02-Homepage'
import Shop     from './03-Shop'
import Cart     from './04-Cart'
import Order    from './05-Order'

// Product Pages
import Mask_Products       from '../products/Masks_Page'
import Shirt_Products      from '../products/Shirts_Page'
import ShopItem_Individual from '../products/ShopItem_Page'


// Navbar for Client Routes
export const ClientRoute = ({ component: Component , ...rest}) => {
    return (
        <Route {...rest} component={(props) => (
            <div>
                <Navbar />
                <Component {...props} />
            </div>
        )} />
    )
}


class Client extends Component {
	state = { }

	render() {
		return (
			<Router>
				<ClientRoute exact path="/"       component={Homepage} />
				<ClientRoute exact path="/cart"   component={Cart} />
				<ClientRoute exact path="/order"  component={Order} />

				<ClientRoute exact path="/shop"   component={Shop} />
				<ClientRoute exact path="/masks"  component={Mask_Products} />
				<ClientRoute exact path="/shirts" component={Shirt_Products} />

				{/* PLACEHOLDER */}
				<ClientRoute exact path="/product1" component={ShopItem_Individual} />
				{/* PLACEHOLDER */}
			</Router>
		)
	}
}

export default Client