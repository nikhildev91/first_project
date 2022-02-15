$("#userSignupForm").validate({
    rules: {
        firstname:
        {
            required: true,
            maxlength: 30,
            lettersonly: true,
            normalizer: function (value) {
                return $.trim(value);
            }
        },

        lastname: {
            required: true,
            maxlength: 30,
            lettersonly: true,
            normalizer: function (value) {
                return $.trim(value);
            }

        },
        email: {
            required: true,
            email: true,
            normalizer: function (value) {
                return $.trim(value);
            }

        },
        username: {
            required: true,
            maxlength: 30,
            normalizer: function (value) {
                return $.trim(value);
            }

        },
        phone: {
            required: true,
            digits: true,
            minlength: 10,
            maxlength: 10

        },
        address: {
            required: true,
            normalizer: function (value) {
                return $.trim(value);
            }

        },
        townCity: {
            required: true,
            normalizer: function (value) {
                return $.trim(value);
            }

        },
        state: {
            required: true,
            normalizer: function (value) {
                return $.trim(value);
            }

        },
        pincode: {
            required: true,
            digits: true,
            maxlength: 10,
            normalizer: function (value) {
                return $.trim(value);
            }

        },
        password: {
            required: true,
            minlength: 4,
            normalizer: function (value) {
                return $.trim(value);
            }

        },
        confirmpassword: {
            required: true,

            equalTo: "#CustomerNewPassword"

        },
    }
});



$("#userLoginForm").validate({
    rules:
    {
        username: {
            required: true

        },
        password: {
            required: true
        }
    }


});


$("#userOtpMobile").validate({
    rules:
    {
        phone: {
            required: true,
            normalizer: function (value) {
                return $.trim(value);
            }

        }
    }


});


$("#userOtp").validate({
    rules:
    {
        otp: {
            required: true,
            normalizer: function (value) {
                return $.trim(value);
            }

        }
    }


});
function checkOutValidate() {
    return $("#Checkout-form").valid()
}
$("#Checkout-form").validate({
    rules: {
        firstname: {
            required: true,
            maxlength: 20,
            lettersonly: true,
            normalizer: function (value) {
                return $.trim(value);
            }

        },
        lastname: {
            required: true,
            maxlength: 20,
            lettersonly: true,
            normalizer: function (value) {
                return $.trim(value);
            }
        },
        phone: {
            required: true,
            digits: true,
            maxlength: 10,
            minlength: 10,
            normalizer: function (value) {
                return $.trim(value);
            }
        },
        address: {
            required: true,
            normalizer: function (value) {
                return $.trim(value);
            }
        },
        state: {
            required: true
        },
        district: {
            required: true,
            lettersonly: true,
            normalizer: function (value) {
                return $.trim(value);
            }
        },
        pincode: {
            required: true,
            normalizer: function (value) {
                return $.trim(value);
            }
        },
        landmark: {
            required: true,
            normalizer: function (value) {
                return $.trim(value);
            }
        },
        alternativePhone: {
            required: true,
            digits: true,
            minlength: 10,
            maxlength: 10,
            normalizer: function (value) {
                return $.trim(value);
            }
        }
    }
});

$("#add-address").validate({
    rules: {
        firstname: {
            required: true,
            lettersonly: true,
            minlength: 5,
            maxlength: 20,
            normalizer: function (value) {
                return $.trim(value);
            }

        },
        lastname: {
            required: true,
            lettersonly: true,
            minlength: 5,
            maxlength: 20,
            normalizer: function (value) {
                return $.trim(value);
            }
        },
        phone: {
            required: true,
            digits: true,
            minlength: 10,
            maxlength: 10,
            normalizer: function (value) {
                return $.trim(value);
            }
        },
        address: {
            required: true,
            normalizer: function (value) {
                return $.trim(value);
            }
        },
        district: {
            required: true,
            normalizer: function (value) {
                return $.trim(value);
            }
        },
        state: {
            required: true
        },
        landmark: {
            required: true,
            normalizer: function (value) {
                return $.trim(value);
            }
        },
        alternativePhone: {
            required: true,
            digits: true,
            normalizer: function (value) {
                return $.trim(value);
            }
        },
        addressType: {
            required: true
        }
    }
});

$("#changePassword").validate({
    rules: {
        currentPassword: {
            required: true,
            maxlength: 14,
            minlength: 8,
            normalizer: function (value) {
                return $.trim(value);
            }
        },
        newPassword: {
            required: true,
            maxlength: 14,
            minlength: 8,
            normalizer: function (value) {
                return $.trim(value);
            }
        }
    }
})

$("#addNewAddress").validate({
    rules: {
        firstname: {
            required: true,
            maxlength: 20,
            minlength: 6,
            normalizer: function (value) {
                return $.trim(value);
            }
        },
        lastname: {
            required: true,
            maxlength: 20,
            minlength: 6,
            normalizer: function (value) {
                return $.trim(value);
            }
        },
        phone: {
            required: true,
            digits: true,
            minlength: 10,
            maxlength: 10,
            normalizer: function (value) {
                return $.trim(value);
            }
        },
        address: {
            required: true,
            normalizer: function (value) {
                return $.trim(value);
            }
        },
        district: {
            required: true,
            normalizer: function (value) {
                return $.trim(value);
            }
        },
        state: {
            required: true
        },
        landmark: {
            required: true,
            normalizer: function (value) {
                return $.trim(value);
            }
        },
        alternativePhone: {
            required: true,
            digits: true,
            normalizer: function (value) {
                return $.trim(value);
            }
        },
        addressType: {
            required: true
        }

    }
})

jQuery.validator.addMethod("lettersonly", function (value, element) {
    return this.optional(element) || /^[a-z," "]+$/i.test(value);
}, "Only letters and spaces are allowed");



// otp timmer SignUp

$(document).ready(function () {
    timmerCountDown()
    timmerCountDown1();
});

function timmerCountDown() {
    var deadline = new Date();
    deadline.setMinutes(deadline.getMinutes() + 2)
    deadline = deadline.getTime()
    var x = setInterval(function () {
        var now = new Date().getTime();
        var t = deadline - now;
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((t % (1000 * 60)) / 1000);
        $("#demo").html(minutes + "m " + seconds + "s ")
        if (t < 0) {
            clearInterval(x);
            $("#demo").html("EXPIRED");
            $('.btn_resend').show();
            $('.btn_verify').hide();
        }
    }, 1000);
}

$("#otpResend").on("click", () => {
    $.ajax({
        url: "/signup/resendOtp",
        type: "post",
        dataType: "json",
        success: function (res) {
            if (res) {
                timmerCountDown()
                $('.btn_resend').hide();
                $('.btn_verify').show();
            } else {
                alert("otpSending failed")
            }
        }
    })
})

function timmerCountDown1() {
    var deadline = new Date();
    deadline.setMinutes(deadline.getMinutes() + 2)
    deadline = deadline.getTime()
    var x = setInterval(function () {
        var now = new Date().getTime();
        var t = deadline - now;
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((t % (1000 * 60)) / 1000);
        $("#demo").html(minutes + "m " + seconds + "s ")
        if (t < 0) {
            clearInterval(x);
            $("#demo").html("EXPIRED");
            $('.btn_resend').show();
            $('.btn_verify').hide();
        }
    }, 1000);
}

$("#loginOtpResend").on("click", () => {
    $.ajax({
        url: "/login/resendOtp",
        type: "post",
        dataType: "json",
        success: function (res) {
            if (res) {
                timmerCountDown1()
                $('.btn_resend').hide();
                $('.btn_verify').show();
            } else {
                alert("otpSending failed")
            }
        }
    })
})

//checkout with buy now wallet

$('.wallet').click(function (e) {
    console.log("buy now");
    var wallet = $(this).data('wallet')
    var price = $(this).data('buyoneprice')
    if ($('.wallet').is(":checked")) {
        $('#couponapplybox').hide()
        walletfunction1(wallet, price)
    } else {
        $('#couponapplybox').show()
        $('.dvPassport').hide()
        $('.afterwallet').val("false")
    }


})

function walletfunction1(wallet, price) {
    let amount = price - wallet
    $('.dvPassport').show()
    $('.afterwalletapplied').html(amount)
    $('.afterwalletapplied').val(amount)
    $('.afterwallet').val("true")
}


// checkout cart buy wallet 

$('.cartbuywallet').click(function (e) {
    console.log("cart buy");
    var wallet = $(this).data('wallet')
    var price = $(this).data('price')
    if ($('.cartbuywallet').is(":checked")) {
        $('#couponapplybox').hide()
        walletfunction(wallet, price)
    } else {
        $('#couponapplybox').show()
        $('.walletappllied').hide()
        $('.afterwallet').val("false")
    }


})

function walletfunction(wallet, price) {
    let amount = price - wallet
    $('.walletappllied').show()
    $('.afterwalletapply').html(amount)
    $('.afterwalletapply').val(amount)
    $('.afterwallet').val("true")
}

// product filter with brands

$('.proBrandFilter').click(function (e) {
    var brand = $(this).data('brand');
    var category = $(this).data('cat');
    if ($('.proBrandFilter').is(":checked")) {
        brandfilter(brand, category)
    }
});

function brandfilter(brand, cat) {
  
    $.ajax({
        url: "/brand-filter",
        data: {
            brand,
            cat
        },
        method: "post",
        success: (response) => {
            $('#product_list').html(response);

            function load_more() {
                $(".product-load-more .item").slice(0, 12).show();
                $(".loadMore").on('click', function (e) {
                    e.preventDefault();
                    $(".product-load-more .item:hidden").slice(0, 4).slideDown();
                    if ($(".product-load-more .item:hidden").length == 0) {
                        $(".infinitpagin").html('<div class="btn loadMore">no more products</div>');
                    }
                });
            }
            load_more();

            function load_more_listview() {
                $(".product-load-more .list-product").slice(0, 7).show();
                $(".loadMore").on('click', function (e) {
                    e.preventDefault();
                    $(".product-load-more .list-product:hidden").slice(0, 5).slideDown();
                    if ($(".product-load-more .list-product:hidden").length == 0) {
                        $(".infinitpagin").html('<div class="btn loadMore">no more products</div>');
                    }
                });
            }
            load_more_listview();

        }
    })
}


// change quantity increment and decrement in cart
$('.btn_chng_qty').click(function (e) {
    var cartId = $(this).data('id');
    var proId = $(this).data('productid')
    var count = parseInt($(this).data('type'))
    var userId = parseInt($(this).data('userid'))
    var productTotal = parseFloat($('.each_product' + proId).val()) * (parseInt($('.qty' + proId).html()) + count)
    changeQuantity(cartId, proId, count, userId, productTotal);
    e.preventDefault();
})

function changeQuantity(cartId, proId, count, userId, productTotal) {
    let quantity = parseInt(document.getElementById(proId).innerHTML)
    count = parseInt(count)
    if (quantity == 1 && count == -1) {
        Swal.fire({
            title: 'Are you sure?',
            text: "Product will be removed from cart!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload()
                $.ajax({
                    url: '/change-product-quantity',
                    data: {
                        cart: cartId,
                        product: proId,
                        count: count,
                        quantity: quantity,
                        productTotal: productTotal
                    },
                    method: 'post',
                    success: (response) => {
                        if (response.removeProduct) {
                            location.reload();

                        } else {
                            $('.qty_' + proId).html(quantity + count)
                        }

                    }
                })
            }
        })
    } else {
        $.ajax({
            url: '/change-product-quantity',
            data: {
                cart: cartId,
                product: proId,
                count: count,
                quantity: quantity,
                userId: userId,
                productTotal: productTotal
            },
            method: 'post',
            success: (response) => {
                if (response.removeProduct) {
                    location.reload()
                } else {
                    document.getElementById(proId).innerHTML = quantity + count
                    $('.cart_sub_total').html(response.subtotal.total)
                    $('.cart_sub_total').val(response.subtotal.total)
                    response.productsTotal.forEach((ele) => {

                        $('.product_total' + ele['item']).html(ele['total']);
                        $('.product_total_val' + ele['item']).val(ele['total']);
                    })
                }

            }
        })
    }
}

// remove cart item

$('.cart__remove').click(function (e) {
    var cartId = $(this).data('cartid');
    var proId = $(this).data('productid');
    Swal.fire({
        title: 'Are you sure?',
        text: "Product will be removed from cart!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            removeCartProduct(cartId, proId)
        }
    });
    e.preventDefault()
});

function removeCartProduct(cartId, proId) {
    $.ajax({
        url: '/remove-cart-product',
        data: {
            cart: cartId,
            product: proId
        },
        method: 'post',
        success: (res) => {
            console.log(res)
            if (res.status) {
                $('#' + cartId + proId).remove();
                console.log('var ordebtndisable : ', res.ordebtndisable);
                if (res.ordebtndisable) {
                    $('.cart__footer').hide()
                    Swal.fire({
                        title: 'Your Cart Is Empty',
                        text: "Go To Home Page",
                        confirmButtonColor: 'success',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.href = '/'
                        }
                    })
                } else {
                    console.log(res.renderCartPage);
                    var element = $(res.renderCartPage)
                    var found = $('#sub_total_div', element)
                    $('#sub_total_div').html(found)
                }

            }
        }

    })
}

//wishlist $ cart

$('.add-to-cart').click(function (e) {

    var proId = $(this).data('proid')
   
    addToCart(proId)
    e.preventDefault()
});

function addToCart(proId) {
    $.ajax({
        url: '/add-to-cart-pro',
        data: {
            proId
        },
        method: 'post',
        success: (response) => {
                
        }
    })
}

$('.add-to-wishlist').click(function (e) {

    var proId = $(this).data('proid');
    
    addtowishlist(proId)
    e.preventDefault()
})

function addtowishlist(proId) {
    $.ajax({
        url: '/add-to-wishlist',
        data: {
            proId
        },
        method: 'post',
        success: (response) => {
            if (response.status == true) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Add to Wishlist successfully'
                })
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,

                })

                Toast.fire({
                    icon: 'error',
                    title: response.errMsg
                })
            }
        }

    })
}

// remove items from wishlist

$('.wishlist_remove').click(function (e) {
    var proId = $(this).data('proid')
    var wishlistId = $(this).data('wishlistid')
    Swal.fire({
        title: 'Are you sure?',
        text: "Product will be removed from wishlist!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {

            removeWishlistProduct(wishlistId, proId)
        }
    });
    e.preventDefault()
})

function removeWishlistProduct(wishlistId, proId) {
    $.ajax({
        url: '/remove-wishlist-product',
        data: {
            wishlistId, proId
        },
        method: 'post',
        success: (response) => {
            if (response.status) {
                $('#' + wishlistId + proId).remove()
            }
        }
    })
}

// Address Confirm

function getComfirmAddress(addressId, userId) {
    $.ajax({
        url: '/get-confirm-address',
        data: {
            addressId: addressId,
            userId: userId
        },
        method: 'post',
        success: (response) => {
            // alert(response)
            // alert(response.address.state)
            $('#firstname').val(response.address.firstname);
            $('#lastname').val(response.address.lastname);
            $('#phone').val(response.address.phone);
            $('#pincode').val(response.address.pincode);
            $('#address').val(response.address.address);
            $('#district').val(response.address.district);
            $('#state').val(response.address.state);
            $('#landmark').val(response.address.landmark);
            $('#alternativePhone').val(response.address.alternativePhone);
            $('#addressType').val(response.address.addressType);
        }
    })
}

// apply coupons

$('#coupon-Form').submit((e) => {
    $('.walletbox').hide()
    e.preventDefault()
    $.ajax({
        url: '/apply-coupon',
        method: 'post',
        data: $('#coupon-Form').serialize(),
        success: (response) => {
            if (response.CouponInvaliderrMsg) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.CouponInvaliderrMsg

                })
            } else {
                if (response.couponalreadyUserUsedErrMsg) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response.couponalreadyUserUsedErrMsg

                    })

                }
                else {

                    if (response.errMsg) {
                        Swal.fire(response.errMsg)
                    } else {
                        $('.appliedCoupon').val('true')
                        $('.appliedgrandTotal').val(response.totalAmount)
                        $('.couponDiscount').val(response.discount)
                        $('.couponDiscountAmount').val(response.dis)
                        var table = document.getElementById('checkout_form');
                        var row = table.insertRow(1);
                        var cell = row.insertCell(0);
                        var cell1 = row.insertCell(1);
                        cell.setAttribute("colspan", "4");
                        cell.setAttribute("class", "text-right");
                        cell.innerHTML = "Coupon Applied " + response.discount + "% OFF";
                        cell1.innerHTML = "- ₹" + response.dis;
                        var row2 = table.insertRow(2);
                        var cell = row2.insertCell(0);
                        var cell1 = row2.insertCell(1);
                        cell.setAttribute("colspan", "4");
                        cell.setAttribute("class", "text-right");
                        cell.innerHTML = "Payable Amount";
                        cell1.innerHTML = "₹" + response.totalAmount;


                    }
                }
            }


        }
    })
})

// order Placed from cart

$('#Checkout-form').submit((e) => {
    $.ajax({
        url: '/order-placed',
        method: 'post',
        data: $('#Checkout-form').serialize(),
        success: (response) => {
            if (response.codSuccess) {
                location.href = '/order-success'
            } else if (response.razorpay) {
                razorpayPayment(response.response)
            }
            else if (response.forwardLink) {
                location.href = response.forwardLink
            }
        }
    })
    e.preventDefault()

})
function razorpayPayment(order) {
    var options = {
        "key": "rzp_test_OEEvw6L8TUCHKd", // Enter the Key ID generated from the Dashboard
        "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "FootPrint",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response) {
            verifyPayment(response, order)
        },
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9999999999"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
}
function verifyPayment(payment, order) {
   
    $.ajax({
        url: '/verify_payment',
        data: {
            payment,
            order
        },
        method: 'post',
        success: (response) => {
            
            if (response.status) {
                location.href = '/order-success'
            } else {
                alert("payment failed")
            }
        }
    })
}

// refferal offer copy

function clickCopyLink() {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'Successfully Link Copied'
    })
}

// admin month filter

$('.month_filter_btn').click((e)=>{
    e.preventDefault()
    $.ajax({
        url : "/admin/sales-month-filter",
        method : "post",
        data : {
            month : $('#month').val()
        },
        success : ((response)=>{
            console.log(response);
            let str = ''
            $('#datatable-buttons1').DataTable().clear().destroy();
            if(response.length > 0){
                response.forEach((elem) => {
                    console.log(elem)
                    str += `<tr>
                    <td>${elem._id.date}</td>
                    <td>${elem._id.proname}</td>
                    <td>${elem._id.status}</td>
                    <td>${elem.quantity}</td>
                    <td>${elem.amount}</td>
                    <td>${elem.revenue}</td>
                    </tr>`
                })
                $('#myTable').html(str);
            }
            $('#datatable-buttons1').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'pdf', 'print', 'excel'
                ],
                "bDestroy": true,
            });

        })
    })
})


// admin week filter
$('.week_filter_btn').click((e)=>{
    e.preventDefault()
    $.ajax({
        url: "/admin/sales-week-filter",
        method: "post",
        data : {
            week : $('#week').val()
        },
        success: ((response)=>{
            console.log(response)
            let str = ''
            $('#datatable-buttons1').DataTable().clear().destroy();
            if(response.salesReport.length > 0){
                response.salesReport.forEach((elem) => {
                    console.log(elem)
                    str += `<tr>
                    <td>${elem._id.date}</td>
                    <td>${elem._id.proname}</td>
                    <td>${elem._id.status}</td>
                    <td>${elem.quantity}</td>
                    <td>${elem.amount}</td>
                    <td>${elem.revenue}</td>
                    </tr>`
                })
                $('#myTable').html(str);
            }

            $('#datatable-buttons1').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'pdf', 'print', 'excel'
                ],
                "bDestroy": true,
            });

        })
    })
})


/// admin date filter

$('.filter_btn').click((e) => {
    e.preventDefault()
    $.ajax({
        url: "/admin/sales-date-filter",
        method: 'post',
        data: {
            fromDate: $('#fromDate').val(),
            toDate: $('#toDate').val()
        },
        success: ((response) => {
            console.log(response);
            let str = ''
            $('#datatable-buttons1').DataTable().clear().destroy();
            if (response.length > 0) {
                response.forEach((elem) => {
                    str += `<tr>
                    <td>${elem._id.date}</td>
                    <td>${elem._id.proname}</td>
                    <td>${elem._id.status}</td>
                    <td>${elem.quantity}</td>
                    <td>${elem.amount}</td>
                    <td>${elem.revenue}</td>
                    </tr>`
                })
                $('#myTable').html(str);
            }

            $('#datatable-buttons1').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'pdf', 'print', 'excel'
                ],
                "bDestroy": true,
            });



        })
    })
});




// dashboard one Chart 



google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() { 
      $.ajax({
        url: '/admin/dashboard-annually-sale',
        method : 'post',
        success:((response)=>{
        var data = google.visualization.arrayToDataTable([
          ["Element", "Amount", { role: "style" } ],
          ["Jan", response.monthannually[0], "#b87333"],
          ["Feb", response.monthannually[1], "silver"],
          ["Mar", response.monthannually[2], "gold"],
          ["Apr", response.monthannually[3], "color: #e5e4e2"],
          ["May", response.monthannually[4], "color: #e5e4e2"],
          ["Jun", response.monthannually[5], "color: #e5e4e2"],
          ["Jul", response.monthannually[6], "color: #e5e4e2"],
          ["Aug", response.monthannually[7], "color: #e5e4e2"],
          ["Sep", response.monthannually[8], "color: #e5e4e2"],
          ["Oct", response.monthannually[9], "color: #e5e4e2"],
          ["Nov", response.monthannually[10], "color: #e5e4e2"],
          ["Dec", response.monthannually[11], "color: #e5e4e2"],
          
          
        ]);
  
        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
                         { calc: "stringify",
                           sourceColumn: 1,
                           type: "string",
                           role: "annotation" },
                         2]);
  
        var options = {
          title: "Monthly Sales",
          width: 600,
          height: 400,
          bar: {groupWidth: "95%"},
          legend: { position: "none" },
        };
        var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
        chart.draw(view, options);


      })
        
        
         
    })
      }





  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(brandChart);

  function brandChart() {
      $.ajax({
          url: '/admin/dashboard-brand-sales',
          method:'post',
          success:(response)=>{
              console.log(response);
              let chartData = response.brands.map((elem, index) => {
                  return [ elem, response.result[index], response.priceTotal[index] ];
              })
              chartData.unshift(['Brand', 'Quantity', 'Amount'])
              var data = google.visualization.arrayToDataTable(chartData);
      
              var options = {
                title: 'Brands Performance',
                curveType: 'function',
                legend: { position: 'bottom' }
              };
      
              var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
      
              chart.draw(data, options);

          }
            
      })
          }




// dashboard Category Pie Chart

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(categoryPieChart);

  function categoryPieChart() {

    $.ajax({
        url : '/admin/dashboard-category-sale',
        method: 'post',
        success:(response)=>{
            console.log(response);
            var data = google.visualization.arrayToDataTable([
                ['Task', 'Count'],
                [response.categories[0], response.result[0]],
                [response.categories[1], response.result[1]],
                [response.categories[2], response.result[2]]
              ]);
          
              var options = {
               title: 'Category Sales'
              };
          
              var chart = new google.visualization.PieChart(document.getElementById('piechart'));
          
              chart.draw(data, options);
        }
    })
    
  }





  google.charts.load('current', {'packages':['bar']});
  google.charts.setOnLoadCallback(drawStuff);

  function drawStuff() {
    var data = new google.visualization.arrayToDataTable([
      ['Galaxy', 'Distance', 'Brightness'],
      ['Canis Major Dwarf', 8000, 23.3],
      ['Sagittarius Dwarf', 24000, 4.5],
      ['Ursa Major II Dwarf', 30000, 14.3],
      ['Lg. Magellanic Cloud', 50000, 0.9],
      ['Bootes I', 60000, 13.1]
    ]);

    var options = {
      width: 800,
      chart: {
        title: 'Nearby galaxies',
        subtitle: 'distance on the left, brightness on the right'
      },
      bars: 'horizontal', // Required for Material Bar Charts.
      series: {
        0: { axis: 'distance' }, // Bind series 0 to an axis named 'distance'.
        1: { axis: 'brightness' } // Bind series 1 to an axis named 'brightness'.
      },
      axes: {
        x: {
          distance: {label: 'parsecs'}, // Bottom x-axis.
          brightness: {side: 'top', label: 'apparent magnitude'} // Top x-axis.
        }
      }
    };

  var chart = new google.charts.Bar(document.getElementById('dual_x_div'));
  chart.draw(data, options);
};



