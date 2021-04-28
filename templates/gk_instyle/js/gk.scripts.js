/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.noConflict();
jQuery.cookie = function (key, value, options) {

    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
 function calc() {
      if ($('#calcSum').val() > 100) {
        maxPriceCredit = $('#calcSum').val() * 8000;
      } else {
        maxPriceCredit = $('#calcSum').val() * 9000;
      }

      if ($('#calcSum').val() > 100) {
        finalPrice = ($('#calcSum').val() - $('#calcSum').val() % 100) / 100;
        finalPrice = finalPrice + ' млн.';
        if ($('#calcSum').val() % 100 != 0) {
          finalPrice = finalPrice + '<br>' + ($('#calcSum').val() % 100 * 10) + ' тыс. р.';
        } 

      } else {
        finalPrice = $('#calcSum').val() + '0 тыс. р.';
      }

      if ($('#calcTime').val() > 12) {
        stavka = 1.015;

        valTimeY = ($('#calcTime').val() - $('#calcTime').val() % 12) / 12;
        valTimeM = $('#calcTime').val() - valTimeY * 12;
        if (valTimeY < 5) {
          finalTime = valTimeY + ' года'; 
        } else {
          finalTime = valTimeY + ' лет';  
        }       
        if (valTimeY == 1) {
          finalTime = valTimeY + ' год';  
        } 
        if (valTimeM != 0) {
          finalTime = finalTime + '<br>' + valTimeM + ' мес.';
        }



      } else {
        stavka = 1.023;
        finalTime = $('#calcTime').val() + ' мес.';
      }

      $('#rangeSum').html(finalPrice);
      $('#rangeTime').html(finalTime);


      maxSum = (maxPriceCredit - maxPriceCredit % 1000000) / 1000000 + ' млн.';
      if (maxPriceCredit % 1000000 != 0) {
        maxSum = maxSum + ' ' +(maxPriceCredit % 1000000 / 1000) + ' тыс.';
      };

      $('#maxSum').html(maxSum + ' р.');
      $('#monthPay').html(Math.floor(maxPriceCredit * stavka / $('#calcTime').val() / 1000 * 0.85) + ' тыс. р.');

      $('#calcSum').css('background-size', (Math.floor( $('#calcSum').val() / 15 ) -1) + '% 8px')
      $('#calcTime').css('background-size', (Math.floor( $('#calcTime').val() / 1.2 ) -1) + '% 8px')
    }

calc();












};

// IE checker
function gkIsIE() {
  if (navigator.userAgent.match(/msie/i) ){ return true; }
  else { return false; }
}
//
var page_loaded = false;
//
jQuery(window).load( function() {
	setTimeout(function() {
		if(jQuery('#gkTopBar').length > 0) {
			jQuery('#gkTopBar').addClass('active');
		}
	}, 500);
	//
	page_loaded = true;
	// style area
	if(jQuery('#gkStyleArea')){
		jQuery('#gkStyleArea').find('a').each(function(i,element){
			jQuery(element).click(function(e){
	            e.preventDefault();
	            e.stopPropagation();
				changeStyle(i+1);
			});
		});
	}
	
	// font-size switcher
	if(jQuery('#gkTools') && jQuery('#gkMainbody')) {
		var current_fs = 100;
		
		jQuery('#gkMainbody').css('font-size', current_fs+"%");
		
		jQuery('#gkToolsInc').click(function(e){ 
			e.stopPropagation();
			e.preventDefault(); 
			if(current_fs < 150) {  
				jQuery('#gkMainbody').animate({ 'font-size': (current_fs + 10) + "%"}, 200); 
				current_fs += 10; 
			} 
		});
		jQuery('#gkToolsReset').click(function(e){ 
			e.stopPropagation();
			e.preventDefault(); 
			jQuery('#gkMainbody').animate({ 'font-size' : "100%"}, 200); 
			current_fs = 100; 
		});
		jQuery('#gkToolsDec').click(function(e){ 
			e.stopPropagation();
			e.preventDefault(); 
			if(current_fs > 70) { 
				jQuery('#gkMainbody').animate({ 'font-size': (current_fs - 10) + "%"}, 200); 
				current_fs -= 10; 
			} 
		});
	}
	if(jQuery('#system-message-container').length != 0){
		  jQuery('#system-message-container').each(function(i, element){
		  		(function() {
		  		     jQuery(element).fadeOut('slow');
		  		}).delay(3500);
	      });
	} 
	
	// K2 font-size switcher fix
	if(jQuery('#fontIncrease') && jQuery('.itemIntroText')) {
		jQuery('#fontIncrease').click(function() {
			jQuery('.itemIntroText').attr('class', 'itemIntroText largerFontSize');
		});
		
		jQuery('#fontDecrease').click( function() {
			jQuery('.itemIntroText').attr('class', 'itemIntroText smallerFontSize');
		});
	}
	
	// login popup
		if(jQuery('#gkPopupLogin').length > 0) {
			var popup_overlay = jQuery('#gkPopupOverlay');
			popup_overlay.css({'display': 'none', 'opacity' : 0});
			popup_overlay.fadeOut();
			
			jQuery('#gkPopupLogin').css({'display': 'block', 'opacity': 0, 'height' : 0});
			var opened_popup = null;
			var popup_login = null;
			var popup_login_h = null;
			var popup_login_fx = null;
			
			if(jQuery('#gkPopupLogin')) {
	
				popup_login = jQuery('#gkPopupLogin');
				popup_login.css('display', 'block');
				popup_login_h = popup_login.find('.gkPopupWrap').outerHeight();
				 
				jQuery('#gkLogin').click( function(e) {
					e.preventDefault();
					e.stopPropagation();
					popup_overlay.css({'opacity' : 0.45});
					popup_overlay.fadeIn('medium');
					
					setTimeout(function() {
						popup_login.animate({'opacity':1, 'height': popup_login_h},200, 'swing');
						opened_popup = 'login';
						popup_login.addClass('gk3Danim');
					}, 450);
	
					(function() {
						if(jQuery('#modlgn-username').length > 0) {
							jQuery('#modlgn-username').focus();
						}
					}).delay(600);
				});
			}
			
			popup_overlay.click( function() {
				if(opened_popup == 'login')	{
					popup_overlay.fadeOut('medium');
					popup_login.removeClass('gk3Danim');
					setTimeout(function() {
						popup_login.animate({
							'opacity' : 0
						},350, 'swing');
					}, 100);
					
				}
			});
		}	
});
// Function to change styles
function changeStyle(style){
	var file1 = $GK_TMPL_URL+'/css/style'+style+'.css';
	var file2 = $GK_TMPL_URL+'/css/typography/typography.style'+style+'.css';
	jQuery('head').append('<link rel="stylesheet" href="'+file1+'" type="text/css" />');
	jQuery('head').append('<link rel="stylesheet" href="'+file2+'" type="text/css" />');
	jQuery.cookie('gk_instyle_j30_style', style, { expires: 365, path: '/' });
}


