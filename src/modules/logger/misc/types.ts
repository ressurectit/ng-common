import {Action1} from '@jscrpt/common';

import {LogLevel} from '../types';
import {LoggerConfiguration, LoggerSinkType} from '../interfaces';

/**
 * Getter for obtaining minimum log level
 */
export type MinLogLevelGetter = () => LogLevel;

/**
 * Factory that is used for obtaining minimum log level getter
 */
export type MinLogLevelGetterFactory = () => MinLogLevelGetter;

/**
 * Static log level, or function that returns log level or function that returns function which is used like getter for log level
 */
export type MinimumLevelConfig = LogLevel|MinLogLevelGetter|MinLogLevelGetterFactory;

/**
 * Type of sink or function that creates sublogger with custom configuration
 */
export type WriteToConfig = LoggerSinkType|Action1<LoggerConfiguration>;