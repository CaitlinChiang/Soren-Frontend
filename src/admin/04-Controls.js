import React, { Component } from 'react'


class Controls extends Component {
    state = { 
        cities:          [],
        payment_mediums: [],

        city: '',
        payment: ''
    }

    componentDidMount = () => {
        this.getCities()
        this.getPaymentMethods()
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

    handleChange = (event) => {
		event.preventDefault()
		const { name, value } = event.target
        this.setState({ [name]: value })
    }

    city = item => {
        return (
            <li key={ item.city_id }>{ item.city_name }</li>
        )
    }

    paymentMedium = item => {
        return (
            <li key={ item.payment_id }>{ item.payment_method }</li>
        )
    }

    render() {
        const { cities, payment_mediums } = this.state
        return (
            <section id="admin_controls">

                <div class="controls">

                    <form autoComplete="off">
                        <input  type="text" value={this.state.city} name="city" onChange={this.handleChange} placeholder="City Name" required />
                        <button type="submit">Add</button>
                    </form>

                    <p>CITIES FOR DELIVERY</p>

                    <ul>
                        { cities.map(this.city) }
                    </ul>

                </div>

                <div class="controls">

                    <form autoComplete="off">
                        <input  type="text" value={this.state.payment} name="payment" onChange={this.handleChange} placeholder="Payment Method" required />
                        <button type="submit">Add</button>
                    </form>

                    <p>PAYMENT METHODS</p>

                    <ul>
                        { payment_mediums.map(this.paymentMedium) }
                    </ul>

                </div>

            </section>
        )
    }
}

export default Controls