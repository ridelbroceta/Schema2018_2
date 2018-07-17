/// <reference path="../typings/toastr/toastr.d.ts" />
namespace  Tools {

    export enum ToastrTypeEnum {
        Success,
        Info,
        Warning,
        Error,
    }

    export class Toastr {

        static show(message: string, type: ToastrTypeEnum, title: string, timeOut: number) : void {

            toastr.options.positionClass = "toast-bottom-right";
            toastr.options.preventDuplicates = true;
            toastr.options.newestOnTop = true;
            if (timeOut)
                toastr.options.timeOut = timeOut;

            switch (type) {
                case ToastrTypeEnum.Success:
                    toastr.success(message, title);
                    break;
                case ToastrTypeEnum.Info:
                    toastr.info(message, title);
                    break;
                case ToastrTypeEnum.Warning:
                    toastr.warning(message, title);
                    break;
                case ToastrTypeEnum.Error:
                    toastr.error(message, title);
                    break;
            }

        }

    }
}