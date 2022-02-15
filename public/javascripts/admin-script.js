

$(document).ready(function(){
    $('.select2').select2();
})

// $(document).ready(function(){
//     $("#myInput").on("keyup", function() {
//       var value = $(this).val().toLowerCase();
//       $("#myTable tr").filter(function() {
//         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//       });
//     });
//   });

 // datatable 

//  $(document).ready(function() {
//   var table = $('#example').DataTable( {
//       lengthChange: false,
//       buttons: [ 'copy', 'excel', 'pdf', 'colvis' ]
//   } );

//   table.buttons().container()
//       .appendTo( '#example_wrapper .col-md-6:eq(0)' );
// } );




 // end datatable

  $("#adminLoginForm").validate({
    rules: {
        email:{
            required: true,
            email : true
        },
        password:{
            required : true
        }
        
    }
});


$(document).ready( function () {
  $('.tb_datatable').DataTable();
  $('#datatable-buttons1').DataTable({
    dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'pdf', 'print', 'excel'
        ],
    "bDestroy": true,
} );


} );


// $(document).ready(function() {

//   lineChartDash();
// });
// function lineChartDash() {
//   window.lineChart = Morris.Line({
//     element: 'line-chart-new',
//     data: [
//       { y: '2006', a: 100, b: 90 },
//       { y: '2007', a: 75,  b: 65 },
//       { y: '2008', a: 50,  b: 40 },
//       { y: '2009', a: 75,  b: 65 },
//       { y: '2010', a: 50,  b: 40 },
//       { y: '2011', a: 75,  b: 65 },
//       { y: '2012', a: 100, b: 90 }
//     ],
//     xkey: 'y',
//     ykeys: ['a', 'b'],
//     labels: ['Series A', 'Series B'],
//     lineColors: ['#1e88e5','#ff3321'],
//     lineWidth: '3px',
//     resize: true,
//     redraw: true
//   });
// }
// $(window).resize(function() {
//   window.lineChart.redraw();

// });



// // Bootstrap datepicker
// $('.input-daterange input').each(function() {
//   $(this).datepicker('clearDates');
// });

// // Set up your table
// table = $('#datatable-buttons1').DataTable({
//   paging: false,
//   info: false
// });

// // Extend dataTables search
// $.fn.dataTable.ext.search.push(
//   function(settings, data, dataIndex) {
//     var min = $('#min-date').val();
//     var max = $('#max-date').val();
//     var createdAt = data[2] || 0; // Our date column in the table

//     if (
//       (min == "" || max == "") ||
//       (moment(createdAt).isSameOrAfter(min) && moment(createdAt).isSameOrBefore(max))
//     ) {
//       return true;
//     }
//     return false;
//   }
// );

// // Re-draw the table when the a date range filter changes
// $('.date-range-filter').change(function() {
//   table.draw();
// });

// $('#my-table_filter').hide();
// Add Product Form Verification

$("#add-Product").validate({
  rules: {
    productTitle:
      {
          required: true,
              normalizer: function(value) {
                  return $.trim(value);
              }
      },
     
      productDescription :{
          required: true,
          maxlength: 200,
              normalizer: function(value) {
                  return $.trim(value);
              }
          
      },
      productDetails:{
        required: true,
              normalizer: function(value) {
                  return $.trim(value);
              }

      },
      brand: {
          required: true,
          normalizer: function(value) {
              return $.trim(value);
          }
          
      },
      category:{
          required: true,
          
      },
      subCategory:{
          required: true,
          
      },
      color: {
          required: true,
          lettersonly: true,
              normalizer: function(value) {
                  return $.trim(value);
              }
          
      },
      material : {
          required : true,
          lettersonly : true,
          normalizer: function(value) {
              return $.trim(value);
          }
         
      },
      "size[]" :{
          required : true,
          normalizer: function(value) {
              return $.trim(value);
          }
          
      },
      quantity:{
          required : true,
          digits: true,
          
          normalizer: function(value) {
              return $.trim(value);
          }
         
      },
      price:{
          required : true,
          digits:true,
          normalizer: function(value) {
              return $.trim(value);
          }
          
      },
      image1:{
          required : true,
          
      },
      image2:{
        required : true,
        
    },
    image3:{
      required : true,
      
  },
  image4:{
    required : true,
    
},
  }
});


// Edit Product 

$("#edit-Product").validate({
  rules: {
    productTitle:
      {
          required: true,
              normalizer: function(value) {
                  return $.trim(value);
              }
      },
     
      productDescription :{
          required: true,
          maxlength: 200,
              normalizer: function(value) {
                  return $.trim(value);
              }
          
      },
      productDetails:{
        required: true,
              normalizer: function(value) {
                  return $.trim(value);
              }

      },
      brand: {
          required: true,
          normalizer: function(value) {
              return $.trim(value);
          }
          
      },
      category:{
          required: true,
          
      },
      subCategory:{
          required: true,
          
      },
      color: {
          required: true,
          lettersonly: true,
              normalizer: function(value) {
                  return $.trim(value);
              }
          
      },
      material : {
          required : true,
          lettersonly : true,
          normalizer: function(value) {
              return $.trim(value);
          }
         
      },
      "size[]" :{
          required : true,
          normalizer: function(value) {
              return $.trim(value);
          }
          
      },
      quantity:{
          required : true,
          digits: true,
          
          normalizer: function(value) {
              return $.trim(value);
          }
         
      },
      price:{
          required : true,
          digits:true,
          normalizer: function(value) {
              return $.trim(value);
          }
          
      }
  }
});






// Add Home page banner validation
$("#add-Banner").validate({
    rules:{
        image1:{
            required : true,
            
        },
        image2:{
          required : true,
          
      },
      image3:{
        required : true,
        
    },
    image4:{
      required : true,
      
  },
  title1 : {
      required : true,
      normalizer: function(value) {
        return $.trim(value);
    }
},
    title2 : {
        required : true,
        normalizer: function(value) {
          return $.trim(value);
        }
      },
      title3 : {
        required : true,
        normalizer: function(value) {
          return $.trim(value);
        }
      },
      title4 : {
        required : true,
        normalizer: function(value) {
          return $.trim(value);
        }
      }

  

    }})

    //Add Category form validation

    $("#manageCategoryForm").validate({
          rules:{
            category :{
              required : true,
              normalizer: function(value) {
                return $.trim(value);
              }

            }

          }
        });



        $("#manageSubCategoryForm").validate({
          rules:{
            subcategory :{
              required : true,
              normalizer: function(value) {
                return $.trim(value);
              }

            }

          }
        });



        $("#add-Brand").validate({
          rules:{
            logo :{
              required : true
            },
            brand :{

              required : true,
              normalizer: function(value) {
                return $.trim(value);
              }


            }

          }
        })
 


        $("#addCoupons").validate({
          rules:{
            couponcode :{
              required : true,
              maxlength : 15,
              normalizer: function(value) {
                return $.trim(value);
              }
            },
            discount :{

              required : true,
             number: true,
             min:10,
              max:90,
              normalizer: function(value) {
                return $.trim(value);
              }
            },
            date:{
              required : true
            }

          }
        });

        $("#deleteCoupon").validate({
          rules:{
            couponcode :{
              required : true,
              maxlength : 15,
              normalizer: function(value) {
                return $.trim(value);
              }
            }
          }
        })




jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-z," "]+$/i.test(value);
}, "Only letters and spaces are allowed");






