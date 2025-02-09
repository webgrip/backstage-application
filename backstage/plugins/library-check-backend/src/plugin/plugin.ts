import {coreServices, createBackendPlugin} from "@backstage/backend-plugin-api";
import {createRouter} from "./service/router";
import {loggerToWinstonLogger} from "@backstage/backend-common";
import {DatabaseLibraryCheckStore} from "./database";

// Example: https://github.com/backstage/community-plugins/blob/main/workspaces/tech-insights/plugins/tech-insights-backend/src/plugin/plugin.ts
export const libraryCheckBackend = createBackendPlugin({
  pluginId: 'library-check',
  register(env) {
    env.registerInit({
      deps: {
        config: coreServices.rootConfig,
        database: coreServices.database,
        discovery: coreServices.discovery,
        httpRouter: coreServices.httpRouter,
        logger: coreServices.logger,
        auth: coreServices.auth,
        httpAuth: coreServices.httpAuth,
      },
      async init({ config, logger, discovery, database, httpRouter, auth, httpAuth  }) {

        const databaseCheckStore = await DatabaseLibraryCheckStore.create({
          database: database,
        });

        httpRouter.use(
          await createRouter({
            config: config,
            logger: loggerToWinstonLogger(logger),
            database: databaseCheckStore,
            discovery: discovery,
            auth: auth,
            httpAuth: httpAuth,
          }),
        );
      },
    });
  },
});
