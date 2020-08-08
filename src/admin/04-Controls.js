import React, { Component } from 'react'


class Controls extends Component {
    state = { 
        cities: ["SanJuan", "Marikina", "Valenzuela", "Quezon", "Taguig"],

        city: ''
    }

    handleChange = (event) => {
		event.preventDefault()
		const { name, value } = event.target
        this.setState({ [name]: value })
    }

    render() {
        return (
            <section id="admin_controls">
                <div class="cities">

                    <form autoComplete="off">
                        <input  type="text" value={this.state.city} name="city" onChange={this.handleChange} placeholder="City Name" required />
                        <button type="submit">Add</button>
                    </form>

                    <p>CITIES FOR DELIVERY</p>

                    <ul>
                        { this.state.cities.map(item => <li>{ item }</li>) }
                    </ul>

                </div>
            </section>
        )
    }
}

export default Controls