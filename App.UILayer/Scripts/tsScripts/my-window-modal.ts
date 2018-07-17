/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/bootstrap/index.d.ts" />
/// <reference path="ajax-service.ts" />

namespace Tools{

    export interface IModalButton {
        id: string;
        classes: string;
        text: string;

    }

    export class WindowModal {

        static show(placementId: string, id: string, dataUrl: string, heading: string,
            width: number, height: number, modalContentClass: string, buttonsDefs: IModalButton[], allowToClose: boolean ): void {

            let html: string = '';
            html = '<div id="' + id + '" class="modal fade" tabindex="-1" role="dialog" data-url="' + dataUrl + '">';
            html += ' <div class="vertical-alignment-helper">';
            html += '   <div class="modal-dialog vertical-align-center">';
            html += '      <div class="modal-content">';
            html += '          <div class="modal-header modal-style-header">';
            if (allowToClose) {
                html += '              <button id="modal_btnDismissId" type="button" class="btn btn-danger btn-xs pull-right modal-close-btn" data-dismiss="modal"><i class="fa fa-times"></i></button>';
            }
            html += '              <h4 id="modal_headerId" class="modal-title">' + heading + '</h4>';
            html += '          </div>';
            html += '          <div id="modalContent" class="modal-body ' + modalContentClass + '">';
            html += '          </div>';
            html += '          <div class="modal-footer">';
            if (buttonsDefs != null) {
                for (let item of buttonsDefs) {
                    html += '              <button id="' + item.id + '" type="button" class="' + item.classes + '">';
                    html += '                  <span class="' + '' + '"></span>';
                    html += '                  <i class="icon-user icon-white"></i> ' + item.text;
                    html += '              </button>';
                }
            }
            if (allowToClose) {
                html += '              <button id="modal_btnCloseId" type="button" class="btn btn-danger footer-cancel-button modal-close-btn" data-dismiss="modal"><i class="fa fa-times"></i><span id="modal_btnCloseTextId"> Close</span></button>';
            }
            html += '          </div>';
            html += '      </div><!-- /.modal-content -->';
            html += '   </div><!-- /.modal-dialog -->';
            html += ' </div><!-- /.vertical-alignment-helper -->';
            html += '</div><!-- /.modal -->';

            $("#" + placementId).html(html);

            ////$('#' + placementId + '').on('shown.bs.modal', function () {
            $('#' + placementId + '').find('.modal-dialog').css({
                width: (width == null || $(window).width() <= width) ? "auto" : width,
                height: (height == null || $(window).height() <= height) ? "auto" : height,
                'max-height': '100%'
            });
            ////});


            if (dataUrl !== '') {
                let service = new Ajax.Service();

                service.get(dataUrl, function (data) {
                    $('#' + placementId + '').find("#modalContent").html(data);
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

         
        }

    }
}