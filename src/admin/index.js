import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Admin Views
import Navbar   from './01-Navbar'
import Products from './02-Products'
import Orders   from './03-Orders'
import Others   from './04-Others'


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
                <AdminRoute exact path="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ"        component={Products} />
                <AdminRoute exact path="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ/orders" component={Orders} />
                <AdminRoute exact path="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ/others" component={Others} />

                { /* PLACEHOLDER */ }
                <AdminRoute exact path="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ/addProduct" component={Others} />
                { /* PLACEHOLDER */ }
            </Router>
        )
    }
}

export default Admin