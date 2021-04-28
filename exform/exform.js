(function($){

 jQuery.fn.exform = function(options){
  options = $.extend({
	   path: '/exform/',
	   name: true,
	  phone: true,
	  email: true,
	message: true,
	  theme: 'mform',
	wrapper: 'body'
    }, options);
	
  var exform_blck = ( options.wrapper == 'body' ) ? options.wrapper : '.' + options.wrapper;
  var exform_wrpr = '.exform_wrapper.'+ options.theme;
  
  $('head').append('<link rel="stylesheet" type="text/css" href="'+ options.path +'themes/'+ options.theme +'/css/exform.css" />');
  
  if(exform_blck == 'body') $(this).click(start_form);
  else start_form();
  		
  function start_form(){
   if($(exform_wrpr).length == 0){
    
	mf_prms = {mf_path: options.path, mf_theme: options.theme }
	
	if(exform_blck == 'body'){
     $(exform_blck).append('<div class="exform_bg"></div>');
     $('.exform_bg').fadeTo(200, 0.3, function(){
      $.post(options.path + 'exform.php', mf_prms, function(data){ show_form(data) });
     });
    }
    else $.post(options.path + 'exform.php', mf_prms, function(data){ show_form(data) })	
    
   }
   return false
  }

  function show_form(data){ 
   if(exform_blck == 'body'){
	$('body').append($(data));
	operations();
	$(exform_wrpr).css({position: 'fixed', left: '50%', top: '50%',
		'margin-left': '-' + parseInt($('.exform_wrapper').css('width')) / 2 + 'px',
		'margin-top': '-' + parseInt($('.exform_wrapper').css('height')) / 2 + 'px'
	}).show();
   }
   else{
	$('.'+options.wrapper).html(data);
	$(exform_wrpr).css({display:'block'});
	$(exform_wrpr +' .mf_submit input[type=button]').remove();
	operations();
   }
   
   if($(exform_wrpr +'.finmsg p').length > 0) setTimeout(remove_form, 4000)
  }
  
  function operations(){ 
   if( $(exform_wrpr +' form[name="exform"]').length > 0){
    if($(exform_wrpr +' div').is('mf_captcha')) document.getElementById('mf_captcha_'+ options.theme).src = options.path +'captcha/securimage_show.php?'+ Math.random();
    disable_fields();
    $(exform_wrpr +' input, .exform_wrapper.'+ options.theme +' textarea').focus(active_field);
    $('.exform_bg, .exform_wrapper.'+ options.theme +' .mf_submit input[type="button"]').click(remove_form);
	$(exform_wrpr +' form[name="exform"]').submit(submit_form)
   }
  }
  
  function submit_form(){
   if($(exform_wrpr +' input[name="user_name"]').val().length == 0){
	$(exform_wrpr +' .mf_submit input').attr('disabled', 'disabled');
	
	$.post(options.path + 'exform.php', $(exform_wrpr +' form[name="exform"]').serialize(), function(data){
	 if(options.wrapper == 'body'){
	  $(exform_wrpr).remove();
	  show_form(data)
	 }
	 else{
	  $('.'+options.wrapper).html(data);
	  $(exform_wrpr).css({display:'block'});
	  $(exform_wrpr +' .mf_submit input[type="button"]').remove();
	  operations();
	  $(exform_wrpr +'.finmsg').fadeIn(500).delay(1000).fadeOut(1000, function(){ location.reload() });
	 }
	})
   } 
   else remove_form();
   return false
  }

  function active_field() {
   $(exform_wrpr +' .infocus').each(function(){ $(this).removeClass('infocus') });
   $(exform_wrpr +' table .' + $(this).attr('name')).addClass('infocus');
   if($(this).hasClass('mf_error')) $(this).removeClass('mf_error').attr('value', '');
  }

  function remove_form(){ 
   $('.exform_bg, .exform_wrapper.'+ options.theme).fadeOut(500, function(){ $(this).remove() }) 
  }

  function disable_fields() {
   if(!options.name) $(exform_wrpr +' .mf_name').remove();
   if(!options.phone) $(exform_wrpr +' .mf_phone').remove();
   if(!options.email) $(exform_wrpr +' .mf_email').remove();
   if(!options.message) $(exform_wrpr +' .mf_message').remove();
  }
 }
})(jQuery);
