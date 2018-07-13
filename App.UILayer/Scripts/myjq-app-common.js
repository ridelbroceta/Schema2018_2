if (typeof jQuery === 'undefined') {
    throw new Error('JavaScript requiere jQuery');
}

(function ($) {
    'use strict';


    var myAppCommonMethodClass = function () {

        var self = this;
        this.urlGetAddress = '';
        this.urlOpenAttachment = '';
        this.urlPageDataParentMember = '';
        this.urlPageDataParentCamper = '';
        this.urlEditAgencyProfile = '';
        this.urlCreateSignaturePartial = '';
        this.SubmitSignatureMethod = undefined;
        this.CloseSignatureMethod = undefined;

        this.SubmitReturnModalMethod = undefined;
        this.CloseReturnModalBtnMethod = undefined;
        this.urlReturnPartial = '';
        
        this.fileStatusEnum =
             {
                 NotReviewed: '',
                 Valid: '',
                 NotValid: '',
             };


        this.attendanceRecordStateEnum =
        {
            None: -1,
            Vacation: -1,
            Sick: -1,
        };

        this.attendanceRecordStateLabelEnum =
        {
            None: '',
            Vacation: '',
            Sick: '',
        };

        this.setDivHeight = function (percentDouble) {
            var windowHeight = $(window).innerHeight() * percentDouble;
            $('.tab-pane').css('height', windowHeight);
        };


        this.MessageBoxOkGoPage = function (message, type,  url) {
       
         var dialog = new BootstrapDialog({
                title: "Alert",
                message: message,
                closable: false,
                type : type,
                buttons: [
                    {
                        id: 'btn-Ok',
                        icon: 'glyphicon glyphicon-ok-circle',
                        label: 'Ok',
                        cssClass: 'btn btn-primary',
                        autospin: false,
                        action: function(dialogRef) {

                            dialogRef.close();
                            window.location.href = url;

                        }
                    },
                ]
            });

            dialog.open();

        };

        this.MessageBoxOkReloadPage = function (message, type) {

            var dialog = new BootstrapDialog({
                title: "Alert",
                message: message,
                closable: false,
                type: type,
                buttons: [
                    {
                        id: 'btn-Ok',
                        icon: 'glyphicon glyphicon-ok-circle',
                        label: 'Ok',
                        cssClass: 'btn btn-primary',
                        autospin: false,
                        action: function (dialogRef) {

                            dialogRef.close();
                            location.reload();

                        }
                    },
                ]
            });

            dialog.open();

        };

        this.fileStatusColors = function($selectTag) {

            $selectTag.attr('style', 'color: ' + self.getColorByFileStatus($selectTag.val()));

        }; //fileStatusColors

        this.getColorByFileStatus = function (fileStatus) {

            
            if (fileStatus.toUpperCase() == self.fileStatusEnum.NotReviewed.toUpperCase()) {
                return '#337ab7';
            } else if (fileStatus.toUpperCase() == self.fileStatusEnum.Valid.toUpperCase()) {
                return '#3c763d';
            } else if (fileStatus.toUpperCase() == self.fileStatusEnum.NotValid.toUpperCase()) {
                return '#a94442';
            }
            return 'black';

        }; //getColorByFileStatus

        this.editAgencyProfile = function () {

            myApp.ShowModal("myGenModalContainer", "myModalAgencyProfile", self.urlEditAgencyProfile, "Edit Profile", "editProfileForm", "Save", "1100", "auto", true, true, 'fa fa-save', 'panel-body-background');

        };//

        /**
         * Next
         * @param {} $li 
         * @returns {} 
         */
        this.nextLiDisplayedForMyTab = function ($li) {

            var $next = $li.next('li');
            if ($next.hasClass('displayed')) {
                return $next.find('a');
            } else {
                return self.nextLiDisplayedForMyTab($next);
            }
        };
        //

        /**
         * Next
         * @param {} $li 
         * @returns {} 
         */
        this.prevLiDisplayedForMyTab = function ($li) {

            var $prev = $li.prev('li');
            if ($prev.hasClass('displayed')) {
                return $prev.find('a');
            } else {
                return self.prevLiDisplayedForMyTab($prev);
            }
        };
        //

        /**
         * getWeek
         * @param {} date 
         * @returns {} 
         */
        this.getWeek = function (date) {
            var startDate = moment(date).format("MM/DD");
            var endDate = moment(date).add(4, 'days').format("MM/DD");
            return startDate + " - " + endDate;
        } //getWeek


        this.myFilterFunction = function (tableName) {
            //debugger;
            // Declare variables 
            var td, i;
            var input = document.getElementById("txtFilter");
            var filter = input.value.toUpperCase();
            var table = document.getElementById(tableName);
            var tr = table.getElementsByClassName("my-principal-tr");

            // Loop through all table rows, and hide those who don't match the search query
            var index = -1;
            for (i = 0; i < tr.length; i++) {

                var tmpIndex = tr[i].dataset.index;

                if (index == tmpIndex) {
                    tr[i].style.display = "";
                    index = -1;

                } else {
                    td = tr[i].getElementsByTagName("td")[0];
                    if (td) {
                        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                            index = tr[i].dataset.index;
                            tr[i].style.display = "";
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                }
            }
        };/*myFilterFunction*/

    };//principal var myAppCommonMethodClass

    window.myAppCommonMethodClassInstance = new myAppCommonMethodClass();

}(jQuery));