const mongoose = require('mongoose');
const express = require('express');
const OrderModel = require('../orders/order.model');
const BookModel = require('../books/books.model');
const router = express.Router();
const verifyAdminToken = require('../middlewares/verifyAdminToken')
router.get('/', verifyAdminToken, async (req, res) => {
    try {
        // 1. Total number of orders
        const totalOrders = await OrderModel.countDocuments();

        // 2. Total sales (sum of all totalPrice from orders)
        const totalSales = await OrderModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice" }
                }
            }
        ])

        // 3. Trending books statistics: 
        const trendingBooks = await OrderModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }  // Match orders from the last 90 days
                }
            },
            {
                $sort: { createdAt: -1 }  // Sort by most recent orders
            },
            {
                $limit:100
            },
            {
                $unwind: "$products"  // Flatten the `products` array
            },
            {
                $group: {
                    _id: "$products.productId",
                    NumberOfOrder: { $sum: 1 }  // Count occurrences of each product
                }
            },
            {
                $sort: { NumberOfOrder: -1 }  // Sort by `NumberOfOrder` in descending order
            }
        ])

        // 5. Total number of books
        const totalBooks = await BookModel.countDocuments();

        // 6. Monthly sales (group by month and sum total sales for each month)
        const monthlySales = await OrderModel.aggregate([
            {
                $group:{
                    _id: {$dateToString: {format : "%Y-%m", date: "$createdAt"}},
                    totalSales: {$sum: "$totalPrice"},
                    totalOrders: {$sum: 1}
                }
            },
            {
                $sort: {_id: 1}
            }
        ])
        res.status(200).send({
            totalOrders,
            totalSales: totalSales[0].totalSales || 0,
            trendingBooks,
            totalBooks,
            monthlySales
        })
    } catch (error) {
        console.log("Error fetching admin stats: ", error);
        res.status(500).send({ message: "Failed to fetch admin stats" });
    }
})

module.exports = router; 