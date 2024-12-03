import {coreServices, createBackendModule} from "@backstage/backend-plugin-api";
import { MyCustomProcessor } from './MyCustomProcessor';
import { libraryCheckExtensionPoint } from "./extensions";
// import {LibraryCheckProcessor, LibraryCheckUpdaterProcessor} from "../../library-check-backend";

export const libraryCheckModuleExampleCustomProcessor = createBackendModule({
  pluginId: 'libraryCheck',
  moduleId: 'library-check-processor',
  register(env) {
    env.registerInit({
      deps: {
        libraryCheck: libraryCheckExtensionPoint,
        logger: coreServices.logger
      },
      async init({libraryCheck, logger}) {
        libraryCheck.addProcessor(new MyCustomProcessor(logger))
        // libraryCheck.addProcessor(new LibraryCheckProcessor(logger))
        // libraryCheck.addProcessor(new LibraryCheckUpdaterProcessor(logger))
      }
    })
  }
})
