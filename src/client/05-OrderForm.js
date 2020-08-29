import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addMonths, addDays, getDay } from 'date-fns'
import moment from 'moment'
import '../client_css/05-Order.css'
import Navbar from './01-Navbar'
import helpers from './helper'

class Order extends Component {
    state = {
        cart: this.props.cart,
        price: 0,
        
        // Data
        cities: [],
        payment_mediums: [],

        // Order Details
        orderID: '',
        name: '',
        mobile: '',
        email: '',
        address: '',
        city: '',
        paymentMethod: '',
        date: ''
    }

    componentDidMount = _ => {
        this.price_set()
        this.orderID_set()
        this.cities_fetch()
        this.paymentMediums_fetch()
    }

    // Fetch Data
    price_set = _ => {
        const { cart } = this.state

        let price = 0

        if (cart.length > 0) {
            for (let i = 0; i < cart.length; i++) {
                price += cart[i].price
            }
            this.setState({ price })
        }
        else this.setState({ price: 0 })
    }

    orderID_set = _ => {
        fetch('http://localhost:5000/order_details')
            .then(response => response.json())
            .then(response => this.setState({ orderID: response.data[0].orderDetail_id + 1 }) )
    }

    cities_fetch = _ => {
        fetch('http://localhost:5000/city_deliveries')
            .then(response => response.json())
            .then(response => this.setState({ cities: response.data }) )
    }

    paymentMediums_fetch = _ => {
        fetch('http://localhost:5000/payment_mediums')
            .then(response => response.json())
            .then(response => this.setState({ payment_mediums: response.data }) )
    }

    // Save Data
    orders_add = () => {
        const { cart, orderID, name, mobile, email, address, city, paymentMethod, date, price } = this.state
        let timestamp = helpers.timestamp()

        if (cart.length > 0) {
            const confirmation = window.confirm("Proceed?")

            if (confirmation) {
                fetch(`http://localhost:5000/order_details/add?timestamp=${timestamp}&name=${name}&mobile=${mobile}&email=${email}&address=${address}&city=${city}&paymentMethod=${paymentMethod}&orderDate=${moment(date).format('YYYY-MM-DD')}&price=${price}`)
                    .then(response => response.json())

                for (let i = 0; i < cart.length; i++) {
                    fetch(`http://localhost:5000/order_items/add?orderDetail_id=${orderID}&name=${cart[i].name}&color=${cart[i].color}&size=${cart[i].size}`)
                    .then(response => response.json())
                }
            }
        }
        else alert("Your cart is empty.")
    }

    // Helper Functions
    handleChange = event => {
		event.preventDefault()
		const { name, value } = event.target
        this.setState({ [name]: value })
    }

    filterDeliveryDates = date => {
        const day = getDay(date)

        return day !== 0 && day !== 1 && day !== 2 && day !== 3 && day !== 4 && day !== 5
    }

    render() {
        const { cities, payment_mediums, price, name, mobile, email, address, city, paymentMethod, date } = this.state

        return (
            <div>
                <Navbar />

                <section id="order">
                    <Link to="/cart"> <div>&#8592; Back to Cart</div> </Link>

                    <h1>Total Cost: P{price}.00</h1>

                    <div>
                        <form autoComplete="off">
                            <div>
                                <input type="text" value={name}  name="name"  onChange={this.handleChange} placeholder="First Name, Last Name" required />
                                <input type="text" value={mobile} name="mobile" onChange={this.handleChange} placeholder="Phone Number" required />
                                <input type="text" value={email} name="email" onChange={this.handleChange} placeholder="Email Address" required />
                            </div>

                            <div>
                                <input type="text" value={address} name="address" onChange={this.handleChange} placeholder="Delivery Address" required />
                                
                                <select value={city} name="city" onChange={this.handleChange} required >
                                    <option value="">--Choose a City--</option>
                                    { cities.map(item => <option value={item.city_id}>{item.city_name}</option>) }
                                </select>

                                <select value={paymentMethod} name="paymentMethod" onChange={this.handleChange} required > 
                                    <option value="">--Choose a Payment Method--</option>
                                    { payment_mediums.map(item => <option value={item.paymentMethod_id}>{item.paymentMethod_name}</option>) }
                                </select>
                            </div>

                            <div class="datepicker">
                                <h2>Date of Delivery</h2>
                                <DatePicker inline selected={date} onChange={date => this.setState({ date })} minDate={addDays(new Date(), 1)} maxDate={addMonths(new Date(), 2)} filterDate={this.filterDeliveryDates} format='YYYY-MM-DD' required />
                            </div>

                            <button type="submit" onClick={() => this.orders_add()}>Order</button>
                        </form>
                    </div>

                </section>
                
                <footer>&#169; 2020 by Soren.</footer>
            </div>
        )
    }
}

export default Order