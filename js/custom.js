/*URI: https://themeforest.net/user/tripples

	1. Fixed header
	2. Main slideshow
	3. Site search
	4. Owl Carousel
	5. Video popup
	6. Counter
	7. Contact form
	8. Back to top
  
*/


jQuery(function($) {
    "use strict";

    /* ----------------------------------------------------------- */
    /*  Fixed header
    /* ----------------------------------------------------------- */

    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 70) {
            $('.navdown, .header-two').addClass('navbar-fixed');
        } else {
            $('.navdown, .header-two').removeClass('navbar-fixed');
        }
    });

    /* ----------------------------------------------------------- */
    /*  Mobile Menu
    /* ----------------------------------------------------------- */

    jQuery(".nav.navbar-nav li a").on("click", function() {
        jQuery(this).parent("li").find(".dropdown-menu").slideToggle();
        jQuery(this).find("i").toggleClass("fa-angle-down fa-angle-up");
    });


    /* ----------------------------------------------------------- */
    /*  Contact Map 
    /* -----------------------------------------------------------*/

    if ($('#map').length > 0) {

        var contactmap = {
            lat: 43.7771817,
            lng: -79.5517414
        };

        $('#map')
            .gmap3({
                zoom: 13,
                center: contactmap,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            })

        .marker({
            position: contactmap
        })

        .infowindow({
            position: contactmap,
            content: "127b Aviva Park Dr, Woodbridge,ON L4L 9C1"
        })

        .then(function(infowindow) {
            var map = this.get(0);
            var marker = this.get(1);
            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
        });
    }


    /* ----------------------------------------------------------- */
    /*  Main slideshow
    /* ----------------------------------------------------------- */

    $('#main-slide').carousel({
        pause: true,
        interval: 7000,
    });




    /* ----------------------------------------------------------- */
    /*  Site search
    /* ----------------------------------------------------------- */

    $('.nav-search').on('click', function() {
        $('.search-block').fadeIn(350);
    });

    $('.search-close').on('click', function() {
        $('.search-block').fadeOut(350);
    });



    /* ----------------------------------------------------------- */
    /*  Owl Carousel
    /* ----------------------------------------------------------- */


    //Project slide

    $("#project-slide").owlCarousel({

        loop: true,
        animateOut: 'fadeOut',
        nav: true,
        margin: 15,
        dots: false,
        mouseDrag: true,
        touchDrag: true,
        slideSpeed: 800,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        items: 4,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 4
            }
        }

    });


    //Testimonial slide

    $("#testimonial-slide").owlCarousel({

        loop: false,
        margin: 30,
        nav: false,
        dots: true,
        items: 3,
        responsive: {
            0: {
                items: 1
            },


            600: {
                items: 1
            }
        }

    });



    //Partners slide

    $("#partners-carousel").owlCarousel({

        loop: true,
        margin: 20,
        nav: false,
        dots: false,
        mouseDrag: true,
        touchDrag: true,
        items: 5,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 5
            }
        }

    });

    //Page slide

    $(".page-slider").owlCarousel({

        loop: true,
        animateOut: 'fadeOut',
        autoplay: true,
        autoplayHoverPause: true,
        nav: true,
        margin: 0,
        dots: false,
        mouseDrag: true,
        touchDrag: true,
        slideSpeed: 500,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        items: 1,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            }
        }

    });


    //Team slide

    $("#team-slide").owlCarousel({

        loop: false,
        animateOut: 'fadeOut',
        nav: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        margin: 20,
        dots: false,
        mouseDrag: true,
        touchDrag: true,
        slideSpeed: 800,
        items: 4,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            1000: {
                items: 4,
                loop: false
            }
        }

    });


    /* ----------------------------------------------------------- */
    /*  Video popup
    /* ----------------------------------------------------------- */
    $(document).ready(function() {

        $(".gallery-popup").colorbox({
            rel: 'gallery-popup',
            transition: "fade",
            innerHeight: "500"
        });

        $(".popup").colorbox({
            iframe: true,
            innerWidth: 600,
            innerHeight: 400
        });

    });


    // -----------------------------
    //  Count Up
    // -----------------------------
    function counter() {
        var oTop;
        if ($('.counterUp').length !== 0) {
            oTop = $('.counterUp').offset().top - window.innerHeight;
        }
        if ($(window).scrollTop() > oTop) {
            $('.counterUp').each(function() {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                    countNum: countTo
                }, {
                    duration: 1000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                    }
                });
            });
        }
    }
    $(window).on('scroll', function() {
        counter();
    });



    /* ----------------------------------------------------------- */
    /*  Contact form
    /* ----------------------------------------------------------- */

    $('#contact-form').submit(function() {

        var $form = $(this),
            $error = $form.find('.error-container'),
            action = $form.attr('action');

        $error.slideUp(750, function() {
            $error.hide();

            var $name = $form.find('.form-control-name'),
                $email = $form.find('.form-control-email'),
                $subject = $form.find('.form-control-subject'),
                $message = $form.find('.form-control-message');

            $.post(action, {
                    name: $name.val(),
                    email: $email.val(),
                    subject: $subject.val(),
                    message: $message.val()
                },
                function(data) {
                    $error.html(data);
                    $error.slideDown('slow');

                    if (data.match('success') != null) {
                        $name.val('');
                        $email.val('');
                        $subject.val('');
                        $message.val('');
                    }
                }
            );

        });

        return false;

    });





    /* ----------------------------------------------------------- */
    /*  Back to top
    /* ----------------------------------------------------------- */

    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });

    // scroll body to 0px on click
    $('#back-to-top').on('click', function() {
        $('#back-to-top').tooltip('hide');
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    $('#back-to-top').tooltip('hide');

});


/* ----------------------------------------------------------- */
/*  Catalog
/* ----------------------------------------------------------- */

//alert(o_obj);
function FillMake(o_obj) { //makeRequest("/inc/fill_make.php?ttt="+getJsTime()+"&year="+o_obj.value, FillMake1, o_obj);

    $.ajax({
        url: "/inc/fill_make.php",
        type: 'POST',
        data: { year: o_obj.value },
        async: false,
        success: function(response) {
            //alert(response);
            FillSport(response, 'makesID');
            FillSport("", 'modelsID');
            FillSport("", 'SubModelID');
            document.getElementById('parts_show').innerHTML = "";
        },
        error: function(msg) {}
    });

}
//function FillMake1(content, o_obj){	FillSport(content, 'makesID');	FillSport("", 'modelsID'); FillSport("", 'SubModelID'); document.getElementById('parts_show').innerHTML="";	}

function FillModel(o_obj) { //makeRequest("/inc/fill_model.php?ttt="+getJsTime()+"&makesID="+o_obj.value+"&year="+document.getElementById('year').value, FillModel1, o_obj);

    $.ajax({
        url: "/inc/fill_model.php",
        type: 'POST',
        data: { makesID: o_obj.value, year: document.getElementById('year').value },
        async: false,
        success: function(response) {
            //alert(response);				
            FillSport(response, 'modelsID');
            FillSport("", 'SubModelID');
            document.getElementById('parts_show').innerHTML = "";
        },
        error: function(msg) {}
    });


}
///function FillModel1(content, o_obj){FillSport(content, 'modelsID');  FillSport("", 'SubModelID'); document.getElementById('parts_show').innerHTML="";}

function FillParts_sub(o_obj) {
    //makeRequest("/inc/fill_parts.php?ttt="+getJsTime()+"&categoryID="+o_obj.value+"&SubModelsID="+o_obj.value+"&modelsID="+document.getElementById('modelsID').value+"&MakeID="+document.getElementById('makesID').value+"&year="+document.getElementById('year').value, FillParts_sub1, o_obj);
    $.ajax({
        url: "/inc/fill_parts.php",
        type: 'POST',
        data: { categoryID: o_obj.value, SubModelsID: o_obj.value, modelsID: document.getElementById('modelsID').value, MakeID: document.getElementById('makesID').value, year: document.getElementById('year').value },
        async: false,
        success: function(response) {
            //alert(response);
            document.getElementById('parts_show').innerHTML = response;
        },
        error: function(msg) {}
    });
}
//function FillParts_sub1(content, o_obj){document.getElementById('parts_show').innerHTML=content;	}

function searchPartsByPartN(o_obj) {
    //makeRequest("/inc/fill_parts.php?ttt="+getJsTime()+"&part_no="+document.getElementById('part_no').value, FillParts1, o_obj);
    $.ajax({
        url: "/inc/fill_parts.php",
        type: 'POST',
        data: { part_no: document.getElementById('part_no').value },
        //async : false, 
        success: function(response) {
            console.log(response);
            document.getElementById('parts_show').innerHTML = response;
        },
        error: function(msg) {}
    });
}
//function FillParts1(content, o_obj){document.getElementById('parts_show').innerHTML=content;	}

function FillParts(o_obj) {
    //makeRequest("/inc/fill_category.php?ttt="+getJsTime()+"&modelsID="+o_obj.value+"&year="+document.getElementById('year').value, fill_Cat, o_obj);
    $.ajax({
        url: "/inc/fill_category.php",
        type: 'POST',
        data: { modelsID: o_obj.value, year: document.getElementById('year').value },
        async: false,
        success: function(response) {
            //alert(response);
            FillSport(response, 'categoryID');
        },
        error: function(msg) {}
    });
    document.getElementById('parts_show').innerHTML = "";
}

function fill_submodel1(content, o_obj) { FillSport(content, 'SubModelID'); }
//function fill_Cat(content, o_obj){ FillSport(content, 'categoryID'); }	

function FillSport(content, s_obj) {
    var valuesArr;
    var i, j;
    var objOption;
    var changeField
    try { changeField = document.getElementById(s_obj); } catch (e) {
        return false;
    }
    if (!changeField) { return false; }
    /*if(obj.options[obj.selectedIndex].value=="")
    {
    	changeField.disabled = true;
    	return;
    }*/

    //changeField.disabled = false;
    try { while (changeField.removeChild(changeField.firstChild)); } catch (e) {}

    //objOption = document.createElement("option");
    //objOption.value = "";
    //objOption.appendChild(document.createTextNode("Select"));
    //changeField.appendChild(objOption);
    arr_model = content.split("||");

    objOption = document.createElement("option");
    objOption.value = '0';
    objOption.appendChild(document.createTextNode('Select'));
    changeField.appendChild(objOption);
    for (i = 0; i < arr_model.length; ++i)
        if (arr_model[i] != "") {
            valuesArr = arr_model[i].split('::');
            try {
                objOption = document.createElement("option");
                objOption.value = valuesArr[0];
                objOption.appendChild(document.createTextNode(valuesArr[1]));
                changeField.appendChild(objOption);
            } catch (e) {}
        }
}
$(document).on('click', ".add_to_cart", function() {
    var f_data;

    f_data = new FormData();
    f_data.append('processSafeForm', $('#processSafeForm_part').val());
    $('[id^="parts_id_"]').each(function() {
        var n_id = $(this).attr("id");
        n_id = n_id.replace("parts_id_", "");
        f_data.append('parts_id[' + n_id + ']', $(this).val());
        $(this).val('');
    });
    $.ajax({
        url: '/inside/cart_add.php',
        type: "POST",
        dataType: "json",
        data: f_data,
        processData: false,
        contentType: false,
        success: function(data, status) {
            console.log(data);
            console.log(status);
            if (data.success == "1") {
                $("#td_resp").html("Items have been added to cart.<br>" + data.qty + " items in your cart")
                    //$('.toast').toast('show');
                $('.head_cart').html(data.qty + " items in your cart");
                //swal('','Items have been added to cart.<br>' + data.qty + ' items in your cart');
                //				swal({
                //					title: '',
                //					text: 'Items have been added to cart.<br>' + data.qty + ' items in your cart',
                //					type: 'warning',
                //					showCancelButton: true,
                //					confirmButtonColor: '#3085d6',
                //					cancelButtonColor: '#d33',
                //					cancelButtonText: 'Keep Shopping',
                //					confirmButtonText: 'Proceed to Checkout'
                //					}).then(function() {
                //					 self.location.href = '/inside/cart.php';
                //				})
                $('#processSafeForm_part').val(1 * $('#processSafeForm_part').val() + 1)
            }
        },
        error: function(xhr, desc, err) {
            console.log("err:" + desc);

        }
    });
});