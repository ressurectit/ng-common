import {ClassProvider, ValueProvider, Provider, EnvironmentProviders, importProvidersFrom, provideExperimentalZonelessChangeDetection} from '@angular/core';
import {provideClientHydration} from '@angular/platform-browser';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {LocalPermanentStorage} from '@anglr/common/store';
import {GlobalizationService, providePosition, provideLoggerConfig, DeveloperConsoleSink, LogLevelEnricher, TimestampEnricher, LogLevel, ConsoleComponentSink, RestSink, providePermanentStorage, TOOLTIP_OPTIONS, TooltipOptions} from '@anglr/common';
import {ReservedSpaceValidationErrorsContainerComponent, ValidationErrorRendererFactoryOptions, VALIDATION_ERROR_MESSAGES, VALIDATION_ERROR_RENDERER_FACTORY_OPTIONS} from '@anglr/common/forms';
import {MovableTitledDialogComponent, TitledDialogServiceOptions, TitledDialogService, provideConfirmationDialogOptions} from '@anglr/common/material';
import {FloatingUiDomPosition} from '@anglr/common/floating-ui';
import {RecursivePartial} from '@jscrpt/common';

import {routes} from './app.component.routes';
import {GlobalizationService as GlobalizationServiceImpl} from '../services/globalization/globalization.service';

/**
 * Array of providers that are used in app module
 */
export const appProviders: (Provider|EnvironmentProviders)[] =
[
    //######################### ROUTER #########################
    provideRouter(routes,
                  withComponentInputBinding()),

    //######################### CLIENT HYDRATION #########################
    provideClientHydration(),


    //######################### ZONELESS #########################
    provideExperimentalZonelessChangeDetection(),

    //######################### GLOBALIZATION SERVICE #########################
    <ClassProvider>
    {
        provide: GlobalizationService,
        useClass: GlobalizationServiceImpl
    },

    //######################### TOOLTIP #########################
    <ValueProvider>
    {
        provide: TOOLTIP_OPTIONS,
        useValue: <RecursivePartial<TooltipOptions>>
        {
            stopPropagation: true,
        }
    },

    //######################### PERMANENT STORAGE #########################
    providePermanentStorage(LocalPermanentStorage),

    //######################### LOGGER #########################
    provideLoggerConfig(config => config
        .writeTo(cfg => cfg.writeTo(ConsoleComponentSink)
                           .minimumLevel(LogLevel.Information))
        .writeTo(cfg => cfg.writeTo(RestSink)
                           .minimumLevel(LogLevel.Error))
        .writeTo(DeveloperConsoleSink)
        .enrichWith(LogLevelEnricher)
        .enrichWith(TimestampEnricher)
        .minimumLevel(LogLevel.Information)
        .messageTemplate('{{timestamp}} [{{logLevel}}] {{messageLog}}')),

    //######################### VALIDATION ERRORS #########################
    <ValueProvider>
    {
        provide: VALIDATION_ERROR_MESSAGES,
        useValue:
        {
            required: 'Položka je povinná.',
            number: 'Položka musí byť číslo.',
            pattern: 'Položka nie je v požadovanom formáte.',
            minValue: 'Nedodržaná minimálna povolená hodnota.',
            maxValue: 'Nedodržaná maximálna povolená hodnota.',
            minlength: 'Nedodržaná minimálna dĺžka.',
            maxlength: 'Nedodržaná maximálna dĺžka.',
            birthNumber: 'Nesprávny formát rodného čísla.',
            email: 'Položka musí byť email.',
            availableUsername: 'Prihlasovacie meno je použité',
        }
    },
    <ValueProvider>
    {
        provide: VALIDATION_ERROR_RENDERER_FACTORY_OPTIONS,
        useValue: <ValidationErrorRendererFactoryOptions>
        {
            container: ReservedSpaceValidationErrorsContainerComponent
        }
    },

    //######################### TITLED DIALOG #########################
    importProvidersFrom(MatDialogModule),
    TitledDialogService,
    <ValueProvider>
    {
        provide: TitledDialogServiceOptions,
        useValue: new TitledDialogServiceOptions(MovableTitledDialogComponent)
    },

    //######################### CONFIRMATION DIALOG #########################
    provideConfirmationDialogOptions(
    {
        cssClasses:
        {
            closeButton: 'btn btn-danger margin-right-small',
        },
        confirmationText: 'Prajete si pokračovať?',
        dialogCancelText: 'Nie',
        dialogConfirmText: 'Áno',
    }),

    //######################### POSITION #########################
    providePosition(FloatingUiDomPosition),
];
