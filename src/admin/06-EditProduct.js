import React, { Component } from 'react'
import '../admin_css/06-EditProduct.css'

class EditProduct extends Component {
    state = {
        // Data
        productID: this.props.location.productID,
        product: [],
        productVariants_sizes: [],
        productVariants_colors: [],
        productImages: [],

        categories: [],
        sizes: [],
        colors: [],
        stocks: [],
        
        // Product Details
        name: '',
        category: '',
        price: '',
        stock: '',
        productSizes: [],
        productColors: [],
        photoFront: '',
        photoFront_image: '',
        photoBack: '',
        photoBack_image: ''
    }

    componentWillMount = _ => {
        if (this.props.location.productID === undefined) {
            var productID = JSON.parse(localStorage.getItem("product_id"))
            this.setState({ productID })
        }
    }

    componentDidMount = () => {
        const { productID } = this.state

        if (productID !== undefined) {
            localStorage.setItem("product_id", JSON.stringify(productID))
        }

        this.product_fetch()
        this.productVariants_fetch()
        this.productImages_fetch()
        this.categories_fetch()
        this.stocks_fetch()
        this.sizes_fetch()
        this.colors_fetch()
    }

    // Fetch Data
    product_fetch = _ => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].product_id === this.state.productID) {
                        this.setState({ product: this.state.product.concat(response.data[i]) })
                    }
                }
            })
    }

    productVariants_fetch = _ => {
        fetch('http://localhost:5000/products_variants')
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].product_id === this.state.productID) {
                        if (!this.state.productVariants_sizes.includes(response.data[i].size_id)) {
                            this.setState({ productVariants_sizes: this.state.productVariants_sizes.concat(response.data[i].size_id) })
                        }

                        if (!this.state.productVariants_colors.includes(response.data[i].color_id)) {
                            this.setState({ productVariants_colors: this.state.productVariants_colors.concat(response.data[i].color_id) })
                        }
                    }
                }
            })
    }

    productImages_fetch = _ => {
        fetch('http://localhost:5000/product_photos')
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].product_id === this.state.productID) {
                        this.setState({ productImages: this.state.productImages.concat(response.data[i]) })
                    }
                }
            })
    }

    categories_fetch = _ => {
        fetch('http://localhost:5000/categories')
            .then(response => response.json())
            .then(response => this.setState({ categories: response.data }))
    }

    stocks_fetch = _ => {
        fetch('http://localhost:5000/product_stocks')
            .then(response => response.json())
            .then(response => this.setState({ stocks: response.data }))
    }

    sizes_fetch = _ => {
        fetch('http://localhost:5000/product_sizes')
            .then(response => response.json())
            .then(response => this.setState({ sizes: response.data }))
    }

    colors_fetch = _ => {
        fetch('http://localhost:5000/product_colors')
            .then(response => response.json())
            .then(response => this.setState({ colors: response.data }))
    }

    // Render Data
    product_render = props => {
        const { productVariants_sizes, productVariants_colors, productImages, categories, sizes, colors, stocks } = this.state

        const category = _ => {
            for (let i = 0; i < categories.length; i++) {
                if (categories[i].category_id === props.category_id) {
                    return categories[i].category_name
                }
            }
        }

        const stock = _ => {
            for (let i = 0; i < stocks.length; i++) {
                if (stocks[i].stock_id === props.stock_id) {
                    return stocks[i].stock_status
                }
            }
        }

        const size = _ => {
            return productVariants_sizes.map(item => {
                for (let i = 0; i < sizes.length; i++) {
                    if (sizes[i].size_id === item) {
                        return <p>{sizes[i].size_name}</p>
                    }
                }
            })
        }

        const color = _ => {
            return productVariants_colors.map(item => {
                for (let i = 0; i < colors.length; i++) {
                    if (colors[i].color_id === item) {
                        return <p>{colors[i].color_name}</p>
                    }
                }
            })
        }

        const image = _ => productImages.map(item => <img src={item.url_link} /> )

        return (
            <div key={props.product_id}>
                <div>{props.product_name}</div>
                <div>{category()}</div>
                <div>P{props.product_price}.00</div>
                <div>{stock()}</div>
                <div>Sizes: {size()}</div>
                <div>Colors: {color()}</div>
                <div>{image()}</div>
            </div>
        )
    }

    // Update Data
    product_update = _ => {
        const { productID, name, category, price, stock, productSizes, productColors, photoFront, photoBack } = this.state

        if (name.trim() !== '' && category.trim() !== '' && price.trim() !== '' && stock.trim() !== '' && productSizes.length > 0 && productColors.length > 0 && photoFront.trim() !== '' && photoBack.trim() !== '') {
            const confirmation = window.confirm("Are you sure you would like to update this item?")

            if (confirmation) {
                fetch(`http://localhost:5000/products/update/${productID}?product_category=${category}&name=${name}&price=${price}&stock=${stock}`)
                    .then(response => response.json())
                    
                this.productVariants_update()
                this.productImages_update()
            }
        }
        else alert("Please fill in all the input fields.")
    }

    productVariants_update = _ => {
        const { productID, productSizes, productColors } = this.state

        fetch(`http://localhost:5000/products_variants/delete/${productID}`)
            .then(response => response.json())
            .then(this.remove)

        for (let i = 0; i < productSizes.length; i++) {
            for (let j = 0; j < productColors.length; j++) {
                fetch(`http://localhost:5000/products_variants/add?product_id=${productID}&size=${productSizes[i].size_id}&color=${productColors[j].color_id}`)
                    .then(response => response.json())
            }
        }

        this.clear()
        alert("Item has been updated")
        this.product_fetch()
        this.productVariants_fetch()
    }

    productImages_update = async _ => {
        const { productID, photoFront, photoBack } = this.state

        fetch(`http://localhost:5000/product_photos/delete/${productID}`)

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

    // Delete Data
    product_delete = _ => {
        const confirmation = window.confirm("Are you sure you would like to delete this item?")

        if (confirmation) {
            fetch(`http://localhost:5000/products/delete/${this.state.productID}`)
            alert("Item has been deleted.")
        }

        this.setState({ product: [] })
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

    remove = _ => {
        this.setState({ 
            product: [],
            productVariants_sizes: [],
            productVariants_colors: []
        })
    }

    clear = _ => {
        this.setState({
            name: '',
            category: '',
            price: '',
            stock: '',
            productSizes: [],
            productColors: [],
            photoFront: '',
            photoFront_image: '',
            photoBack: '',
            photoBack_image: ''
        })
    }

    render() {
        const { product, name, category, price, stock, productSizes, productColors, categories, stocks, sizes, colors, photoFront_image, photoBack_image } = this.state

        return (
            <section id="admin_editProduct">
                <div class="currentDetails">
                    <h3>CURRENT DETAILS</h3>
                    { product.map(this.product_render) }
                </div>

                <div id="editProduct" class="editProduct">
                    <h3>EDIT DETAILS</h3>

                    <input type="text" value={name} name="name" onChange={this.handleChange} placeholder="Product Name" autoComplete="off" />
                    
                    <select value={category} name="category" onChange={this.handleChange} required >
                        <option value="">-- Select Product Category --</option>
                        { categories.map(item => <option value={item.category_id}>{item.category_name}</option>) }
                    </select>

                    <input type="number" step="0.01" value={price} name="price" onChange={this.handleChange} placeholder="Price (ex. 100.00)" />

                    <select value={stock} name="stock" onChange={this.handleChange}>
                        <option value="">-- Select Stock Status --</option>
                        { stocks.map(item => <option value={item.stock_id}>{item.stock_status}</option>) }
                    </select>
                    
                    <div>
                        <p>Sizes: { productSizes.map(item => <p>{item.size_name}</p>) }</p>
                        { sizes.map(item => <button onClick={() => this.setState({ productSizes: this.state.productSizes.concat(item) })}>{item.size_name}</button>) }
                    </div> <br />

                    <div>
                        <p>Colors: { productColors.map(item => <p>{item.color_name}</p>) }</p>
                        { colors.map(item => <button onClick={() => this.setState({ productColors: this.state.productColors.concat(item) })} style={{ background: `${item.color_name}` }}></button>) }
                    </div> <br/>

                    <div>
                        <input type="file" name="photoFront" onChange={(event) => this.handlePhotos('photoFront', event.target.files, 'photoFront_image')} class="fileInput" />
                        <img src={photoFront_image} style={{ width: '300px' }} />

                        <input type="file" name="photoBack" onChange={(event) => this.handlePhotos('photoBack', event.target.files, 'photoBack_image')} class="fileInput" />
                        <img src={photoBack_image} style={{ width: '300px' }} />
                    </div>

                    <button onClick={() => this.clear()}>RESTART</button>
                    <button type="submit" onClick={() => this.product_update()}>SAVE CHANGES</button>
                    <button type="submit" onClick={() => this.product_delete()}>DELETE PRODUCT</button>
                </div>
            </section>
        )
    }
}

export default EditProduct