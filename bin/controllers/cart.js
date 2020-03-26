const { Cart, Product } = require('../models')

class CartController{

    static create(req, res, next){
        let { amount, ProductId } = req.body
        let newCart = { amount, ProductId } 
        newCart.CostumerId = req.currentUserId
        Cart
            .findOne({
                where: {
                    ProductId : newCart.ProductId,
                    CostumerId : req.currentUserId
                }
            })
            .then(cart => {
                if(cart){
                    let newAmount = cart.amount + 1
                    return Cart.update({
                        amount : newAmount
                    }, {
                        where: {
                            id : cart.id
                        }
                    })
                } else {
                    return Cart.create({
                        amount : newCart.amount || 1,
                        ProductId : newCart.ProductId,
                        CostumerId : req.currentUserId
                    })
                }
            })
            .then(cart => {
                res.status(201).json({
                    message : 'Success add to cart'
                })
            })
            .catch(next)
    }

    static findAll(req, res, next){
        Cart
            .findAll({
                where: {
                    CostumerId : req.currentUserId
                },
                include: [
                    Product
                ]
            })
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }

    // static findOne(req, res, next){
    //     Product
    //         .findOne({
    //             where : {
    //                 id : req.params.id
    //             }
    //         })
    //         .then(product => {
    //             res.status(200).json(product)
    //         })
    //         .catch(next)
    // }

    static increase(req, res, next){
        Cart
        .findOne({
            where: {
                id : req.params.id
            }
        })
        .then(cart => {
            if(cart){
                let increaseAmount = cart.amount + 1
                return Cart.update({
                    amount : increaseAmount
                }, {
                    where: {
                        id : cart.id
                    }
                })
            }
        })
        .then( cart => {
            return Cart.findOne({
                where: {
                    id: req.params.id
                }
            })
        })
        .then(cart => {
            res.status(201).json({
                message : 'Success increase amount',
                cart: cart
            })
        })
        .catch(next)
    }

    static decrease(req, res, next){
        Cart
        .findOne({
            where: {
                id : req.params.id
            }
        })
        .then(cart => {
            if(cart){
                if(cart.amount > 0) {
                    let decreaseAmount = cart.amount - 1
                    return Cart.update({
                        amount : decreaseAmount
                    }, {
                        where: {
                           id : cart.id
                        }
                    })
                } else {
                    next({
                        status : 400,
                        message : 'Your cart in minimum amount'
                    })
                }
            }
        })
        .then( cart => {
            return Cart.findOne({
                where: {
                    id: req.params.id
                }
            })
        })
        .then(cart => {
            res.status(201).json({
                message : 'Success decrease amount',
                cart: cart
            })
        })
        .catch(next)
    }

    static remove(req, res, next){
        let cartDelete 
        console.log(req.params.id)
        Cart
            .findOne({
                where: {
                    id : req.params.id
                }
            })
            .then(cart => {
                if(cart){
                    cartDelete = cart
                    return Cart.destroy({
                        where: {
                            id : req.params.id
                        }
                        
                    })
                }
            })
            .then(cart => {
                res.status(200).json(cartDelete)
            })
            .catch(next)
    }


    static transaction(req, res, next){
        let transactionCart
        let amountCart 
        let newAmount
        Cart
            .findOne({
                where: {
                    id : req.params.id
                }
            })
            .then(cart => {
                if(cart){
                    transactionCart = cart
                    amountCart = cart.amount
                    return Product.findOne({
                        where : {
                            id : cart.ProductId
                        }
                    })
                } else {
                    next({
                        status : 404,
                        message: 'Cart not found '
                    })
                }
            })
            .then(product => {
                if(product) {
                    if(product.stock >= amountCart) {
                        newAmount = product.stock - amountCart
                        // console.log(newAmount)
                        return Product.update({
                            stock : newAmount
                        }, {
                            where : {
                                id : transactionCart.ProductId
                            }
                        })
                    } else {
                        next({
                            status : 400,
                            message : "Product stock is not ready for this transaction"
                        })
                    }
                } else {
                    next({
                        status : 404,
                        message : "Product is not found"
                    })
                }
            })
            .then(product => {
                return Cart.destroy({
                    where : {
                        id : req.params.id
                    }
                })
            })
            .then(cart => {
                res.status(200).json({
                    message : 'Transaction success!',
                    cart : transactionCart
                })
            })
            .catch(next)
    }
}

module.exports = CartController