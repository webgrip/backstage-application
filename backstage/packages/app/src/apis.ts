import {
  ScmIntegrationsApi,
  scmIntegrationsApiRef,
  ScmAuth,
} from '@backstage/integration-react';
import {
  AnyApiFactory,
  configApiRef,
  analyticsApiRef,
  identityApiRef,
  createApiFactory,
} from '@backstage/core-plugin-api';

import {
  catalogApiRef,
  entityPresentationApiRef,
} from '@backstage/plugin-catalog-react';

import { SimpleIconsEntityPresentationApi } from '@dweber019/backstage-plugin-simple-icons';

import { GoogleAnalytics4 } from '@backstage-community/plugin-analytics-module-ga4';

export const apis: AnyApiFactory[] = [
  createApiFactory({
    api: scmIntegrationsApiRef,
    deps: { configApi: configApiRef },
    factory: ({ configApi }) => ScmIntegrationsApi.fromConfig(configApi),
  }),
  ScmAuth.createDefaultApiFactory(),
  createApiFactory({
    api: entityPresentationApiRef,
    deps: { catalogApi: catalogApiRef },
    factory: ({ catalogApi }) => {
      return SimpleIconsEntityPresentationApi.create({ catalogApi });
    },
  }),
  createApiFactory({
    api: analyticsApiRef,
    deps: { configApi: configApiRef, identityApi: identityApiRef },
    factory: ({ configApi, identityApi }) =>
      GoogleAnalytics4.fromConfig(configApi, {
        identityApi,
      }),
  }),
];
