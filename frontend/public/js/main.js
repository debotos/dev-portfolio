(function($) {
  'use strict';
  // Subpages resize
  function subpages_resize() {
    var subpagesHeight = $('.pt-page-current').height();
    $('.subpages').height(subpagesHeight + 50);
  }

  // Portfolio subpage filters
  function portfolio_init() {
    var portfolio_grid = $('#portfolio_grid'),
      portfolio_filter = $('#portfolio_filters');

    if (portfolio_grid) {
      portfolio_grid.shuffle({
        speed: 450,
        itemSelector: 'figure'
      });

      $('.site-main-menu').on('click', 'a', function(e) {
        portfolio_grid.shuffle('update');
      });

      portfolio_filter.on('click', '.filter', function(e) {
        portfolio_grid.shuffle('update');
        e.preventDefault();
        $('#portfolio_filters .filter')
          .parent()
          .removeClass('active');
        $(this)
          .parent()
          .addClass('active');
        portfolio_grid.shuffle('shuffle', $(this).attr('data-group'));
        setTimeout(function() {
          subpages_resize();
        }, 500);
      });
    }
  }
  // /Portfolio subpage filters

  // Contact form validator
  $(function() {
    $('#contact-form').validator();

    $('#contact-form').on('submit', function(e) {
      if (!e.isDefaultPrevented()) {
        var url = 'contact_form/contact_form.php';

        $.ajax({
          type: 'POST',
          url: url,
          data: $(this).serialize(),
          success: function(data) {
            var messageAlert = 'alert-' + data.type;
            var messageText = data.message;

            var alertBox =
              '<div class="alert ' +
              messageAlert +
              ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
              messageText +
              '</div>';
            if (messageAlert && messageText) {
              $('#contact-form')
                .find('.messages')
                .html(alertBox);
              if (messageAlert == 'alert-success') {
                $('#contact-form')[0].reset();
              }
            }
          }
        });
        return false;
      }
    });
  });
  // /Contact form validator

  // Hide Mobile menu
  function mobileMenuHide() {
    var windowWidth = $(window).width();
    if (windowWidth < 1024) {
      $('#site_header').addClass('mobile-menu-hide');
    }
  }
  // /Hide Mobile menu

  //On Window load & Resize
  $(window)
    .on('load', function() {
      //Load
      // Animation on Page Loading
      $('.preloader').fadeOut('slow');

      // initializing page transition.
      var ptPage = $('.subpages');
      if (ptPage[0]) {
        PageTransitions.init({
          menu: 'ul.site-main-menu'
        });
      }
    })
    .on('resize', function() {
      //Resize
      mobileMenuHide();

      setTimeout(function() {
        subpages_resize();
      }, 500);
    })
    .scroll(function() {
      if ($(window).scrollTop() < 20) {
        $('.header').removeClass('sticked');
      } else {
        $('.header').addClass('sticked');
      }
    })
    .scrollTop(0);

  // On Document Load
  $(document)
    .on('ready', function() {
      // Initialize Portfolio grid
      var $portfolio_container = $('.portfolio_grid');

      $portfolio_container.imagesLoaded(function() {
        portfolio_init(this);
      });

      // Portfolio hover effect init
      $(' #portfolio_grid > figure ').each(function() {
        $(this).hoverdir();
      });

      // Blog grid init
      var $container = $('.blog-masonry');
      $container.imagesLoaded(function() {
        $container.masonry();
      });

      // Mobile menu
      $('.menu-toggle').on('click', function() {
        $('#site_header').toggleClass('mobile-menu-hide');
      });

      // Mobile menu hide on main menu item click
      $('.site-main-menu').on('click', 'a', function(e) {
        mobileMenuHide();
      });

      // Sidebar toggle
      $('.sidebar-toggle').on('click', function() {
        $('#blog-sidebar').toggleClass('open');
      });

      // Testimonials Slider
      $('.testimonials.owl-carousel').owlCarousel({
        nav: true, // Show next/prev buttons.
        items: 3, // The number of items you want to see on the screen.
        loop: false, // Infinity loop. Duplicate last and first items to get loop illusion.
        navText: false,
        margin: 25,
        responsive: {
          // breakpoint from 0 up
          0: {
            items: 1
          },
          // breakpoint from 480 up
          480: {
            items: 1
          },
          // breakpoint from 768 up
          768: {
            items: 2
          },
          1200: {
            items: 2
          }
        }
      });

      // Text rotation
      $('.text-rotation').owlCarousel({
        loop: true,
        dots: false,
        nav: false,
        margin: 0,
        items: 1,
        autoplay: true,
        autoplayHoverPause: false,
        autoplayTimeout: 3800,
        animateOut: 'zoomOut',
        animateIn: 'zoomIn'
      });

      // Lightbox init
      $('body').magnificPopup({
        delegate: 'a.lightbox',
        type: 'image',
        removalDelay: 300,

        // Class that is added to popup wrapper and background
        // make it unique to apply your CSS animations just to this exact popup
        mainClass: 'mfp-fade',
        image: {
          // options for image content type
          titleSrc: 'title',
          gallery: {
            enabled: true
          }
        },

        iframe: {
          markup:
            '<div class="mfp-iframe-scaler">' +
            '<div class="mfp-close"></div>' +
            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
            '<div class="mfp-title mfp-bottom-iframe-title"></div>' +
            '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

          patterns: {
            youtube: {
              index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

              id: null, // String that splits URL in a two parts, second part should be %id%
              // Or null - full URL will be returned
              // Or a function that should return %id%, for example:
              // id: function(url) { return 'parsed id'; }

              src: '%id%?autoplay=1' // URL that will be set as a source for iframe.
            },
            vimeo: {
              index: 'vimeo.com/',
              id: '/',
              src: '//player.vimeo.com/video/%id%?autoplay=1'
            },
            gmaps: {
              index: '//maps.google.',
              src: '%id%&output=embed'
            }
          },

          srcAction: 'iframe_src' // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
        },

        callbacks: {
          markupParse: function(template, values, item) {
            values.title = item.el.attr('title');
          }
        }
      });

      // Function to change the single Blog UI
      $('.blog-card').click(function(e) {
        $.ajax({
          type: 'POST',
          url: '/api/blog',
          data: {
            action: 'ajax_action_portfolio',
            id: e.currentTarget.id.split('-')[2]
            //$(this).data() works because it's a standard AJAX call
          },
          success: function(data) {
            console.log('event is happening->', e.currentTarget.id);
            var blog_id = e.currentTarget.id.split('-')[2];
            console.log('ID of the blog item -> ', blog_id);

            setTimeout(() => {
              console.log(data);
              $('.blog-post-content h1').html(`<h1>${data.title}</h1>`);
            }, 300);
          }
        });
      });

      // Function to change the single portfolio UI
      $('figure').click(function(e) {
        $.ajax({
          type: 'POST',
          url: '/api/profile',
          data: {
            action: 'ajax_action_portfolio',
            id: e.currentTarget.id.split('-')[2]
            //$(this).data() works because it's a standard AJAX call
          },
          success: function(data) {
            // change DOM with data
            // change name
            $('.ajax-page-title').html(`<h1>${data.name}</h1>`);
            // change img carousel
            function getPortfolioImageUrl(url) {
              let urlArray = url.split('upload');
              let finalUrl = urlArray[0] + 'upload/w_600,h_400' + urlArray[1];
              return finalUrl;
            }
            let carousel = data.img.map(
              singleImg => `
                <div class="item">
                    <img src="${getPortfolioImageUrl(singleImg)}" alt="${
                data.name
              } Image" />
                </div>
              `
            );
            $('#single-portfolio-item-carousel-div').html(carousel.join(''));
            $('#single-portfolio-item-carousel-div').owlCarousel({
              smartSpeed: 1200,
              items: 1,
              loop: true,
              dots: true,
              nav: true,
              navText: false,
              margin: 10
            });
            // end image carousel
            // change info
            let url = data.url ? data.url : '#';
            let github = data.github ? data.github : '#';
            $('#portfolio-info-ajax').html(`
              <div class="block-title">
                  <h3>Description</h3>
              </div>
              <ul class="project-general-info">
                <li>
                    <p><i class="fa fa-user"></i> ${data.user}</p>
                </li>
                <li>
                    <p>
                        <i class="fa fa-globe"></i>
                        <a href="${url}" target="_blank"> Visit </a>|
                        <a href="${github}" target="_blank"> Github</a>
                    </p>
                </li>
                <li>
                    <p><i class="fa fa-calendar"></i> ${
                      data.date.split('T')[0]
                    }</p>
                </li>
              </ul>
              <p class="text-justify">
                  ${data.details}
              </p>
            `);
            // change tags
            let tags = data.tag.map(
              singleTag => `
                <li>
                    <a>${singleTag}</a>
                </li>
              `
            );
            $('#single-portfolio-tags-block').html(`
              <div class="block-title">
                  <h3>Technology</h3>
              </div>
              <ul class="tags">
                  ${tags.join('')}
              </ul>
            `);
            // info end

            // End
          }
        });
      });

      $('.ajax-page-load-link').magnificPopup({
        type: 'ajax',
        removalDelay: 300,
        mainClass: 'mfp-fade',
        gallery: {
          enabled: true
        }
      });

      //Form Controls
      $('.form-control')
        .val('')
        .on('focusin', function() {
          $(this)
            .parent('.form-group')
            .addClass('form-group-focus');
        })
        .on('focusout', function() {
          if ($(this).val().length === 0) {
            $(this)
              .parent('.form-group')
              .removeClass('form-group-focus');
          }
        });

      //Google Maps
      $('#map').googleMap();
      $('#map').addMarker({
        address: '15 avenue des champs Elysées 75008 Paris' // Your Address
      });
    })
    .on('DOMSubtreeModified', subpages_resize);
})(jQuery);
