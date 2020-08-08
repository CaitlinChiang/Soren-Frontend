import React, { Component } from 'react'


// PLACEHOLDER
var order = (
	<tr>
        <td>15435 <br /><br /> 2020-08-08 05:50:20</td>
        <td>Conner Chiang <br /><br /> 09988629001 <br /><br /> connerchiang@gmail.com</td>
        <td>15 Hon Soliven 3, LGV <br /><br /> Marikina City</td>
        <td>2020-08-08</td>
        <td>Cash on Delivery</td>
        <td>Pending <br /><br /> Not Paid</td>
    </tr>
)
// PLACEHOLDER


class Orders extends Component {
    state = { 
        orderList: [order, order, order, order],

        status: '',
        orderArrangement: ''
    }

    handleChange = event => {
        event.preventDefault()
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    render() {
        return (
            <section id="admin_orders">
                <div class="orders">

                    <select value={this.state.orderArrangement} name="orderArrangement" onChange={this.handleChange}>
                        <option value="">-- Arrangement --</option>
                        <option value="Old_to_New">Oldest to Newest</option>
                        <option value="New_to_Old">Newest to Oldest</option>
                    </select>

                    <select value={this.state.orderStatus} name="orderStatus" onChange={this.handleChange}>
                        <option value="">-- Order Status --</option>
                        <option value="Ready">   Ready   </option>
                        <option value="Pending"> Pending </option>
                        <option value="Done">    Done    </option>
                        <option value="Issues">  Issues  </option>
                    </select>

                    <select value={this.state.paymentStatus} name="paymentStatus" onChange={this.handleChange}>
                        <option value="">-- Payment Status --</option>
                        <option value="Paid">   Paid     </option>
                        <option value="Not Paid"> Not Paid </option>
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
                                    { this.state.orderList.map(item => item) }
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