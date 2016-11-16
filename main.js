'use strict'

import schedule from 'node-schedule'

import requestAsync from './http'
import tmallParse from './parse'
import { createConnection, closeConnection } from './db'
import Product from './models'

const url = 'https://list.tmall.com/search_product.htm?spm=a220m.1000858.0.0.Im2OsQ&s=60&q=19.9&sort=s&style=g&from=mallfp..pc_1_searchbutton&active=2&type=pc#J_Filter';
const dbUri = 'mongodb://localhost/node_scrapy';

//定时规则
const rule = new schedule.RecurrenceRule()
//每小时第1分钟运行
rule.minute = 1
//运行定时任务
const job  = schedule.scheduleJob(rule, () => {
	(async() => {
		try{
			const html = await requestAsync(url, 'gbk')
			const products = await tmallParse(html)
			
			//connection mongodb
			const info = await createConnection(dbUri)
			console.log(`Connected to ${info.host}:${info.port}/${info.name}`)

			const docs = await Product.collection.insert(products);
			console.log('insert ' + docs.insertedCount + ' rows success');
			//close connection
			await closeConnection();
		}catch(error){
			console.log(error)
		}
	})()
})
