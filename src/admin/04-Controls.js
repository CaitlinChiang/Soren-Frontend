import React, { Component } from 'react'
import '../admin_css/04-Controls.css'

class Controls extends Component {
    state = {
        city: '',
        paymentMethod: '',
        paymentMethod_account: '',
        size: '',
        color: '',

        // Data
        cities: [],
        payment_mediums: [],
        sizes: [],
        colors: []
    }

    componentDidMount = _ => {
        this.cities_fetch()
        this.paymentMediums_fetch()
        this.sizes_fetch()
        this.colors_fetch()
    }

    // Fetch Data
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

    // Save Data
    cities_add = city => {
        fetch(`http://localhost:5000/city_deliveries/add?city=${city}`)
            .then(response => response.json())
            .then(this.cities_fetch)
    }

    paymentMediums_add = (paymentMethod, paymentMethod_account) => {
        if (paymentMethod_account.trim() !== '') {
            fetch(`http://localhost:5000/payment_mediums/add?paymentMethod=${paymentMethod}&paymentMethod_account=${paymentMethod_account}`)
                .then(response => response.json())
                .then(this.paymentMediums_fetch)
        }
        else {
            fetch(`http://localhost:5000/payment_mediums/add?paymentMethod=${paymentMethod}`)
                .then(response => response.json())
                .then(this.paymentMediums_fetch)
        }
    }

    sizes_add = size => {
        fetch(`http://localhost:5000/product_sizes/add?size=${size}`)
            .then(response => response.json())
            .then(this.sizes_fetch)
    }

    colors_add = color => {
        fetch(`http://localhost:5000/product_colors/add?color=${color}`)
            .then(response => response.json())
            .then(this.colors_fetch)
    }

    // Delete Data
    cities_delete = city => {
        fetch(`http://localhost:5000/city_deliveries/delete/${city}`)
            .then(response => response.json())
            .then(this.cities_fetch)
    }

    paymentMediums_delete = paymentMethod => {
        fetch(`http://localhost:5000/payment_mediums/delete/${paymentMethod}`)
            .then(response => response.json())
            .then(this.paymentMediums_fetch)
    }

    sizes_delete = size => {
        fetch(`http://localhost:5000/product_sizes/delete/${size}`)
            .then(response => response.json())
            .then(this.sizes_fetch)
    }

    colors_delete = color => {
        fetch(`http://localhost:5000/product_colors/delete/${color}`)
            .then(response => response.json())
            .then(this.colors_fetch)
    }

    // Helper Functions
    handleChange = event => {
		event.preventDefault()
		const { name, value } = event.target
        this.setState({ [name]: value })
    }

    render() {
        const { city, paymentMethod, paymentMethod_account, size, color, cities, payment_mediums, sizes, colors } = this.state

        return (
            <section id="admin_controls">
                <div class="controls">
                    <form autoComplete="off">
                        <input type="text" value={city} name="city" onChange={this.handleChange} placeholder="City Name" required />
                        <button type="submit" onClick={() => this.cities_add(city)}>Add</button>
                        <button type="submit" onClick={() => this.cities_delete(city)}>Delete</button>
                    </form>

                    <p>CITIES FOR DELIVERY</p>

                    <ul>
                        { cities.map(item => <li key={item.city_id}>{item.city_name}</li>) }
                    </ul>
                </div>

                <div class="controls">
                    <form autoComplete="off">
                        <input type="text" value={paymentMethod} name="paymentMethod" onChange={this.handleChange} placeholder="Payment Method" required />
                        <input type="text" value={paymentMethod_account} name="paymentMethod_account" onChange={this.handleChange} placeholder="Account Number" />
                        <button type="submit" onClick={() => this.paymentMediums_add(paymentMethod, paymentMethod_account)}>Add</button>
                        <button type="submit" onClick={() => this.paymentMediums_delete(paymentMethod)}>Delete</button>
                    </form>

                    <p>PAYMENT METHODS</p>

                    <ul>
                        { payment_mediums.map(item => {
                            if (item.paymentMethod_account !== null) {
                                return <li key={item.paymentMethod_id}>{item.paymentMethod_name}: {item.paymentMethod_account}</li>
                            }
                            else return <li key={item.paymentMethod_id}>{item.paymentMethod_name}</li>
                        }) }
                    </ul>
                </div>

                <div class="controls">
                    <form autoComplete="off">
                        <input type="text" value={size} name="size" onChange={this.handleChange} placeholder="Product Size" required />
                        <button type="submit" onClick={() => this.sizes_add(size)}>Add</button>
                        <button type="submit" onClick={() => this.sizes_delete(size)}>Delete</button>
                    </form>

                    <p>PRODUCT SIZES</p>

                    <ul>
                        { sizes.map(item => <li key={item.size_id}>{item.size_name}</li>) }
                    </ul>
                </div>

                <div class="controls">
                    <form autoComplete="off">
                        <input type="text" value={color} name="color" onChange={this.handleChange} placeholder="Product Color" required />
                        <button type="submit" onClick={() => this.colors_add(color)}>Add</button>
                        <button type="submit" onClick={() => this.colors_delete(color)}>Delete</button>
                    </form>

                    <p>PRODUCT COLORS</p>

                    <ul>
                        { colors.map(item => <li key={item.color_id}>{item.color_name}</li>) }
                    </ul>
                </div>
            </section>
        )
    }
}

export default Controls