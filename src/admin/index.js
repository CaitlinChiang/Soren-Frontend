import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Admin Views
import Navbar     from './01-Navbar'
import Products   from './02-Products'
import Orders     from './03-Orders'
import Controls   from './04-Controls'
import AddProduct from './05-AddProduct'

// Individual Products
import EditProduct from './06-EditProduct'


// Navbar for Client Routes
export const AdminRoute = ({ component: Component , ...rest}) => {
    return (
        <Route {...rest} component={(props) => (
            <div>
                <Navbar />
                <Component {...props} />
            </div>
        )} />
    )
}


class Admin extends Component {
    state = { }

    render() {
        return (
            <Router>
                <AdminRoute exact path="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ"             component={Products} />
                <AdminRoute exact path="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ/orders"      component={Orders} />
                <AdminRoute exact path="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ/controls"    component={Controls} />
                <AdminRoute exact path="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ/add_product" component={AddProduct} />

                { /* PLACEHOLDER */ }
                <AdminRoute exact path="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ/edit_product" component={EditProduct} />
                { /* PLACEHOLDER */ }
            </Router>
        )
    }
}

export default Admin