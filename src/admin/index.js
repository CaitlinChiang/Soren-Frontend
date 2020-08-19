import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './01-Navbar'
import Products from './02-Products'
import Orders from './03-Orders'
import Controls from './04-Controls'
import AddProduct from './05-AddProduct'
import EditProduct from './06-EditProduct'

// Navbar for Admin Routes
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

function Admin() {
    return (
        <Router>
            <Switch>
                <AdminRoute exact path="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ" component={Products} />
                <AdminRoute exact path="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ/orders" component={Orders} />
                <AdminRoute exact path="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ/controls" component={Controls} />
                <AdminRoute exact path="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ/add_product" component={AddProduct} />
                <AdminRoute exact path="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ/:id" component={EditProduct} />
            </Switch>
        </Router>
    )
}

export default Admin