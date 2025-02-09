// @ts-ignore

import { Router } from 'express';
import {
  DatabaseLibraryCheckStore,
  createRouter,
} from '../../../plugins/library-check-backend';
import {
  PluginDatabaseManager,
} from '@backstage/backend-common';
import { Logger } from 'winston';
import { Config } from '@backstage/config';

export default async function createPlugin({
                                             logger,
                                             database,
                                             config,
                                           }: {
  logger: Logger,
  database: PluginDatabaseManager,
  config: Config
}): Promise<Router> {
  const db = await DatabaseLibraryCheckStore.create({
    database: database,
  });
  //@ts-ignore
  return await createRouter({
    logger: logger,
    database: db,
    config: config,

  });
}
