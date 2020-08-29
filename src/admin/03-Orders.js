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
        sizes: [],
        colors: [],
        cities: [],
        payment_mediums: [],
        statuses_orders: [],
        statuses_payments: []
    }

    componentDidMount = _ => {
        this.orderDetails_fetch()
        this.orderItems_fetch()
        this.sizes_fetch()
        this.colors_fetch()
        this.cities_fetch()
        this.paymentMediums_fetch()
        this.orderStatuses_fetch()
        this.paymentStatuses_fetch()
    }

    // Fetch Data
    orderDetails_fetch = _ => {
        fetch('http://localhost:5000/order_details')
            .then(response => response.json())
            .then(response => this.setState({ orderDetails: response.data }) ) 
    }

    orderItems_fetch = _ => {
        fetch('http://localhost:5000/order_items')
            .then(response => response.json())
            .then(response => this.setState({ orderItems: response.data }) )
    }

    sizes_fetch = _ => {
        fetch('http://localhost:5000/product_sizes')
            .then(response => response.json())
            .then(response => this.setState({ sizes: response.data }) )
    }

    colors_fetch = _ => {
        fetch('http://localhost:5000/product_colors')
            .then(response => response.json())
            .then(response => this.setState({ colors: response.data }) )
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

    orderStatuses_fetch = _ => {
        fetch('http://localhost:5000/status_order')
            .then(response => response.json())
            .then(response => this.setState({ statuses_orders: response.data }) )
    }

    paymentStatuses_fetch = _ => {
        fetch('http://localhost:5000/status_payment')
            .then(response => response.json())
            .then(response => this.setState({ statuses_payments: response.data }) )
    }

    // Render Data
    orders_render = props => {
        const { orderItems, sizes, colors, cities, payment_mediums, statuses_orders, statuses_payments } = this.state

        const size = props => {
            for (let i = 0; i < sizes.length; i++) {
                if (sizes[i].size_id == props) {
                    return sizes[i].size_name
                }
            }
        }

        const color = props => {
            for (let i = 0; i < colors.length; i++) {
                if (colors[i].color_id == props) {
                    return colors[i].color_name
                }
            }
        }

        const city = _ => {
            for (let i = 0; i < cities.length; i++) {
                if (cities[i].city_id === props.city_id) {
                    return cities[i].city_name
                }
            }
        }

        const paymentMethod = _ => {
            for (let i = 0; i < payment_mediums.length; i++) {
                if (payment_mediums[i].paymentMethod_id === props.paymentMethod_id) {
                    return payment_mediums[i].paymentMethod_name
                }
            }
        }

        const orderStatus = _ => {
            for (let i = 0; i < statuses_orders.length; i++) {
                if (statuses_orders[i].orderStatus_id === props.orderStatus_id) {
                    return statuses_orders[i].orderStatus_name
                }
            }
        }

        const paymentStatus = _ => {
            for (let i = 0; i < statuses_payments.length; i++) {
                if (statuses_payments[i].paymentStatus_id === props.paymentStatus_id) {
                    return statuses_payments[i].paymentStatus_name
                }
            }
        }

        return (
            <tr key={props.orderDetail_id}>
                <td>{props.orderDetail_id} <br /><br /> {props.timestamp} </td>
                <td>{orderItems.filter(item => item.orderDetail_id === props.orderDetail_id).map(item => <p>{item.product_quantity} {item.product_name} ({size(item.product_size)} - {color(item.product_color)})</p>) }</td>
                <td>{props.customer_name} <br /><br /> {props.customer_mobile} <br /><br /> {props.customer_email}</td>
                <td>{props.customer_address} <br /><br /> {city()}</td>
                <td>{props.delivery_date.substring(0, 10)}</td>
                <td>P{props.price}.00</td>
                <td>{paymentMethod()}</td>
                <td>
                    <select onChange={(event) => this.orderDetails_update(props.orderDetail_id, event.target.value, props.paymentStatus_id)}>
                        <option value="" selected disabled hidden>{orderStatus()}</option>
                        { statuses_orders.map(item => <option value={item.orderStatus_id}>{item.orderStatus_name}</option>) }
                    </select> <br /><br />

                    <select onChange={(event) => this.orderDetails_update(props.orderDetail_id, props.orderStatus_id, event.target.value)}>
                        <option value="" selected disabled hidden>{paymentStatus()}</option>
                        { statuses_payments.map(item => <option value={item.paymentStatus_id}>{item.paymentStatus_name}</option>) }
                    </select>
                </td>
            </tr>
        )
    }
    
    filters = order => {
        const { orderStatus, paymentStatus } = this.state

        if (orderStatus === '') {   
            if (paymentStatus === '') {
                return this.orders_render(order)
            }
            else {
                if (order.paymentStatus_id == paymentStatus) return this.orders_render(order)
            }
        }
        else {
            if (paymentStatus === '') {
                if (order.orderStatus_id == orderStatus) return this.orders_render(order)
            }
            else {
                if (order.orderStatus_id == orderStatus && order.paymentStatus_id == paymentStatus) return this.orders_render(order)
            }       
        }
    }

    orders_filter = order => {
        const { dateFilter } = this.state

        if (dateFilter == '') {
            return this.filters(order)
        }
        else {
            if (order.timestamp.substring(0, 10) == moment(dateFilter).format('YYYY-MM-DD')) return this.filters(order)
        }
    }

    // Update Data
    orderDetails_update = (orderDetail_id, newOrderStatus, newPaymentStatus) => {
        fetch(`http://localhost:5000/order_details/update/${orderDetail_id}?orderStatus=${newOrderStatus}&paymentStatus=${newPaymentStatus}`)
            .then(response => response.json())
            .then(this.orderDetails_fetch)
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
                        { statuses_orders.map(item => <option value={item.orderStatus_id}>{item.orderStatus_name}</option>) }
                    </select>

                    <select value={paymentStatus} name="paymentStatus" onChange={this.handleChange}>
                        <option value="">All Payment Statuses</option>
                        { statuses_payments.map(item => <option value={item.paymentStatus_id}>{item.paymentStatus_name}</option>) }
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
                                    { orderDetails.map(this.orders_filter) }
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