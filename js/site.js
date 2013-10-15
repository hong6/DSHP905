function df_lightbox_pinkpony_show(){}
function df_lightbox_pinkpony_hide(){}
function df_lightbox_show(){}
function df_lightbox_hide(){}

function getBrandContentBox(brandId, categoryId, height) {
	var brandFolder = "http://" + window.location.hostname + "/graphics/media/polo/branding";
	jQuery.ajax({
		url: brandFolder + "/" + brandId + "/content-box-" + categoryId + "-" + height + ".html",
		success: function(data) { // category specific branding content
			jQuery(".brand-" + brandId + " .brand-content").html(data);
		},
		error: function() {
			jQuery.ajax({
				url: brandFolder + "/" + brandId + "/content-box-" + height + ".html",
				success: function(data2) { // default branding content
					jQuery(".brand-" + brandId + " .brand-content").html(data2);
				},
				error: function() { // no content available
					jQuery(".brand-content-box.brand-" + brandId).remove();
				}
			});
		}
	});
}

function selectParametricFilterValue(dropDown) {
	var selectedValue = dropDown[dropDown.selectedIndex].value;
	selectedValue = selectedValue.replace(/&$/, ""); // remove trailing "&" from URL (causes CMS to fail)
	if (selectedValue > "") {
		window.location = selectedValue;
	}
}

Event.observe(window, 'load', function(e){

	var pars = {
		animate: {
			time: 150,
			opacity:.8
		}        
	}

	if (Df.Modal) {
		Df.Modal.setPars(pars)
	}
	


	Df.Shells = {
		dialog: function(holder) {
			if(!holder) {
				holder = document.body
			}
			var dialog = Df.e('div', $(holder) ,{className: 'dialog'})
			var title = Df.e('div', dialog ,{className: 'titleDialog'})
			var close = Df.e('span', title ,{innerHTML: '<img src="../images/pixel.gif" width="26" height="24" border="0" />'})
			close.observe('click', Df.Lightbox.hide)
			var content = Df.e('div', dialog)

			return {element:dialog, content:content}
		}
	}
	
	if (Df.Lightbox) {
		
		Df.Lightbox.createDialog(
			new Df.Dialog(
				Df.Shells.dialog()
			).set({
				animate: {
					time: 150,
					opacity:.9999
				},
				drag: false,
				resize: false,
				center: true//.df_if(!Df.browser().ie)
			})
		);
	}
		
	window.df_lightbox_show = function(linkURL){
		/*Omniturecustom link tracking start */
		RugbyOverlayView(true, 'global_rugby_lightbox');
		/*Omniturecustom link tracking end */	
		Df.Lightbox.setContent('<div><a href="javascript:window.open(\'' + linkURL + '\', \'Rugby\');void(df_lightbox_hide());"><img src="../images/rugby_interstitial_080312.jpg" width="312" height="273" border="0" /></a></div>')	
		return Df.Lightbox.show()
	}
	window.df_lightbox_hide = function(){
		return Df.Lightbox.hide()
	}
	window.df_lightbox_pinkpony_show = function(linkURL){
		Df.Lightbox.setContent('<div><a href="javascript:window.open(\'' + linkURL + '\', \'PinkPony\');void(df_lightbox_pinkpony_hide());"><img src="../images/0930_pp_auction_310x270.jpg" width="310" height="270" border="0" /></a></div>')	
		return Df.Lightbox.show()
	}
	window.df_lightbox_pinkpony_hide = function(){
		return Df.Lightbox.hide()
	}
	
	
	if(Df.browser && Df.browser().ie){
		Df.Lightbox.getDialog().element.observe(':show', function(e){
			
			scrollTo(0,0) //option 1
			
			//Df.Lightbox.getDialog().element.style.top = document.body.scrollTop + 'px'
			
			//alert(parseInt(Df.Lightbox.getDialog().element.style.top) + ' fdgd ' + document.body.scrollTop)
			
		})
	}
	var CharLimit = new Number(120);
	jQuery(".AddCountDown").keyup(function(){
		if(!isNaN(jQuery(this).attr("CharLimit"))){
			CharLimit = parseInt(jQuery(this).attr("CharLimit"));
			if (jQuery(this).val().length > CharLimit) {
				jQuery(this).val(jQuery(this).val().substring(0,CharLimit));
			} else {				
				jQuery("#ogm-char-limit").html(CharLimit-jQuery(this).val().length);
			}
		}
		
	});

	// grid pagination input
	jQuery('.pagination')
		.bind('keyup', function(e) {
			e.preventDefault();
			e.stopPropagation();
			if (e.keyCode == 13) {
				var $this = jQuery(this);
				var selectedPageValue = jQuery('input[name=pg]', $this).val();
				var selectedPage = parseInt(selectedPageValue);

				if (/^\d*$/.test(selectedPage) && selectedPage <= parseInt(jQuery('.total-pages', $this).text()) && selectedPage >= 1) {
					window.location = $this.attr('action') + "&pg=" + selectedPage;
				} else {
					jQuery('input[name=pg]').val(jQuery('input[name=current-pg]').val()).blur();
					return false;
				}
			}
		})
		.bind('submit', function(e) {
			e.preventDefault();
			return false;
		});


	// product page lightbox functionality
	jQuery(".need-help").fancybox({
		'titlePosition': 'inside',
		'transitionIn': 'none',
		'transitionOut': 'none',
		'overlayOpacity': 0.5
	});			
	jQuery("#tabs-need-help").insertAfter('#fancybox-content');
	jQuery("#tabs-need-help li a").click(function(){
		jQuery("#tabs-need-help li a").removeClass("active");
		 });
	jQuery(".need-help").click(function (){ 
		jQuery("#tabs-need-help").css('display', 'block');
		jQuery("#tabs-need-help li a").removeClass("active");
		if (this.className == "need-help assistance" || this.className == "assistance need-help") {
			jQuery("#tabs-need-help li a.assistance").addClass("active");
		} else if (this.className == "need-help shipping" || this.className == "shipping need-help") {
			jQuery("#tabs-need-help li a.shipping").addClass("active");
		} else if (this.className == "need-help returns" || this.className == "returns need-help") {
			jQuery("#tabs-need-help li a.returns").addClass("active");
		} else if (this.className == "need-help gift" || this.className == "gift need-help") {
			jQuery("#tabs-need-help li a.gift").addClass("active");
		} else if (this.className == "need-help emailus" || this.className == "emailus need-help") {
			jQuery("#tabs-need-help li a.emailus").addClass("active");
		}
	});
	jQuery("#tabs-need-help").css('display', 'none'); 		
	jQuery("#sizechart").fancybox({
		 'width': 820,
		 'height': 670,
		 'autoScale': false,
		 'transitionIn': 'none',
		 'transitionOut': 'none',
		 'type': 'iframe' 
	});
	jQuery("#fitguide").fancybox({
		 'width': 820,
		 'height': 670,
		 'autoScale': false,
		 'transitionIn': 'none',
		 'transitionOut': 'none',
		 'type': 'iframe' 
	});
	jQuery("#SG_ReadNow").fancybox({
		 'scrolling': 'no',
		 'width': 820,
		 'height': 670,
		 'autoScale': false,
		 'transitionIn': 'none',
		 'transitionOut': 'none',
		 'type': 'iframe' 
	});
	jQuery(".prodPromoLink").fancybox({
		 'scrolling': 'no',
		 'width': 450,
		 'height': 500,
		 'autoScale': false,
		 'transitionIn': 'none',
		 'transitionOut': 'none',
		 'type': 'iframe' 
	});
	jQuery("#sizechart").click(function (){ 
		jQuery("#tabs-need-help").css('display', 'none'); 
		jQuery("#fancybox-close").css({"width": "14px", "height": "14px", "top": "7px", "right": "7px", "background": "url('../images/fancybox/lightbox-close.gif') no-repeat", "z-index": "9999"});
	});
	jQuery("#fitguide").click(function (){ 
		jQuery("#tabs-need-help").css('display', 'none');
		jQuery("#fancybox-close").css({"width": "14px", "height": "14px", "top": "7px", "right": "7px", "background": "url('../images/fancybox/lightbox-close.gif') no-repeat", "z-index": "9999"});
	});
	jQuery(".need-help").click(function (){ 
		jQuery("#fancybox-close").css({"width": "14px", "height": "14px", "top": "7px", "right": "7px", "background": "url('../images/fancybox/lightbox-close.gif') no-repeat", "z-index": "9999"});
	});			
	jQuery("#SG_ReadNow").click(function (){ 
		jQuery("#tabs-need-help").css('display', 'none'); 
		jQuery("#fancybox-close").css({"width": "14px", "height": "14px", "top": "7px", "right": "7px", "background": "url('../images/fancybox/lightbox-close.gif') no-repeat", "z-index": "9999"});
	});

	initEnhancedZoom();

});

prepend_uppercase = function (select,option) {
	var text = select.attr('title');
	if (!text) {
		text = option.text();
	} else {
		text = text + ': ' + option.text();
	}
	//return text.toUpperCase();
	return text;
}

reformatGridNav = function() {
	jQuery('.selectFilterClass, .selectSortClass, .view-sizes').each(function() {

		// The select element to be replaced:
		var select = jQuery(this);
		if (select.find('option').length > 0 || select.parent(".items-per-page").length) {
			var whichone = select.attr("class");
			var whichclass = 'dropDown';
			var width;

			if (whichone.indexOf('selectFilter_Brand') != -1) {
				width = 140;
			} else if (whichone.indexOf('selectFilter_GenericColor') != -1) {
				width = 116;
			} else if (whichone.indexOf('selectFilter_SizeGeneral') != -1) {
				width = 116;
			} else if (whichone.indexOf('view-sizes') != -1) {
				width = 44;
			} else if (whichone.indexOf('selectSortClass') != 1) {
				width = 116;
			} else {
				width = 70;
				whichclass = 'dropDownShort';
			}

			var selectBoxContainer = jQuery('<div>',{
				width: width,
				'class'     : 'cmfilter',
				html        : '<div class="selectBox"></div>'
			});

			var dropDown = jQuery('<ul>',{ 'class': whichclass, 'width': width });
			var selectBox = selectBoxContainer.find('.selectBox');

			// Looping though the options of the original select element

			select.find('option').each(function(i) {
				var option = jQuery(this);
				var sel = 0;

				var li = jQuery('<li>',{
					html: option.text()
				});

				if (i == sel) { // set default
					selectBox.html('<span><span>' + prepend_uppercase(select,option) + '</span></span>');
				}
				if (option.attr('selected') == true) { // overwrite default with selected
					selectBox.html('<span><span>' + prepend_uppercase(select,option) + '</span></span>');
					li.addClass('selected');
				}

				li.not('.selected').click(function(e) {
					selectBox.html('<span><span>' + prepend_uppercase(select,option) + '</span></span>');
					selectBox.find('span span').each(function() {
						jQuery(this).css({"display":"block"});
					});
					dropDown.trigger('cmhide');

					select.val(option.val());

					jQuery(select).trigger('change');

					return false;
				});

				dropDown.append(li);
			});

			selectBoxContainer.append(dropDown.hide());
			select.hide().after(selectBoxContainer);
			selectBoxContainer.find('.selectBox span span').each(function() {
				jQuery(this).css({"display":"block"});
			});

			// Binding custom show and hide events on the dropDown:
			dropDown.bind('cmshow', function() {
				// close the others
				jQuery('ul.dropDown').each(function() {
					jQuery(this).trigger('cmhide');
				});

				if (dropDown.is(':animated')) {
					return false;
				}

				selectBoxContainer.addClass('cmfilterexpanded');
				/*// some where is the slideDown effect it's not doing the display style
				dropDown.slideDown('400');*/
				dropDown.show();

			}).bind('cmhide', function() {

				if (dropDown.is(':animated')) {
					return false;
				}

				/*dropDown.slideUp('400',function(){
					selectBoxContainer.removeClass('cmfilterexpanded');
				});*/
				selectBoxContainer.removeClass('cmfilterexpanded');
				dropDown.hide();

			}).bind('cmtoggle',function(){
				if (selectBoxContainer.hasClass('cmfilterexpanded')){
					dropDown.trigger('cmhide');
				}
				else
				{
					dropDown.trigger('cmshow');
				}
			});

			selectBoxContainer.click(function(e){
				dropDown.trigger('cmtoggle');
				return false;
			});

			// If we click anywhere on the page, while the
			// dropdown is shown, it is going to be hidden:
			jQuery(document).click(function(){
				dropDown.trigger('cmhide');
			});
		}

	}); // end of each loop over objects
}

function setCookie(c_name,value,exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toUTCString());
	document.cookie = c_name + "=" + c_value + '; path=/';
}

function getCookie(c_name) {
	var i,x,y,ARRcookies = document.cookie.split(";");
	for (i = 0; i < ARRcookies.length; i++) {
	  x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
	  x = x.replace(/^\s+|\s+$/g,"");
	  if (x == c_name) {
	    return unescape(y);
      }
	}
}

function populateGET() {
  window.get = {};
  var params = location.search.slice(1).split('&');
  for(var i=0,len=params.length;i<len;i++) {
    var keyVal = params[i].split('=');
    try {
    	window.get[decodeURIComponent(keyVal[0])] = decodeURIComponent(keyVal[1]);
  	} catch(err) {
    	window.get[keyVal[0]] = keyVal[1];
  	}
  }
}

/* called from topnav.js jquery on load because topnav.js loads after jquery.1.4.2 */
function attachStickyView() {
    populateGET();
    var newsize = (window.get['view']) ? window.get['view'] : getCookie('viewsizecookie');
    if (newsize) {
   		newsize = (newsize == 'all') ? '99' : newsize; /* another Polo USA patch */ 
        setCookie('viewsizecookie', newsize, 365);
        jQuery('a[href*="family"]').each(function (index) {
            var href = jQuery(this).attr('href');
        	var html = jQuery(this).html(); /* hacky patch for Polo USA since it doesn't include a view param on the back to 15 <a> */
            if (href.indexOf('view') == -1 && href.indexOf('pg') == -1 && html.substr(0,10) !== 'Back to 15') {
            	jQuery(this).attr('href', href + '&view=' + newsize);
            }
            if (href.indexOf('view') == -1 && href.indexOf('pg') == -1 && html.substr(0,10) == 'Back to 15') {
            	jQuery(this).attr('href', href + '&view=15');
            }
        });
    }
    
    var newppp = (window.get['ppp']) ? window.get['ppp'] : getCookie('viewsizecookie');
    if (newppp) {
   		newppp = (newppp == 'all') ? '99' : newppp; /* another Polo USA patch */ 
        setCookie('viewsizecookie', newppp, 365);
    }    

}

/* adding  item level page promo functionality - lightbox */ 
function showCustomLightbox (promoUrl, width, height) {
	
	jQuery('<div/>', {
		id: 'promo-lightbox',
		style: 'display:none'
	}).appendTo('body');
	
	jQuery('<iframe/>', {
		id: 'promo-iframe',
		src: '',
		height: '100%',
		width: '100%',
		frameBorder: '0',
		scrolling: 'no'
	}).appendTo('#promo-lightbox');

	// set iframe source and width/height
	jQuery('#promo-lightbox').css({ height: height + 'px', width: width + 'px' });
	jQuery('#promo-iframe').attr('src', promoUrl);

	// launch BlockUI lightbox
	jQuery.blockUI({
		baseZ: 2100,
		message: jQuery('#promo-lightbox'),
		css: {
			top: (jQuery(window).height() - height) / 2 + 'px',
			left: (jQuery(window).width() - width) / 2 + 'px',
			height: height + 'px',
			width: width + 'px'
		}
	});

	// close overlay on click
	jQuery('.blockOverlay').click(function() {
		jQuery.unblockUI({
			onUnblock: function(){ jQuery("#promo-lightbox").remove(); }
		});
	}).css({ cursor: 'pointer' });
}

/* Enhanced Zoom */

// sets enhanced zoom status and click event
function initEnhancedZoom () {
	if (jQuery('#enhanced-zoom').length) {
		if (productTemplate == 'poloColor' || productTemplate == 'poloMulticolor2' || productTemplate == 'poloCustomColor2') {
			zoomColor = orderedImageMap_0[0].cId;
		} else if (productTemplate == 'poloHomeCustom2') {
			zoomColor = colorImages[0].id;
		} else { // poloBedCollection and poloSolidHome
			zoomColor = ''; // default to product level images
		}
		setZoomColor(zoomColor);
		jQuery('#enhanced-zoom').click(function (e) {
			e.preventDefault();
			if (this.className != 'disabled') {
				var colorCode = jQuery(this).attr('rel');
				var altIndex = jQuery('ul.altImages li').length ? jQuery('ul.altImages li.active').index() : 0;
				openEnhancedZoom(productIdForPopup, colorCode, altIndex);
			}
		});
	}
}

// set enhanced zoom color
function setZoomColor (colorCode) {
	var isDisabled = true;
	if (colorCode) { // check if color has a zoom image
		if (typeof Scene7Map['s7' + colorCode] !== 'undefined') {
			isDisabled = false;
		} else if (colorImages !== undefined) {
			jQuery.each(colorImages, function () {
				if (this.id == colorCode && this.zoom != '') {
					isDisabled = false;
				}
			});
		}
	} else { // // check if product has a zoom image
		if (typeof productImages !== 'undefined' && productImages.zoom != '') {
			isDisabled = false;
		}
	}
	jQuery('#enhanced-zoom')
		.attr({
			'class': isDisabled ? 'disabled' : '',
			'rel': colorCode
		});
}

// launch enhanced zoom
function openEnhancedZoom (pid, color, view) {
	var zoomSrc = '/enhancedZoom/index.jsp?productId=' + pid + '&color=' + color + '&view=' + view;
	if (window.location.href.indexOf('product/index.jsp') == -1) {
		zoomSrc += '&domain=' + document.domain; // pass domain when called from CMS
	}
	jQuery.blockUI({ 
		message: jQuery('<iframe/>', {
			src: zoomSrc,
			id: 'zoom-frame',
			width: '100%',
			height: '100%',
			frameBorder: '0'
		}),
		css: { 
			padding: 0, 
			margin: 0, 
			width: '100%', 
			height: '100%',
			left: '0', 
			top: '0', 
			border: 'none',
			backgroundColor: '#fff',
			cursor: 'auto'
		},
		centerX: true,
		centerY: true,
		baseZ: 2500
	});
	jQuery('#zoom-frame').load(function () {
		jQuery('#zoom-frame').contents().find('.zoom-close').click(function (e) {
			e.preventDefault();
			parent.jQuery.unblockUI();
		});
	});
}