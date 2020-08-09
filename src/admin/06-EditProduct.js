import React, { Component } from 'react'


class EditProduct extends Component {
    state = { 
        name: '',
        category: '',
        price: '',
        sizes: [],
        colors: []
    }

    handleChange = (event) => {
		event.preventDefault()
		const { name, value } = event.target
        this.setState({ [name]: value })
    }

    clear = () => {
        this.setState({
            name: '',
            category: '',
            price: '',
            sizes: [],
            colors: []
        })
    }

    render() {
        return (
            <section id="admin_editProduct">

                <div class="editProduct" id="editProduct">

                    <input type="text" value={this.state.name} name="name" onChange={this.handleChange} placeholder="Product Name" required autoComplete="off" />
                    
                    <select value={this.state.category} name="category" onChange={this.handleChange} required>
                        <option value="">-- Select Product Category --</option>
                        <option value="Masks">  Masks  </option>
                        <option value="Shirts"> Shirts </option>
                    </select>

                    <input type="number" step="0.01" value={this.state.price} name="price" onChange={this.handleChange} placeholder="Price (ex. 100.00)" required />
                    
                    <div>
                        <p>Sizes: { this.state.sizes.map(item => <p>{ item }</p>) }</p>
                        <button onClick={() => this.setState({ sizes: this.state.sizes.concat('XS') })}> XS</button> 
                        <button onClick={() => this.setState({ sizes: this.state.sizes.concat('S')  })}> S </button>
                        <button onClick={() => this.setState({ sizes: this.state.sizes.concat('M')  })}> M </button>
                        <button onClick={() => this.setState({ sizes: this.state.sizes.concat('L')  })}> L </button>
                        <button onClick={() => this.setState({ sizes: this.state.sizes.concat('XL') })}> XL</button>
                    </div> <br />

                    <div>
                        <p>Colors: { this.state.colors.map(item => <p>{ item }</p>) }</p>
                        <button onClick={() => this.setState({ colors: this.state.colors.concat('Black') })} style={{ background: "#000" }}>   </button> 
                        <button onClick={() => this.setState({ colors: this.state.colors.concat('White') })} style={{ background: "#fff" }}>   </button>
                        <button onClick={() => this.setState({ colors: this.state.colors.concat('Blue')  })} style={{ background: "#2e55ff" }}></button>
                        <button onClick={() => this.setState({ colors: this.state.colors.concat('Red')   })} style={{ background: "#ff3a3a" }}></button>
                    </div> <br/>

                    <button onClick={() => this.clear()}>RESTART</button>
                    <button type="submit">SAVE CHANGES</button>
                    <button>DELETE PRODUCT</button>
                    
                </div>

                <div class="currentDetails">
                    <h3>CURRENT DETAILS</h3>
                    <p>Product Name</p>
                    <p>Category Name</p>
                    <p>P0.00</p>
                    <p>Sizes: S, M, L</p>
                    <p>Colors: Black, White, Red</p>
                </div>

            </section>
        )
    }
}

export default EditProduct