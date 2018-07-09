

var cleanIG = {

  init: function(){
      var da = this;

      var vIcon        = da.action.attribute01;
      var vHot         = da.action.attribute02 == 'Y' ? true : false;
      var vHideOnStart = da.action.attribute03 == 'Y' ? true : false;
      var vRegionID    = da.affectedElements[0].id;
      var vRegionIG    = $('#'+vRegionID);
      var vTitleRegion = $('#'+vRegionID+'_heading');
      var vTitleText   = vTitleRegion.text();
      var vToolbarBdy  = $x(vRegionID+'_ig_toolbar');

      vRegionIG.attr('title', vTitleText);
      vRegionIG.tooltipster({theme: 'tooltipster-light'});
      vRegionIG.tooltipster('disable');
      
      if (vHideOnStart){
          vRegionIG.closest('div').find('.a-Toolbar-groupContainer--start').hide();
          vRegionIG.closest('div').find('.a-IG-header').css("backgroundColor","#f1f1f2");
      }

      var vWidget$ = apex.region(vRegionID).widget();
      var toolbar = vWidget$.interactiveGrid("getToolbar");
      // create buttom
          var vButton =  {
              id: 'Clean-BT-'+vRegionID,
              title: 'Show/Hide Tools',
              type: 'BUTTON',
              action: 'show-hide',
              icon: 'fa ' + vIcon,
              hot: vHot,
              iconOnly: 'Y'
              
            };

         let config = $.extend(true, {}, toolbar.toolbar('option'))    
          var toolbarData = toolbarData = config.data;
          var toolbarGroup =  toolbarData.filter(function (group) { return group.id === 'actions4' })[0]  

              toolbarGroup.controls.push(vButton);

              toolbar.toolbar('option', 'data', config.data);  
          var vActions = vWidget$.interactiveGrid('getActions');
          
        // create title action
                vActions.add(
                  {
                    name   : 'show-hide'
                  , action : function(event, focusElement) {
                        if (vRegionIG.closest('div').find('.a-Toolbar-groupContainer--start').is(':visible')){
                            
                         vRegionIG.children().each(function () {                      
                          $(this).find('.a-Toolbar-groupContainer--start').fadeOut('slow');
                          $(this).find("[data-action='reset-report']").fadeOut('slow');
                          vTitleRegion.fadeIn('slow')
                          $(this).find('.a-IG-header').animate({backgroundColor:'#f1f1f2'}, 300);
                          vRegionIG.tooltipster('disable');
                          })                           
                          
                      }else{
                           vRegionIG.children().each(function () {
                                vTitleRegion.fadeOut('slow');
                              
                           vRegionIG.tooltipster('enable');
                           $(this).find(".a-Toolbar-groupContainer--start").fadeIn('slow');  
                           $(this).find("[data-action='reset-report']").fadeIn('slow');
                           $(this).find('.a-IG-header').animate({backgroundColor:'#ffffff'}, 300);
                           })      
                      }
                  }
                 });

        // refresh Interactive Grid
        toolbar.toolbar('refresh');


        vTitleRegion.each(function () { 
          // $(this).switchClass( "u-VisuallyHidden", "clean-IG");
           $(this).addClass("clean-IG").removeClass("u-VisuallyHidden");
           $(this).insertBefore('#'+vRegionID+'_ig_toolbar');
          })

        if (vHideOnStart){
        vRegionIG.closest('div').find('.a-Toolbar-groupContainer--start').hide();
        vRegionIG.closest('div').find("[data-action='reset-report']").hide();
       }else{
        vTitleRegion.hide();
       } 
        // to work with region selector
        $('.apex-rds').data('onRegionChange', function(mode, activeTab) {
          var vRegionID;
          var vIgID;
          var vTitle;
          var vToolbarBdy;
          var vBtExist;
            vRegionID     = $(activeTab.href);
            vIgID         = $(activeTab.href).attr('id');
            vTitle        = $('#'+vIgID+'_heading').text();
            vToolbarBdy   = $x(vIgID+'_ig_toolbar');
            vBtExist      = $('#'+vIgID+'_ig_toolbar_Clean-BT-'+vIgID).length;
          if (vToolbarBdy) {
            if (vBtExist!=0){
            vRegionID.closest('div').find('.a-Toolbar-groupContainer--start').hide();
            vRegionID.closest('div').find("[data-action='reset-report']").hide();
            vTitleRegion.fadeIn('slow')
            }
          }else{
            $('div').find('.t-IRR-region').each(function () {  
              var vRegionID;
              var vIgID;
              var vTitle;
              var vToolbarBdy;
              var vBtExist;
               vRegionID     = $(this);
               vIgID         = $(this).attr('id');
               vTitle        = $('#'+vIgID+'_heading').text();
               vToolbarBdy   = $x(vIgID+'_ig_toolbar'); 
               vBtExist = $('#'+vIgID+'_ig_toolbar_Clean-BT-'+vIgID).length;
                if (vBtExist!=0){
                vRegionID.closest('div').find('.a-Toolbar-groupContainer--start').hide();
                vRegionID.closest('div').find("[data-action='reset-report']").hide();
                }
              
            });
          }
        
         });

  }
};

