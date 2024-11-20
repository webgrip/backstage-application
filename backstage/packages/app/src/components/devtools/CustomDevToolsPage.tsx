import {
    ConfigContent,
    ExternalDependenciesContent,
    InfoContent,
} from '@backstage/plugin-devtools';
import { DevToolsLayout } from '@backstage/plugin-devtools';
import React from 'react';
import {CatalogUnprocessedEntitiesPage} from "@backstage/plugin-catalog-unprocessed-entities";
import {RequirePermission} from "@backstage/plugin-permission-react";
import {
    devToolsAdministerPermission,
    devToolsConfigReadPermission,
    devToolsExternalDependenciesReadPermission, devToolsInfoReadPermission
} from "@backstage/plugin-devtools-common";

const DevToolsPage = () => {
    return (
        <DevToolsLayout>
            <DevToolsLayout.Route path="info" title="Info">
                <RequirePermission permission={devToolsInfoReadPermission}>
                    <InfoContent />
                </RequirePermission>
            </DevToolsLayout.Route>
            <DevToolsLayout.Route path="config" title="Config">
                <RequirePermission permission={devToolsConfigReadPermission}>
                    <ConfigContent />
                </RequirePermission>
            </DevToolsLayout.Route>
            <DevToolsLayout.Route
                path="external-dependencies"
                title="External Dependencies"
            >
                <RequirePermission
                    permission={devToolsExternalDependenciesReadPermission}
                >
                    <ExternalDependenciesContent />
                </RequirePermission>
            </DevToolsLayout.Route>
            <DevToolsLayout.Route
                path="unprocessed-entities"
                title="Unprocessed Entities"
            >
                <RequirePermission permission={devToolsAdministerPermission}>
                    <CatalogUnprocessedEntitiesPage />
                </RequirePermission>
            </DevToolsLayout.Route>
        </DevToolsLayout>
    );
};

export const customDevToolsPage = <DevToolsPage />;



