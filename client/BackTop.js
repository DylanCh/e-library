'use strict';
jQuery(document).ready(()=>{
    jQuery.noConflict();
    let $= jQuery;
    $('#backTop').click(event=>{
        event.preventDefault();
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });

    // $('a.edit-btn').each(index=>{
    //     $(this).click(event=>{
    //         event.preventDefault();
    //         console.log('editing...',index);
    //     });
    // });
});