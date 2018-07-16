﻿/// <reference path="my-toastr-tools.ts" />

module Ajax {
    export class Options {
        url: string;
        method: string;
        data: Object;
        constructor(url: string, method?: string, data?: Object) {
            this.url = url;
            this.method = method || "get";
            this.data = data || {};
        }
    }

    export class Service {
        public request = (options: Options, successCallback: Function, errorCallback?: Function): void => {
            var that = this;
            $.ajax({
                url: options.url,
                type: options.method,
                data: options.data,
                cache: false,
                success: function (d) {
                    successCallback(d);
                },
                error: function (d) {
                    if (errorCallback) {
                        errorCallback(d);
                        return;
                    }
                    var errorTitle = "Error in (" + options.url + ")";
                    var fullError = JSON.stringify(d);
                    console.log(errorTitle);
                    console.log(fullError);
                    Tools.Toastr.show(fullError, Tools.ToastrTypeEnum.Error, errorTitle, 500);
                    //that.showJqueryDialog(fullError, errorTitle);
                }
            });
        }
        public get = (url: string, successCallback: Function, errorCallback?: Function): void => {
            this.request(new Options(url), successCallback, errorCallback);
        }
        public getWithDataInput = (url: string, data: Object, successCallback: Function, errorCallback?: Function): void => {
            this.request(new Options(url, "get", data), successCallback, errorCallback);
        }
        public post = (url: string, successCallback: Function, errorCallback?: Function): void => {
            this.request(new Options(url, "post"), successCallback, errorCallback);
        }
        public postWithData = (url: string, data: Object, successCallback: Function, errorCallback?: Function): void => {
            this.request(new Options(url, "post", data), successCallback, errorCallback);
        }

        //public showJqueryDialog = (message: string, title?: string, height?: number): void => {
        //    alert(title + "\n" + message);
        //    title = title || "Info";
        //    height = height || 120;
        //    message = message.replace("\r", "").replace("\n", "<br/>");
        //    $("<div title='" + title + "'><p>" + message + "</p></div>").dialog({
        //        minHeight: height,
        //        minWidth: 400,
        //        maxHeight: 500,
        //        modal: true,
        //        buttons: {
        //            Ok: function () { $(this).dialog('close'); }
        //        }
        //    });
        //}
    }
}