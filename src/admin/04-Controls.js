import React, { Component } from 'react'
import '../admin_css/04-Controls.css'

class Controls extends Component {
    state = { 
        cities:          [],
        payment_mediums: [],
        sizes: [],
        colors: [],

        city: '',
        payment: '',
        size: '',
        color: ''
    }

    componentDidMount = () => {
        this.getCities()
        this.getPaymentMethods()
        this.getSizes()
        this.getColors()
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

    getSizes = _ => {
        fetch('http://localhost:5000/product_sizes')
            .then(response => response.json())
            .then(response => this.setState({ sizes: response.data }))
            .catch(error => console.log(error))
    }

    getColors = _ => {
        fetch('http://localhost:5000/product_colors')
            .then(response => response.json())
            .then(response => this.setState({ colors: response.data }))
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

    addSize = (size) => {
        if (this.state.size !== '') {
            fetch(`http://localhost:5000/product_sizes/add?size=${size}`)
                .then(response => response.json())
                .then(this.getSizes)
                .catch(error => console.log(error))
        }
    }

    addColor = (color) => {
        if (this.state.color !== '') {
            fetch(`http://localhost:5000/product_colors/add?color=${color}`)
                .then(response => response.json())
                .then(this.getColors)
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

    removeSize = (size) => {
        if (this.state.size !== '') {
            fetch(`http://localhost:5000/product_sizes/delete/${size}`)
                .then(response => response.json())
                .then(this.getSizes)
                .catch(error => console.log(error))
        }
    }

    removeColor = (color) => {
        if (this.state.color !== '') {
            fetch(`http://localhost:5000/product_colors/delete/${color}`)
                .then(response => response.json())
                .then(this.getColors)
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

    size = item => {
        return (
            <li key={ item.size_id }>{ item.size_label }</li>
        )
    }

    color = item => {
        return (
            <li key={ item.color_id }>{ item.color_name }</li>
        )
    }

    render() {
        const { cities, payment_mediums, sizes, colors } = this.state
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

                <div class="controls">

                    <form autoComplete="off">
                        <input  type="text" value={this.state.size} name="size" onChange={this.handleChange} placeholder="Product Size" />
                        <button onClick={() => this.addSize(this.state.size)}>Add</button>
                        <button onClick={() => this.removeSize(this.state.size)}>Delete</button>
                    </form>

                    <p>PRODUCT SIZES</p>

                    <ul>
                        { sizes.map(this.size) }
                    </ul>

                </div>

                <div class="controls">

                    <form autoComplete="off">
                        <input  type="text" value={this.state.color} name="color" onChange={this.handleChange} placeholder="Product Color" />
                        <button onClick={() => this.addColor(this.state.color)}>Add</button>
                        <button onClick={() => this.removeColor(this.state.color)}>Delete</button>
                    </form>

                    <p>PRODUCT COLORS</p>

                    <ul>
                        { colors.map(this.color) }
                    </ul>

                </div>

            </section>
        )
    }
}

export default Controls