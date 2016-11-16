'use strict'

import Promise from 'bluebird'
import cheerio from 'cheerio'

export default function tmallParse(html){
	return new Promise((resolve, reject) => {
		try{
			//产品列表
			var products = []
			var $ = cheerio.load(html, {decodeEntities: false})
			$('.product').each(function(){
				var _title = $(this).find('.productTitle').text().trim()
				var _url = $(this).find('.productTitle a').attr('href')
				var _img = $(this).find('.productImg-wrap img').attr('data-ks-lazyload')
				//判断是否有图片地址，没有就换个地方取
				if(!_img){
					_img = $(this).find('.productImg-wrap img').attr('src')
				}
				var _price = $(this).find('.productPrice em').attr('title')
				
				//产品信息
				var product = {
					title: _title,
					url: _url,
					img: _img,
					price: _price
				}

				//放入产品列表
				products.push(product)
			})
			resolve(products)
		}catch(error){
			reject(error)
		}
	})
}