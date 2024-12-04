import {coreServices, createBackendModule} from "@backstage/backend-plugin-api";
import { loggerToWinstonLogger } from '@backstage/backend-common';
import { MyCustomProcessor } from './MyCustomProcessor';
import {
  libraryCheckExtensionPoint,
  LibraryCheckExtensionPoint
} from "./extensions";
// import {LibraryCheckProcessor, LibraryCheckUpdaterProcessor} from "../../library-check-backend";

export const libraryCheckModuleExampleCustomProcessor = createBackendModule({
  pluginId: 'library-check',
  moduleId: 'library-check-processor',
  register(env) {


    // Example : https://github.com/backstage/backstage/blob/99afc096e209dbee41fd9a52245d5ac4cecab05a/plugins/events-backend/src/service/EventsPlugin.ts
    // More examples: https://github.com/backstage/backstage/issues/18301

    // const extensionPoint = new libraryCheckExtensionPoint();
    // env.registerExtensionPoint(libraryCheckExtensionPoint, );

    env.registerInit({
      deps: {
        libraryCheck: libraryCheckExtensionPoint,
        logger: coreServices.logger,
        database: coreServices.database,
        config: coreServices.rootConfig,
        reader: coreServices.urlReader,
        scheduler: coreServices.scheduler,
        discovery: coreServices.discovery
      },
      //@ts-ignore
      async init({libraryCheck, logger, config, reader, scheduler, discovery}) {

        // initialDelay must be up to 15s to avoid conflicts
        const defaultSchedule = {
          initialDelay: { seconds: 15 },
          frequency: { minutes: 10 },
          timeout: { minutes: 15 },
        };

        const winstonLogger = loggerToWinstonLogger(logger); // @TODO migrate to LoggerService

        scheduler.createScheduledTaskRunner(defaultSchedule);

        libraryCheck.addProcessor(new MyCustomProcessor(winstonLogger))
        // libraryCheck.addProcessor(
        //     LibraryCheckProcessor.fromConfig(
        //       config,
        //       {
        //         reader: reader,
        //         discoveryService: discovery,
        //         logger: winstonLogger
        //       }
        //   )
        // );
        // libraryCheck.addProcessor(new LibraryCheckUpdaterProcessor(logger))
      }
    })
  }
})
