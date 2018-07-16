if (typeof jQuery === 'undefined') {
    throw new Error('JavaScript requiere jQuery');
}


/*!
 * funciones
 * Copyright 2015-2016.
 */

(function ($) {
    'use strict';

    var dropDownList = function () {

        var self = this;
        this.clean = function(dropDownList, firstText, firstIndex) {
            dropDownList.empty();
            dropDownList.append
            (
                $('<option/>')
                    .attr('value', firstIndex)
                    .text(firstText)
            );

        };


        this.fill = function(dropDownList, list, firstText, firstIndex) {
            self.clean(dropDownList, firstText, firstIndex);
            $.each(list, function (index, item) {
                dropDownList.append(
                    $('<option/>')
                        .attr('value', item.value)
                        .text(item.text)
                );
            });

        };
    };

    var myGeneralMethod = function() {
        var self = this;


        this.AddErrorToLogUrl = '';
        this.ASCSConnectBaseUrl = '';
        this.ASCSAppCode = '';
        this.Role = '';
        this.AfterAssignRoleMethod = undefined;
        this.AfterDeleteRoleMethod = undefined;


        /* Internal Methods* /

         * @param {} userSeq 
         * @returns {} 
         */
        /**
         * 
         * @param {} userSeq 
         * @returns {} 
         */
        //asign roles to the newly added user
        function assignRolesToUsers(userSeq) {
            //debugger;
            var apiGetRolesUrl = self.ASCSConnectBaseUrl + 'api/Public/GetAllApplicationRoles?AppCode=' + self.ASCSAppCode;
            var apiAssignRoleUrl = self.ASCSConnectBaseUrl + 'api/Public/SaveUserRoles';

            $.ajax({
                type: 'Get',
                url: apiGetRolesUrl,
                cache: false,
                success: function (data) {
                    var formData = {
                        'selectedUserSeq': userSeq,
                        'selectedAppCode': self.ASCSAppCode,
                        'selectedRole': 0
                    };

                    $.each(data, function (i, obj) {
                        if (obj.Roles == self.Role) {
                            if ((formData.selectedRole == 0) && (obj.rolesseq > 0)) {
                                formData.selectedRole = obj.rolesseq;
                            }
                        }
                    });

                    $.ajax({
                        type: 'Post',
                        url: apiAssignRoleUrl,
                        data: formData,
                        cache: false,
                        success: function (data) {
                            if (data.ReturnCode > 0) {

                                if (self.AfterAssignRoleMethod != undefined) {

                                    self.AfterAssignRoleMethod(userSeq);
                                }
                            }
                            else {
                                myApp.Toast("There was an error adding user to application." + data.ReturnMessage, "error", null, 5000);
                            }
                        },
                    });

                },
            });

         
        }; /*assignRolesToUsers */

        /**
         * 
         * @param {} response 
         * @returns {} 
         */
        this.parseEnterpriseConnectResponse =  function (response) {
            var returns = { token: '', result: '', user: '' };
            // first version returned a string, which was the authorization token
            // second version returned the object as an object.  This was a problem for
            // IE9 browsers which didn't support objects in postMessage function.
            // third version added ability to serialize the object for IE9
            try {
                if (typeof response === 'string') {
                    returns.token = response;
                    returns.result = 'success';
                } else if (typeof response === 'object' && typeof response.data === 'string') {
                    returns = JSON.parse(response.data);
                } else {
                    returns = response.data;
                };
            } catch (er) {
                alert('Unable to parse authentication response.');
                returns = null;
            };
            return returns;
        };/*parseEnterpriseConnectResponse*/


       function removeEventHandlers(method) {
           if (window.addEventListener) {
               window.removeEventListener('message', method);
           } else if (window.attachEvent) {
               window.detachEvent('onmessage', method);
           } else {
               console.log('[Security Service] Unable to detach event listeners for register method.');
           }

       };

        /* /Internal Methods* /


        /*
         * 
         * @param {} name 
         * @param {} url 
         * @returns {} 
         */
        this.getParameterByName = function (name, url) {

            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));

        };
        /**/


        /**
         * 
         * @returns {} 
         */
        this.addAntiForgeryToken = function(data, $form) {
            data.__RequestVerificationToken = $form.find('input[name=__RequestVerificationToken]').val();
            return data;

        };

        /**/

        /**/
        this.addErrorToLog = function (jqXhr, textStatus, error) {

            if (self.AddErrorToLogUrl == '') return;

            var data = {
                Page: '',
                AjaxCallUrl: '',
                ErrorThrow: '',
                TextStatus: '',
                StatusCode: '',
                ResponseText: '',
            };


            try {

                data.ErrorThrow = error;
                data.TextStatus = textStatus;
                data.Page = /^(?:\w+\:\/\/)?([^\/]+)(.*)$/.exec(window.location.href);

                if (jqXhr != null) {

                    data.StatusCode = jqXhr.status;
                    data.ResponseText = jqXhr.responseText;
                    data.AjaxCallUrl = jqXhr.url;

                }
            }
            catch (err) {

                data.ResponseText = err;
            }

            $.ajax({
                url: self.AddErrorToLogUrl,
                type: "POST",
                data: data,
                datatype: "json",
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            });
        };
        /**/

        /**
         * 
         * @param {} milliseconds 
         * @returns {} 
         */
        this.sleep = function (milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds) {
                    break;
                }
            }
        };

        /**/


        /*clean string*/
        this.removeSpecialChars =  function removeSpecialChars(str) {
            return str.replace(/(?!\w|\s)./g, '')
              .replace(/\s+/g, ' ')
              .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2');
        }
        /*clean string*/


        this.daysBetween = function (date1, date2) {   //Get 1 day in milliseconds   
            var oneDay = 1000 * 60 * 60 * 24;    // Convert both dates to milliseconds
            var date1Ms = date1.getTime();
            var date2Ms = date2.getTime();    // Calculate the difference in milliseconds  
            var differenceMs = date2Ms - date1Ms;        // Convert back to days and return   
            return Math.round(differenceMs / oneDay);
        }

        /**
         * addDays
         * @param {} date 
         * @param {} days 
         * @returns {} 
         */
        this.addDays = function (date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }


        /*addDays*/

        /**
         * subtractDays
         * @param {} date 
         * @param {} days 
         * @returns {} 
         */
        this.subtractDays = function (date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() - days);
            return result;
        }

        /*subtractDays*/

        /**
         * 
         * @param {} response 
         * @returns {} 
         */
        this.handleExternalRegistration = function (response) {
            //debugger;
            var authToken = self.parseEnterpriseConnectResponse(response);
            if ((authToken.ReturnCode > 0) /*&& (authToken.ReturnMessage != "Duplicate Record Found! User already assigned to Application")*/) {

                var apiGetRoleUrl = self.ASCSConnectBaseUrl + 'api/Public/GetRolesString?UserSeq=' + authToken.ReturnCode + '&AppCode=' + self.ASCSAppCode;
                $.ajax({
                    type: 'Get',
                    url: apiGetRoleUrl,
                    cache: false,
                    success: function(data){
                        if (data === 'No Roles Assigned') {
                            assignRolesToUsers(authToken.ReturnCode);
                        } else {
                            myApp.Toast("this user have a previous role in this application.", "error", null, 5000);
                        }
                    },
                });
            }
            switch (authToken.result) {
                case 'success':
                    // result.token now stores the encrypted user information returned by enterise connect.
                    // we need to decrypt that and then finalize the login process
                    //$('#authenticationToken').val(authToken.token);
                    //$('#userId').val(authToken.user);
                    //$('#login').submit();

                    break;
                case 'failure':
                    // unable to authenticate

                    break;
                case 'canceled':
                    // user cancelled out of dialog
                    alert('user cancelled login');
            }
        }; /*handleExternalRegistration*/

        /**
         * /
         * @returns {} 
         */
        this.deleteUserRole = function(userSeq) {
            
            var apiGetRolesUrl = self.ASCSConnectBaseUrl + 'api/Public/GetAllApplicationRoles?AppCode=' + self.ASCSAppCode;
            var apiDeleteRoleUrl = self.ASCSConnectBaseUrl + 'api/Public/DeleteUserRoles';

            $.ajax({
                type: 'Get',
                url: apiGetRolesUrl,
                cache: false,
                success: function (data) {
                    var formData = {
                        'selectedUserSeq': userSeq,
                        'SecurityGroupSeq': 0
                    };

                    $.each(data, function (i, obj) {
                        if (obj.Roles == self.Role) {
                            if ((formData.SecurityGroupSeq == 0) && (obj.rolesseq > 0)) {
                                formData.SecurityGroupSeq = obj.rolesseq;
                            }
                        }
                    });

                    $.ajax({
                        type: 'Post',
                        url: apiDeleteRoleUrl,
                        data: formData,
                        cache: false,
                        success: function (data) {
                            if (data.ReturnCode > 0) {

                                if (self.AfterDeleteRoleMethod != undefined) {

                                    self.AfterDeleteRoleMethod(userSeq);
                                }
                            }
                            else {
                                myApp.Toast("There was an error deleting role from the user." + data.ReturnMessage, "error", null, 5000);
                            }
                        },
                    });

                },
            });

        }; /*deleteUserRole*/

        /**
         * /
         * @param {} hiddenId 
         * @param {} valueId 
         * @param {} ph 
         * @param {} listAction 
         * @param {} getAction 
         * @param {} isMultiple 
         * @returns {} 
         */
        this.select2Dropdown = function(hiddenId, valueId, ph, listAction, getAction, isMultiple) {
            var sid = '#' + hiddenId;
            $(sid).select2({
                placeholder: ph,
                minimumInputLength: 2,
                allowClear: true,
                multiple: isMultiple,
                ajax: {
                    url: listAction,
                    dataType: 'json',
                    data: function(term, page) {
                        return {
                            id: term // search term
                        };
                    },
                    results: function(data) {
                        return { results: data };
                    }
                },
                initSelection: function(element, callback) {
                    // the input tag has a value attribute preloaded that points to a preselected make's id
                    // this function resolves that id attribute to an object that select2 can render
                    // using its formatResult renderer - that way the make text is shown preselected
                    var id = $('#' + valueId).val();
                    if (id !== null && id.length > 0) {
                        $.ajax(getAction + "/" + id, {
                            dataType: "json"
                        }).done(function(data) { callback(data); });
                    }
                },
                formatResult: s2FormatResult,
                formatSelection: s2FormatSelection
            });

            $(document.body).on("change", sid, function (ev) {
                var choice;
                var values = ev.val;
                // This is assuming the value will be an array of strings.
                // Convert to a comma-delimited string to set the value.
                if (values !== null && values.length > 0) {
                    for (var i = 0; i < values.length; i++) {
                        if (typeof choice !== 'undefined') {
                            choice += ",";
                            choice += values[i];
                        }
                        else {
                            choice = values[i];
                        }
                    }
                }

                // Set the value so that MVC will load the form values in the postback.
                $('#' + valueId).val(choice);
            });

        };

        function s2FormatResult(item) {
                return item.text;
            };
 
            function s2FormatSelection(item) {
                return item.text;
            };

            /*select2Dropdown*/
        };

    window.MyJqGeneral = {
        dropDownListInstance: new dropDownList(),
        methodsInstance: new myGeneralMethod()
};

}(window.jQuery));
