import React, { Component } from 'react'


class Shop extends Component {
	state = {
		category: 'All'
	}

	handleChange = (event) => {
		event.preventDefault()
		const { name, value } = event.target
		this.setState({ [name]: value })
	}

	render() {
		return (
			<div>
				<section id="shop">

					<select onChange={this.handleChange} value={this.state.category} name="category">
						<option value="All">All Items</option>
						
						{/* Test -> Options should be coming from database */}
						<option value="Masks">Masks</option>
						<option value="Shirts">Shirts</option>
						{/* Test */}

					</select>

					<div class="desktopProductDisplay">
						
					</div>

					<div class="mobileProductDisplay">

					</div> 

				</section>
			</div>
		)
	}
}

export default Shop