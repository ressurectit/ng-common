import {HttpContextToken} from '@angular/common/http';

/**
 * Token used for passing progress indicator group name for local progress indicator
 */
export const PROGRESS_INDICATOR_GROUP_NAME: HttpContextToken<string> = new HttpContextToken<string>(() => null);
