'use strict'

import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
	title: String,
	url: String,
	img: String,
	price: String
})

export default mongoose.model('Product', productSchema)