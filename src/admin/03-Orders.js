import React, { Component } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addMonths, addDays } from 'date-fns'


class Orders extends Component {
    state = { 
        orderList: [],
        orderStatus_list: [],
        paymentStatus_list: [],

        dateFilter: '',
        arrangement: 'New_to_Old',
        orderStatus: 'Pending',
        paymentStatus: 'Not Paid'
    }

    componentDidMount = () => {
        this.getOrders()
        this.getOrderStatus()
        this.getPaymentStatus()
    }

    getOrders = _ => {
        fetch('http://localhost:5000/orders')
            .then(response => response.json())
            .then(response => this.setState({ orderList: response.data }) )
            .catch(error => console.log(error))
    }

    getOrderStatus = _ => {
        fetch('http://localhost:5000/order_status')
            .then(response => response.json())
            .then(response => this.setState({ orderStatus_list: response.data }) )
            .catch(error => console.log(error))
    }

    getPaymentStatus = _ => {
        fetch('http://localhost:5000/payment_status')
            .then(response => response.json())
            .then(response => this.setState({ paymentStatus_list: response.data }) )
            .catch(error => console.log(error))
    }

    handleChange = event => {
        event.preventDefault()
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    handleDateChange = (date) => {
        this.setState({ dateFilter: date })
    }


    
    item = order => {
        return (
            <tr key={ order.order_id }>
                <td>{ order.order_id } <br /><br /> { order.order_timestamp }</td>
                <td>{ order.customer_name } <br /><br /> { order.customer_mobile } <br /><br /> { order.customer_email }</td>
                <td>{ order.customer_address } <br /><br /> { order.city_id }</td>
                <td>{ order.order_date }</td>
                <td>{ order.payment_id }</td>
                <td>
                    <select selected={ order.orderStatus_id }>
                        { this.state.orderStatus_list.map(item => <option value={item.orderStatus_id}>{item.orderStatus_label}</option>) }
                    </select>

                    <br /><br />

                    <select selected={ order.paymentStatus_id }>
                        { this.state.paymentStatus_list.map(item => <option value={item.paymentStatus_id}>{item.paymentStatus_label}</option>) }
                    </select>
                </td>
            </tr>
        )
    }

    render() {
        const { orderList } = this.state
        return (
            <section id="admin_orders">
                <div class="orders">

                    <div>
						<DatePicker inline selected={this.state.dateFilter} onChange={date => this.handleDateChange(date)} maxDate={new Date()} format='MM-dd-yyyy' />
					</div>

                    <select value={this.state.arrangement} name="arrangement" onChange={this.handleChange}>
                        <option value="">-- Arrangement --</option>
                        <option value="Old_to_New">Oldest to Newest</option>
                        <option value="New_to_Old">Newest to Oldest</option>
                    </select>

                    <select value={this.state.orderStatus} name="orderStatus" onChange={this.handleChange}>
                        <option value="">-- Order Status --</option>
                        <option value="Pending"> Pending </option>
                        <option value="Ready">   Ready   </option>
                        <option value="Done">    Done    </option>
                        <option value="Issues">  Issues  </option>
                    </select>

                    <select value={this.state.paymentStatus} name="paymentStatus" onChange={this.handleChange}>
                        <option value="">-- Payment Status --</option>
                        <option value="Not Paid"> Not Paid </option>
                        <option value="Paid">     Paid     </option>
                    </select>

                    <div>
                        <div class="table">
                            <table class="orderTable">

                                <thead>
                                    <tr>
                                        <th>Order</th>
                                        <th>Buyer Details</th>
                                        <th>Address</th>
                                        <th>Delivery Date</th>
                                        <th>Payment Method</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody class="dataTable">
                                    { orderList.map(this.item) }
                                </tbody>

                            </table>
                        </div>
                    </div>

                </div>
            </section>
        )
    }
}

export default Orders