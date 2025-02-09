import { createBackend } from '@backstage/backend-defaults';
import {
    coreServices,
    createBackendModule
} from '@backstage/backend-plugin-api';
import { githubOrgEntityProviderTransformsExtensionPoint } from '@backstage/plugin-catalog-backend-module-github-org';
import {myTeamTransformer, myUserTransformer} from "./transformers";
// import {ragAiOptions} from "./ragAiOptions";
import {
    makeLegacyPlugin,
    loggerToWinstonLogger
} from '@backstage/backend-common';
import {catalogProcessingExtensionPoint} from "@backstage/plugin-catalog-node/alpha";
import {LibraryCheckProcessor, LibraryCheckUpdaterProcessor} from "../../../plugins/library-check-backend";
// import createPlugin from "./plugins/libraryCheck";
// import database = coreServices.database;

// const legacyPlugin = makeLegacyPlugin(
//   {
//       cache: coreServices.cache,
//       config: coreServices.rootConfig,
//       database: coreServices.database,
//       discovery: coreServices.discovery,
//       logger: coreServices.logger,
//       permissions: coreServices.permissions,
//       scheduler: coreServices.scheduler,
//       reader: coreServices.urlReader,
//       httpRouter: coreServices.httpRouter,
//       auth: coreServices.auth,
//       httpAuth: coreServices.httpAuth,
//   },
//   {
//       logger: log => loggerToWinstonLogger(log),
//   },
// );

const githubOrgModule = createBackendModule({
    pluginId: 'catalog',
    moduleId: 'github-org-extensions',
    register(env) {
        env.registerInit({
            deps: {
                githubOrg: githubOrgEntityProviderTransformsExtensionPoint,
            },
            async init({ githubOrg }) {
                githubOrg.setTeamTransformer(myTeamTransformer);
                githubOrg.setUserTransformer(myUserTransformer);
            },
        });
    },
});

const libraryCheckModule = createBackendModule({
    pluginId: 'catalog', // name of the plugin that the module is targeting
    moduleId: 'library-check',
    register(env) {
        env.registerInit({
            deps: {
                catalog: catalogProcessingExtensionPoint,
                logger: coreServices.logger,
                scheduler: coreServices.scheduler,
                reader: coreServices.urlReader,
                discovery: coreServices.discovery,
                config: coreServices.rootConfig,
            },
            async init({ catalog, logger, scheduler, reader, discovery, config }) {

                const defaultSchedule = {
                    initialDelay: { seconds: 15 },
                    frequency: { minutes: 10 },
                    timeout: { minutes: 15 },
                };

                scheduler.createScheduledTaskRunner(defaultSchedule);

                const winstonLogger = loggerToWinstonLogger(logger); // @TODO migrate to LoggerService
                // Here you have the opportunity to interact with the extension
                // point before the plugin itself gets instantiated
                // catalog.addEntityProvider(new MyEntityProvider()); // just an example
                catalog.addProcessor(
                  LibraryCheckProcessor.fromConfig(
                    config,
                    {
                        reader: reader,
                        discoveryService: discovery,
                        logger: winstonLogger
                    }
                  )
                );
                catalog.addProcessor(
                  LibraryCheckUpdaterProcessor.fromConfig(
                    config,
                    {
                        reader: reader,
                        discoveryService: discovery,
                        logger: winstonLogger
                    }
                  )
                );
            },
        });
    },
});


const backend = createBackend();

backend.add(import('@backstage/plugin-app-backend'));
backend.add(import('@backstage/plugin-proxy-backend'));
backend.add(import('@backstage/plugin-scaffolder-backend'));
backend.add(import('@backstage/plugin-techdocs-backend'));

// auth plugin
backend.add(import('@backstage/plugin-auth-backend'));
// See https://backstage.io/docs/backend-system/building-backends/migrating#the-auth-plugin
backend.add(import('@backstage/plugin-auth-backend-module-guest-provider'));
// See https://backstage.io/docs/auth/guest/provider
backend.add(import('@backstage/plugin-auth-backend-module-github-provider'));

// catalog plugin
backend.add(import('@backstage/plugin-catalog-backend'));
backend.add(
  import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'),
);
backend.add(import('@backstage/plugin-catalog-backend-module-github'));
backend.add(import('@backstage/plugin-catalog-backend-module-github-org'));
backend.add(githubOrgModule);

// See https://backstage.io/docs/features/software-catalog/configuration#subscribing-to-catalog-errors
backend.add(import('@backstage/plugin-catalog-backend-module-logs'));

// See https://github.com/backstage/backstage/blob/master/plugins/catalog-backend-module-unprocessed/README.md
backend.add(import('@backstage/plugin-catalog-backend-module-unprocessed'));

// permission plugin
backend.add(import('@backstage/plugin-permission-backend'));
// See https://backstage.io/docs/permissions/getting-started for how to create your own permission policy
backend.add(import('./extensions/permissionsPolicyExtension'));


// search plugin
backend.add(import('@backstage/plugin-search-backend'));

// search engine
// See https://backstage.io/docs/features/search/search-engines
backend.add(import('@backstage/plugin-search-backend-module-pg'));

// search collators
backend.add(import('@backstage/plugin-search-backend-module-catalog'));
backend.add(import('@backstage/plugin-search-backend-module-techdocs'));

backend.add(import('@backstage-community/search-backend-module-adr'));

// kubernetes
backend.add(import('@backstage/plugin-kubernetes-backend'));

// ADR
backend.add(import('@backstage-community/plugin-adr-backend'));

// devtools
backend.add(import('@backstage/plugin-devtools-backend'));

backend.add(import('../../../plugins/library-check-backend'));

backend.add(libraryCheckModule);

backend.start();
