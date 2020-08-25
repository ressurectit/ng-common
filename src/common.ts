import {HttpRequest} from '@angular/common/http';
import {AdditionalInfo} from './types/additionalInfo';

export {HmrData} from './decorators/hmrData.decorator';
export {HmrServiceData} from './decorators/hmrServiceData.decorator';
export {HmrServiceDataConstructor} from './decorators/hmrServiceDataConstructor.decorator';
export {GlobalizationService} from './services/globalization/globalization.service';
export {CommonModule} from './modules/common.module';
export {ProgressIndicatorOptions} from './modules/progressIndicator/services/progressIndicatorOptions';
export {ProgressIndicatorComponent} from './modules/progressIndicator/components/progressIndicator/progressIndicator.component';
export {ProgressIndicatorModule} from './modules/progressIndicator/modules/progressIndicator.module';
export {ProgressIndicatorService} from './modules/progressIndicator/services/progressIndicator.service';
export {LocalProgressIndicatorName} from './modules/progressIndicator/misc/types';
export {DebugDataModule} from './modules/debugData/modules/debugData.module';
export {DebugDataComponent} from './modules/debugData/components/debugData/debugData.component';
export {DebugDataEnabledService} from './modules/debugData/services/debugDataEnabled/debugDataEnabled.service';
export {ClickOutsideDirective} from './modules/clickOutside/directives/clickOutside/clickOutside.directive';
export {ClickOutsideModule} from './modules/clickOutside/modules/clickOutside.module';
export * from './types/tokens';
export * from './types/additionalInfo';
export * from './utils';
export {IsNaNPipe} from './pipes/isNaN/isNaN.pipe';
export {IsPresentPipe} from './pipes/isPresent/isPresent.pipe';
export {LocalizePipe} from './pipes/localize/localize.pipe';
export {UrlEncodePipe} from './pipes/urlEncode/urlEncode.pipe';
export {CookieService} from './services/cookies/cookies.service';
export {StatusCodeService} from './services/statusCode/statusCode.service';
export {CookiePermanentStorageService, PermanentStorage} from './services/permanentStorage';
export {MemoryTemporaryStorageService, TemporaryStorage} from './services/temporaryStorage';
export {NoStringLocalizationService, StringLocalization} from './services/stringLocalization';
export {Logger} from './services/logger';
export {IgnoredInterceptorsService, IgnoredInterceptorId} from './services/ignoredInterceptors/ignoredInterceptors.service';
export {NgComponentOutletEx} from "./directives/ngComponentOutletEx/ngComponentOutletEx.directive";
export {APP_STABLE, extractAppStableResolve} from "./utils";
export {PROGRESS_INTERCEPTOR_PROVIDER, ProgressInterceptor} from './modules/progressIndicator/interceptors/progressInterceptor';

//updates http request clone to correctly append also additional info to cloned request
const clone = HttpRequest.prototype.clone;

HttpRequest.prototype.clone = (function(this: AdditionalInfo)
{
    let request: AdditionalInfo = clone.apply(this, arguments);

    request.additionalInfo = this.additionalInfo;

    return request;
}) as any;