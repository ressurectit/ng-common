# Changelog

## Version 20.0.0 (2024-05-30)

### Bug Fixes

- *subpackage* `@anglr/common/forms`
   - fixed `RequiredClassDirective` directive, now it can not be created on elemen which does not have form control or form control name
   - fixed `HasErrorDirective` directive, now it can not be created on elemen which does not have form control or form control name or ngmodel

### Features

- updated `PositionResult` interface generic parameter now defaults to `Element`
- updated `PositionOptions` interface has now new generic parameter
- updated `PositionOptions` interface has now new generic parameter
- updated `Position` interface, now has also generic parameter for specifying result type
- *subpackage* `@anglr/common/forms`
   - updated `RequiredClassDirective` directive
      - is now `standalone`
      - all `private`s are now `protected`
      - new **inputs** 
         - `requiredClass` name of required css class that should be applied
   - updated `HasErrorDirective` directive
      - is now `standalone`
      - all `private`s are now `protected`
      - all *underscore* prefixed properties and methods are now without *underscore*
   - updated `GroupHasErrorDirective` directive
      - is now `standalone`
   - updated `ValidationErrorsContainerDirective` directive
      - is now `standalone`
   - updated `GroupHasErrorContainerDirective` directive
      - is now `standalone`
   - updated `DefaultValidationErrorsComponent` component
      - is now `standalone`
   - updated `DefaultValidationErrorsContainerComponent` component
      - is now `standalone`
   - updated `ReservedSpaceValidationErrorsContainerComponent` component
      - is now `standalone`
- *subpackage* `@anglr/common/floating-ui`
   - now using new generic types of `Position`

### BREAKING CHANGES

- minimal supported version of `@angular` is `18`
- minimal supported version of `@jscrpt/common` is `6.1.0`
- minimal supported version of `@floating-ui/dom` is `1.6.5`
- moved `NumeralSAPipe` pipe into `@anglr/common`
- renamed `NumeralSAPipe` pipe to `NumeralPipe` pipe
- renamed `DisplayPropertiesSAPipe` pipe to `DisplayPropertiesPipe` pipe
- renamed `IsNaNSAPipe` pipe to `IsNaNPipe` pipe
- renamed `IsPresentSAPipe` pipe to `IsPresentPipe` pipe
- renamed `KeysSAPipe` pipe to `KeysPipe` pipe
- renamed `UrlEncodeSAPipe` pipe to `UrlEncodePipe` pipe
- renamed `CollapsibleIconSAComponent` component to `CollapsibleIconComponent` component
- renamed `CollapsibleTitleSAComponent` component to `CollapsibleTitleComponent` component
- renamed `BodyRenderSADirective` directive to `BodyRenderDirective` directive
- renamed `EllipsisTooltipSADirective` directive to `EllipsisTooltipDirective` directive
- renamed `GoBackSADirective` directive to `GoBackDirective` directive
- removed *subpackage* `@anglr/common/numeral`
- removed dependency on `numeral.js`
- updated `PositionElements` interface generic parameter, now refers to *virtual element type*
- updated `PositionArguments` interface generic parameter, now refers to *virtual element type*
- updated default `TooltipOptions` for `TooltipDirective`
   - property `stopPropagation` is now `true` as default
- *subpackage* `@anglr/common/forms`
   - removed `RequiredClassModule` module, use directly `RequiredClassDirective`
   - updated `HasErrorDirective` directive, removed first parameter of constructor
- *subpackage* `@anglr/common/hotkeys`
   - renamed `HotkeysCheatsheetSAComponent` component to `HotkeysCheatsheetComponent` component

## Version 19.1.0 (2024-05-13)

### Bug Fixes

- fixed `DebugDataComponent` now color styles can be imported
- fixed `TooltipDirective` dual tooltip when nested elements are marked with tooltip
- fixed `TooltipDirective` overflowing 'MouseEnter' tooltip on right side of screen
- fixed `TooltipDirective` rendering tooltip only for non empty content
- *subpackage* `@anglr/common/material`
   - fixed `ConfirmationDialogDirective`, now correctly takes global options

### Feature

- new `AsSignal` property decorator, that creates backing field for this property as WritableSignal, reads and write to it
- new `TrimTextPipe` pipe, that trims long text and adds 'suffix' indication of longer text
- new `EllipsisTooltipSADirective` directive, that is used for displaying text from attached element in tooltip
   - **implements**
      - `OnChanges`
      - `OnDestroy`
   - **inputs**
      - `tooltipPrefix` tooltip prefix text to be prepended to tooltip read from content
      - `tooltipSuffix` tooltip suffix text to be appended to tooltip read from content
      - `ellipsisClass` css class appliet to element
      - `allowHtml` indication whether are html tags allowed in tooltip text
      - `ellipsisTooltip` gets or sets HTML element from which is text taken for tooltip
- new `getHostElement` function, that gets host html element for component
- updated `TooltipDirective` directive
   - is now `standalone`
- updated `DebugDataComponent` component
   - is now `standalone`
- **styles**
   - new `buildThemeColorsDebugData` mixin, that builds theme colors for debug data component
   - new `buildThemeDebugData` mixin, that builds theme for debug data component
- *subpackage* `@anglr/common/material`
   - new `provideConfirmationDialogOptions` function, that provides global options for confirmation dialog
   - updated `CONFIRMATION_DIALOG_OPTIONS` injection token
      - now provides `RecursivePartial` type as it should
   - updated `ConfirmationDialogDirective` directive
      - is now `standalone`
   - updated `DebugDataCopyClickDirective` directive
      - is now `standalone`

## Version 19.0.0 (2023-11-09)

### Feature

- updated `MergeCssClassesSAPipe` pipe
   - now supports also `undefined` and `null` values as it should

### BREAKING CHANGES

- minimal supported version of `node.js` is `18`
- minimal supported version of `@angular` is `17.0.1`
- minimal supported version of `@angular` material is `17.0.0`
- minimal supported version of `@jscrpt/common` is `5.0.0`
- minimal supported version of `angular2-hotkeys` is `16.0.1`
- minimal supported version of `@floating-ui/dom` is `1.5.3`
- minimal supported version of `tslib` is `2.6.2`
- tooltip themes changed, previous *dark* is not *light* and vice versa, dark background should be identified as light theme since it is normally used within light app theme

## Version 18.2.1 (2023-11-20)

### Bug Fixes

- fixed `ProgressIndicatorService` isBrowser indicator initialization

## Version 18.2.0 (2023-11-09)

### Features

- new `CollapsibleIconSAComponent` component, that is used for displaying collapsible icon
   - **inputs**
      - `visible` initial value, if visible set to true minus is displayed, otherwise plus is displayed
      - `titleText` text of title
      - `cssClass` css class applied to button
   - **outputs**
      - `visibleChange` occurs when visible change
- new `CollapsibleTitleSAComponent` component, that is used for displaying title with collapsible icon
   - projects content into view
   - **inputs**
      - `visible` initial value, if visible set to true minus is displayed, otherwise plus is displayed
      - `cssClass` css class applied to button
   - **outputs**
      - `visibleChange` occurs when visible change

## Version 18.1.0 (2023-10-11)

### Bug Fixes

- fixed `RestSink`, now correctly sends log level as uppercase as was before
- fixed `LocalizeSAPipe`, now correctly handles empty strings as key value
- fixed `NgComponentOutletEx`, now has correct null safe types

### Features

- new `HotkeysCheatsheetSAComponent` component, that is component used for displaying current active hotkeys as cheat cheet
   - **implements**
      - `OnInit`
      - `OnDestroy`
   - **inputs**
      - `title` title displayed in header of cheat sheet
   - **method**
      - `toggleCheatSheet` toggles cheatsheet visibility
- updated `NgComponentOutletEx` directive
   - is now standalone

## Version 18.0.0 (2023-08-23)

### Features

- new `SinkType` decorator, that marks type as Logger sink type
- new `isLoggerSinkType` function, that tests whether is type marked as logger sink
- new `LoggerConfiguration` interface, that represents logger configuration instance, it is used for configuring logger sinks, enrichers, filters and everything
   - **methods**
      - `minimumLevel` configure minimum log level for all logger sinks
      - `messageTemplate` sets message template for logs
      - `messageLengthLimit` sets message length limit
      - `enrichWith` registers enricher to be used for logger
      - `filter` registers filter that is used for filtering out message logs
      - `writeTo` registers logger sink into which will be logs written to, or creates sublogger with custom config
- new `LoggerEnricher` interface, that represents logger enricher definition which allows enriching properties that can be used in log message template
   - **methods**
      - `enrich` logger enricher definition which allows enriching properties that can be used in log message template
- new `LoggerEnricherType` interface, type that represents logger enricher
- new `LoggerFilter` interface, that is definition of filter that is applied to logs coming into sinks
- new `LoggerSink` interface, that is definition of sink, which is used to writing logs into different places
- new `LoggerSinkType` interface, type that represents logger sink
- new `provideLoggerConfig` function, that provides configuration for default built-in logger
- new `MinLogLevelGetter` type, that is getter for obtaining minimum log level
- new `MinLogLevelGetterFactory` type, that is factory that is used for obtaining minimum log level getter
- new `MinimumLevelConfig` type, that is static log level, or function that returns log level or function that returns function which is used like getter for log level
- new `WriteToConfig` type, that is type of sink or function that creates sublogger with custom configuration
- new `loggerEnabled` function, that tests whether is logger sink enabled
- new `useEnrichers` function, that creates logger properties by using enrichers
- new `DeveloperConsoleSink` service, that is sink that is used for storing logs using browser developer console
   - **implements**
      - `LoggerSink`
- new `DefaultLogger` service, that is default implementation of `Logger`
   - **implements**
      - `Logger`
- new `LogLevelEnricher` service, that is enricher used for adding logLevel and logLevelShort properties
   - **implements**
      - `LoggerEnricher`
- new `TimestampEnricher` service, that is enricher used for adding timestamp as iso datetime with current date time
   - **implements**
      - `LoggerEnricher`
- new `SubLoggerSink` service, that is sink that is used as sub logger
   - **implements**
      - `LoggerSink`
- new `ConsoleComponentSink` service, that is used for storing logs in `ConsoleComponent`
   - **implements**
      - `LoggerSink`
- new `LoggerOptions` class, that are options for logger that are used during logging
   - **properties**
      - `minimumLogLevel` minimal log level, that is used for logging, logs with lower log level are ignored
      - `messageLengthLimit` maximal allowed length of message, if it is exceeded it is trimmed
      - `messageTemplate` logger message template that is used for creating message log, message log itself is inside `messageLog` property
      - `enrichers` array of enrichers that allows extending logger properties
      - `filter` filter that filters out message logs
      - `loggerSinks` array of logger sinks that do actual logging
- new `LogLevel` enum, that represents log level for built in logger
   - `Verbose` verbose logs used for tracking
   - `Debug` debugging logs used for debugging
   - `Information` informative log
   - `Warning` warning log
   - `Error` error log
   - `Fatal` fatal error log
   - `Off` logging is disabled
- new `MessageLog` class, that is message log that contains all information that are used for displaying log
   - **properties**
      - `message` message that is used as message template for log itself
      - `logLevel` log level of current message log
      - `properties` properties that are "replaced" inside message
      - `timestamp` gets timestamp as ISO string
   - **methods**
      - `buildMessage` builds message that will be logged in logger sink
- new `provideLoggerRestClient` function, that provides logger rest client
- new `provideConsoleComponentServiceOptions` function, that provides `ConsoleComponentServiceOptions`
- new `provideRestSinkOptions` function, that provides `RestSinkOptions`
- updated `LOGGER` injection token, now provides `DefaultLogger` as default value

### BREAKING CHANGES

- no longer depends on `positions`
- no longer depends on `structured-log`
- removed typings `positions`
- removed typings `structured-log`
- renamed `CookiePermanentStorageService` service to `CookiePermanentStorage`
- removed previous `CookiePermanentStorage` constant, now use directly `CookiePermanentStorage`
- removed `PermanentStorageType`, now using type `Type<PermanentStorage>`
- removed `PositionType`, now using type `Type<Position>`
- renamed `NoStringLocalizationService` service to `NoStringLocalization`
- removed `StringLocalizationType`, now using type `Type<StringLocalization>`
- renamed `MemoryTemporaryStorageService` service to `MemoryTemporaryStorage`
- removed `TemporaryStorageType`, now using type `Type<TemporaryStorage>`
- updated `provideLogger` provider, now using parameter type `Type<Logger>`
- updated `providePermanentStorage` provider, now using parameter type `Type<PermanentStorage>`
- updated `providePosition` provider, now using parameter type `Type<Position>`
- updated `provideStringLocalization` provider, now using parameter type `Type<StringLocalization>`
- updated `provideTemporaryStorage` provider, now using parameter type `Type<TemporaryStorage>`
- renamed `LocalPermanentStorageService` service to `LocalPermanentStorage`
- removed previous `LocalPermanentStorage` constant, now use directly `LocalPermanentStorage`
- renamed `SessionTemporaryStorageService` service to `SessionTemporaryStorage`
- removed previous `SessionTemporaryStorage` constant, now use directly `SessionTemporaryStorage`
- removed `DummyLoggerService` service, replaced by `DefaultLogger`
- updated `Logger` interface
   - changed signature of `fatal` method
   - changed signature of `error` method
   - changed signature of `warn` method
   - changed signature of `info` method
   - changed signature of `debug` method
   - changed signature of `verbose` method
- *subpackage* `@anglr/common/floating-ui`
   - removed `FloatingUiPosition` constant that was used for providing floating ui position implementation, now use directly `FloatingUiPosition`
- removed *subpackage* `@anglr/common/positions`, use floating-ui implementation instead
- removed *subpackage* `@anglr/common/structured-log`, use `DefaultLogger` implementation instead
- moved `consoleAnimationTrigger` to `@anglr/common` from `@anglr/common/structured-log`
- moved `ConsoleComponent` to `@anglr/common` from `@anglr/common/structured-log`
   - renamed to `ConsoleSAComponent`
- moved `ConsoleComponentLog` to `@anglr/common` from `@anglr/common/structured-log`
   - renamed to `ConsoleComponentService` and updated to service class
- moved `RestLog` to `@anglr/common` from `@anglr/common/structured-log`
- moved `LoggerRestClient` to `@anglr/common` from `@anglr/common/structured-log`
- moved `LOGGER_REST_CLIENT` to `@anglr/common` from `@anglr/common/structured-log`
- moved `ConsoleComponentSinkService` to `@anglr/common` from `@anglr/common/structured-log`
   - renamed to `ConsoleComponentService`
- moved `ConsoleSinkConfigService` to `@anglr/common` from `@anglr/common/structured-log`
   - renamed to `ConsoleComponentServiceOptions`
- moved `RestSinkService` to `@anglr/common` from `@anglr/common/structured-log`
   - renamed to `RestSink`
- moved `RestSinkOptions` to `@anglr/common` from `@anglr/common/structured-log`

## Version 17.0.0 (2023-08-17)

### Features

- new `HostFlexColumnStyle` constant that represents css display flex and flex direction column style to host of component
- new `HostFlexRowStyle` constant that represents css display flex and flex direction row style to host of component
- new `runWhenAppStable` function that runs callback function when angular app is bootstrapped and stable
- new `DEVELOPER_CONSOLE_SINK` provider for `DeveloperConsoleSinkService` for logger
- new `DeveloperConsoleSinkService` service that represents sink that is used for storing logs using browser developer console
- new `DeveloperConsoleSinkOptions` options that are options for developer console sink
   - **properties**
      - `restrictToLevel` restricts logs to specified level
- new `DisplayPropertiesSAPipe` pipe, that transforms array of objects or object properties into string
   - **name** `displayProperties`
- new `FirstUppercaseLocalizeSAPipe` pipe, that localize strings using 'StringLocalization' and converts first letter of text to uppercase
   - **name** `firstUppercaseLocalize`
- new `FirstUppercaseSAPipe` pipe, that converts first letter of text to uppercase
   - **name** `firstUppercase`
- new `getProviderForType` function, that gets provider from type
- new `TypeProvider` decorator, that attach provider to type
- new `LoggerType` interface, that is used for restriction of logger provider type only for type decorated with logger provider
- new `PermanentStorageType` interface, that is used for restriction of permanent storage provider type only for type decorated with permanent storage provider
- new `PositionType` interface, that is used for restriction of position provider type only for type decorated with position provider
- new `StringLocalizationType` interface, that is used for restriction of string localization provider type only for type decorated with string localization provider
- new `TemporaryStorageType` interface, that is used for restriction of temporary storage provider type only for type decorated with temporary storage provider
- new `provideLogger` function that provides logger service type
- new `providePermanentStorage` function that provides permanent storage service type
- new `providePosition` function that provides position service type
- new `provideStringLocalization` function that provides string localization service type
- new `provideTemporaryStorage` function that provides temporary storage service type
- new `CookiePermanentStorage` type, that sets permanent storage to use cookie permanent storage when used with `providePermanentStorage`
- updated `ClickOutsideSADirective` directive
   - now it is `standalone`
- updated `GoBackSADirective` directive
   - now it is `standalone`
- updated `LocalizeSAPipe`
   - now it is `standalone`
- updated `IsNaNSAPipe`
   - now it is `standalone`
- updated `IsPresentSAPipe`
   - now it is `standalone`
- updated `KeysSAPipe`
   - now it is `standalone`
- updated `MergeCssClassesSAPipe`
   - now it is `standalone`
- updated `UrlEncodeSAPipe`
   - now it is `standalone`
- updated `NoStringLocalizationService` service
   - now using `formatString` for interpolation from `@jscrpt/common`
- updated `Notification` class
   - new **properties**
      - `parameter` gets object that is used for formatting notification message
      - new constructor parameter that sets object that is used for formatting notification message
- updated `DefaultNotificationsService`
   - now corresponds with `Notifications` interface
- updated `Notifications` interface
   - `message` method has new optional parameter `parameter` that represents object that is used for formatting notification message
   - `default` method has new optional parameter `parameter` that represents object that is used for formatting notification message
   - `success` method has new optional parameter `parameter` that represents object that is used for formatting notification message
   - `error` method has new optional parameter `parameter` that represents object that is used for formatting notification message
   - `info` method has new optional parameter `parameter` that represents object that is used for formatting notification message
   - `warning` method has new optional parameter `parameter` that represents object that is used for formatting notification message
- *subpackage* `@anglr/common/numeral`
   - updated `NumeralSAPipe` pipe is now standalone
- *subpackage* `@anglr/common/store`
   - new `LocalPermanentStorage` type, that sets permanent storage to use local permanent storage when used with `providePermanentStorage`
   - new `SessionTemporaryStorage` type, that sets temporary storage to use session temporary storage when used with `provideTemporaryStorage`
- *subpackage* `@anglr/common/structured-log`
   - new `provideConsoleComponentSink` function, that provides console component as sink for logger
   - new `StructuredLogLogger` type, that sets logger to use structured log logger when used with `provideLogger`
- *subpackage* `@anglr/common/floating-ui`
   - new `FloatingUiPosition` type, that sets position to use floating ui position when used with `providePosition`

### BREAKING CHANGES

- minimal supported version of `@angular` is `16.0.3`
- minimal supported version of `@jscrpt/common` is `4.0.0`
- minimal supported version of `@rxjs` is `7.5.7`
- minimal supported version of `angular2-hotkeys` is `15.0.0`
- minimal supported version of `moment` is `2.29.4`
- minimal supported version of `date-fns` is `2.30.0`
- minimal supported version of `@floating-ui/dom` is `1.4.4`
- minimal supported version of `tslib` is `2.6.1`
- dropped support of `NodeJs` lower than `16.14`
- reworked styles, now using same technique as `@anglr/datetime` using mixins and functions to define theme
- pipe `LocalizePipe` renamed to `LocalizeSAPipe`
- pipe `IsNaNPipe` renamed to `IsNaNSAPipe`
- pipe `IsPresentPipe` renamed to `IsPresentSAPipe`
- pipe `KeysPipe` renamed to `KeysSAPipe`
- pipe `MergeCssClassesPipe` renamed to `MergeCssClassesSAPipe`
- pipe `UrlEncodePipe` renamed to `UrlEncodeSAPipe`
- `RestSinkConfigService` renamed to `RestSinkOptions`
- updated `RestSinkService` constructor parameters order
- updated `DebugDataComponent` component
   - renamed `_debugDataEnabledChangeSubscription` to `debugDataEnabledChangeSubscription`
   - `debugDataEnabledChangeSubscription` is now *nullable*
   - renamed `_debugDataEnabledSvc` to `debugDataEnabledSvc`
   - renamed `changeDetector` to `_changeDetector`
   - renamed `element` to `_element`
   - `enabled` property changed to `protected`
   - now using `signals`
- updated `TooltipComponent` component
   - renamed `_enterFn` to `enterFn`
   - renamed `_leaveFn` to `leaveFn`
   - renamed `_changeDetector` to `changeDetector`
   - renamed `_element` to `element`
   - `mouseEnter` is now `protected`
   - `mouseLeave` is now `protected`
- directive `ClickOutsideDirective` renamed to `ClickOutsideSADirective`
- updated `ClickOutsideSADirective` directive
   - new constructor parameter `ngZone`
   - property `clickOutsideElement` is now nullable
   - renamed `_clickOutsideCondition` to `ɵclickOutsideCondition`
   - renamed `_element` to `element`
   - renamed `_document` to `document`
   - renamed `_handleClickOutside` to `handleClickOutside`
- removed `ClickOutsideModule` module, use `ClickOutsideSADirective` directly
- directive `GoBackDirective` renamed to `GoBackSADirective`
- removed `GoBackModule` module, use `GoBackSADirective` directly
- directive `PositionToDirective` renamed to `PositionToSADirective`
- removed `PositionModule` module, use `PositionToSADirective` directly
- *subpackage* `@anglr/common/numeral`
   - pipe `NumeralPipe` renamed to `NumeralSAPipe`
   - removed `NumeralModule` module, use `NumeralSAPipe` directly
- *subpackage* `@anglr/common/structured-log`
   - updated `ConsoleLogModule` module
      - removed `forRoot` method, instead use new `provideConsoleComponentSink` function and you also have to provide logger using `provideLogger(StructuredLogLogger)`
   - removed `STRUCTURED_LOG_LOGGER` from public API, instead use new `provideLogger` with `StructuredLogLogger` type
- *subpackage* `@anglr/common/floating-ui`
   - removed `FLOATING_UI_POSITION` from public API, instead use new `providePosition` with `FloatingUiPosition` type

## Version 16.0.0 (2023-02-08)

### Bug Fixes

- fixed `BodyRenderSADirective` now correctly works rendering into container element

### Features

- updated `TooltipDirective` directive
   - now supports rendering into container
   - new **inputs**
      - `containerElement` string that defines element in which should be tooltip rendered, if not specified, body is used
- updated `TooltipOptions` interface
   - new **properties**
      - `containerElement` string that defines element in which should be tooltip rendered, if not specified, body is used

### BREAKING CHANGES

- minimal supported version of `@jscrpt/common` is `3.4.0`

## Version 15.0.1 (2022-10-26)

### Bug Fixes

- updated `FloatingUiDomPosition` service, now correctly handles `PositionOffsetString` offset values

## Version 15.0.0 (2022-10-26)

### Features

- now also typings are available for external usage
- new `PositionElements` interface
   - stores positioned element and reference element
   - **properties**
      - `reference` reference element against which is object positioned
      - `floating` element that is positioned
- new `PositionOffsets` interface
   - defines object which describes offsets for positioned element
   - **properties**
      - `mainAxis` distance between positioned and reference element.
      - `crossAxis` skidding between floating and reference element.
      - `alignmentAxis` works on the same axis as crossAxis but applies only to aligned placements and works logically. The offset is inverted for -end alignments.
- new `PositionArguments` interface
   - arguments that are passed during positioning
   - **properties**
   - `x` X coordinate of positioned element
   - `y` Y coordinate of positioned element
   - `elements` elements that are being used during positioning
- new `PositionOffsetString` type
   - type that represents available names of position offset
- updated `PositionOptions` interface
   - `offset` has new available definitions
- updated `PositionToDirective` directive
   - **implements**
      - `OnDestroy`
   - new **inputs**
      - `offset` offset which allows moving target element along the cross axis of placement, or any chosed direction
      - `autoUpdate` indication whether set up 'auto updating' of position
   - new **outputs**
      - `done` occurs when element was positioned

### BREAKING CHANGES

- minimal supported version of `@angular` is `14.2.0`
- minimal supported version of `rxjs` is `7.5.7`
- minimal supported version of `@jscrpt/common` is `3.2.0`
- minimal supported version of `@floating-ui` is `1.0.3`
- minimal supported version of `tslib` is `2.4.0`
- updated `PositionOptions` interface
   - `offset` is no longer enum, enum values are represented as string

## Version 14.2.0 (2022-10-25)

### Features

- new `BodyRenderSADirective` directive
   - renders element into body directly at the end
   - **implements**
      - `OnInit`
      - `OnDestroy`
   - **inputs**
      - `bodyRender` string that defines element in which should be template rendered, if not specified, body is used

### Bug Fixes

- update `LocalizePipe`
   - fixed `key` parameter type added `undefined` and `null`
- updated `PositionToDirective`
   - fixed input `positionTo` template type check

## Version 14.1.2 (2022-10-13)

### Bug Fixes

- updated `NumberInputControlValueAccessor` directive, which now correctly implements `setDisabledState`

## Version 14.1.1 (2022-06-30)

### Bug Fixes

- fixed missing exports for *progress indicator* module

## Version 14.1.0 (2022-06-16)

### Features

- new `AnimateChildrenHostFeature` constant, that enables animation of children on components
- new `HostScrollableContentStyle` constant, that is css overflow-y scroll style to host of component
- new `HostDisplayBlockStyle` constant, that is css display block style to host of component
- new `HostDisplayFlexStyle` constant, that is css display flex style to host of component

## Version 14.0.0 (2022-06-08)

### Features

- *subpackage* `@anglr/common/forms`
   - new `FormModelGroup` type, that creates `FormGroup` generic type for model
   - new `AsFormGroup` type, that casts `AbstractControl` to typed `FormGroup` using model
   - new `AsFormControlsArray` type, that casts `AbstractControl` to typed `FormArray` of `FormControl` using model
   - new `AsFormGroupArray` type, that casts `AbstractControl` to typed `FormArray` of `FormGroup` using model
   - new `AsFormArray` type, that casts `AbstractControl` to typed `FormArray` of `AbstractControl` using model
   - new `FormModelBuilderDefaultArgs` interface, that represents default args for form model builder
   - new `FormModelBuilder` service, that is instance of form model builder, that creates `FormGroup` from form model, automatically providing `Injector`
      - **methods**
         - `build` builds form from decorated model, only for properties with non `undefined` value
   - updated `GetControlPipe` pipe
      - now automatically infers *control name* based on type from `AbstractControl` and returns correctly typed `AbstractControl`
   - updated `AsFormArrayPipe` pipe
      - now keeps generic argument from `AbstractControl`
   - updated `AsFormControlPipe` pipe
      - now keeps generic argument from `AbstractControl`
   - updated `AsFormGroupPipe` pipe
      - now keeps generic argument from `AbstractControl`
   - updated `buildFormModel` function
      - now returns typed `FormGroup`
      - parameter `args` now allows to provide injector using `FormModelBuilderDefaultArgs` type
   - updated `ValidatorFnFactory` class
      - new constructor parameter `args`, which represents static arguments/parameters that can be passed to validator
   - updated `AsyncValidatorFnFactory` class
      - new constructor parameter `args`, which represents static arguments/parameters that can be passed to validator
   - updated `ValidatorFnFactoryFn` interface
      - now argument `args` type is also merged with `FormModelBuilderDefaultArgs`
   - updated `AsyncValidatorFnFactoryFn` interface
      - now argument `args` type is also merged with `FormModelBuilderDefaultArgs`

### BREAKING CHANGES

- minimal supported version of `@angular` is `14.0.0`
- minimal supported version of `angular2-hotkeys` is `13.1.0`
- dropped support of `NodeJs` version `12`
- *subpackage* `@anglr/common/forms`
   - updated `GetControlPipe` pipe
      - is no longer generic

## Version 13.0.1 (2022-04-29)

### Bug Fixes

- fixed problem with tooltip staying displayed after usually page change

## Version 13.0.0 (2022-04-19)

### Bug Fixes

- fixed conflict in selectors for `TooltipTemplateDirective` and `TooltipDirective` `tooltipTemplate` input

### BREAKING CHANGES

- updated `TooltipDirective` directive
   - **inputs**
      - property `tooltipTemplate` renamed to `template`

## Version 12.0.0 (2022-04-19)

### Bug Fixes

- *subpackage* `@anglr/common/forms`
   - fixed double error displaying for validations, when submit clicked
   - fixed `FormGroupValidator` and `FormGroupAsyncValidator`, now works correctly
   - fixed `buildFormGroup` function, now correctly applies form group validators

### Features

- *subpackage* `@anglr/common/forms`
   - **Form Model Builder**
      - updated `ModelDecoratorMetadata`
         - property `ɵArgs` object storing additional arguments for customization
   - new `IGNORED_VALIDATION_ERRORS` injection token for injecting array of ignored error names when automatically processed
   - updated `ErrorMessagesExtractor` service
      - now supports `IGNORED_VALIDATION_ERRORS`
      - now allows to display validation error 'value' if it is `string`
   - new `ValidationErrorsOptions` interface, that are options for displayed validation errors
      - created super interface for `ValidationErrorsContainerOptions`
      - property `prefix` prefix of css classes applied to element
      - property `suffix` suffix of css classes applied to element
      - property `wrapperDivClass` css class attached to wrapper div
   - new `ValidationErrorsContainerOptions` interface, that are options for validation errors container
      - created super interface for `ValidationErrorsRendererOptions`
      - property `component` component used for rendering validation errors
      - property `template` template used for rendering validation errors
   - updated `ValidationErrorsTemplateContext` interface
      - property `options` options used for displaying validation errors
   - new `ValidationErrorsContainerComponent` interface, that is component that is used for rendering validation errors container
      - method `show` shows validation errors
      - method `hide` hides validation errors
   - new `ValidationErrorsContainerView` class, that holds validation errors view container
      - property `viewContainer` gets or sets current instance of view container
      - property `viewContainerChange` occurs when view container instance changes
   - new `DefaultValidationErrorsContainerComponent` component, that serves as container for validation errors, either component or templates
      - implements `ValidationErrorsContainerComponent` interface
      - default value for `ValidationErrorRendererFactory`
   - new `DefaultValidationErrorsComponent` component, that is default validation errors component, displaying validation errors
      - implements `ValidationErrorsComponent` interface
      - default value for `ValidationErrorRendererFactory`
   - new `GroupHasErrorContainerDirective` directive, that is attached to parent element of inputs group and handles css class that is added to this element and registers provider for ValidationErrorsContainerView
   - new `ValidationErrorsContainerDirective` directive, that sets view container for validation errors for current element
   - updated `HasErrorModule` module
      - **exports**
         - `GroupHasErrorContainerDirective` directive
         - `ValidationErrorsContainerDirective` directive
   - updated `HasErrorDirective` directive
      - **inputs**
         - `errorsComponent` custom component used for rendering validation errors
         - `errorsTemplate` custom template used for rendering validation errors
   - new `ReservedSpaceValidationErrorsContainerComponent` component, that serves as container for validation errors, either component or templates with reserved space for errors

### BREAKING CHANGES

- minimal supported version of `@anglr/animations` is `9.1.0`
- `ValidationErrorRenderer` interface
   - `update` method, parameters has changed
   - removed `wrapperElement`
- `ValidationErrorRendererFactory` service
   - changed constructor parameters
- `DefaultValidationErrorRenderer` class
   - now implements updated `ValidationErrorRenderer`
   - completely refactored
   - now using `ValidationErrorsContainerComponent` for rendering errors
- `ErrorMessagesExtractor` service
   - changed constructor parameters
- `HasErrorDirective` directive
   - changed constructor parameters
- `ValidationErrorsComponent` interface
   - `show` now has new parameter *options*
- `ValidationErrorRendererCtor` interface
   - `ctor` has changed parameters
- **Position**
   - updated `PositionResult`
      - property `flip` indication whether there was flip applied
- *subpackage* `@anglr/common/positions`
   - **Tooltip**
      - all tooltip is replaced with more customizable tooltip based on `Position` service
      - removed `TooltipModule`
      - removed `TooltipComponent`
      - removed `TooltipDirective`
      - removed `TOOLTIP_OPTIONS`
      - removed `TooltipRenderer`
      - removed `TooltipRenderer`
   - **Position to**
      - all position to is replaced with more customizable position to based on `Position` service
      - removed `PositionToDirective`
      - removed `PositionsModule`

## Version 11.3.1 (2022-04-13)

### Bug Fixes

- *subpackage* `@anglr/common/floating-ui`
   - fixed `FloatingUiDomPosition` position offset for `MouseEnter` for *Firefox*

## Version 11.3.0 (2022-04-13)

### Features

- new `KeysPipe` pipe, that gets object keys/property names
- updated `CommonUtilsModule`
   - **exports**
      - `KeysPipe` pipe
- updated `ClickOutsideDirective` directive
   - now allows `clickOutside` *input* to be set to `''`, allows using empty `clickOutside` binding
- new **Tooltip** module (based on `Position` service)
   - new `TooltipModule` module for rendering tooltips
      - **exports**
         - `TooltipDirective` directive
         - `TooltipTemplateDirective` directive
   - new `TooltipDirective` directive used for rendering tooltip
      - **inputs**
         - `tooltip` tooltip text that is displayed, or any data that could be passed to template
         - `allowHtml` indication whether are html tags allowed in tooltip text
         - `tooltipTemplate` instance of tooltip template that is used for rendering
         - `tooltipOptions` options used for displaying tooltip
         - `tooltipVisible` gets or sets indication whether is tooltip visible, if has boolean value, mouse events cant override this
      - **content**
         - child `TooltipTemplateDirective` instance of template from element content, used for rendering
   - new `TooltipTemplateDirective` directive used for obtaining custom tooltip template
   - new `TooltipTemplateContext` interface, that is context passed to template of tooltip
      - property `$implicit` data that should be displayed in tooltip
   - new `TooltipComponent` component used for displaying tooltip content
      - implementation of `TooltipRenderer`
   - new `TOOLTIP_OPTIONS` injection token used for injecting tooltip options
   - new `TooltipRenderer` interface, that represents component that is used for rendering tooltip
      - property `data` data that are rendered in tooltip
      - property `template` template used for rendering tooltip
      - property `allowHtml` indication whether are html tags allowed in tooltip text
      - property `cssClass` css class that is applied to tooltip renderer component
      - method `registerHoverEvents` registers handlers that allows reaction to entering or leaving tooltip
      - method `invalidateVisuals` explicitly runs invalidation of content (change detection)
   - new `TooltipOptions` interface, that represents options used for tooltip directive
      - property `delay` delay for displaying of tooltip on hover
      - property `position` position where should tooltip appear relative to its parent
      - property `allowSelection` allows selection of text in tooltip
      - property `tooltipCssClass` css class that is applied to tooltip renderer component
      - property `stopPropagation` indication whether stop propagation of "hover" event
      - property `tooltipRenderer` type of tooltip renderer that is used for rendering tooltip
      - property `enterAnimation` animation used to tooltip component when it is displayed
      - property `exitAnimation` animation used to tooltip component when it is hidden
- *subpackage* `@anglr/common/material`
   - **TITLED DIALOG**
      - new `TitledDialogServiceOptions` class that represents, options for `TitledDialogService`
         - `titledDialogComponent` property, type of component used for rendering titled dialog
      - updated `TitledDialogService` service
         - now using `TitledDialogServiceOptions`, using type of component for dialog from options
      - new `MovableTitledDialogComponent` component, that is used as wrapper for material dialog enhanced with title, which is movable
      - new `MovableTitledDialogModule` module for components for displaying movable titled dialog
- *subpackage* `@anglr/common/forms`
   - new `ErrorMessageModule` module for error message directives, pipes and components
      - **exports**
         - `WithErrorMessagePipe` pipe
         - `GroupErrorsTemplateDirective` directive
         - `ErrorMessageDirective` directive
         - `GroupErrorsComponent` directive
   - new `WithErrorMessagePipe` pipe, that filters array of errors with messages
   - new `GroupErrorsTemplateContext` interface, that is context passed to template of group error
      - `$implicit` name/code of error
      - `last` indication whether rendered error is last
      - `first` indication whether rendered error is first
      - `index` index of currently rendered item
      - `errors` object storing all errors for form group
   - new `GroupErrorsTemplateDirective` directive, that obtains template for displaying form group error
   - new `ErrorMessageDirective` directive, that is used for displaying form error message
      - **inputs**
         - `errorMessage` name/code of error message to be displayed
         - `errors` object storing all errors
   - new `GroupErrorsComponent` component, that is used for rendering from group errors
      - **inputs**
         - `cssClass` css classes that are applied to default rendered divs
      - **content**
         - child `GroupErrorsTemplateDirective` custom template for rendering form group error

## Version 11.2.0 (2022-03-01)

### Bug Fixes

- fixed `ModelPropertyMetadata` decorator metadata merging (previously multiple usages of decorator caused rewriting values with default value)

### Features

- new `PositionToDirective` directive, that sets position of attached element relative to provided element
- new `PositionModule` module for `PositionToDirective`
- added new **Position**
   - new `Position` interface, that represents service that is used for positioning two elements against each other
   - new `PositionOptions` interface, that represents options that are passed to position service
      - property `placement` placement of target element against source element
      - property `offset` offset which allows moving target element along the cross axis of placement
      - property `flip` indication whether perform flip in case of collision (with view boundaries)
      - property `autoUpdate` indication whether set up 'auto updating' of position
      - property `mouseEvent` mouse event that occured when positioning was called
   - new `PositionResult` interface, that represents result of positioning process, storing new coordinates
      - property `target` target element to be positioned
      - property `x` X coordinate of position of target
      - property `y` Y coordinate of position of target
      - method `dispose` disposes instance of engine used for positioning
   - new `AutoUpdateOptions` interface, that represents options for autoupdate specific functionality
      - property `ancestorScroll` indication whether update position when ancestor scroll changes
      - property `ancestorResize` indication whether update position when ancestor size changes
      - property `elementResize` indication whether update position when target element changes size
   - new `applyPositionResult` function, that applies `PositionResult` to target element
   - new `PositionPlacement` enum with available positions for placement of target element against its source
   - new `PositionOffset` enum with applied offset to position of target in cross axis relative to placement
   - new `POSITION` *Injection Token* used for injecting service that is used for positioning of one element against another
- added *subpackage* `@anglr/common/floating-ui`
- *subpackage* `@anglr/common/floating-ui`
   - requires `@floating-ui/dom` package of minimal version `0.3.1`
   - new `FloatingUiDomPosition` service that is used for positioning two elements against each other, using floating-ui dom implementation
   - new `FLOATING_UI_POSITION` provider for floating ui position implementation
- *subpackage* `@anglr/common/forms`
   - **Form Model Builder**
      - new `FormArrayChild` decorator which defines child type for FormArray

## Version 11.1.0 (2022-02-22)

### Features

- added *experimental* `ComponentHostStyle` decorator, which applies css styles to host of component, requires at least empty style on Component
- added *experimental* `ComponentDisplay` decorator, which applies css display style to host of component, requires at least empty style on Component
- added *experimental* `ComponentDisplayBlock` decorator, which applies css display block style to host of component, requires at least empty style on Component
- added *experimental* `ComponentDisplayFlex` decorator, which applies css display flex style to host of component, requires at least empty style on Component
- added *experimental* `ScrollableContent` decorator, which applies css overflow-y scroll style to host of component, requires at least empty style on Component
- added `CastPipesModule` module that holds cast pipes
- added `CastTypePipe` pipe that allows casting of type for templates, should be used inherited
- added `AsHtmlElementPipe` pipe that casts EventTarget to HTMLELement
- added `AsRequiredTypePipe` pipe that transforms type to required from `nullable` or `undefined` type
- added `AsNgClassRequiredPipe` pipe that transforms nullable NgClass input to NgClass non nullable input
- *subpackage* `@anglr/common/forms`
   - added `FormPipesModule` module that holds form util pipes
   - added `AsFormArrayPipe` pipe that tries to convert `AbstractControl` to `FormArray`
   - added `AsFormControlPipe` pipe that tries to convert `AbstractControl` to `FormControl`
   - added `AsFormGroupPipe` pipe that tries to convert `AbstractControl` to `FormGroup`
   - added `GetControlPipe` pipe that gets control from `FormGroup`

## Version 11.0.0 (2022-02-22)

### Bug Fixes

- fixed `TitledDialogComponent`, now correctly imports `ngComponentOutletEx`

### BREAKING CHANGES

- *subpackage* `@anglr/common/hmr`
   - removed whole subpackage
   - replacement for `hmrFinishedNotification` use `simpleNotification` function from `@jscrpt/common`

## Version 10.0.1 (2022-02-22)

### Bug Fixes

- fixed typings, not using rolled up typings for now
- fixed scss entry points

## Version 10.0.0 (2022-02-15)

### Bug Fixes

- fixed `ComponentRoute`, now accepts `ComponentRouteDefinition` new route definition without `component` as it should be

### Features

- updated `ProgressInterceptor`, which now supports local progress indicator using `httpContext` with `PROGRESS_INDICATOR_GROUP_NAME` token
- added new `PROGRESS_INDICATOR_GROUP_NAME` http context token used for passing progress indicator group name for local progress indicator
- added new `IGNORED_INTERCEPTORS` http context token storing array of ignored interceptors types
- added new `GoBackModule` module for *GoBack* directive
- added new `GoBackDirective` directive that performs browser back button action on click
- added new `MergeCssClassesPipe` that merges css classes that will be passed to ngClass
- added new `NgClassType` type of css class definition for NgClass and merge used within `MergeCssClassesPipe`
- added new `CommonDynamicModule` for `NgComponentOutletEx` directive
- added new `CommonLocalizeModule` for `LocalizePipe` pipe
- added new `CommonUtilsModule` for `IsNaNPipe`, `IsPresentPipe`, `UrlEncodePipe`, `MergeCssClassesPipe` pipes
- *subpackage* `@anglr/common/hotkeys`
   - updated `AppHotkeysService` added `ngOnDestroy` which wraps existing `destroy` method
- *subpackage* `@anglr/common/forms`
   - **Form Model Builder**
      - added new `buildFormModel` method for building `FormGroup` from *decorated model*, only for properties with non `undefined` value

### BREAKING CHANGES

- minimal supported version of *Angular* is `13.1.0`
- minimal supported version of `@jscrpt/common` is `2.2.0`
- compiled as *Angular IVY* **only** with new *APF*
- removed support of *es5* target and using latest package.json features
- removed dependency `@anglr/types`, all mising types used directly here
- dropped support of `Node.js <= 12.20`
- removed `HttpRequestIgnoredInterceptorId` interface, now using builtin `HttpContextToken` named `IGNORED_INTERCEPTORS`
- removed `IgnoredInterceptorId`, now using buildin `HttpContextToken` named `IGNORED_INTERCEPTORS`
- removed `IgnoredInterceptorsService`, now using buildin `HttpContextToken` named `IGNORED_INTERCEPTORS`
- removed `CommonModule` in favor of new more specific modules `CommonDynamicModule`, `CommonLocalizeModule`, `CommonUtilsModule`
- removed not working `HmrData` decorator
- removed not working `HmrServiceData` decorator
- removed not working `HmrServiceDataConstructor` decorator
- from `NgComponentOutletEx` removed `ngComponentOutletExNgModuleFactory` property which is useless for IVY
- *subpackage* `@anglr/common/hmr`
   - removed `hmrAccept` function, replaced by built in Angular loader
- *subpackage* `@anglr/common/numeral`
   - for `NumeralPipe` pipe `transform` has strict `format` parameter of type `string`

## Version 9.0.0 (2022-02-15)

### Bug Fixes

- fixed `RestSinkService` calling `setInterval` only after application is stable

### Features

- `DataRouter` can now be used inside of `Resolve` of *route*
- added new `ClickOutsideDirective` which allows changing value of boolean if user clicks outside of selected element, or provided element, part of `ClickOutsideModule`
- added code that modifies `HttpRequest` prototype `clone` method, adds support for cloning also `additionalInfo`
- added new `AdditionalInfo` generic interface, which allows definition of additional data
- updated `ProgressInterceptor`, which now supports local progress indicator using `additionalInfo` with `LocalProgressIndicatorName`
- added new `LocalProgressIndicatorName` interface as type for additionalInfo with `progressGroupName`
- added new `updateHttpRequestClone` function, that needs to be called to make `additionalInfo` working correctly with `HttpRequest`
- added new `MultiButtonComponent` class used for displaying multibutton
- added new `MultiButtonCssClasses` interface that describes multi button css classes
- added new `MULTI_BUTTON_CSS_CLASSES` injection token for default css classes for multibutton
- added new `MultiButtonModule` module containing components for displaying multi button
- fixed `DebugDataEnabledService.setEnabled()` now triggers `enabledChange` only when there is change of `enabled` value
- improved `DebugDataComponent` new styling, `display: none` when not enabled, `.clickable` css class
- added new **Notifications**
   - added new `NOTIFICATIONS` `InjectionToken` used for injecting notifications service implementation
   - added new `NOTIFICATIONS_SCOPE` `InjectionToken` used for injecting notifications scope name
   - added new `NotificationsOptions` as configuration object that is used by `Notifications` default implementation
   - added new `NotificationSeverity` as severity of notification message
   - added new `Notification` as instance of notification that is being displayed
   - added new `Notifications` interface that manages currently displayed notifications
   - added new `NotificationsScopeProvider` as tuple that will hold notification provider and notifications scope provider
   - added new `NotificationsScopeProviderFactory` as factory for creating `NotificationsScopeProvider`
   - added new `NotificationsProvider` as notifications provider that allows to create scoped notifications provider
   - added new `DefaultNotificationsService` default notifications service implementation
   - added new `DEFAULT_NOTIFICATIONS` as default notifications provider
- *subpackage* `@anglr/common/material`
   - added new `ConfirmationDialogComponent` confirmation dialog component
   - added new `ConfirmationDialogDirective` directive that enables confirmation dialog on click
      - `Inputs`
         - `confirmation` - confirmation text that is displayed in dialog
         - `confirmationTitle` - title for confirmation dialog
         - `confirmationConfirm` - text for confirm confirmation button
         - `confirmationCancel` - text for cancel confirmation button
         - `confirmationCssClasses` - object with css classes to be applied to confirmation dialog component
         - `skipConfirmation` - condidition that determines whether display confirmation dialog or skip it and run confirm directly
         - `preventDefaultsAndPropagation` - indication whether prevent default and stop propagation of click event, defaults to `true`
      - `Outputs`
         - `confirm` - occurs when user confirms confirmation
   - added new `CONFIRMATION_DIALOG_OPTIONS` injection token used for setting global default options for confirmation dialog
   - added new `ConfirmationDialogOptions` options for confirmation dialog component
      - `confirmationText` - text that is displayed as confirmation text (localization constant)
      - `dialogCancelText` - text that is displayed as cancel button text (localization constant)
      - `dialogConfirmText` - text that is displayed as confirm button text (localization constant)
      - `cssClasses` - css classes for confirmation dialog component
   - added new `ConfirmationDialogCssClasses` css classes for confirmation dialog component
      - `buttonsContainerDiv` - css classes applied to container div containing buttons
      - `closeButton` - css classes applied to close button
      - `closeButtonIcon` - css classes applied to close button icon span
      - `confirmButton` - css classes applied to confirm button
      - `confirmButtonIcon` - css classes applied to confirm button icon span
   - added new `ConfirmationDialogModule` module as module containing confirmation dialog component and directive
   - added new `DebugDataCopyClickDirective` that allows to copy data to clipboard on click on `<debug-data>`
   - added new `DebugDataCopyClickModule` as module for debug data copy click directive
- added *subpackage* `@anglr/common/date-fns`
- *subpackage* `@anglr/common/date-fns`
   - `readEncodedFilterWithDates` function that reads filter value from encoded string, deserialize date properties into date
- *subpackage* `@anglr/common/moment`
   - added new `readEncodedFilterWithDates` function that reads filter value from encoded string, deserialize date properties into moment
- *subpackage* `@anglr/common/store`
   - added new `SessionTemporaryStorageService` as `TemporaryStorage` implementation using *Session*
- *subpackage* `@anglr/common/positions`
   - added new parameter `flipCallback` to `positionsWithFlip`, which is called when flip occurs during positioning
   - added new `FLIP_DIRECTION` type defining direction of occured flip, used as parameter to `flipCallback`
   - added new `PositionToDirective` which allows positioning elements relative to each other, part of `PositionsModule`
   - added new `TooltipModule` which allows user to use *tooltip* directives and components
   - added new `TooltipDirective` that allows user to use *tooltip* attribute to create tooltip
      - added new `TooltipOptions` which allows to customize *tooltip*
         - `delay` - delay for displaying of tooltip on hover
         - `fixedPosition` - indication whether is tooltip displayed at fixed position, or if it is displayed where cursor enters element
         - `elementPositionAt` - position where should be tooltip displayed at element
         - `tooltipPosition` - position of tooltip where should placed at
         - `allowSelection` - allows selection of text in tooltip
         - `tooltipCssClass` - css class that is applied to tooltip renderer component
         - `tooltipRenderer` - type of tooltip renderer that is used for rendering tooltip
         - `stopPropagation` - indication whether stop propagation of "hover" event
   - added new `TooltipRenderer` as representation of component that is used for rendering tooltip
   - added new `TooltipComponent` as default component implementing `TooltipRenderer`
   - added new `TOOLTIP_OPTIONS` injection token used for injecting tooltip options
- *subpackage* `@anglr/common/structured-log`
   - added new `RestSinkService` as `Sink` implementation that allows storing logs using `LoggerRestClient`
   - added new `LoggerRestClient` interface, if implemented and provided using `LOGGER_REST_CLIENT` allows storing logs using REST
   - added new `RestSinkConfigService` used as configuration for `RestSinkService`, allows setting log level, interval, log count for flushing, also possible to set log level for immediate flush
   - added new `REST_SINK` provider for providing `RestSinkService` as `Sink`
- *subpackage* `@anglr/common/forms`
   - added new `RequiredClassModule` containing `RequiredClassDirective`
   - completely refactored `HasErrorDirective`, now also supports custom component for rendering errors
   - added `ValidationErrorsResult` as type holding validation error results
   - added new `ErrorMessagesExtractor` that is used as service used for obtaining validation error messages and validation errors in form of `ValidationErrorsResult`
   - added new types
      - `IsSubmittedOrDirtyFunc` - Describes function that is used for performing actions when form is submitted or dirty
      - `ValidationErrorsComponent` - Component that is used for rendering validation errors
      - `ValidationErrorsTemplateContext` - Context passed to template that is used for rendering validation errors
      - `ValidationErrorsRendererOptions` - Options for ValidationErrorRenderer
      - `ValidationErrorRendererFactoryOptions` - Options for ValidationErrorRendererFactory
      - `ValidationErrorRendererCtor` - Describes type that represents ValidationErrorRenderer
      - `ValidationErrorRenderer` - Describes service that is used for rendering validation errors
   - added new `ValidationErrorRendererFactory` that is used for obtaining validation error renderer implementation
   - added new `DefaultValidationErrorRenderer` which is default implementation of validation error renderer
   - added new `VALIDATION_ERROR_RENDERER_FACTORY_OPTIONS` which is used for obtaining renderer factory options using DI
   - added new `prepareForFormBuilder` function that prepares object for form builder, wraps each property in array
   - added new `readEncodedFilter` function that reads filter value from encoded string
   - added new **Form Model Builder**
      - added new `buildFormModel` method for building `FormGroup` from *decorated model*
      - added new `ValidatorFnFactory` and `AsyncValidatorFnFactory` as factories for `validationFn` and `asyncValidationFn` respectively with arguments from component context
      - added new `CurrentValue` class which allows obtaining of current value when needed from component context
      - added new `getCurrentValue` which should be used for obtaining argument current value in `ValidatorFnFactory` or `AsyncValidatorFnFactory`
      - added new `ModelDecoratorMetadata` interface describing metadata for whole model
      - added new `ModelPropertyDecoratorMetadata` interface describing metadata for model of single property
      - added new `ModelPropertyOptions` type that represents options that can be passed to control represented by model property
      - added new `ValidatorFnFactoryFn` and `AsyncValidatorFnFactoryFn` interfaces describing factory functions for validators functions
      - added validations *decorators*
         - `Email` - validation of email
         - `MinLength` - validation of min string length
         - `MaxLength` - validation of max string length
         - `MinValue` - validation of min number value
         - `MaxValue` - validation of max number value
         - `Number` - validation for number
         - `Pattern` - validation for reqular expression pattern
         - `Required` - validation for mandatory value
         - `RequiredIf` - conditional validation for mandatory value
      - added *decorators*
         - `InvalidateOnChange` - allows invalidation of sibling `FormControl`s on changes of `FormControl` value
         - `ControlOptions` - allows to set control options for property
         - `AsyncValidator` - allows setting of `AsyncValidatorFn`
         - `Validator` - allows setting of `ValidatorFn`
         - `Disabled` - sets control as disabled
         - `FormGroupAsyncValidator` - allows setting of `AsyncValidatorFn` for whole `FormGroup`
         - `FormGroupValidator` - allows setting of `ValidatorFn` for whole `FormGroup`
         - `FormGroupProperty` - indicating that property is `FormGroup`
         - `FormArrayProperty` - indicating that property is `FormArray`
         - `ModelPropertyMetadata` - allows setting of `ModelPropertyDecoratorMetadata` for property

### BREAKING CHANGES

- minimal supported version of *Angular* is `10.0.0`
- minimal supported version of `@jscrpt/common` is `1.2.0`
- removed `HttpRequestIgnoredInterceptorId` interface, explicitly using type unions where needed, `HttpRequest<any> & AdditionalInfo<IgnoredInterceptorId>`
- changed `IgnoredInterceptorId` to generic `AdditionalInfo`, allowing broader usage
- renamed `SERVER_BASE_URL` to `HTTP_REQUEST_BASE_URL`
- renamed `SERVER_COOKIE_HEADER` to `HTTP_REQUEST_COOKIE_HEADER`
- renamed `SERVER_AUTH_HEADER` to `HTTP_REQUEST_AUTH_HEADER`
- refactored `DataRouter`, deprecated DataRouterData, use `DataRouter` `valuePromise` directly
- `CookieService` now using `HTTP_REQUEST_COOKIE_HEADER` instead of `SERVER_COOKIE_HEADER`
- *subpackage* `@anglr/common/forms`
   - `RequiredClassDirective` moved to separate module `RequiredClassModule`
   - refactored `HasErrorDirective`, changed constructor parameters
   - removed `HAS_ERROR_OPTIONS` token, replaced by `VALIDATION_ERROR_RENDERER_FACTORY_OPTIONS`
   - renamed `HAS_ERROR_DEFAULT_MESSAGES` to `VALIDATION_ERROR_MESSAGES`

## Version 8.0.0 (2021-12-17)

### Bug Fixes

- fixed `RestSinkService` calling `setInterval` only after application is stable
- fixed `ComponentRoute`, now accepts `ComponentRouteDefinition` new route definition without `component` as it should be

### Features

- `DataRouter` can now be used inside of `Resolve` of *route*
- added new `ClickOutsideDirective` which allows changing value of boolean if user clicks outside of selected element, or provided element, part of `ClickOutsideModule`
- updated `ProgressInterceptor`, which now supports local progress indicator using `httpContext` with `PROGRESS_INDICATOR_GROUP_NAME` token
- added new `PROGRESS_INDICATOR_GROUP_NAME` http context token used for passing progress indicator group name for local progress indicator
- added new `IGNORED_INTERCEPTORS` http context token storing array of ignored interceptors types
- added new `MultiButtonComponent` class used for displaying multibutton
- added new `MultiButtonCssClasses` interface that describes multi button css classes
- added new `MULTI_BUTTON_CSS_CLASSES` injection token for default css classes for multibutton
- added new `MultiButtonModule` module containing components for displaying multi button
- fixed `DebugDataEnabledService.setEnabled()` now triggers `enabledChange` only when there is change of `enabled` value
- improved `DebugDataComponent` new styling, `display: none` when not enabled, `.clickable` css class
- added new `GoBackModule` module for *GoBack* directive
- added new `GoBackDirective` directive that performs browser back button action on click
- added new `MergeCssClassesPipe` that merges css classes that will be passed to ngClass
- added new `NgClassType` type of css class definition for NgClass and merge used within `MergeCssClassesPipe`
- added new `CommonDynamicModule` for `NgComponentOutletEx` directive
- added new `CommonLocalizeModule` for `LocalizePipe` pipe
- added new `CommonUtilsModule` for `IsNaNPipe`, `IsPresentPipe`, `UrlEncodePipe`, `MergeCssClassesPipe` pipes
- added new **Notifications**
   - added new `NOTIFICATIONS` `InjectionToken` used for injecting notifications service implementation
   - added new `NOTIFICATIONS_SCOPE` `InjectionToken` used for injecting notifications scope name
   - added new `NotificationsOptions` as configuration object that is used by `Notifications` default implementation
   - added new `NotificationSeverity` as severity of notification message
   - added new `Notification` as instance of notification that is being displayed
   - added new `Notifications` interface that manages currently displayed notifications
   - added new `NotificationsScopeProvider` as tuple that will hold notification provider and notifications scope provider
   - added new `NotificationsScopeProviderFactory` as factory for creating `NotificationsScopeProvider`
   - added new `NotificationsProvider` as notifications provider that allows to create scoped notifications provider
   - added new `DefaultNotificationsService` default notifications service implementation
   - added new `DEFAULT_NOTIFICATIONS` as default notifications provider
- *subpackage* `@anglr/common/hotkeys`
   - updated `AppHotkeysService` added `ngOnDestroy` which wraps existing `destroy` method
- *subpackage* `@anglr/common/material`
   - added new `ConfirmationDialogComponent` confirmation dialog component
   - added new `ConfirmationDialogDirective` directive that enables confirmation dialog on click
      - `Inputs`
         - `confirmation` - confirmation text that is displayed in dialog
         - `confirmationTitle` - title for confirmation dialog
         - `confirmationConfirm` - text for confirm confirmation button
         - `confirmationCancel` - text for cancel confirmation button
         - `confirmationCssClasses` - object with css classes to be applied to confirmation dialog component
         - `skipConfirmation` - condidition that determines whether display confirmation dialog or skip it and run confirm directly
         - `preventDefaultsAndPropagation` - indication whether prevent default and stop propagation of click event, defaults to `true`
      - `Outputs`
         - `confirm` - occurs when user confirms confirmation
   - added new `CONFIRMATION_DIALOG_OPTIONS` injection token used for setting global default options for confirmation dialog
   - added new `ConfirmationDialogOptions` options for confirmation dialog component
      - `confirmationText` - text that is displayed as confirmation text (localization constant)
      - `dialogCancelText` - text that is displayed as cancel button text (localization constant)
      - `dialogConfirmText` - text that is displayed as confirm button text (localization constant)
      - `cssClasses` - css classes for confirmation dialog component
   - added new `ConfirmationDialogCssClasses` css classes for confirmation dialog component
      - `buttonsContainerDiv` - css classes applied to container div containing buttons
      - `closeButton` - css classes applied to close button
      - `closeButtonIcon` - css classes applied to close button icon span
      - `confirmButton` - css classes applied to confirm button
      - `confirmButtonIcon` - css classes applied to confirm button icon span
   - added new `ConfirmationDialogModule` module as module containing confirmation dialog component and directive
   - added new `DebugDataCopyClickDirective` that allows to copy data to clipboard on click on `<debug-data>`
   - added new `DebugDataCopyClickModule` as module for debug data copy click directive
- added *subpackage* `@anglr/common/date-fns`
- *subpackage* `@anglr/common/date-fns`
   - `readEncodedFilterWithDates` function that reads filter value from encoded string, deserialize date properties into date
- *subpackage* `@anglr/common/moment`
   - added new `readEncodedFilterWithDates` function that reads filter value from encoded string, deserialize date properties into moment
- *subpackage* `@anglr/common/store`
   - added new `SessionTemporaryStorageService` as `TemporaryStorage` implementation using *Session*
- *subpackage* `@anglr/common/positions`
   - added new parameter `flipCallback` to `positionsWithFlip`, which is called when flip occurs during positioning
   - added new `FLIP_DIRECTION` type defining direction of occured flip, used as parameter to `flipCallback`
   - added new `PositionToDirective` which allows positioning elements relative to each other, part of `PositionsModule`
   - added new `TooltipModule` which allows user to use *tooltip* directives and components
   - added new `TooltipDirective` that allows user to use *tooltip* attribute to create tooltip
      - added new `TooltipOptions` which allows to customize *tooltip*
         - `delay` - delay for displaying of tooltip on hover
         - `fixedPosition` - indication whether is tooltip displayed at fixed position, or if it is displayed where cursor enters element
         - `elementPositionAt` - position where should be tooltip displayed at element
         - `tooltipPosition` - position of tooltip where should placed at
         - `allowSelection` - allows selection of text in tooltip
         - `tooltipCssClass` - css class that is applied to tooltip renderer component
         - `tooltipRenderer` - type of tooltip renderer that is used for rendering tooltip
         - `stopPropagation` - indication whether stop propagation of "hover" event
   - added new `TooltipRenderer` as representation of component that is used for rendering tooltip
   - added new `TooltipComponent` as default component implementing `TooltipRenderer`
   - added new `TOOLTIP_OPTIONS` injection token used for injecting tooltip options
- *subpackage* `@anglr/common/structured-log`
   - added new `RestSinkService` as `Sink` implementation that allows storing logs using `LoggerRestClient`
   - added new `LoggerRestClient` interface, if implemented and provided using `LOGGER_REST_CLIENT` allows storing logs using REST
   - added new `RestSinkConfigService` used as configuration for `RestSinkService`, allows setting log level, interval, log count for flushing, also possible to set log level for immediate flush
   - added new `REST_SINK` provider for providing `RestSinkService` as `Sink`
- *subpackage* `@anglr/common/forms`
   - added new `RequiredClassModule` containing `RequiredClassDirective`
   - completely refactored `HasErrorDirective`, now also supports custom component for rendering errors
   - added `ValidationErrorsResult` as type holding validation error results
   - added new `ErrorMessagesExtractor` that is used as service used for obtaining validation error messages and validation errors in form of `ValidationErrorsResult`
   - added new types
      - `IsSubmittedOrDirtyFunc` - Describes function that is used for performing actions when form is submitted or dirty
      - `ValidationErrorsComponent` - Component that is used for rendering validation errors
      - `ValidationErrorsTemplateContext` - Context passed to template that is used for rendering validation errors
      - `ValidationErrorsRendererOptions` - Options for ValidationErrorRenderer
      - `ValidationErrorRendererFactoryOptions` - Options for ValidationErrorRendererFactory
      - `ValidationErrorRendererCtor` - Describes type that represents ValidationErrorRenderer
      - `ValidationErrorRenderer` - Describes service that is used for rendering validation errors
   - added new `ValidationErrorRendererFactory` that is used for obtaining validation error renderer implementation
   - added new `DefaultValidationErrorRenderer` which is default implementation of validation error renderer
   - added new `VALIDATION_ERROR_RENDERER_FACTORY_OPTIONS` which is used for obtaining renderer factory options using DI
   - added new `prepareForFormBuilder` function that prepares object for form builder, wraps each property in array
   - added new `readEncodedFilter` function that reads filter value from encoded string
   - added new **Form Model Builder**
      - added new `buildFormModel` method for building `FormGroup` from *decorated model*, only for properties with non `undefined` value
      - added new `ValidatorFnFactory` and `AsyncValidatorFnFactory` as factories for `validationFn` and `asyncValidationFn` respectively with arguments from component context
      - added new `CurrentValue` class which allows obtaining of current value when needed from component context
      - added new `getCurrentValue` which should be used for obtaining argument current value in `ValidatorFnFactory` or `AsyncValidatorFnFactory`
      - added new `ModelDecoratorMetadata` interface describing metadata for whole model
      - added new `ModelPropertyDecoratorMetadata` interface describing metadata for model of single property
      - added new `ModelPropertyOptions` type that represents options that can be passed to control represented by model property
      - added new `ValidatorFnFactoryFn` and `AsyncValidatorFnFactoryFn` interfaces describing factory functions for validators functions
      - added validations *decorators*
         - `Email` - validation of email
         - `MinLength` - validation of min string length
         - `MaxLength` - validation of max string length
         - `MinValue` - validation of min number value
         - `MaxValue` - validation of max number value
         - `Number` - validation for number
         - `Pattern` - validation for reqular expression pattern
         - `Required` - validation for mandatory value
         - `RequiredIf` - conditional validation for mandatory value
      - added *decorators*
         - `InvalidateOnChange` - allows invalidation of sibling `FormControl`s on changes of `FormControl` value
         - `ControlOptions` - allows to set control options for property
         - `AsyncValidator` - allows setting of `AsyncValidatorFn`
         - `Validator` - allows setting of `ValidatorFn`
         - `Disabled` - sets control as disabled
         - `FormGroupAsyncValidator` - allows setting of `AsyncValidatorFn` for whole `FormGroup`
         - `FormGroupValidator` - allows setting of `ValidatorFn` for whole `FormGroup`
         - `FormGroupProperty` - indicating that property is `FormGroup`
         - `FormArrayProperty` - indicating that property is `FormArray`
         - `ModelPropertyMetadata` - allows setting of `ModelPropertyDecoratorMetadata` for property

### BREAKING CHANGES

- minimal supported version of *Angular* is `13.1.0`
- minimal supported version of `@jscrpt/common` is `2.2.0`
- compiled as *Angular IVY* **only** with new *APF*
- removed support of *es5* target and using latest package.json features
- removed dependency `@anglr/types`, all mising types used directly here
- dropped support of `Node.js <= 12.20`
- removed `HttpRequestIgnoredInterceptorId` interface, now using builtin `HttpContextToken` named `IGNORED_INTERCEPTORS`
- removed `IgnoredInterceptorId`, now using buildin `HttpContextToken` named `IGNORED_INTERCEPTORS`
- removed `IgnoredInterceptorsService`, now using buildin `HttpContextToken` named `IGNORED_INTERCEPTORS`
- renamed `SERVER_BASE_URL` to `HTTP_REQUEST_BASE_URL`
- renamed `SERVER_COOKIE_HEADER` to `HTTP_REQUEST_COOKIE_HEADER`
- renamed `SERVER_AUTH_HEADER` to `HTTP_REQUEST_AUTH_HEADER`
- removed `CommonModule` in favor of new more specific modules `CommonDynamicModule`, `CommonLocalizeModule`, `CommonUtilsModule`
- removed not working `HmrData` decorator
- removed not working `HmrServiceData` decorator
- removed not working `HmrServiceDataConstructor` decorator
- from `NgComponentOutletEx` removed `ngComponentOutletExNgModuleFactory` property which is useless for IVY
- refactored `DataRouter`, deprecated DataRouterData, use `DataRouter` `valuePromise` directly
- `CookieService` now using `HTTP_REQUEST_COOKIE_HEADER` instead of `SERVER_COOKIE_HEADER`
- *subpackage* `@anglr/common/forms`
   - `RequiredClassDirective` moved to separate module `RequiredClassModule`
   - refactored `HasErrorDirective`, changed constructor parameters
   - removed `HAS_ERROR_OPTIONS` token, replaced by `VALIDATION_ERROR_RENDERER_FACTORY_OPTIONS`
   - renamed `HAS_ERROR_DEFAULT_MESSAGES` to `VALIDATION_ERROR_MESSAGES`
- *subpackage* `@anglr/common/hmr`
   - removed `hmrAccept` function, replaced by built in Angular loader
- *subpackage* `@anglr/common/numeral`
   - for `NumeralPipe` pipe `transform` has strict `format` parameter of type `string`

## Version 7.3.2 (2020-05-15)

### Bug Fixes

- fixed `NumberInputControlValueAccessor` now supports spaces in number

## Version 7.3.1

- fixed `LocalPermanentStorageService` now correctly stores data indefinitely if `expire` is not provided or it is null

## Version 7.3.0

- added `TemporaryStorage` interface used as api for temporary storage implementation
- added `MemoryTemporaryStorageService` as default implementation of `TemporaryStorage`, using process memory as storage
- added `TEMPORARY_STORAGE` token for injecting `TemporaryStorage` implementation, defaults to `MemoryTemporaryStorageService`

## Version 7.2.0

- added *subpackage* `@anglr/common/material`
- *subpackage* `@anglr/common/material`
   - added `TitledDialogComponent` wrapping `@angular/material/dialog`, adding title
   - added `TitledDialogModule` containing `TitledDialogComponent` and `TitledDialogService`
   - added `TitledDialogService` used for opening *titled dialog*
   - added `TITLED_DIALOG_DATA` token for obtaining passed data inside
- added `DebugDataComponent` used for displaying debug data
- added `DebugDataEnabledService` handling enabled/visibility state of `DebugDataComponent`
- added `DebugDataModule` containing `DebugDataComponent`
- *subpackage* `@anglr/common/structured-log`
   - added `ConsoleSinkConfigService` used for handling configuration for `ConsoleComponentSinkService`

## Version 7.0.1

- *style.scss* is not included in index, have to be custom included during build

## Version 7.1.0

- `LocalizePipe` changed to not `pure`
- added *subpackage* `@anglr/common/positions`
- *subpackage* `@anglr/common/positions`
   - new method `positionsWithFlip` that uses `positions` and flips location if it conflicts with viewport

## Version 7.0.0

- updated to latest stable *Angular* 9
- added generating of API doc

## Version 6.6.5

- added support for extracting routes from *children components* when `ModuleRoutes` is used

## Version 6.6.4

- *style.scss* now correctly included also as part of src

## Version 6.6.3

- *subpackage* `@anglr/common/structured-log`
   - fixed position of *expand/collapse* icon in expanded state for `ConsoleComponent`

## Version 6.6.2

- *subpackage* `@anglr/common/structured-log`
   - added possibility to *expand/collapse* each line in `ConsoleComponent`

## Version 6.6.1

- *subpackage* `@anglr/common/structured-log`
   - added filter to `ConsoleComponent`
   - now each log row can be copied in `ConsoleComponent`
   - styling of `ConsoleComponent` copy and clear is not positioned on top

## Version 6.6.0

- created *subpackage* `@anglr/common/moment` containing all `moment` library dependent code
   - added `MomentConvertPipe` allowing conversion value to `moment`
   - added `MomentFormatPipe` allowing formatting of value using `moment` format function
- created *subpackage* `@anglr/common/structured-log` containing all `structured-log` dependent code
   - added `ConsoleComponent` used for displaying logs from `ConsoleComponentSinkService`
   - added `consoleAnimationTrigger` can be used for animating `ConsoleComponent`
   - added `toText` method allowing displaying whole stringified json
   - added `ConsoleLogModule` containing `ConsoleComponent`, contains also method `forRoot` that allows register `structured-log` as `Logger` (with `CONSOLE_COMPONENT_SINK`)
   - added `ConsoleComponentSinkService` as implementation of `structured-log` sink
   - added `LoggerService` as implementation of `Logger` from `@anglr/common` using `structured-log`
   - added `LOGGER_SINKS` injection token allowing providing multiple sinks for `structured-log` logger
   - added `CONSOLE_COMPONENT_SINK_SERVICE` injection token for injecting implementation of `ConsoleComponentSink`
   - added `CONSOLE_COMPONENT_SINK`, `STRUCTURED_LOG_LOGGER` providers

## Version 6.5.1

 - fixed *AOT* compilation for `ProgressIndicatorModule`

## Version 6.5.0

 - completely refactored *ProgressIndicator*
 - `ProgressIndicatorComponent` now supports displaying *messages*
 - `ProgressIndicatorService` now supports displaying *messages* and also supports displaying progress indicator *groups* (overlays)
 - added `ProgressOverlayDirective` which allows displaying custom progress indicator *groups* on specified html elements
 - added `LOGGER` token for injecting generic `Logger` which allows logging (with default dummy logging)
 - added `IsPresentPipe` which allows checking whether value is different from `null` or `undefined`
 - added `IsNaNPipe` which allows checking whether value is `NaN`
 - added `LocalizePipe` which allows to use `StringLocalization` within angular templates
 - added `UrlEncodePipe` which allows to use `serializeToUrlQuery` within angular templates

## Version 6.4.5

 - `ModuleRoutes` now working with latest Angular 9-next.10+

## Version 6.4.4

 - added support for expiration date into `PermanentStorage`
 - added changeDetection.OnPush for `ProgressIndicator` component

## Version 6.4.3

 - fixed compilation problem with AOT when `HasErrorModule` used in application

## Version 6.4.2

 - fixed errorMessages handling in `hasErrorDirective`
 - added `requriedClassDirective` into `hasErrorModule`

## Version 6.4.1

 - added directives `hasErrorDirective`, `groupHasErrorDirective` and service `SubmittedService` into `@anglr/forms`

## Version 6.4.0

 - added parameter `skipSerialization` to `CookieService` methods `getCookie` and `setCookie` allowing skip *JSON* serialization/deserialization
 - fixed `getCookie` of `CookieService` if no cookies are present
 - added `StringLocalization` with `STRING_LOCALIZATION` token for injecting service that allows localization of strings
 - added default implementation of `StringLocalization` `NoStringLocalizationService` which returns same value as localized key
 - added `PermanentStorage` with `PERMANENT_STORAGE` token for injecting service that allows permanently storing od data
 - added `CookiePermanentStorageService` allowing use session cookies as *permanent* storage
 - created *subpackage* `@anglr/common/store` containing all `store` dependent code (browser LocalStorage)
   - `LocalPermanentStorageService` as implementation of `PermanentStorage` using *LocalStorage*

## Version 5.0.6
 - fixed `getCookie` of `CookieService` if no cookies are present

## Version 5.0.5
 - added parameter `skipSerialization` to `CookieService` methods `getCookie` and `setCookie` allowing skip *JSON* serialization/deserialization

## Version 6.3.0

 - created *subpackage* `@anglr/common/hotkeys` containing all `angular2-hotkeys` library dependent code
   - `AppHotkeysService` added to this subpackage

## Version 6.2.0

 - created *subpackage* `@anglr/common/numeral` containing all `numeral` library dependent code
   - `NumeralPipe` added to this subpackage
   - `NumeralModule` added to this subpackage
 - created *subpackage* `@anglr/common/forms` containing all `@angular/forms` dependent code
   - `MaxValueNumberValidatorDirective` added to this subpackage
   - `MinValueNumberValidatorDirective` added to this subpackage
   - `NumberInputControlValueAccessor` added to this subpackage
   - `NumberInputValidatorDirective` added to this subpackage
   - `Validators` added to this subpackage
   - all *utils* exported as independent functions `hasErrorCustom`, `alertHiddenCustom`, `hasError`, `alertHidden`
 - created *subpackage* `@anglr/common/router` containing all `@angular/router` dependent code
   - `DataRouter` and `DataRouterData` added to this subpackage
   - `ComponentRedirectRoute`, `ComponentRoute`, `ModuleRoutes` added to this subpackage
   - `ModuleRoutesOptions` extended with `ExtraOptions` for `RouterModule.forRoot()`
   - `extractRoutes` added as independent function
 - **BREAKING CHANGES**
   - `NumeralPipe` removed from `CommonModule` and from `@anglr/common`
   - `MaxValueNumberValidatorDirective` removed from `CommonModule` and from `@anglr/common`
   - `MinValueNumberValidatorDirective` removed from `CommonModule` and from `@anglr/common`
   - `NumberInputControlValueAccessor` removed from `CommonModule` and from `@anglr/common`
   - `NumberInputValidatorDirective` removed from `CommonModule` and from `@anglr/common`
   - `Validators` removed from `@anglr/common`
   - `DataRouter` and `DataRouterData` removed from `@anglr/common`
   - `ComponentRedirectRoute`, `ComponentRoute`, `ModuleRoutes` removed from `@anglr/common`
   - removed static class `Utils` and all its parts except `runWhenModuleStable`, `APP_STABLE`, `extractAppStableResolve` which are exported independently

## Version 6.1.0

 - created *subpackage* `@anglr/common/hmr` containing new HMR `hmrAccept` and `hmrFinishedNotification`
    - `hmrAccept` and `hmrFinishedNotification` in `@anglr/common/` are deprecated
 - added new decorator `ModuleRoutes` used with Angular IVY for setting routes to module combining with `ComponentRoute` and `ComponentRedirectRoute` decorators

## Version 6.0.0

 - Angular IVY ready (APF compliant package)
 - added support for ES2015 compilation
 - Angular 8
 - moved all common stuff into `@jscrpt/common`
    - removed stuff `Encoder`, `Paginator`, `OrderByDirection`, `Dictionary`, `StringDictionary`, `ValueNamePair`, `reverseString`, `extend`, `merge`, `generateId`, `firstToLowerCase`, `htmlToElement`, `isPresent`, `isBlank`, `isBoolean`, `isNumber`, `isString`, `isFunction`, `isType`, `isStringMap`, `isStrictStringMap`, `isArray`, `isDate`, `noop`, `normalizeBlank`, `isJsObject`, `isPrimitive`, `hasConstructor`, `isEmptyObject`, `nameof`
    - removed also most of `Utils.common`

## Version 5.0.4
 - fixed missing export of `htmlToElement`

## Version 5.0.3
 - added new method `htmlToElement` for conversion html string into html DOM

## Version 5.0.2
 - completely removed `Utils.viewTemplate` method and everything connected with it

## Version 5.0.1
 - fixed `NgComponentOutletEx<TComponent>`, now works with external module

## Version 5.0.0
 - stabilized for angular v6

## Version 5.0.0-beta.3
 - `@anglr/common` is now marked as *sideEffects* free
 - *injection token* `SCROLL_MAGIC_CONTROLLER` removed

## Version 5.0.0-beta.2
 - `ProgressIndicatorService` reworked as *tree-shakeable*
 - removed `forRoot` methods from `ProgressIndicatorModule`, options for `ProgressIndicatorService` must be overriden directly
 - services `StatusCodeService`, `DataRouter`, `IgnoredInterceptorsService`, `CookieService` changed to *tree-shakeable*
 - *InjectionToken* `APP_STABLE` changed to *tree-shakeable*
 - removed `forRoot` methods from `CommonModule`, `GlobalizationService` must be provided directly in root
 - changed `GlobalizationService.getLocale()` to `GlobalizationService.locale` get property
 - changed `GlobalizationService.getLocaleChange()` to `GlobalizationService.localeChange` get property, with `void` value

## Version 5.0.0-beta.1
 - aktualizácia balíčkov `Angular` na `6`
 - aktualizácia `Webpack` na verziu `4`
 - aktualizácia `rxjs` na verziu `6`
 - automatické generovanie dokumentácie

## Version 4.0.16

- fixed `ProgressIndicatorService`, now hiding again properly

## Version 4.0.15

- `ProgressInterceptor` moved from `@anglr/http-extensions` to this project
- `ProgressInterceptor` can be ignored using `IgnoredInterceptorsService`

## Version 4.0.14

- `requestId` is made optional

## Version 4.0.13

- updated `ProgressIndicatorService` supports force hiding of progress indicator
- updated `IgnoredInterceptorsService` now using requestId for proper identification of request

## Version 4.0.12

- removed `HTTP_CLIENT_IGNORE_INTERCEPTOR`
- now using directly `IgnoredInterceptorsService` for providing `IgnoredInterceptorsService`

## Version 4.0.11

- properly provided `IgnoredInterceptorsService` as `HTTP_CLIENT_IGNORE_INTERCEPTOR`

## Version 4.0.10

- added forgotten export of `HTTP_CLIENT_IGNORE_INTERCEPTOR`

## Version 4.0.9

- added injection token `HTTP_CLIENT_IGNORE_INTERCEPTOR` for injecting `IgnoredInterceptorsService`
- added `IgnoredInterceptorsService` which allows user to disable specified http client interceptors

## Version 4.0.8

- `APP_STABLE` changed to `InjectionToken` and injecting it returns `Promise<void>`

## Version 4.0.7

- updated all validators for number `NumberInputValidatorDirective`, `MinValueNumberValidatorDirective`, `MaxValueNumberValidatorDirective`, now support null value
- all number validatos are now available for Reactive Forms using `Validators` class

## Version 4.0.6

- updated `CommonModule`, `StatusCodeService` is now included only for *browser* versions of `forRoot` methods

## Version 4.0.5

- fixed decorators removed console logs

## Version 4.0.4

- returned typescript version back to 2.4.2 and removed distJit

## Version 4.0.3

- changed order of constructor parameters for ProgressIndicatorService

## Version 4.0.2

- added compiled outputs for Angular JIT

## Version 4.0.1

- fixed rxjs operators, now using pipe

## Version 4.0.0

- updated angular to 5.0.0 (final)
- changed dependencies of project to peerDependencies
- more strict compilation
- updated usage of rxjs, now using operators

## Version 4.0.0-beta.0

- updated angular to >=5.0.0-rc.7