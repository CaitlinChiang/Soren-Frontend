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

    // Fetch Data
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

    // Add Data
    addCity = (city) => {
        if (this.state.city !== '') {
            fetch(`http://localhost:5000/city_deliveries/add?newCity=${city}`)
                .then(response => response.json())
                .then(this.getCities)
                .catch(error => console.log(error))
        }
    }

    addPaymentMethod = (payment) => {
        if (this.state.payment !== '') {
            fetch(`http://localhost:5000/payment_mediums/add?newPaymentMethod=${payment}`)
                .then(response => response.json())
                .then(this.getPaymentMethods)
                .catch(error => console.log(error))
        }
    }

    // Delete Data
    removeCity = (city) => {
        if (this.state.city !== '') {
            fetch(`http://localhost:5000/city_deliveries/delete/${city}`)
                .then(response => response.json())
                .then(this.getCities)
                .catch(error => console.log(error))
        }
    }

    removePaymentMethod = (paymentMethod) => {
        if (this.state.payment !== '') {
            fetch(`http://localhost:5000/payment_mediums/delete/${paymentMethod}`)
                .then(response => response.json())
                .then(this.getPaymentMethods)
                .catch(error => console.log(error))
        }
    }


    // Functionalities
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
                        <input  type="text" value={this.state.city} name="city" onChange={this.handleChange} placeholder="City Name" />
                        <button onClick={() => this.addCity(this.state.city)}>Add</button>
                        <button onClick={() => this.removeCity(this.state.city)}>Delete</button>
                    </form>

                    <p>CITIES FOR DELIVERY</p>

                    <ul>
                        { cities.map(this.city) }
                    </ul>

                </div>

                <div class="controls">

                    <form autoComplete="off">
                        <input  type="text" value={this.state.payment} name="payment" onChange={this.handleChange} placeholder="Payment Method" />
                        <button onClick={() => this.addPaymentMethod(this.state.payment)}>Add</button>
                        <button onClick={() => this.removePaymentMethod(this.state.payment)}>Delete</button>
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