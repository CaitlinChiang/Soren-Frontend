import React, { Component } from 'react'
import '../admin_css/05-AddProduct.css'

class AddProduct extends Component {
    state = {
        // Data
        productID: '',
        categories: [],
        sizes: [],
        colors: [],

        // Product Details
        name: '',
        category: '',
        price: '',
        productSizes: [],
        productColors: [],
        photoFront: '',
        photoFront_image: '',
        photoBack: '',
        photoBack_image: ''
    }

    componentDidMount = _ => {
        this.productID_set()
        this.categories_fetch()
        this.sizes_fetch()
        this.colors_fetch()
    }

    // Fetch Data
    productID_set = _ => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(response => this.setState({ productID: response.data[0].product_id + 1 }) )
    }

    categories_fetch = _ => {
        fetch('http://localhost:5000/categories')
            .then(response => response.json())
            .then(response => this.setState({ categories: response.data }) )
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
    product_add = _ => {
        const { name, category, price, productSizes, productColors } = this.state

        if (productSizes.length > 0 && productColors.length > 0) {
            const confirmation = window.confirm("Are you sure you would like to add this product?")

            if (confirmation) {
                fetch(`http://localhost:5000/products/add?product_category=${category}&name=${name}&price=${price}`)
                    .then(response => response.json())
                    
                this.productVariants_add()
                this.productImages_add()
            }
        }
        else alert("Please fill in all the input fields.")
    }

    productVariants_add = _ => {
        const { productID, productSizes, productColors } = this.state

        for (let i = 0; i < productSizes.length; i++) {
            for (let j = 0; j < productColors.length; j++) {
                fetch(`http://localhost:5000/products_variants/add?product_id=${productID}&size=${productSizes[i].size_id}&color=${productColors[j].color_id}`)
                    .then(response => response.json())
            }
        }

        this.clear()
        alert("Item has been added.")
        this.productID_set()
    }

    // Helper Functions
    handleChange = event => {
		event.preventDefault()
		const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handlePhotos = (name, files, image) => {
        this.setState({ 
            [name]: files[0],
            [image]: URL.createObjectURL(files[0])
        })
    }

    productImages_add = async _ => {
        const { productID, photoFront, photoBack } = this.state

        const data = new FormData()

        data.append('file', photoFront)
        data.append('upload_preset', 'soren_apparel')
        data.append('tags', [productID])
        const response_front = await fetch('https://api.cloudinary.com/v1_1/duoitsajx/image/upload', { method: 'POST', body: data })
        const url_front = await response_front.json()
        fetch(`http://localhost:5000/product_photos/add?product_id=${productID}&photo_type=front&photo_url=${url_front.secure_url}`)

        data.append('file', photoBack)
        data.append('upload_preset', 'soren_apparel')
        data.append('tags', [productID])
        const response_back = await fetch('https://api.cloudinary.com/v1_1/duoitsajx/image/upload', { method: 'POST', body: data })
        const url_back = await response_back.json()
        fetch(`http://localhost:5000/product_photos/add?product_id=${productID}&photo_type=back&photo_url=${url_back.secure_url}`)
    }

    clear = _ => {
        this.setState({
            productID: '',
            name: '',
            category: '',
            price: '',
            productSizes: [],
            productColors: [],
            photoFront: '',
            photoFront_image: '',
            photoBack: '',
            photoBack_image: ''
        })
    }

    render() {
        const { categories, sizes, colors, name, category, price, productSizes, productColors, photoFront_image, photoBack_image } = this.state

        return (
            <section id="admin_addProduct">
                <div class="editProduct">
                    <input type="text" value={name} name="name" onChange={this.handleChange} placeholder="Product Name" autoComplete="off" required />
                    
                    <select value={category} name="category" onChange={this.handleChange} required >
                        <option value="">-- Select Product Category --</option>
                        { categories.map(item => <option value={item.category_id}>{item.category_name}</option>) }
                    </select>

                    <input type="number" step="0.01" value={price} name="price" onChange={this.handleChange} placeholder="Price (ex. 100.00)" required />
                    
                    <div>
                        <p>Sizes: { productSizes.map(item => <p>{item.size_name}</p>) }</p>
                        { sizes.map(item => <button onClick={() => this.setState({ productSizes: this.state.productSizes.concat(item) })}>{item.size_name}</button>) }
                    </div> <br />

                    <div>
                        <p>Colors: { productColors.map(item => <p>{item.color_name}</p>) }</p>
                        { colors.map(item => <button onClick={() => this.setState({ productColors: this.state.productColors.concat(item) })} style={{ background: `${item.color_name}` }}></button>) }
                    </div> <br/>

                    <div>
                        <input type="file" name="photoFront" onChange={(event) => this.handlePhotos('photoFront', event.target.files, 'photoFront_image')} class="fileInput" required />
                        <img src={photoFront_image} style={{ width: '300px' }} />

                        <input type="file" name="photoBack" onChange={(event) => this.handlePhotos('photoBack', event.target.files, 'photoBack_image')} class="fileInput" required />
                        <img src={photoBack_image} style={{ width: '300px' }} />
                    </div>

                    <button onClick={() => this.clear()}>RESTART</button>
                    <button type="submit" onClick={() => this.product_add()}>ADD PRODUCT</button>
                </div>
            </section>
        )
    }
}

export default AddProduct