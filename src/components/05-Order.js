import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addMonths, addDays } from 'date-fns'


class Order extends Component {
    state = {
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        date: ''
    }

    handleChange = (event) => {
		event.preventDefault()
		const { name, value } = event.target
        this.setState({ [name]: value })
    }

    // NOTE: City options must come from the database, and the total cost must be a universal state

    // Submission Function must include all the properties requried in the database for an order placement

    render() {
        return (
            <div>

                <section id="order">

                    <Link to="/cart"> <div>&#8592; Back to Cart</div> </Link>

                    <h1>Total Cost: P0.00</h1>

                    <div>
                        <form autocomplete="off">

                            <div>
                                <input type="text" value={this.state.name}  name="name"  onChange={this.handleChange} placeholder="First Name, Last Name" required />
                                <input type="text" value={this.state.phone} name="phone" onChange={this.handleChange} placeholder="Phone Number"          required />
                                <input type="text" value={this.state.email} name="email" onChange={this.handleChange} placeholder="Email Address"         required />
                            </div>

                            <div>

                                <input type="text" value={this.state.address} name="address" onChange={this.handleChange} placeholder="Delivery Address" id="address" required />
                                
                                <select value={this.state.city} name="city" onChange={this.handleChange} placeholder="City" required >
                                    <option value="">--Choose a City--</option>
                                    {/* PLACEHOLDER */}
                                    <option value="">--Choose a City--</option>
                                    <option value="">--Choose a City--</option>
                                    {/* PLACEHOLDER */}
                                </select>

                            </div>

                            <div class="datepicker">
                                <h2>Date of Delivery</h2>
                                <DatePicker inline selected={this.state.date} onChange={date => this.setState({ date })} minDate={addDays(new Date(), 1)} maxDate={addMonths(new Date(), 1)} format='MM-dd-yyyy' required />
                            </div>

                            <button type="submit">Order</button>

                        </form>
                    </div>

                </section>
                
                <footer>&#169; 2020 by Soren.</footer>

            </div>
        )
    }
}

export default Order