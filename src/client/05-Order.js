import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addMonths, addDays } from 'date-fns'
import moment from 'moment'

import Navbar from './01-Navbar'


class Order extends Component {
    state = {
        price: 0,

        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        paymentMethod: '',
        date: '',

        cities: [],
        payment_mediums: [],

        cart: this.props.cart,
        orderID: ''
    }

    componentDidMount = () => {
        this.getCities()
        this.getPaymentMethods()
        this.getProductID()
        this.getPrice()
    }

    handleChange = (event) => {
		event.preventDefault()
		const { name, value } = event.target
        this.setState({ [name]: value })
    }

    // Fetch Data
    getPrice = _ => {
        const { cart } = this.state

        let price = 0

        if (cart.length > 0) {
            for (let i = 0; i < cart.length; i++) {
                price += cart[i].price
            }
            this.setState({ price })
        }
        else {
            this.setState({ price: 0 })
        }
    
    }

    getCities = _ => {
        fetch('http://localhost:5000/city_deliveries')
            .then(response => response.json())
            .then(response => this.setState({ cities: response.data }) )
            .catch(error => console.log(error))
    }

    getPaymentMethods = _ => {
        fetch('http://localhost:5000/payment_mediums')
            .then(response => response.json())
            .then(response => this.setState({ payment_mediums: response.data }) )
            .catch(error => console.log(error))
    }

    // Append Order
    getProductID = _ => {
        fetch('http://localhost:5000/orders')
            .then(response => response.json())
            .then(response => this.setState({ orderID: response.data[0].order_id + 1 }))
            .catch(error => console.log(error))
    }

    timestamp = () => {
        let newDate = new Date()
        
        let month = newDate.getMonth() + 1;
        let dateToday = newDate.getDate();
        let year = newDate.getFullYear();
        let hour = newDate.getHours();
        let mins = newDate.getMinutes();
        let sec = newDate.getSeconds();

        return (month < 10 ? (year + '-' + '0' + month) : year + '-' + month) + "-" + (dateToday < 10 ? ('0' + dateToday) : dateToday) + " " + (hour < 10 ? ('0' + hour) : hour) + ":" + (mins < 10 ? ('0' + mins) : mins) + ":" + (sec < 10 ? ('0' + sec) : sec)
    }

    addOrder = () => {
        let timestamp = this.timestamp()
        const { name, phone, email, address, city, paymentMethod, date, orderID } = this.state
        
        fetch(`http://localhost:5000/orders/add?name=${name}&mobile=${phone}&email=${email}&address=${address}&city=${city}&orderDate=${moment(date).format('YYYY-MM-DD')}&paymentMethod=${paymentMethod}&timestamp=${timestamp}&orderStatus=1&paymentStatus=1`)
            .then(response => response.json())
            .catch(error => console.log(error))

        for (let i = 0; i < this.state.cart.length; i++) {
            fetch(`http://localhost:5000/order_items/add?orderID=${orderID}&productID=${this.state.cart[i].id}&color=${this.state.cart[i].color}&size=${this.state.cart[i].size}`)
            .then(response => response.json())
            .catch(error => console.log(error))
        }
    }

    render() {
        return (
            <div>
                <Navbar />

                <section id="order">

                    <Link to="/cart"> <div>&#8592; Back to Cart</div> </Link>

                    <h1>Total Cost: P{this.state.price}.00</h1>

                    <div>
                        <form autoComplete="off">

                            <div>
                                <input type="text" value={this.state.name}  name="name"  onChange={this.handleChange} placeholder="First Name, Last Name" required />
                                <input type="text" value={this.state.phone} name="phone" onChange={this.handleChange} placeholder="Phone Number"          required />
                                <input type="text" value={this.state.email} name="email" onChange={this.handleChange} placeholder="Email Address"         required />
                            </div>

                            <div>

                                <input type="text" value={this.state.address} name="address" onChange={this.handleChange} placeholder="Delivery Address" id="address" required />
                                
                                <select value={this.state.city} name="city" onChange={this.handleChange} required >
                                    <option value="">--Choose a City--</option>
                                    { this.state.cities.filter(item => item.city_name !== "").map(item => <option value={item.city_id}>{item.city_name}</option>) }
                                </select>

                                <select value={this.state.paymentMethod} name="paymentMethod" onChange={this.handleChange} required >
                                    <option value="">--Choose a Payment Method--</option>
                                    { this.state.payment_mediums.map(item => <option value={item.payment_id}>{item.payment_method}</option>) }
                                </select>

                            </div>

                            <div class="datepicker">
                                <h2>Date of Delivery</h2>
                                <DatePicker inline selected={this.state.date} onChange={date => this.setState({ date })} minDate={addDays(new Date(), 1)} maxDate={addMonths(new Date(), 1)} format='YYYY-MM-DD' required />
                            </div>

                            <button onClick={() => this.addOrder()}>Order</button>

                        </form>
                    </div>

                </section>
                
                <footer>&#169; 2020 by Soren.</footer>

            </div>
        )
    }
}

export default Order