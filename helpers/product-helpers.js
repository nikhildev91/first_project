const async = require('hbs/lib/async');
const {ObjectId} = require('mongodb');
var database = require('../dataConfig/databaseConnection');

    module.exports={


        addproduct : (products)=>{

            return new Promise ((resolve, reject)=>{
                // products.price = parseFloat(products.price);
                // products.quantity = parseInt(products.quantity);
                let pro = {
                    productTitle : products.productTitle,
                    productDescription : products.productDescription,
                    productDetails : products.productDetails,
                    brand: products.brand,
                    category:products.category,
                    subcategory : products.subcategory,
                    color: products.color,
                    material : products.material,
                    quantity : parseInt(products.quantity),
                    price : parseInt(products.price),
                    fixedPrice : parseInt(products.price)
                }
                database.get().collection("products").insertOne(pro).then((result)=>{
                    console.log(result.insertedId);
                    return resolve({status : true, Id : result.insertedId})
                })
            })

        },
        getAllProducts:()=>{
            return new Promise (async(resolve, reject)=>{
                var allProducts = await database.get().collection("products").find().toArray()
                
                 resolve(allProducts)
    
            })
        },
        findUpdatingProduct:(userId)=>{
            return new Promise ((resolve, reject)=>{
                database.get().collection("products").findOne({_id:ObjectId(userId)}).then((foundUser)=>{
                    resolve(foundUser)
    
                })
            })
    
        },
        updateProduct:(productID, productUpdateDetails)=>{
            
            return new Promise ((resolve, reject)=>{
                database.get().collection('products').updateOne({_id:ObjectId(productID)},{$set:{
               
    
      productTitle:productUpdateDetails.productTitle,
      productDescription:productUpdateDetails.productDescription,
      brand:productUpdateDetails.brand,
      category:productUpdateDetails.category,
      subcategory:productUpdateDetails.subcategory,
      colour:productUpdateDetails.colour,
      material: productUpdateDetails.material,
      size:productUpdateDetails.size,
      quantity: parseInt(productUpdateDetails.quantity),
      price: parseInt(productUpdateDetails.price),
      fixedPrice : parseInt(productUpdateDetails.price),
                }}).then((result)=>{
                    console.log(productID);
                    console.log(result);
                    return resolve({status : true, id : productID})
                })
            })
    
        },

    deleteProduct: (productID)=>{
        return new Promise ((resolve, reject)=>{
            database.get().collection("products").deleteOne({_id:ObjectId(productID)}).then(()=>{
                resolve(true)
            })
        })
    },
    checkCategory:(category)=>{
        
        return new Promise((resolve, reject)=>{
            database.get().collection("category").findOne({category:category}).then((result)=>{

                if(result){
                    return resolve(true)

                }else{
                    return resolve(false)
                }
                
            })
        })
        
    },

    insertCategory : (category)=>{
        return new Promise ((resolve, reject)=>{
            database.get().collection('category').insertOne({category:category}).then(()=>{
                return resolve(true)
            })
        })
    },
    getAllCategory : ()=>{
        return new Promise (async(resolve, reject)=>{
            let category = database.get().collection("category").find().toArray()

            if(category){
                return resolve(category)
            }
        })
    },

    deleteCategory : (categoryID)=>{
        return new Promise((resolve, reject)=>{
            database.get().collection("category").deleteOne({_id:ObjectId(categoryID)}).then(()=>{
                return resolve(true)
            })
        })
    },

    takeCategory :()=>{
        return new Promise(async(resolve, reject)=>{
            var category = await database.get().collection("category").aggregate([
                {$lookup: {
                    from:"subCategory",
                    localField:"_id",
                    foreignField:"categoryID",
                    as:"subcategory"
                }}
            ]).toArray()
            return resolve(category)
        })
    },

    checkSubCategory : (subCategory, categoryID)=>{
        console.log(subCategory);
        console.log(categoryID);
        return new Promise((resolve, reject)=>{
            database.get().collection("subCategory").find({$and:[{subcategory:subCategory},{categoryID:ObjectId(categoryID)}]}).toArray().then((result)=>{
                console.log(result);
                if(result.length > 0){
                    return resolve(true)
                }else{
                    return resolve(false)
                }
            })

        })
    },

    insertSubCategory : (subCategory, categoryID)=>{
        return new Promise((resolve, reject)=>{
            database.get().collection("subCategory").insertOne({subcategory : subCategory, categoryID: ObjectId(categoryID) }).then(()=>{
                return resolve(true)
            })
        })
    },
    findSubCategory: (CatID)=>{
        return new Promise (async(resolve, reject)=>{
            let Subcategory = await database.get().collection("subCategory").find({categoryID:ObjectId(CatID)}).toArray()
            return resolve(Subcategory)
        })
    },
    deleteSubCategory : (subcategoryID)=>{
        return new Promise ((resolve, reject)=>{
            database.get().collection("subCategory").findOne({_id:ObjectId(subcategoryID)}).then((result) => {
                let categoryID = result.categoryID;
                database.get().collection("subCategory").deleteOne({_id:ObjectId(subcategoryID)}).then(()=>{
                    return resolve({ status : true , categoryID })
                })
            })
        })
    },
    takeSubCategory : ()=>{
        return new Promise((resolve, reject)=>{
            database.get().collection("subCategory").find({$and:[{}]})
        })
    }
    }