//#region src/ga4.d.ts
interface GaOptions {
  cookieUpdate?: boolean;
  cookieExpires?: number;
  cookieDomain?: string;
  cookieFlags?: string;
  userId?: string;
  clientId?: string;
  anonymizeIp?: boolean;
  contentGroup1?: string;
  contentGroup2?: string;
  contentGroup3?: string;
  contentGroup4?: string;
  contentGroup5?: string;
  allowAdFeatures?: boolean;
  allowAdPersonalizationSignals?: boolean;
  nonInteraction?: boolean;
  page?: string;
}
interface UaEventOptions {
  action: string;
  category: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  transport?: 'beacon' | 'xhr' | 'image';
}
interface InitOptions {
  trackingId: string;
  gaOptions?: GaOptions | any;
  gtagOptions?: any;
}
declare class GA4 {
  isInitialized: boolean;
  _testMode: boolean;
  _currentMeasurementId: string;
  _hasLoadedGA: boolean;
  _isQueuing: boolean;
  _queueGtag: any[];
  constructor();
  reset: () => void;
  _gtag: (...args: any[]) => void;
  gtag(...args: any[]): void;
  _loadGA: (GA_MEASUREMENT_ID: string, nonce?: string, gtagUrl?: string) => void;
  _toGtagOptions: (gaOptions?: GaOptions) => Record<string, any> | undefined;
  /**
   *
   * @param {InitOptions[]|string} GA_MEASUREMENT_ID
   * @param {Object} [options]
   * @param {string} [options.nonce]
   * @param {boolean} [options.testMode=false]
   * @param {string} [options.gtagUrl=https://www.googletagmanager.com/gtag/js]
   * @param {GaOptions|any} [options.gaOptions]
   * @param {Object} [options.gtagOptions] New parameter
   */
  initialize: (GA_MEASUREMENT_ID: InitOptions[] | string, options?: {
    nonce?: string;
    testMode?: boolean;
    gtagUrl?: string;
    gaOptions?: GaOptions | any;
    gtagOptions?: any;
  }) => void;
  set: (fieldsObject: any) => void;
  _gaCommandSendEvent: (eventCategory: string, eventAction: string, eventLabel?: string, eventValue?: number, fieldsObject?: any) => void;
  _gaCommandSendEventParameters: (...args: any[]) => void;
  _gaCommandSendTiming: (timingCategory: string, timingVar: string, timingValue: number, timingLabel?: string) => void;
  _gaCommandSendPageview: (page?: string, fieldsObject?: any) => void;
  _gaCommandSendPageviewParameters: (...args: any[]) => void;
  _gaCommandSend: (...args: any[]) => void;
  _gaCommandSet: (...args: any[]) => void;
  _gaCommand: (command: string, ...args: any[]) => void;
  ga: (...args: any[]) => any;
  /**
   * @param {UaEventOptions|string} optionsOrName
   * @param {Object} [params]
   */
  event: (optionsOrName: UaEventOptions | string, params?: any) => void;
  send: (fieldObject: any) => void;
}
declare const _default: GA4;
//#endregion
//#region src/index.d.ts
declare const ReactGAImplementation: typeof GA4;
//#endregion
export { ReactGAImplementation, _default as default };