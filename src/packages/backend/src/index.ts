import { createBackend } from '@backstage/backend-defaults';
import { createBackendModule } from '@backstage/backend-plugin-api';
import { githubAuthenticator } from '@backstage/plugin-auth-backend-module-github-provider';
import {
    authProvidersExtensionPoint,
    createOAuthProviderFactory,
} from '@backstage/plugin-auth-node';
import { stringifyEntityRef } from '@backstage/catalog-model';
import { githubOrgEntityProviderTransformsExtensionPoint } from '@backstage/plugin-catalog-backend-module-github-org';
import { myTeamTransformer, myUserTransformer } from "./transformers";
// import {ragAiOptions} from "./ragAiOptions";

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

const customAuth = createBackendModule({
    pluginId: 'auth',
    moduleId: 'webgrip-custom-auth-provider',
    register(reg) {
        reg.registerInit({
            deps: { providers: authProvidersExtensionPoint },
            async init({ providers }) {
                providers.registerProvider({
                    providerId: 'github',
                    factory: createOAuthProviderFactory({
                        authenticator: githubAuthenticator,
                        async signInResolver(info, ctx) {
                             const username =
                                info.result.fullProfile?.username ??
                                info.result.fullProfile?.id;

                                return ctx.signInWithCatalogUser({
                                    entityRef: stringifyEntityRef({
                                        kind: 'User',
                                        namespace: 'webgrip',
                                        name: username!,
                                    }),
                                });
                        },
                    }),
                });
            },
        });
    },
});


const backend = createBackend();

backend.add(import('@backstage/plugin-app-backend'));
backend.add(import('@backstage/plugin-proxy-backend'));

// scaffolder plugin
backend.add(import('@backstage/plugin-scaffolder-backend'));
backend.add(import('@backstage/plugin-scaffolder-backend-module-github'));
backend.add(
    import('@backstage/plugin-scaffolder-backend-module-notifications'),
);

// techdocs plugin
backend.add(import('@backstage/plugin-techdocs-backend'));

// auth plugin
backend.add(import('@backstage/plugin-auth-backend'));
// See https://backstage.io/docs/backend-system/building-backends/migrating#the-auth-plugin
backend.add(import('@backstage/plugin-auth-backend-module-guest-provider'));
// See https://backstage.io/docs/auth/guest/provider

// Custom auth instead of the default implementation
// backend.add(import('@backstage/plugin-auth-backend-module-github-provider'));
backend.add(customAuth);

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

// kubernetes plugin
backend.add(import('@backstage/plugin-kubernetes-backend'));

// notifications and signals plugin
backend.add(import('@backstage/plugin-notifications-backend'));
backend.add(import('@backstage/plugin-signals-backend'));

// ADR
backend.add(import('@backstage-community/plugin-adr-backend'));

// devtools
backend.add(import('@backstage/plugin-devtools-backend'));

backend.start();
