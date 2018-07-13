var GlobalEnums = {};

GlobalEnums.StatusType = {};
GlobalEnums.StatusType.Draft = 1;
GlobalEnums.StatusType.Initiated = 2;
GlobalEnums.StatusType.Approved = 3;
GlobalEnums.StatusType.InProgress = 4;
GlobalEnums.StatusType.WaitingMaterialsOrServices = 5;
GlobalEnums.StatusType.OutForService = 6;
GlobalEnums.StatusType.OutForServiceLoaner = 7;
GlobalEnums.StatusType.ServiceComplete = 8;
GlobalEnums.StatusType.AdminReview = 9;
GlobalEnums.StatusType.WaitingToBeScheduled = 10;
GlobalEnums.StatusType.EditWhileInHistory = 11;
GlobalEnums.StatusType.Complete = 12;
GlobalEnums.StatusType.WaitingPlantConditions = 13;
GlobalEnums.StatusType.WaitingAppoval = 14;
GlobalEnums.StatusType.Close = 15;
GlobalEnums.StatusType.Cancel = 16;
GlobalEnums.StatusType.Reopen = 17;

GlobalEnums.ToastPosition = {};
GlobalEnums.ToastPosition.MiddleScreen = { id: 0, position: 'toast-top-center' };
GlobalEnums.ToastPosition.Center = { id: 1, position: 'toast-top-center' };
GlobalEnums.ToastPosition.TopRight = { id: 2, position: 'toast-top-right' };
GlobalEnums.ToastPosition.BottomRight = { id: 3, position: 'toast-bottom-right' };
GlobalEnums.ToastPosition.BottomLeft = { id: 4, position: 'toast-bottom-left' };
GlobalEnums.ToastPosition.TopLeft = { id: 5, position: 'toast-top-left' };
GlobalEnums.ToastPosition.TopFullWidth = { id: 6, position: 'toast-top-full-width' };
GlobalEnums.ToastPosition.BottomFullWidth = { id: 7, position: 'toast-bottom-full-width' };
GlobalEnums.ToastPosition.TopCenter = { id: 8, position: 'toast-top-center' };
GlobalEnums.ToastPosition.BottomCenter = { id: 9, position: 'toast-bottom-center' };

GlobalEnums.ToastType = {};
GlobalEnums.ToastType.Success = 0;
GlobalEnums.ToastType.Info = 1;
GlobalEnums.ToastType.Warning = 2;
GlobalEnums.ToastType.Error = 3;

window.myApp = (function () {
    var app = {
        Toast: function (message, type, title, timeOut) {
            toastr.options.positionClass = "toast-bottom-right";
            toastr.options.preventDuplicates = true;
            var types = { success: 0, info: 1, warning: 2, error: 3 }
            var selection = types[type];
            toastr.options.newestOnTop = true;
            if (timeOut)
                toastr.options.timeOut = timeOut;

            switch (selection) {
            case 0:
                toastr.success(message, title);
                break;
            case 1:
                toastr.info(message, title);
                break;
            case 2:
                toastr.warning(message, title);
                break;
            case 3:
                toastr.error(message, title);
                break;
            default:
                toastr.success(message, title);
                break;

            }
            return toastr;
            //if (position == GlobalEnums.ToastPosition.MiddleScreen) {
            //    var $notifyContainer = $('#toast-container').closest('.toast-top-center');
            //    if ($notifyContainer) {
            //        // align center
            //        var windowHeight = $(window).height() - 90;
            //        $notifyContainer.css("margin-top", windowHeight / 2);
            //    }
            //}
        },
        DisableButton: function (obj) {
            if (typeof obj === 'string') {
                obj = $(obj);
            }
            $(obj).prop('disabled', true);
        },
        EnableButton: function (obj) {
            if (typeof obj === 'string') {
                obj = $(obj);
            }
            $(obj).prop('disabled', false);
        },
        GetQueryStringByName: function (name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },
        ExistQueryString: function (name, url) {
            if (!url) url = window.location.href;
            if (url.indexOf('?' + name + '=') != -1)
                return true;
            else if (url.indexOf('&' + name + '=') != -1)
                return true;
            return false
        },
        ShowModal: function (placementId, id, dataUrl, heading, strSubmitForm, btnSubmitText, width, height, preventDefault, stopPropagation, btnSubmitClass, modalContentClass) {
            html = '<div id="' + id + '" class="modal fade" tabindex="-1" role="dialog" data-url="' + dataUrl + '">';
            html += '   <div class="modal-dialog">';
            html += '      <div class="modal-content">';
            html += '          <div class="modal-header modal-style-header">';
            html += '              <button id="modal_btnDismissId" type="button" class="btn btn-danger btn-xs pull-right modal-close-btn" data-dismiss="modal"><i class="fa fa-times"></i></button>';
            html += '              <h4 id="modal_headerId" class="modal-title">' + heading + '</h4>';
            html += '          </div>';
            html += '          <div id="modalContent" class="modal-body '+ modalContentClass +'">';
            html += '          </div>';
            html += '          <div class="modal-footer">';
            if (strSubmitForm == null && btnSubmitText != null) {
                html += '              <button type="button" class="btn btn-primary my-btn-action" data-dismiss="modal" onclick="javascript:OkClicked();">';
                html += '                  <span class="' + btnSubmitClass + '"></span>';
                html += '                  <i class="icon-user icon-white"></i> ' + btnSubmitText;
                html += '              </button>';
            };
            if (strSubmitForm != null && btnSubmitText != null) {
                html += '              <button id="modal_btnSubmitId" type="button" class="btn btn-primary my-btn-action" onclick="javascript:$(\&quot;#' + strSubmitForm + '\&quot;).submit();">';
                html += '                  <span id="modal_btnSubmitIconId" class="' + btnSubmitClass + '"></span>';
                html += '                  <i class="icon-user icon-white"></i><span id ="modal_btnSubmitTextId">' + btnSubmitText + '</span>';
                html += '              </button>';
            };
            html += '              <button id="modal_btnCloseId" type="button" class="btn btn-danger footer-cancel-button modal-close-btn" data-dismiss="modal"><i class="fa fa-times"></i><span id="modal_btnCloseTextId"> Close</span></button>';
            html += '          </div>';
            html += '      </div><!-- /.modal-content -->';
            html += '   </div><!-- /.modal-dialog -->';
            html += '</div><!-- /.modal -->';

            $("#" + placementId).html(html);

            //$('#' + placementId + '').on('shown.bs.modal', function () {
            $('#' + placementId + '').find('.modal-dialog').css({
                width: (width == null || $(window).width() <= width) ? "auto" : width,
                height: (height == null || $(window).height() <= height) ? "auto" : height,
                'max-height': '100%'
            });
            //});

           
            if (dataUrl != '') {
                $.get(dataUrl, function (data) {
                    $('#' + placementId + '').find("#modalContent").html(data);
                }).success(function () {
                    $('#' + placementId + '').find("#" + id).modal(
                        {
                            backdrop: 'static',
                            keyboard: false,
                            show: true
                        }
                    );
                });
            } else {
                $('#' + placementId + '').find("#" + id).modal(
                    {
                        backdrop: 'static',
                        keyboard: false,
                        show: true
                    }
                );
            }

            //$('#' + placementId + '').find('.modal-dialog').draggable({
            //    handle: ".modal-header"
            //});

            $("#" + id).on('shown.bs.modal', function () {
                $(this).find("[autofocus]:first").focus();
            });

            //$(window).on('show', function () {
            //    $('focus').focus();
            //});

            //// Reposition when a modal is shown
            //$('.modal').on('show.bs.modal', reposition);
            //// Reposition when the window is resized
            //$(window).on('resize', function () {
            //    //$('.modal:visible').each(reposition);
            //    if ($(window).width() <= parseInt(width, 10)) {
            //        $('#' + placementId + '').find('.modal-dialog').css({ width: "auto" });
            //    } else {
            //        $('#' + placementId + '').find('.modal-dialog').css({ width: width });
            //    }
            //});

            if (preventDefault != null && preventDefault) event.preventDefault();
            if (stopPropagation != null && stopPropagation) event.stopPropagation();
        },
        checkTimeout: function (data) {
            var thereIsStillTime = true;

            if (data) {
                if (data.responseText) {
                    if ((data.responseText.indexOf("<title>Log On</title>") > -1) || (data.responseText.indexOf("<title>Object moved</title>") > -1) || (data.responseText === '"_Logon_"')) thereIsStillTime = false;
                } else {
                    if (data == "_Logon_") thereIsStillTime = false;
                }

                //if (!thereIsStillTime) {
                //    var msg = '@Symmetric.Encrypt("Sorry, but your session has timed out.")';
                //    window.location.href = webRoot + "/Home/Login?msg=" + msg;
                //}
            }
            else {
                $.ajax({
                    url: webRoot + "/Home/CheckTimeout/",
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    async: false,
                    complete: function (result) {
                        thereIsStillTime = window.prr.checkTimeout(result);
                    }
                });
            }

            return thereIsStillTime;
        },
        blockUI: function() {
            var msg = '<h4><i class="fa fa-refresh fa-spin"></i> &nbsp;Loading...</h4>'
            var message_width = "200";
            var message_height = "70";

            $.blockUI({
                // message displayed when blocking (use null for no message) 
                message: msg,
                // styles for the message when blocking; if you wish to disable 
                // these and use an external stylesheet then do this in your code: 
                // $.blockUI.defaults.css = {}; 
                css: {
                    width: message_width + "px",
                    height: message_height + "px",
                    top: '50%',
                    left: '50%',
                    margin: (-message_height / 2) + 'px 0 0 '+ (-message_width/2) + 'px',
                    border: 'none',
                    padding: '15px',
                   
                    backgroundColor: '#000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .8,
                    color: '#fff',
                },
                // set these to true to have the message automatically centered 
                centerX: false,
                centerY: false,
                // style to replace wait cursor before unblocking to correct issue 
                // of lingering wait cursor 
                cursorReset: 'default',
                // z-index for the blocking overlay 
                baseZ: 2000,
                // if it is already blocked, then ignore it (don't unblock and reblock) 
                ignoreIfBlocked: false
            });
        },

    };
    return app;
}());

$(document).on('shown.bs.modal', '.modal', function () {
    $(this).find('.modal-dialog').css("left", 0);
    $(this).find('.modal-dialog').css("top", 0);
});


$(document).on('mouseleave', '.modal-content', function () {
    if ($(window).width() / 4 - Math.abs(parseInt($(this).closest('.modal-dialog').css("left"))) < 0 || $(window).height() / 3 - Math.abs(parseInt($(this).closest('.modal-dialog').css("top"))) < 0) {
        $(this).closest('.modal-dialog').css("left", 0);
        $(this).closest('.modal-dialog').css("top", 0);
    }

});




