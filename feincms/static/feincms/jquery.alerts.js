// jQuery Alert Dialogs Plugin
//
// Version 1.0
//
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
// 29 December 2008
//
// Visit http://abeautifulsite.net/notebook/87 for more information
//
// Usage:
//		jAlert( message, [title, callback] )
//		jConfirm( message, [title, callback] )
//		jPrompt( message, [value, title, callback] )
//
// History:
//
//		1.00 - Released (29 December 2008)
//
// License:
//
//		This plugin is licensed under the GNU General Public License: http://www.gnu.org/licenses/gpl.html
//
(function($) {

	$.alerts = {

		// These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time

		verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
		horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
		repositionOnResize: true,           // re-centers the dialog on window resize
		overlayOpacity: .01,                // transparency level of overlay
		overlayColor: '#FFF',               // base color of overlay
		draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
		okButton: '&nbsp;OK&nbsp;',         // text for the OK button
		cancelButton: '&nbsp;Cancel&nbsp;', // text for the Cancel button
		dialogClass: null,                  // if specified, this class will be applied to all dialogs

		// Public methods

		alert: function(message, title, callback) {
			if( title == null ) title = 'Alert';
			$.alerts._show(title, message, null, 'alert', function(result) {
				if( callback ) callback(result);
			});
		},

		confirm: function(message, title, callback) {
			if( title == null ) title = 'Confirm';
			$.alerts._show(title, message, null, 'confirm', function(result) {
				if( callback ) callback(result);
			});
		},

		prompt: function(message, value, title, callback) {
			if( title == null ) title = 'Prompt';
			$.alerts._show(title, message, value, 'prompt', function(result) {
				if( callback ) callback(result);
			});
		},

		// Private methods

		_show: function(title, msg, value, type, callback) {
			$.alerts._hide();

			$("BODY").append(
			  '<div class="modal" id="my-modal" tabindex="-1" role="dialog" aria-labelledby="my-modal-label" aria-hidden="true">' + 
        '  <div class="modal-header">' + 
        '    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' + 
        '    <h3 id="my-modal-label"></h3>' + 
        '  </div>' + 
        '  <div class="modal-body"><p></p></div>' + 
        '</div>');

			if( $.alerts.dialogClass ) $("#my-modal").addClass($.alerts.dialogClass);

			$("#my-modal-label").text(title);
			$("#my-modal .modal-body").addClass(type);
			var modalP = $("#my-modal .modal-body p")[0];
			var $modalP = $(modalP);
			$modalP.text(msg);
			$modalP.html( $modalP.text().replace(/\n/g, '<br />') );


			switch( type ) {
				case 'alert':
					$("#my-modal .modal-body").after('<div class="modal-footer">' + 
          '    <button class="btn btn-cancel" data-dismiss="modal" aria-hidden="true">Close</button>' + 
          '    <button class="btn btn-primary" data-dismiss="modal">' + $.alerts.okButton + '</button>' + 
          '  </div>');
          if (callback) {
            $("#my-modal .btn-primary").click(function() {
              var val = $("#popup_prompt").val();
              callback(true);
            });            
          }
				break;
				case 'confirm':
					$("#my-modal .modal-body").after('<div class="modal-footer">' + 
          '    <button class="btn btn-cancel" data-dismiss="modal" aria-hidden="true">' + $.alerts.cancelButton + '</button>' + 
          '    <button class="btn btn-primary" data-dismiss="modal">' + $.alerts.okButton + '</button>' + 
          '  </div>');
          if (callback) {
            $("#my-modal .btn-cancel").click(function() {
              callback(false);
            });
            $("#my-modal .btn-primary").click(function() {
              callback(true);
            });
          }
          $("#my-model .btn").keypress( function(e) {
           if( e.keyCode == 13 ) $("#my-modal .btn-primary").trigger('click');
           if( e.keyCode == 27 ) $("#my-modal .btn-cancel").trigger('click');
          });
				break;
				case 'prompt':
					$("#my-modal .modal-body").append('<br /><input type="text" size="30" id="popup_prompt" />').after('  <div class="modal-footer">' + 
          '    <button class="btn btn-cancel" data-dismiss="modal" aria-hidden="true">' + $.alerts.cancelButton + '</button>' + 
          '    <button class="btn btn-primary" data-dismiss="modal">' + $.alerts.okButton + '</button>' + 
          '  </div>');
          if (callback) {
            $("#my-modal .btn-cancel").click(function() {
              callback(null);
            });
            $("#my-modal .btn-primary").click(function() {
              var val = $("#popup_prompt").val();
              callback(val);
            });
          }
          $("#popup_prompt").width( $("#my-modal").width() );
          $("#popup_prompt, #my-model .btn").keypress( function(e) {
           if( e.keyCode == 13 ) $("#my-modal .btn-primary").trigger('click');
           if( e.keyCode == 27 ) $("#my-modal .btn-cancel").trigger('click');
          });
          if( value ) $("#popup_prompt").val(value);
          $("#popup_prompt").focus().select();
				break;
			}

			// Make draggable
      // if( $.alerts.draggable ) {
      //  try {
      //    $("#popup_container").draggable({ handle: $("#popup_title") });
      //    $("#popup_title").css({ cursor: 'move' });
      //  } catch(e) { /* requires jQuery UI draggables */ }
      // }
      $('#my-modal').modal();
		},

		_hide: function() {
			$("#my-modal").remove();
		}
	}

	// Shortuct functions
	jAlert = function(message, title, callback) {
		$.alerts.alert(message, title, callback);
	}

	jConfirm = function(message, title, callback) {
		$.alerts.confirm(message, title, callback);
	};

	jPrompt = function(message, value, title, callback) {
		$.alerts.prompt(message, value, title, callback);
	};

})(jQuery);