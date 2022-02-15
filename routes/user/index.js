var express = require('express');
var router = express.Router();
var userHelper = require('../../helpers/user-helper')
var bannerHelper = require('../../helpers/banner-helper');
var hb = require('express-handlebars').create()

const async = require('hbs/lib/async');
const {
  load
} = require('dotenv');
var paypal = require('paypal-rest-sdk');
const { TaskRouterGrant } = require('twilio/lib/jwt/AccessToken');
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AYGjlXg0nfklGTKKkJONL-q3cflFgCU7JVKeCwcSATHjqDJQyt5zL7QvVDKqXC2JQagVbja2QEzivXFq',
    'client_secret': 'EBDlxKwRqNBF_i5msqzLQ655p856RzvZfN15ZicsLA9DGTU6jCWrkTKgIzym-9162g7jFIOAUp9DlDOO'
  });



const isUser = true;
let userSession;
let wallet;
router.use(function (req, res, next) {
  userSession = req.session.userObj;
  next();
});

/* GET home page. */

router.get('/ref', (req, res, next)=>{
  console.log(req.query);
  console.log(req.query.code);
  console.log(req.query.name);
  req.session.refferapplied = true
  req.session.refferedBy = req.query.code
  res.redirect('/signup')
});


router.get('/', async function (req, res, next) {
  if(userSession){
    wallet = userSession.wallet
  }
  let banners = await bannerHelper.takebanners()
  let categoryBanners = await bannerHelper.takeCategoryBanners()
  let category = await userHelper.takeCategory()
  let catname = await userHelper.takeCategoryname()
  let brands = await bannerHelper.getAllBrands()
  let recentProduct = await userHelper.getRecentProducts()
  if (userSession) {

    var cartProducts = await userHelper.getCartProducts(userSession._id)
  }
  let wishlistCount = 0;
  let cartCount = 0;
  if (userSession) {
    cartCount = await userHelper.getCartCount(userSession._id)
    wishlistCount = await userHelper.getWishlistCount(userSession._id)
  }
  res.render('user/index', {
    isUser,
    isUserIndex: true,
    userSession,
    category,
    catname,
    banners,
    categoryBanners,
    brands,
    recentProduct,
    cartCount,
    wishlistCount,
    cartProducts
  });

});

router.post('/search-result', async(req, res, next)=>{
  let searchItem = req.body.searchItem;
  let searchCategory = req.body.category;
  let category = await userHelper.takeCategory()
  let searchProducts = await userHelper.getSearchProducts(searchCategory, searchItem)
  let sideProduct = await userHelper.getsearchSideproduct()
  let brands = await userHelper.takeBrand()
  let wishlistCount = 0;
  let cartCount = 0;
  if (userSession) {

    var cartProducts = await userHelper.getCartProducts(userSession._id)
  }
  if (userSession) {
    cartCount = await userHelper.getCartCount(userSession._id)
    wishlistCount = await userHelper.getWishlistCount(userSession._id)
  }
  res.render('user/search-result', {isUser, searchProducts, category, userSession, sideProduct, brands, wishlistCount, cartCount, cartProducts})

});

router.get('/get-tab-products', async(req, res, next)=>{
  console.log("routerill vanne");
  let allProducts = await userHelper.getallTabProducts()
  res.json(allProducts)
})

router.get('/category-check/:category', async (req, res, next) => {
  if (userSession) {
    var cartProducts = await userHelper.getCartProducts(userSession._id)
  }
  let category = await userHelper.takeCategory()
  let brands = await userHelper.takeBrand()
   let sideProduct = await userHelper.getProductsLeftSlider(req.params.category)

  if(req.session.pricefilter == "true"){
    req.session.pricefilter = "false"
    var products = req.session.filterProduct
  }else{
    var products = await userHelper.findCategoryProducts(req.params.category)
  }
  bannerHelper.takeProductBanner().then(async (productBanner) => {
    let wishlistCount = 0;
      let cartCount = 0;
      if (userSession) {
        cartCount = await userHelper.getCartCount(userSession._id)
        wishlistCount = await userHelper.getWishlistCount(userSession._id)
      }
      res.render('user/category-products', {
        isUser,
        userSession,
        products,
        category,
        brands,
        productBanner,
        cartCount,
        cartProducts,
        sideProduct,
        wishlistCount
      });
    })
});


router.get('/subcategory-products/:cat/:subcat', async (req, res, next) => {
  console.log("category and dubcategory", req.params.cat, req.params.subcat);
  if (userSession) {
    var cartProducts = await userHelper.getCartProducts(userSession._id)
  }
  let category = await userHelper.takeCategory()
  let brands = await userHelper.takeBrand()
   let sideProduct = await userHelper.getProductsLeftSlider(req.params.category)
   if(req.session.pricefilter == "true"){
    req.session.pricefilter = "false"
    var products = req.session.filterProduct
  }else{
    var products = await userHelper.findSubCategoryProducts(req.params.cat, req.params.subcat)
  }
  bannerHelper.takeProductBanner().then(async (productBanner) => {
    let wishlistCount = 0;
      let cartCount = 0;
      if (userSession) {
        cartCount = await userHelper.getCartCount(userSession._id);
        wishlistCount = await userHelper.getWishlistCount(userSession._id)
      }
      res.render('user/sub-category-products', {
        isUser,
        userSession,
        products,
        category,
        brands,
        productBanner,
        cartCount,
        cartProducts,
        sideProduct,
        wishlistCount
      });
    })
});


router.get('/subcategory-products/:cat/product-details/:id', (req, res,next)=>{
  let proId = req.params.id;
  res.redirect('/category-check/product-details/'+proId)
})
router.get('/category-check/product-details/:id', async function (req, res, next) {
  var productID = req.params.id;
  let category = await userHelper.takeCategory()
  if (userSession) {
    var cartProducts = await userHelper.getCartProducts(userSession._id)
  }
  userHelper.getThisProduct(productID).then((product) => {
    userHelper.getRecentProducts().then(async (recentProduct) => {
      let wishlistCount = 0;
      let cartCount = 0;
      
      if (userSession) {
        cartCount = await userHelper.getCartCount(userSession._id);
        wishlistCount = await userHelper.getWishlistCount(userSession._id)
      }
      res.render('user/product', {
        isUser,
        userSession,
        product,
        category,
        recentProduct,
        cartCount,
        cartProducts
      });
    })
  })
});

router.post('/add-to-cart-pro', async(req, res, next)=>{
  let proId = req.body.proId
  
  if(userSession){
    let userId = req.session.userObj._id

    userHelper.addtoCart(proId, userId).then(() => {
      res.json({status : true})
    })
  }else{
    res.json({status : false})
  }
})

router.post('/add-to-wishlist', async(req, res, next)=>{
 
  if (userSession) {
    let userId = userSession._id;
    let proId  = req.body.proId
    let response = await userHelper.checkProductWishlist(userId, proId)
    console.log("result checkwishlist : ", response);
    if(response){
        res.send({status : false, errMsg : "This Product Already To Wishlist"})
    }else{   
      userHelper.addtowishlist(userId, proId).then((response)=>{
        if(response){
          res.send({status : true})
        }else{
          res.send({status : false, errMsg : 'Error'})
        }
      })
    }
  }else{
    res.send({ status :false, errMsg : 'Please login'})
  }
})


router.post('/price-filter', async(req, res)=>{
  console.log(req.body);
  let price = req.body.price;
  let category = req.body.category;
  req.session.pricefilter = "true"
  let filterProduct = await userHelper.getfilterPriceProduct(price, category)
  req.session.filterProduct = filterProduct
  res.redirect('/category-check/'+category)
});

router.post('/brand-filter', async(req, res, next)=>{
  let brand = req.body.brand;
  let category = req.body.cat;

  let products = await userHelper.getBrandFilterProduct(brand, category)

  hb.render('views/user/filter_products.hbs', { products }).then((renderHtml) => {
    res.send(renderHtml)
  })

})

router.use(function (req, res, next) {
  if (userSession) {
    next()
  } else {
    req.session.UserAccErr = "Please Login Or Signup"
    res.redirect('/login')
  }
});

router.get('/wishlist', async(req, res, next)=>{
    let userId = req.session.userObj._id;
    if (userSession) {
      var cartProducts = await userHelper.getCartProducts(userSession._id)
    }
  let items = await userHelper.getWishlist(userId)
  let category = await userHelper.takeCategory()
  let wishlistCount = 0;
  let cartCount = 0;
  if (userSession) {
    cartCount = await userHelper.getCartCount(userSession._id)
    wishlistCount = await userHelper.getWishlistCount(userSession._id)
  }
  res.render('user/wishlist', {isUser, items, category, userSession, wishlistCount, cartCount, cartProducts})
});

router.get('/add-to-cart', async (req, res, next) => {
  let category = await userHelper.takeCategory()
  let cartCount = 0;
  cartCount = await userHelper.getCartCount(userSession._id)
  let wishlistCount = 0;
  wishlistCount = await userHelper.getWishlistCount(userSession._id)
  let cartProducts = await userHelper.getCartProducts(userSession._id);
  let cartId = null;
  if (cartProducts[0]) {
    cartId = cartProducts[0]._id;
  }
if(cartCount === 0){
  var ordebtndisable = true
}
  let total = await userHelper.getTotalAmount(userSession._id)
  res.render('user/cart', {
    isUser,
    category,
    userSession,
    cartProducts,
    cartCount,
    cartId,
    total,
    ordebtndisable,
    wishlistCount
  })
});

router.get('/add-to-cart/:id', async (req, res, next) => {
  userHelper.addtoCart(req.params.id, userSession._id).then(() => {
    res.redirect('/add-to-cart')
  })
});

router.post('/remove-wishlist-product', async(req, res, next)=>{
 console.log("product wishlist : ", req.body);
  let wishlistId = req.body.wishlistId;
  let proId = req.body.proId
  let response = await userHelper.removeProductFromWishlist(wishlistId, proId)
  if(response){
    res.send({status : true})
  }
});

router.post('/change-product-quantity', (req, res, next) => {
  userHelper.changeProductQuantity(req.body).then(async (response) => {
    let userId = req.session.userObj._id
    res.send(await userHelper.getTotalAmount(userId))
  })
});

router.post('/remove-cart-product', (req, res, next) => {
  console.log(req.body.cart);
  console.log(req.body.product);
  userHelper.removeCartProduct(req.body.cart, req.body.product).then(async(response) => {
    console.log("*********");
    console.log(response);
    if (response === true) {
      console.log("ENtered");
      // res.send(true)
      let category = await userHelper.takeCategory()
  let cartCount = 0;
  let wishlistCount =0;
  wishlistCount = await userHelper.getWishlistCount(userSession._id)
  cartCount = await userHelper.getCartCount(userSession._id)
  let cartProducts = await userHelper.getCartProducts(userSession._id);
  let cartId = null;
  if (cartProducts[0]) {
    cartId = cartProducts[0]._id;
  }
  if(cartCount === 0){
    var ordebtndisable = true
  }else{
    var ordebtndisable = false
  }
  let total = await userHelper.getTotalAmount(userSession._id)
  
  hb.render('views/user/cart.hbs', {
    isUser,
    category,
    userSession,
    cartProducts,
    cartCount,
    cartId,
    total
  }).then((renderCartPage)=>{
    res.send({status : true,renderCartPage, ordebtndisable})
  })
    }
  }).catch((err) => {
    res.send({status : false})
  })
});

router.get('/profile', async (req, res, next) => {
  let userId = req.session.userObj._id
  let category = await userHelper.takeCategory()
  let cartCount = 0;
  cartCount = await userHelper.getCartCount(userSession._id)
  let wishlistCount = 0;
  wishlistCount = await userHelper.getWishlistCount(userSession._id)
  let cartProducts = await userHelper.getCartProducts(userSession._id)
  let user = await userHelper.getUser(userId)
  let userAddress = await userHelper.getAddress(userId)
  let orders = await userHelper.myOrders(userId)
  
  res.render('user/profile', {
      isUser,
      category,
      userSession,
      cartProducts,
      cartCount,
      wishlistCount,
      user,
      userAddress,
      orders
  })
});

router.get('/add-address', async (req, res, next) => {
  let category = await userHelper.takeCategory()
  let cartCount = 0;
  cartCount = await userHelper.getCartCount(userSession._id)
  let wishlistCount = 0;
    wishlistCount = await userHelper.getWishlistCount(userSession._id)
  let cartProducts = await userHelper.getCartProducts(userSession._id)
  // let getEditAddress = await userHelper.getEditAddress(req.params.id, req.params.userId)
  res.render('user/addAddress', {
    isUser,
    category,
    userSession,
    cartProducts,
    cartCount,
    wishlistCount
  })
});

router.post('/add-address', async (req, res) => {
  let userId = req.session.userObj._id
  let response = await userHelper.addAddress(req.body, userId)
  if (response) {
    res.redirect('/profile')
  }
});

router.get('/edit-address/:id/:userId', async (req, res, next) => {
  let category = await userHelper.takeCategory()
  let cartCount = 0;
  cartCount = await userHelper.getCartCount(userSession._id)
  let wishlistCount = 0;
    wishlistCount = await userHelper.getWishlistCount(userSession._id)
  let cartProducts = await userHelper.getCartProducts(userSession._id)
  let getEditAddress = await userHelper.getEditAddress(req.params.id, req.params.userId)
  res.render('user/edit-address', {
    isUser,
    category,
    userSession,
    cartProducts,
    cartCount,
    wishlistCount,
    getEditAddress
  })
});

router.get('/edit-profile/:userid', async (req, res, next) => {
  let category = await userHelper.takeCategory()
  let cartCount = 0;
  cartCount = await userHelper.getCartCount(userSession._id)
  let cartProducts = await userHelper.getCartProducts(userSession._id)
  let userProfile = await userHelper.getUserProfileDetails(req.params.userid)
  res.render('user/edit-profile', {
    isUser,
    category,
    userSession,
    cartProducts,
    cartCount,
    userProfile
  })
});

router.post('/edit-profile/:userid', async (req, res) => {
  console.log(req.body);
  
  let response = await userHelper.editProfileDetails(req.params.userid, req.body)
  if (response.status) {
    let userId = response.userId
  if(req.files){
    let profileImage = req.files.image1
    profileImage.mv('./public/profile-images/' + req.params.userid + 'profile.jpg', (err, done) => {
      if (!err) {
        res.redirect('/profile')
      }
    });
  }else{
    res.redirect('/profile')
  }
  }
});

router.post('/edit-address/:userId/:addressId', async (req, res, next) => {
  let response = await userHelper.updateAddress(req.body, req.params.userId, req.params.addressId)
  if (response) {
    res.redirect('/profile')
  } else {
    console.log('err vanne');
  }
});

router.get('/delete-address/:addressId/:userId', async (req, res, next) => {
  let response = await userHelper.deleteAddress(req.params.addressId, req.params.userId);
  if (response) {
    res.redirect('/profile')
  }
});

router.post('/change-password/:userid', async (req, res, next) => {
  console.log("currentPassword : ", req.body);
  let response = await userHelper.checkCurrentPassword(req.body.currentPassword, req.params.userid)
  console.log(response);
  if (response) {
    let response = await userHelper.updatePassword(req.body.newPassword, req.params.userid)
    if (response) {
      req.session.changePasswordSuccess = "Success Your Password Changed"
      res.redirect('/profile')
    }
  } else {
    req.session.currentPasswordErr = "Didn't Change Password. Worng Current Password"
    res.redirect('/profile')
  }
});

router.get('/place-order', async(req, res, next)=>{
  
 
  let userId = req.session.userObj._id
  let wallet = await userHelper.getWalletAmount(userId)
  let category = await userHelper.takeCategory()
  console.log(userId)
  if (userSession) {
    var cartProducts = await userHelper.getCartProducts(userSession._id)
  }
  
  let getUserAddressForPlaceOrder = await userHelper.getUserAddressForPlaceOrder(userId)
  console.log("cart Id : ",req.session.cartId);
  let getProductsForPlaceOrder = await userHelper.getProductsForPlaceOrder(req.session.cartId)
  let subTotal =  req.session.subTotal 
  console.log("subtotal : ", req.session.subTotal);
 
  req.session.couponApplycount =1;
 
  res.render('user/checkout', {
    isUser,
    category,
    buyOne:false,
    getUserAddressForPlaceOrder,
    getProductsForPlaceOrder,
    subTotal,
    userId,
    wallet,
    userSession,
    cartProducts
  })
})

router.post('/place-order', async (req, res, next) => {
  console.log(req.body);
  req.session.cartId = req.body.cartId
  req.session.subTotal = parseInt(req.body.subTotal);
  res.redirect('/place-order');
});

router.post('/get-confirm-address', async (req, res, next) => {
  let addressId = req.body.addressId;
  let userId = req.body.userId;
  let address = await userHelper.getSelectedAddress(userId, addressId)
  res.json(address)
});


router.post('/apply-coupon', async(req, res, next)=>{
  console.log(req.body);
 var couponApplycount = req.session.couponApplycount
  var couponCode = req.body.couponcode;
  req.session.couponCode = couponCode;
  var userId = req.session.userObj._id;
  var resp = await userHelper.checkcouponCode(couponCode)
  if(resp.status){
    let response = await userHelper.checkUserUsedCoupon(resp.coupon, userId)
    if(response.status){
        res.json({couponalreadyUserUsedErrMsg : "Already Used This Coupon"})
    }else{
      if(req.body.buyone ==="true"){
        if(couponApplycount ==1){
          let total = req.body.productPrice;
          let discount = resp.coupon.discount;
          let dis = ((total*discount)/100)
          let grandTotal = total - dis
          console.log(grandTotal);
          req.session.discount = discount;
          req.session.disAmount = dis
          req.session.couponApplycount++
          res.json({totalAmount : grandTotal, discount : discount, dis : dis})
          
        }else{
          res.json({errMsg : "Coupon Exist"})
        }
      }else if(req.body.buyone === "false"){
        if(couponApplycount ==1){
        let total = req.body.grandTotal;
        let discount = resp.coupon.discount;
        let dis = ((total*discount)/100)
        let grandTotal = total - dis
        req.session.couponApplycount++
        res.json({totalAmount : grandTotal, discount : discount, dis : dis})
      }else{
        res.json({errMsg : "Coupon Exist"})
      }
      } 
    }
  }else{
    res.json({CouponInvaliderrMsg : "Invalid Coupon Code"})
  }
});

router.post('/order-placed', async (req, res, next) => {
  console.log(req.body);
 let userId = req.session.userObj._id
  if(req.body.saveAddress === "true"){
    console.log("save Address true aano");
    let address ={
      firstname : req.body.firstname,
      lastname : req.body.lastname,
      phone : req.body.phone,
      address : req.body.address,
      state : req.body.state,
      district : req.body.district,
      pincode : req.body.pincode,
      landmark : req.body.landmark,
      alternativePhone : req.body.alternativePhone

    }
    console.log(address);
    await userHelper.addAddress(address, userId)
  }
if(req.body.walletApplied === "true"){
  req.session.walletApplied = req.body.walletApplied
}
  if(req.body.appliedCoupon === 'true'){
    req.session.appliedgrandTotal = req.body.appliedgrandTotal
    req.body.couponCode = req.session.couponCode
    req.session.appliedCoupon = req.body.appliedCoupon
  }
    var totalprice = await userHelper.getTotalAmount(req.body.userId) 
  userHelper.placeOrder(req.body, totalprice,  req.body.userId).then(async(response)=>{
    req.session.orderId = response.orderId;
    if(req.body.appliedCoupon === 'true'){
      var totalPrice = req.session.appliedgrandTotal
      var amount = parseInt(totalPrice)
    }else if(req.body.walletApplied === "true"){
      var amount = parseInt(req.body.amountAfterAppliedWallet) 
    }else{ 
      var amount = parseInt(req.body.grandTotal)
    }
    if(req.body.paymentMethod==='COD'){
      res.json({codSuccess : true})
    }else if(req.body.paymentMethod==='Razorpay'){
     var response = await userHelper.generateRazorpay(response.orderId, amount)
     console.log("orer Razorpay", response);
     res.json({response : response, razorpay : true})
    }else if(req.body.paymentMethod==='Paypal'){
      if(req.body.appliedCoupon === 'true'){
        var totalPrice = req.body.appliedgrandTotal
      }else if(req.body.walletApplied === "true"){
        var totalPrice = req.body.amountAfterAppliedWallet 
      }else{
        var totalPrice = req.body.grandTotal
      }
      let amount = parseInt(totalPrice)
      var create_payment_json = {
        "intent": "sale", 
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/order-success",
            "cancel_url": "http://localhost:3000/place-order"
        },
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": amount
            },
            "description": "This is the payment description."

        }]
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
          throw error;
      } else {
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === "approval_url"){
            res.send({forwardLink: payment.links[i].href});
          }
        }
        
      }
  }); 
    }
  })
});

router.get('/order-success',async(req, res)=>{
  let userId = req.session.userObj._id;
  var orderId = req.session.orderId;
  userHelper.changePaymentStatus(orderId, userId).then(async()=>{
    if(req.session.appliedCoupon === 'true'){
      let couponcode = req.session.couponCode
      let userId = req.session.userObj._id
      var category = await userHelper.takeCategory()
      let response = await userHelper.addcoupontoUser(userId, couponcode)
      if (response){
        let orderDetails = await userHelper.getOrderDetalis(userId, orderId)
        let products = await userHelper.getProducts(orderId)
        res.render('user/thankyouPage', {isUser, products, orderDetails, category})
      } 
   }else if(req.session.walletApplied === 'true'){
    userHelper.updateWalletAfterPurchase(userId).then(async()=>{
      var category = await userHelper.takeCategory()
      let orderDetails = await userHelper.getOrderDetalis(userId, orderId)
      let products = await userHelper.getProducts(orderId)
      res.render('user/thankyouPage', {isUser, products, orderDetails, wallet, category, userSession})
    });
   }else{
    let orderDetails = await userHelper.getOrderDetalis(userId, orderId)
    let products = await userHelper.getProducts(orderId)
    var category = await userHelper.takeCategory()
    res.render('user/thankyouPage', {isUser, products, orderDetails, wallet, category, userSession})
   }
  })
});

router.get('/view-myorder_details/:orderid', async (req, res, next) => {
  let category = await userHelper.takeCategory()
  let cartCount = 0;
  cartCount = await userHelper.getCartCount(userSession._id)
  let cartProducts = await userHelper.getCartProducts(userSession._id)
  let orderDetails = await userHelper.getMyOrders(req.params.orderid)
  if (orderDetails[0].data[0].status === "Placed") {
    var orderStatus1 = "Placed"
  }
  if (orderDetails[0].data[0].status === "Packed") {
    var orderStatus2 = "Packed"
  }
  if (orderDetails[0].data[0].status === "Shipped") {
    var orderStatus3 = "Shipped"
  }
  if (orderDetails[0].data[0].status === "Delivered") {
    var orderStatus4 = "Delivered"
    var delivered = true;
  }
  if (orderDetails[0].data[0].status === "Cancelled") {
    var orderStatus5 = "Cancelled"
    var cancel = true;
  }
  if (delivered || cancel) {
    var cancelbtn = true
  }
  res.render('user/view-orderDetails', {
    isUser,
    category,
    userSession,
    cartProducts,
    cartCount,
    orderDetails,
    orderStatus1,
    orderStatus2,
    orderStatus3,
    orderStatus4,
    orderStatus5,
    cancelbtn
  })
});

router.get('/order-cancel/:orderid', async (req, res) => {
  console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK");
  let response = await userHelper.checkOrderStatusForCancel(req.params.orderid)
  if (response == false) {
    let response = await userHelper.cancelOrder(req.params.orderid)
    if (response) {
      console.log("ddddddddddddddddddddddddddddddonnnnnnnnnnnnnnnnnnnnnneeeeeeeeeeeeeeeeeeeeee");
      res.redirect('/view-myorder_details/' + req.params.orderid)
    }
  }
});

router.post('/verify_payment', (req, res)=>{
  var userId = req.session.userObj._id
  userHelper.verifyPayment(req.body).then(()=>{
    userHelper.changePaymentStatus(req.body['order[receipt]'], userId).then(async()=>{
      if(req.session.appliedCoupon === 'true'){
       let couponcode = req.session.couponCode
       let response = await userHelper.addcoupontoUser(userId, couponcode)
       if (response){
        res.json({status:true})
       } 
    }else if(req.session.walletApplied === 'true'){
      userHelper.updateWalletAfterPurchase(userId).then(()=>{
        res.json({status:true})
      })
    }else{
      res.json({status:true})
    }
    })
  }).catch((err)=>{
    console.log(err);
    res.json({status:false, errMsg :'paymet failed'})
  })
});







module.exports = router;