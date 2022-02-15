
const { response } = require('express');
var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')
var adminHelper = require('../../helpers/admin-helper')
var productHelper = require('../../helpers/product-helpers')
var bannerHelper = require('../../helpers/banner-helper');
const async = require('hbs/lib/async');
var moment = require('moment');
const { AwsInstance } = require('twilio/lib/rest/accounts/v1/credential/aws');
const { resolve } = require('path');



const isadmin = true

/* GET users listing. */

router.get('/', async function (req, res, next) {
  if (req.session.isadminLoggedin) {
    let userCount = await adminHelper.getUserCount()
    let income = await adminHelper.getTotalIncome()
    let netIncome = (income * 10) / 100;
    let totalSales = await adminHelper.getTotalSales();
    let recentOrders = await adminHelper.getRecentOrders()

    res.render('admin/index', { isadmin, userCount, income, netIncome, totalSales, recentOrders });
  } else {
    res.redirect('/admin/login');
  } 
});

router.post('/chart', async (req, res) => {
  let countOrderCategory = await adminHelper.getOrderCategoryCount()
  let categories = countOrderCategory.map((record) => {
    return record._id.category;
  })

  let result = countOrderCategory.map((record) => {
    return {
      y: record._id.year,
      quantity: record.totalQuantity,
      price: record.totalPrice
    }
  })   
  console.log( result);
  res.send({ categories, result })
});

router.post('/dashboard-annually-sale',async(req, res, next)=>{
  var annually=[]
  var previousAnnual=[]
    for(var i = 1 ; i<=12; i++){
     annually.push(await adminHelper.getDashboardAnnuallySales(i))
  }
  res.send({monthannually:annually})
  });

  router.post('/dashboard-category-sale',async(req, res, next)=>{
    let categoryCount = await adminHelper.getDashboardCategorySales()
    let categories = categoryCount.map((record) => {
      return record._id.category;
    })
    let result = categoryCount.map((record) => {
      return record.totalQuantity
    })
    res.send({categories, result})
  });

router.post('/dashboard-brand-sales', async(req, res, next)=>{
  let brandCount = await adminHelper.getDashboardBrandSales()
  console.log(brandCount, 'brandDetails......................')
  let brands = brandCount.map((record)=>{
    return record._id.brand;
  });

  let result = brandCount.map((record)=>{
    return record.totalQuantity
  });

  let priceTotal = brandCount.map((record)=>{
    return record.totalPrice
  });
  res.send({brands, result, priceTotal})
})
     

router.get('/logout', (req, res) => {
  req.session.isadminLoggedin = false;
  req.session.admin = null;
  res.redirect('/admin/login')

})
router.get('/login', function (req, res, next) {
  if (req.session.isadminLoggedin) {
    res.redirect('/admin'); 
  } else {

    res.render('admin/login', { isadmin, adminLogin: true });
  }
});

router.post('/login', (req, res, next) => {
  var adminLoginData = req.body;
  adminHelper.findAdmin(adminLoginData).then((adminResponse) => {

    if (adminResponse) {
      req.session.admin = adminResponse.admin;
      req.session.isadminLoggedin = adminResponse.status;

      res.redirect('/admin')
    } else {
      res.redirect('/admin/login')
    }

  })

});

router.get('/logout', (req, res, next) => {
  console.log("admin Logout");
  req.session.isadminLoggedin = null;
  req.session.admin = null;
  res.redirect('/admin/login')
})

// Start products Section

router.get('/add-product', function (req, res, next) {

  if (req.session.isadminLoggedin) {

    productHelper.takeCategory().then((categories) => {

      bannerHelper.getAllBrands().then((brands) => {

        res.render('admin/add-product', { isadmin, categories, brands });
      })

    })
  } else {
    res.redirect('/admin/login')
  }


});



router.post('/add-product', (req, res, next) => {

  console.log(req.body);
  console.log(req.files.image1);

  productHelper.addproduct(req.body).then((response) => {

    console.log(response.Id);
    var productID = response.Id

    if (response.status) {

      var image1 = req.files.image1
      var image2 = req.files.image2
      var image3 = req.files.image3
      var image4 = req.files.image4
      image1.mv('./public/product-images/' + productID + "first.jpg", (err) => {
        if (!err) {

          image2.mv('./public/product-images/' + productID + "second.jpg", (err) => {
            if (!err) {

              image3.mv('./public/product-images/' + productID + "third.jpg", (err) => {
                if (!err) {
                  image4.mv('./public/product-images/' + productID + "fourth.jpg", (err) => {
                    if (!err) {
                      res.redirect('/admin/manage-products')

                    }
                  })

                }
              })
            }
          })
        }
      })


    } else {
      res.redirect('/admin/add-product')
    }


  })
})

router.get('/edit-product/:id', async function (req, res, next) {
  if (req.session.isadminLoggedin) {

    let foundProduct = await productHelper.findUpdatingProduct(req.params.id)
    let brands = await bannerHelper.getAllBrands()
    let categories = await productHelper.takeCategory()
    let editErr = req.session.editProducterr
    req.session.editProducterr = null;
    res.render('admin/edit-product', { isadmin, foundProduct, brands, categories, editErr });

  } else {
    res.redirect('/admin/login')
  }


});
router.post('/edit-product/:id', function (req, res, next) {


  console.log(req.body);

  productHelper.updateProduct(req.params.id, req.body).then((response) => {

    console.log(response.status);
    console.log(response.id);
    var productID = response.id

    if (response.status) {
      if (req.files) {
        let image1 = req.files.image1
        let image2 = req.files.image2;
        let image3 = req.files.image3;
        let image4 = req.files.image4;
        if (image1) {
          image1.mv('./public/product-images/' + productID + 'first.jpg', (err1, done) => {
          });
        }
        if (image2) {
          image2.mv('./public/product-images/' + productID + 'second.jpg', (err2, done) => {
          });
        }

        if (image3) {
          image3.mv('./public/product-images/' + productID + 'third.jpg', (err3, done) => {
          });
        }
        if (image4) {
          image4.mv('./public/product-images/' + productID + 'fourth.jpg', (err4, done) => {
          });
        }
      }
      res.redirect('/admin/manage-products')
    } else {
      req.session.editProducterr = "Edit Product Failed"
      res.redirect('/admin/edit-product')
    }

  })
});

router.get('/delete-product/:id', (req, res) => {
  let productID = req.params.id
  productHelper.deleteProduct(req.params.id).then((respose) => {
    let path1 = './public/product-images/' + productID + 'first.jpg'
    let path2 = './public/product-images/' + productID + 'second.jpg'
    let path3 = './public/product-images/' + productID + 'third.jpg'
    let path4 = './public/product-images/' + productID + 'fourth.jpg'

    let path = [path1, path2, path3, path4]
    for (var i = 0; i < 4; i++) {

      fs.unlinkSync(path[i])
    }
    if (response) {
      res.redirect('/admin/manage-products')
    }
  })
})

router.get('/manage-products', function (req, res, next) {

  if (req.session.isadminLoggedin) {

    productHelper.getAllProducts().then((allProducts) => {
      res.render('admin/manage-products', { isadmin, allProducts });

    })
  } else {
    res.redirect('/admin/login')
  }



});

//end Product Section

router.get('/manage-users', function (req, res, next) {

  if (req.session.isadminLoggedin) {

    adminHelper.allusers().then((userData) => {

      res.render('admin/manage-user', { isadmin, userData });
    })
  } else {
    res.redirect('/admin/login')
  }
});

router.get('/block/:id', function (req, res, next) {

  var userID = req.params.id
  adminHelper.blockUser(userID).then((response) => {

    if (response) {

      res.redirect('/admin/manage-users');
    }


  })
});

router.get('/unblock/:id', function (req, res, next) {
  var userID = req.params.id
  adminHelper.unblockUser(userID).then((response) => {
    if (response) {
      res.redirect('/admin/manage-users');
    }
  })
});

router.get('/manage-category', (req, res, next) => {
  productHelper.getAllCategory().then((category) => {
    let CategoryErr = req.session.ExistingCategoryErr;
    req.session.ExistingCategoryErr = null;
    res.render('admin/manage-category', { isadmin, category, CategoryErr })
  })
})


router.post('/manage-category', (req, res, next) => {
  let value = req.body
  let category = value.category.toUpperCase()
  productHelper.checkCategory(category).then((response) => {
    if (response) {
      req.session.ExistingCategoryErr = "This Category Already Exist"
      res.redirect('/admin/manage-category')
    } else {
      productHelper.insertCategory(category).then((response) => {
        if (response) {
          res.redirect('/admin/manage-category')
        }
      })
    }
  })
});

router.get('/delete-category/:id', (req, res, next) => {
  productHelper.deleteCategory(req.params.id).then((response) => {
    if (response) {
      res.redirect('/admin/manage-category')
    }
  })
});


/// Start Sub Category 


router.get('/manage-sub-category/:id', (req, res, next) => {
  let CatID = req.params.id;
  let subcategoryErr = req.session.subCategoryErr;
  req.session.subCategoryErr = null;
  productHelper.findSubCategory(CatID).then((Subcategory) => {
    res.render('admin/manage-sub-category', { isadmin, categoryId: CatID, subcategoryErr, Subcategory })
  })
});

router.post('/manage-sub-category/:id', (req, res, next) => {
  let categoryID = req.params.id;
  let value = req.body;
  let subCategory = value.subcategory.toUpperCase()
  productHelper.checkSubCategory(subCategory, categoryID).then((response) => {
    console.log('response', response)
    if (response) {
      req.session.subCategoryErr = "This Sub Category is already Existed"
      res.redirect('/admin/manage-sub-category/' + categoryID)
    } else {
      productHelper.insertSubCategory(subCategory, categoryID).then((response) => {
        if (response) {
          res.redirect('/admin/manage-sub-category/' + categoryID)
        }
      })
    }
  })
});

router.get('/deletesubcategory/:id', (req, res) => {

  productHelper.deleteSubCategory(req.params.id).then((response) => {
    if (response.status) {
      res.redirect('/admin/manage-sub-category/' + response.categoryID)
    }
  })
})

router.get('/manage-banners', (req, res, next) => {
  bannerHelper.getMainBanner().then((banner) => {
    bannerHelper.getCategoryBanner().then((CategoryBanner) => {
      bannerHelper.getProductListBanner().then((productBanner) => {
        res.render('admin/manage-banner', { isadmin, banner, CategoryBanner, productBanner });
      })
    })
  })
});

router.get('/add-banner', (req, res, next) => {
  res.render('admin/add-banners', { isadmin });
});

router.post('/add-banner', (req, res, next) => {
  let place = "homemainbanner"
  bannerHelper.checkThisBanner(place).then((response) => {
    if (response) {
      bannerHelper.deleteExistingMainBanner(place).then((response) => {
        if (response) {
          bannerHelper.addHomePageMainBanner(req.body).then((response) => {
            if (response.status) {
              var bannerID = response.bannerID
              var image1 = req.files.image1
              var image2 = req.files.image2
              var image3 = req.files.image3
              var image4 = req.files.image4
              image1.mv('./public/banner-images/' + bannerID + "first.jpg", (err) => {
                if (!err) {
                  image2.mv('./public/banner-images/' + bannerID + "second.jpg", (err) => {
                    if (!err) {
                      image3.mv('./public/banner-images/' + bannerID + "third.jpg", (err) => {
                        if (!err) {
                          image4.mv('./public/banner-images/' + bannerID + "fourth.jpg", (err) => {
                            if (!err) {
                              res.redirect('/admin/manage-banners')
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    } else {
      bannerHelper.addHomePageMainBanner(req.body).then((response) => {
        if (response.status) {
          var bannerID = response.bannerID
          var image1 = req.files.image1
          var image2 = req.files.image2
          var image3 = req.files.image3
          var image4 = req.files.image4
          image1.mv('./public/banner-images/' + bannerID + "first.jpg", (err) => {
            if (!err) {
              image2.mv('./public/banner-images/' + bannerID + "second.jpg", (err) => {
                if (!err) {
                  image3.mv('./public/banner-images/' + bannerID + "third.jpg", (err) => {
                    if (!err) {
                      image4.mv('./public/banner-images/' + bannerID + "fourth.jpg", (err) => {
                        if (!err) {
                          res.redirect('/admin/manage-banners')
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
});

router.get('/delete-mainbanner', (req, res) => {
  bannerHelper.deleteManiBanner().then((response) => {
    if (response) {
      res.redirect("/admin/manage-banners")
    }
  })
});

router.get('/add-category-banner', (req, res, next) => {
  res.render('admin/home-page-category-banner', { isadmin });
});

router.post('/add-category-banner', async (req, res, next) => {
  console.log(req.files.image1);
  let image1 = req.files.image1;
  let image2 = req.files.image2;
  let place = "homecategory"
  let response = await bannerHelper.checkCategoryBanner(place)
  if (response) {
    bannerHelper.deleteCategoryBanner(place).then((response) => {
      if (response) {
        bannerHelper.insertCategoryBanner(place).then((response) => {
          if (response.status) {
            var bannerID = response.bannerID
            console.log(bannerID);
            image1.mv('./public/banner-images/' + bannerID + "men.jpg", (err) => {
              if (!err) {
                image2.mv('./public/banner-images/' + bannerID + "women.jpg", (err) => {
                  if (!err) {
                    res.redirect('/admin/manage-banners')
                  }
                })
              }
            })

          }

        })
      }
    })
  }
});

router.get('/delete-categorybanner', (req, res) => {
  bannerHelper.deleteCategoryBanner().then((response) => {
    if (response) {
      res.redirect("/admin/manage-banners")
    }
  })
});

router.get('/add-product-banner', (req, res, next) => {
  res.render('admin/product-list-banner', { isadmin });
});

router.post('/add-product-banner', (req, res, next) => {
  console.log(req.files.image1);
  let image1 = req.files.image1;
  let place = "productBanner"
  bannerHelper.insertProductBanner(place).then((response) => {
    if (response.status) {
      let bannerID = response.bannerID;
      image1.mv('./public/banner-images/' + bannerID + "image.jpg", (err) => {
        if (!err) {
          res.redirect('/admin/manage-banners')
        }
      })
    }

  })

});

router.get('/delete-product-banner', (req, res) => {
  bannerHelper.deleteProductBanner().then((response) => {
    if (response) {
      res.redirect("/admin/manage-banners")
    }
  })
});

router.get('/manage-brands', (req, res, next) => {
  bannerHelper.getAllBrands().then((brands) => {
    let brandErr = req.session.brandErr;
    req.session.brandErr = null;
    res.render('admin/manage-brands', { isadmin, brands, brandErr });
  })
});

router.post('/manage-brand', (req, res, next) => {
  let logo = req.files.logo
  bannerHelper.checkBrand(req.body).then((response) => {
    if (response) {
      req.session.brandErr = "This Brand is already existed"
      res.redirect('/admin/manage-brands')
    } else {
      bannerHelper.insertBrandLog(req.body).then((response) => {
        if (response) {
          let brandID = response.brandID;
          logo.mv('./public/brand-images/' + brandID + "logo.jpg", (err) => {
            if (!err) {
              res.redirect('/admin/manage-brands')
            }
          })
        }

      })
    }
  })

});

router.get('/delete-brand/:id', (req, res, next) => {
  bannerHelper.deleteBrand(req.params.id).then((response) => {
    if (response) {
      res.redirect('/admin/manage-brands')
    }
  })
})

// Manage Orders

router.get('/manage-orders', async (req, res, next) => {
  let orders = await adminHelper.getOrdersForManage()
  res.render('admin/manage_orders', { isadmin, orders })
})

router.get('/view_order_details/:orderId', async (req, res, next) => {
  let orderDetails = await adminHelper.viewProductDetails(req.params.orderId)
  if (orderDetails[0].data[0].status === "Placed") {
    var orderStatus1 = "Placed"
    var packed = true;
    var shipped = true;
    var delivered = true;
    var cancelled = true
  }
  if (orderDetails[0].data[0].status === "Packed") {
    var orderStatus2 = "Packed"
    var packed = false;
    var shipped = true;
    var delivered = true;
    var cancelled = false;
  }
  if (orderDetails[0].data[0].status === "Shipped") {
    var orderStatus3 = "Shipped"
    var packed = false;
    var shipped = false;
    var delivered = true;
    var cancelled = false
  }
  if (orderDetails[0].data[0].status === "Delivered") {
    var orderStatus4 = "Delivered"
    var packed = false;
    var shipped = false;
    var delivered = false;
    var cancelled = false
  }
  if (orderDetails[0].data[0].status === "Cancelled") {
    var orderStatus5 = "Cancelled"
    var packed = false;
    var shipped = false;
    var delivered = false;
    var cancelled = false
    var cancelConfirm = true;
  }
  res.render('admin/view-order-Details', { isadmin, orderDetails, orderStatus1, orderStatus2, orderStatus3, orderStatus4, orderStatus5, packed, shipped, delivered, cancelled, cancelConfirm })
})


router.get('/packed/:orderid', async (req, res, next) => {
  let packedResponse = await adminHelper.checkOrderStatusPacked(req.params.orderid)
  if (packedResponse == false) {
    let response = await adminHelper.orderPacked(req.params.orderid)
    if (response.status) {
      req.session.packed = true;
      res.redirect('/admin/manage-orders')
    }
  }
})

router.get('/shipped/:orderid', async (req, res, next) => {
  let orderstatusiscancancelled = await adminHelper.checkOrderStatusShipped1(req.params.orderid)
  if (orderstatusiscancancelled == false) {
    let orderstatusispacked = await adminHelper.checkOrderStatusShipped2(req.params.orderid)
    if (orderstatusispacked) {
      let response = await adminHelper.orderShipped(req.params.orderid)
      if (response.status) {
        res.redirect('/admin/manage-orders')
      }
    }
  }
})

router.get('/delivered/:orderid', async (req, res, next) => {
  let orderstatusiscancancelled = await adminHelper.checkOrderStatusDelivered1(req.params.orderid)
  if (orderstatusiscancancelled == false) {
    let orderstatusispacked = await adminHelper.checkOrderStatusDelivered2(req.params.orderid)
    if (orderstatusispacked == false) {
      let orderstatusisshipped = await adminHelper.checkOrderStatusDelivered3(req.params.orderid)
      if (orderstatusisshipped) {
        let response = await adminHelper.orderDelivered(req.params.orderid)
        if (response) {
          res.redirect('/admin/manage-orders')
        }
      }
    }
  }
});

router.get('/rejected/:orderid', async (req, res, next) => {
  let orderstatusiscancancelled = await adminHelper.checkOrderStatusReject1(req.params.orderid)
  if (orderstatusiscancancelled == false) {
    let orderstatusisplaced = await adminHelper.checkOrderStatusReject2(req.params.orderid)
    if (orderstatusisplaced) {
      let response = await adminHelper.orderCancel(req.params.orderid)
      if (response.status) {
        res.redirect('/admin/manage-orders')
      }
    }
  }
})

router.get('/manage-coupons', async (req, res, next) => {
  let coupons = await adminHelper.getCoupons()
  let ExistErrMsg = req.session.couponAlreadyAdded
  req.session.couponAlreadyAdded = null;
  res.render('admin/manage-coupons', { isadmin, coupons, ExistErrMsg })
})

router.post('/manage-coupons', async (req, res, next) => {
  console.log('manage coupons : ', req.body);
  let response = await adminHelper.addNewCoupons(req.body)
  if (response) {
    res.redirect('/admin/manage-coupons')
  } else {
    req.session.couponAlreadyAdded = "This Coupon Already Added"
    res.redirect('/admin/manage-coupons')
  }
})

router.post('/delete-coupon', async (req, res, next) => {
  let response = await adminHelper.deleteCoupons(req.body)
  if (response) {
    res.redirect('/admin/manage-coupons')
  }


});

router.get('/product-offer/:proid', async (req, res, next) => {
  let proId = req.params.proid
  let proOffer = await adminHelper.getProductOfferShow(proId)
  let already = req.session.already;
  req.session.already = null;
  res.render('admin/add-product-offer', { isadmin, proId, already, proOffer })
});

router.get('/delete-product-offer/:proId', async (req, res, next) => {
  let response = await adminHelper.deleteProductOffer(req.params.proId)
  if (response) {
    res.redirect('/admin/product-offer/' + req.params.proId)
  }
})

router.get('/manage-category-offers', async (req, res, next) => {
  let category = await adminHelper.getCategoryForManageOffer()
  let categoryOffers = await adminHelper.getCategoryOffers()
  let categoryOfferErrMsg = req.session.categoryOfferErrMsg
  req.session.categoryOfferErrMsg = null;
  res.render('admin/categoryoffer', { isadmin, category, categoryOfferErrMsg, categoryOffers })
});

router.post('/manage-category-offers', async (req, res, next) => {
  console.log(req.body);
  let response = await adminHelper.checkCategoryOffer(req.body.category)
  if (response) {
    req.session.categoryOfferErrMsg = "This Category Already Have Offer"
    res.redirect('/admin/manage-category-offers')

  } else {
    let categoryOffer = {
      category: req.body.category,
      discount: parseInt(req.body.discount),
      date: new Date(req.body.date)
    }
    let response = await adminHelper.addCategoryOffer(categoryOffer);
    if (response) {
      let response = await adminHelper.updateCategoryOfferProduct(categoryOffer)
      if (response) {
        res.redirect('/admin/manage-category-offers')
      }
    }
  }

})

router.get('/delete-category-offer/:id', async (req, res, next) => {
  console.log("delete Category Offer");
  let response = await adminHelper.deleteCategoryOffer(req.params.id)
  if (response) {
    res.redirect('/admin/manage-category-offers')
  }
})

router.post('/add-product-offer/:proId', async (req, res, next) => {
  console.log(req.body);
  console.log("kfdgdfdfdfgfgjdfgdjfh", req.params.proId);
  let response = await adminHelper.ProductOffer(req.params.proId, req.body)
  if (response.already) {
    req.session.already = "This Product Already Have Offer"
    res.redirect('/admin/product-offer/' + req.params.proId)
  }
  if (response.already1) {
    req.session.already = "This Product Already Have Offer"
    res.redirect('/admin/product-offer/' + req.params.proId)
  }

  if (response.status) {
    let response = await adminHelper.addOfferToProduct(req.params.proId, req.body)
    res.redirect('/admin/manage-products')
  }

});

router.get('/stock-report', async (req, res, next) => {
  let stockReport = await adminHelper.getProductReport()

  res.render('admin/stock-report', { isadmin, stockReport })
});

router.get('/sales-report', async (req, res, next) => {
  let salesReport = await adminHelper.getSalesReport()
  res.render('admin/sales-report', { isadmin, salesReport })
});

router.post('/sales-date-filter', async (req, res, next) => {
  let fromDate = parseInt(req.body.fromDate.split('-').join(''));
  let toDate = parseInt(req.body.toDate.split('-').join(''));
  console.log(fromDate);
  let salesReport = await adminHelper.getSaleReportDate(fromDate, toDate)
  console.log("userReport", salesReport);
  res.json(salesReport)
});
router.get('/weekly-sales-report', async (req, res, next) => {

  res.render('admin/weekly_sales_report', { isadmin })
});

const getDateOfWeek = (w, y, firstMonday) => {
  var d = (firstMonday + (w - 1) * 7);
  return new Date(y, 0, d);
}

function getMondays(y) {
  var d = new Date(y, 0, 1),
      month = d.getMonth(),
      mondays = [];

  d.setDate(1);

  // Get the first Monday in the month
  while (d.getDay() !== 1) {
      d.setDate(d.getDate() + 1);
  }

  // Get all the other Mondays in the month
  while (d.getMonth() === month && mondays.length == 0) {
      mondays.push(new Date(d.getTime()));
      d.setDate(d.getDate() + 7);
  }

  return mondays[0];
}



router.post('/sales-week-filter', async(req, res, next) => {

  let week = req.body.week
  const firstMonday = getMondays(2022).getDate();
  const startDate = getDateOfWeek(week.split('-')[1].slice(1), week.split('-')[0], firstMonday)
  var endDate = new Date(startDate.getTime());
  endDate.setDate(endDate.getDate() + 6);

  const fromDateObj = {
    day : startDate.getDate() < 10 ? '0' + startDate.getDate() : '' + startDate.getDate(),
    month : ( startDate.getMonth() + 1 ) < 10 ? '0' + ( startDate.getMonth() + 1 ) : '' + ( startDate.getMonth() + 1 ),
    year : '' + startDate.getFullYear()
  };
  const todateObj = {
    day : endDate.getDate() < 10 ? '0' + endDate.getDate() : '' + endDate.getDate(),
    month : ( endDate.getMonth() + 1)   < 10 ? '0' + ( endDate.getMonth() + 1 ): '' + ( endDate.getMonth() + 1 ),
    year : '' + endDate.getFullYear()
  }

  let salesReport = await adminHelper.getSaleReportDate(fromDateObj.year + '' + fromDateObj.month + '' + fromDateObj.day , 
  todateObj.year + '' + todateObj.month + '' + todateObj.day)

  res.send({ salesReport })

})

var getDaysInMonth = function(month,year) {
  // Here January is 1 based
  //Day 0 is the last day in the previous month
 return new Date(year, month, 0).getDate();
// Here January is 0 based
// return new Date(year, month+1, 0).getDate();
};

router.post('/sales-month-filter', async(req, res, next)=>{
 console.log(req.body.month);
  let month = req.body.month;
  let y = month.split('-')[0];
  let m = month.split('-')[1];
  let lastday = getDaysInMonth(m,y);
  let strFirstDate = month+'-01'
  let strLastDate = month + '-'+lastday
 
  let firstdate = parseInt((strFirstDate.split('-').join('')));
  let lastdate = parseInt((strLastDate.split('-').join('')));
  let salesReport = await adminHelper.getSaleReportDate(firstdate, lastdate);
  res.send(salesReport)
})

router.get('/monthly-sales-report', async (req, res, next) => {

  res.render('admin/monthly_sales_report', { isadmin })
});

router.get('/annually-sales-report', async (req, res, next) => {
  if(req.session.filterWithYear == "true"){
    req.session.filterWithYear = "false";
    var salesReport = req.session.filterYearDetails
  }
  res.render('admin/annually_sales_report', { isadmin, salesReport})
});

router.post('/filter-with-year', async(req, res, next)=>{
  let fromdate = parseInt(req.body.year + "0101");
  let todate = parseInt(req.body.year + "1231");
  let salesReport = await adminHelper.getSaleReportDate(fromdate, todate);
  req.session.filterWithYear = "true";
  req.session.filterYearDetails = salesReport;
  console.log("date: ", fromdate, todate);
  res.redirect("/admin/annually-sales-report")

})
router.get('/users-report', async (req, res, next) => {
  let fromDate = null;
  let toDate = null;
  let usersReport = await adminHelper.getUsersReport(fromDate, toDate)
  res.render('admin/users-report', { isadmin, usersReport })
});
module.exports = router;