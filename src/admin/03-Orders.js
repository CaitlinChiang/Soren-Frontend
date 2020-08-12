import React, { Component } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'


class Orders extends Component {
    state = { 
        orderList: [],
        updateOrder: {
            order_ID: '',
            newOrderStatus: '',
            newPaymentStatus: '',
        },
        optionChange: '',
        updateValue: '',


        orderStatus_list: [],
        paymentStatus_list: [],

        dateFilter: '',
        arrangement: 'New_to_Old',
        orderStatus: '',
        paymentStatus: ''
    }

    componentDidMount = () => {
        this.getOrders()
        this.getOrderStatus()
        this.getPaymentStatus()
    }

    // Fetch Data
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

    // Update Data
    updateOrder = (order_ID, newOrderStatus, newPaymentStatus) => {
        fetch(`http://localhost:5000/orders/update/${order_ID}?orderStatus=${newOrderStatus}&paymentStatus=${newPaymentStatus}`)
            .then(response => response.json())
            .then(this.getOrders)
            .catch(error => console.log(error))
    }

    // Functionalities
    handleChange = event => {
        event.preventDefault()
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    handleDateChange = (date) => {
        this.setState({ dateFilter: date })
    }

    reverseArrangement = event => {
        this.handleChange(event)

        this.state.orderList.reverse()
    }

    orderItem = order => {
        return (
            <tr key={ order.order_id }>
                <td>{ order.order_id } <br /><br /> { order.order_timestamp }</td>
                <td>{ order.customer_name } <br /><br /> { order.customer_mobile } <br /><br /> { order.customer_email }</td>
                <td>{ order.customer_address } <br /><br /> { order.city_id }</td>
                <td>{ order.order_date }</td>
                <td>{ order.payment_id }</td>
                <td>
                    <select onChange={(event) => this.updateOrder(order.order_id, event.target.value, order.paymentStatus_id)}>
                        <option value="" selected disabled hidden>{ order.orderStatus_id }</option>
                        { this.state.orderStatus_list.map(item => <option value={item.orderStatus_id}>{item.orderStatus_label}</option>) }
                    </select>

                    <br /><br />

                    <select onChange={(event) => this.updateOrder(order.order_id, order.orderStatus_id, event.target.value)}>
                        <option value="" selected disabled hidden>{ order.paymentStatus_id }</option>
                        { this.state.paymentStatus_list.map(item => <option value={item.paymentStatus_id}>{item.paymentStatus_label}</option>) }
                    </select>
                </td>
            </tr>
        )
    }

    // onChange={() => this.updateOrder(6, 1, 2)}>
    
    filters = order => {
        if (this.state.orderStatus == '') {   
            if (this.state.paymentStatus == '') {
                return this.orderItem(order)
            }
            else {
                if (order.paymentStatus_id == this.state.paymentStatus) return this.orderItem(order)
            }
        }
        else {
            if (this.state.paymentStatus == '') {
                if (order.orderStatus_id == this.state.orderStatus) return this.orderItem(order)
            }
            else {
                if (order.orderStatus_id == this.state.orderStatus && order.paymentStatus_id == this.state.paymentStatus) return this.orderItem(order)
            }       
        }
    }

    renderedItem = order => {
        if (this.state.dateFilter == '') {
            return this.filters(order)
        }
        else {
            if (order.order_timestamp.substring(0, 10) == moment(this.state.dateFilter).format('YYYY-MM-DD')) return this.filters(order)
        }
    }

    render() {
        const { orderList } = this.state
        return (
            <section id="admin_orders">
                <div class="orders">

                    <div>
						<DatePicker inline selected={this.state.dateFilter} onChange={date => this.handleDateChange(date)} maxDate={new Date()} format='MM-dd-yyyy' />
					</div>

                    <select value={this.state.arrangement} name="arrangement" onChange={this.reverseArrangement}>
                        <option value="Old_to_New">Oldest to Newest</option>
                        <option value="New_to_Old">Newest to Oldest</option>
                    </select>

                    <select value={this.state.orderStatus} name="orderStatus" onChange={this.handleChange}>
                        <option value="">All Order Statuses</option>
                        { this.state.orderStatus_list.map(item => <option value={item.orderStatus_id}>{item.orderStatus_label}</option>) }
                    </select>

                    <select value={this.state.paymentStatus} name="paymentStatus" onChange={this.handleChange}>
                        <option value="">All Payment Statuses</option>
                        { this.state.paymentStatus_list.map(item => <option value={item.paymentStatus_id}>{item.paymentStatus_label}</option>) }
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
                                    { orderList.map(this.renderedItem) }
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