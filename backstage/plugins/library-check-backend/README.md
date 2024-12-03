# Library Check Backend

Welcome to the library-check-backend backend plugin!

_This plugin was created through the Backstage CLI_


### Setup instructions:

Add the plugin to your backend app:

```bash
cd packages/backend && yarn add @anakz/backstage-plugin-library-check-backend
```

Create new file at packages/backend/src/plugins/libraryCheck.ts:

```ts

// packages/backend/src/plugins/libraryCheck.ts

import { PluginEnvironment } from '../types';
import { Router } from 'express';
import {
  DatabaseLibraryCheckStore,
  createRouter,
} from '@anakz/backstage-plugin-library-check-backend';

export default async function createPlugin({
  logger,
  database,
  config,
}: PluginEnvironment): Promise<Router> {
  const db = await DatabaseLibraryCheckStore.create({
    database: database,
  });
  return await createRouter({
    logger,
    database: db,
    config,
  });
}
```

Define the schedules for the plugin processor and provider on packages/backend/src/plugins/catalog.ts

```ts

// packages/backend/src/plugins/catalog.ts

// ...
builder.addEntityProvider(

    // add a new provider entry, configure the schedule frequency as you wish
    // initialDelay must be up to 15s to avoid conflicts

    LibraryCheckProvider.fromConfig({
      config: env.config,
      envId: 'production',
      logger: env.logger,
      discovery: env.discovery,
      schedule: env.scheduler.createScheduledTaskRunner({
        initialDelay: {
          seconds: 15,
        },
        frequency: {
          minutes: 60,
        },
        timeout: {
          minutes: 1,
        },
      }),
    }),

    // ...
)

// Add the new processor entries, and try to declare the LibraryCheckUpdater as the last in order.

  builder.addProcessor(
    // ...

    LibraryCheckProcessor.fromConfig(env.config, {
      discoveryService: env.discovery,
      reader: env.reader,
      logger: env.logger,
    }),

    // Other processors...
    
    LibraryCheckUpdaterProcessor.fromConfig(env.config, {
      discoveryService: env.discovery,
      reader: env.reader,
      logger: env.logger,
    }),

    // ...
  );


```

Now add the plugin to your packages/backend/src/index.ts:

```ts
import libraryCheck from './plugins/libraryCheck';

// ...
const libraryCheckEnv = useHotMemoize(module, () => createEnv('libraryCheck'));

// ...
  apiRouter.use('/library-check', await libraryCheck(libraryCheckEnv));
```