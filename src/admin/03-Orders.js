import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import '../admin_css/03-Orders.css'

class Orders extends Component {
    state = {
        dateFilter: '',
        arrangement: 'New_to_Old',
        orderStatus: '1',
        paymentStatus: '',
        
        // Data
        orderDetails: [],
        orderItems: [],
        statuses_orders: [],
        statuses_payments: []
    }

    componentDidMount = _ => {
        this.orderDetails_fetch()
        this.orderItems_fetch()
        this.orderStatuses_fetch()
        this.paymentStatuses_fetch()
    }

    // Fetch Data
    orderDetails_fetch = _ => {
        fetch('http://localhost:5000/orders')
            .then(response => response.json())
            .then(response => this.setState({ orderDetails: response.data }) )
    }

    orderItems_fetch = _ => {
        fetch('http://localhost:5000/order_items')
            .then(response => response.json())
            .then(response => this.setState({ orderItems: response.data }) )
    }

    orderStatuses_fetch = _ => {
        fetch('http://localhost:5000/order_status')
            .then(response => response.json())
            .then(response => this.setState({ statuses_orders: response.data }) )
    }

    paymentStatuses_fetch = _ => {
        fetch('http://localhost:5000/payment_status')
            .then(response => response.json())
            .then(response => this.setState({ statuses_payments: response.data }) )
    }

    // Update Data
    orderDetails_update = (order_ID, newOrderStatus, newPaymentStatus) => {
        fetch(`http://localhost:5000/orders/update/${order_ID}?orderStatus=${newOrderStatus}&paymentStatus=${newPaymentStatus}`)
            .then(response => response.json())
            .then(this.orderDetails_fetch)
    }
    
    // Render Data
    orderItem_render = props => {
        const { orderItems, statuses_orders, statuses_payments } = this.state

        return (
            <tr key={props.order_id}>
                <td>{props.order_id} <br /><br /> {props.order_timestamp} </td>
                <td>{orderItems.filter(item => item.order_id === props.order_id).map(item => <p>{item.product_id} ({item.product_size} - {item.product_color})</p>) }</td>
                <td>{props.customer_name} <br /><br /> {props.customer_mobile} <br /><br /> {props.customer_email}</td>
                <td>{props.customer_address} <br /><br /> {props.city_id}</td>
                <td>{props.order_date.substring(0, 10)}</td>
                <td></td>
                <td>{props.payment_id}</td>
                <td>
                    <select onChange={(event) => this.orderDetails_update(props.order_id, event.target.value, props.paymentStatus_id)}>
                        <option value="" selected disabled hidden>{props.orderStatus_id}</option>
                        { statuses_orders.map(item => <option value={item.orderStatus_id}>{item.orderStatus_label}</option>) }
                    </select> <br /><br />

                    <select onChange={(event) => this.orderDetails_update(props.order_id, props.orderStatus_id, event.target.value)}>
                        <option value="" selected disabled hidden>{props.paymentStatus_id}</option>
                        { statuses_payments.map(item => <option value={item.paymentStatus_id}>{item.paymentStatus_label}</option>) }
                    </select>
                </td>
            </tr>
        )
    }
    
    filters = order => {
        const { orderStatus, paymentStatus } = this.state

        if (orderStatus === '') {   
            if (paymentStatus === '') {
                return this.orderItem_render(order)
            }
            else {
                if (order.paymentStatus_id === paymentStatus) return this.orderItem_render(order)
            }
        }
        else {
            if (paymentStatus === '') {
                if (order.orderStatus_id == orderStatus) return this.orderItem_render(order)
            }
            else {
                if (order.orderStatus_id == orderStatus && order.paymentStatus_id === paymentStatus) return this.orderItem_render(order)
            }       
        }
    }

    orderItem_filter = order => {
        const { dateFilter } = this.state

        if (dateFilter == '') {
            return this.filters(order)
        }
        else {
            if (order.order_timestamp.substring(0, 10) == moment(dateFilter).format('YYYY-MM-DD')) return this.filters(order)
        }
    }

    // Helper Functions
    handleChange = event => {
        event.preventDefault()
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    reverseArrangement = event => {
        this.handleChange(event)

        this.state.orderDetails.reverse()
    }

    render() {
        const { dateFilter, arrangement, orderStatus, paymentStatus, statuses_orders, statuses_payments, orderDetails } = this.state

        return (
            <section id="admin_orders">
                <div class="orders">
                    <div>
						<DatePicker inline selected={dateFilter} onChange={date => this.setState({ dateFilter: date })} maxDate={new Date()} format='MM-dd-yyyy' />
					</div>

                    <select value={arrangement} name="arrangement" onChange={this.reverseArrangement}>
                        <option value="Old_to_New">Oldest to Newest</option>
                        <option value="New_to_Old">Newest to Oldest</option>
                    </select>

                    <select value={orderStatus} name="orderStatus" onChange={this.handleChange}>
                        <option value="">All Order Statuses</option>
                        { statuses_orders.map(item => <option value={item.orderStatus_id}>{item.orderStatus_label}</option>) }
                    </select>

                    <select value={paymentStatus} name="paymentStatus" onChange={this.handleChange}>
                        <option value="">All Payment Statuses</option>
                        { statuses_payments.map(item => <option value={item.paymentStatus_id}>{item.paymentStatus_label}</option>) }
                    </select>

                    <div>
                        <div class="table">
                            <table class="orderTable">
                                <thead>
                                    <tr>
                                        <th>Order</th>
                                        <th>Items</th>
                                        <th>Buyer Details</th>
                                        <th>Address</th>
                                        <th>Delivery Date</th>
                                        <th>Total</th>
                                        <th>Payment Method</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody class="dataTable">
                                    { orderDetails.map(this.orderItem_filter) }
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