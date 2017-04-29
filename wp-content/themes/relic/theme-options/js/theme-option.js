jQuery(document).ready(function($) {
    $('.remove-image').click(function(e) {
        $('#logo').val('');
    });
    // Fade out the save message
    $('.fade').delay(1000).fadeOut(1000);
    // Switches option sections
    $('.group').hide();
    var active_tab = '';
    if (typeof (localStorage) != 'undefined') {
        active_tab = localStorage.getItem('"active_tab"');
    }
    if (active_tab != '' && $(active_tab).length) {
        $(active_tab).fadeIn();
    } else {
        $('.group:first').fadeIn();
    }
    $('.group .collapsed').each(function() {
        $(this).find('input:checked').parent().parent().parent().nextAll().each(
                function() {
                    if ($(this).hasClass('last')) {
                        $(this).removeClass('hidden');
                        return false;
                    }
                    $(this).filter('.hidden').removeClass('hidden');
                });
    });
    if (active_tab != '' && $(active_tab + '-tab').length) {
        $(active_tab + '-tab').addClass('nav-tab-active');
    }
    else {
        $('.nav-tab-wrapper a:first').addClass('nav-tab-active');
    }
    $('.nav-tab-wrapper a').click(function(evt) {
        $('.nav-tab-wrapper a').removeClass('nav-tab-active');
        $(this).addClass('nav-tab-active').blur();
        var clicked_group = $(this).attr('href');
        if (typeof (localStorage) != 'undefined') {
            localStorage.setItem("active_tab", $(this).attr('href'));
        }
        $('.group').hide();
        $(clicked_group).fadeIn();
        evt.preventDefault();
        // Editor Height (needs improvement)
        $('.wp-editor-wrap').each(function() {
            var editor_iframe = $(this).find('iframe');
            if (editor_iframe.height() < 30) {
                editor_iframe.css({'height': 'auto'});
            }
        });
    });
    (function($) {
        var allPanels = $('.theme-option-inner-tabs .theme-option-inner-tab-group').hide();
        $('.theme-option-inner-tabs .theme-option-inner-tab-group.active').show();
        var allPanelsThis = $('.theme-option-inner-tabs .theme-option-inner-tab');
        $('.theme-option-inner-tabs .theme-option-inner-tab').click(function() {
            $this = $(this);
            $targetThis = $this;
            $target = $this.next();
            if (!$target.hasClass('active')) {
                allPanels.removeClass('active').slideUp();
                allPanelsThis.removeClass('active');
                $target.addClass('active').slideDown();
                $targetThis.addClass('active');
            }
            return false;
        });
    })(jQuery);
    //callback handler for form submit
    jQuery("#form-option").submit(function(e)
    {
        var postData = jQuery(this).serializeArray();
        var formURL = jQuery(this).attr("action");
        jQuery.ajax(
                {
                    url: formURL,
                    type: "POST",
                    data: postData,
                    async: false,
                    success: function(data, textStatus, jqXHR)
                    {
                        //data: return data from server
                        jQuery(".relic-themes .btn-save input").addClass("save-details");
                        jQuery(".relic-themes .btn-save input").val('Options saved successfully');
                        setTimeout(function() {
                            jQuery(".relic-themes .btn-save input").removeClass("save-details");
                            jQuery(".relic-themes .btn-save input").val('Save options');
                        }, 5000);
                    },
                    error: function(jqXHR, textStatus, errorThrown)
                    {
                        //if fails
                    }
                });
        e.preventDefault(); //STOP default action
    });
});