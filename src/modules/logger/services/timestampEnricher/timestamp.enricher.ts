// import {inject} from '@angular/core';
// import {DATE_API, DateApi} from '@anglr/datetime';

// import {LoggerEnricher} from '../../interfaces';
// import {MessageLog} from '../../types';

// const TIMESTAMP = 'timestamp';

// /**
//  * Enricher used for adding timestamp as iso datetime with current date time
//  */
// export class TimestampEnricher implements LoggerEnricher
// {
//     //######################### protected properties #########################

//     /**
//      * Date api object for obtaining date time
//      */
//     protected dateApi: DateApi = inject(DATE_API);

//     //######################### public methods - implementation of LoggerEnricher #########################

//     /**
//      * @inheritdoc
//      */
//     public enrich(properties: Record<string, unknown>, _: MessageLog<Record<string, unknown>>): void
//     {
//         properties[TIMESTAMP] = this.dateApi.now().formatISO();
//     }
// }