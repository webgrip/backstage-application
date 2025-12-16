import {
    PermissionPolicy,
    PolicyQuery,
    PolicyQueryUser,
} from '@backstage/plugin-permission-node';
import {
    AuthorizeResult,
    isPermission,
    isResourcePermission, Permission,
    PolicyDecision,
} from '@backstage/plugin-permission-common';
import {
    devToolsAdministerPermission,
    devToolsConfigReadPermission,
    devToolsExternalDependenciesReadPermission,
    devToolsInfoReadPermission,
} from '@backstage/plugin-devtools-common';
import {
    catalogConditions,
    createCatalogConditionalDecision,
} from '@backstage/plugin-catalog-backend/alpha';

class CustomPermissionPolicy implements PermissionPolicy {
    // Define a mapping of permissions to allowed groups for better scalability
    private permissionGroupMap: {
        permissions: Permission[];
        allowedGroups: string[];
    }[] = [
        {
            permissions: [
                devToolsAdministerPermission,
                devToolsInfoReadPermission,
                devToolsConfigReadPermission,
                devToolsExternalDependenciesReadPermission,
            ],
            allowedGroups: ['group:webgrip/backstage'],
        },
    ];

    async handle(
        request: PolicyQuery,
        user?: PolicyQueryUser,
    ): Promise<PolicyDecision> {
        const { permission } = request;

        // Check if the permission matches any in the permissionGroupMap
        for (const mapping of this.permissionGroupMap) {
            if (mapping.permissions.some(p => isPermission(permission, p))) {
                const isMember = mapping.allowedGroups.some(group =>
                    user?.info.ownershipEntityRefs.includes(group),
                );
                return {
                    result: isMember ? AuthorizeResult.ALLOW : AuthorizeResult.DENY,
                };
            }
        }

        // Handle catalog-entity permissions with conditional decisions
        if (isResourcePermission(permission, 'catalog-entity')) {
            return createCatalogConditionalDecision(permission, {
                anyOf: [
                    catalogConditions.isEntityOwner({
                        claims: user?.info.ownershipEntityRefs ?? [],
                    }),
                    catalogConditions.isEntityKind({
                        kinds: ['group', 'user', 'location'],
                    }),
                    catalogConditions.hasAnnotation({
                        annotation: 'backstage.io/visibility', // TODO test this
                        value: 'public',
                    })
                ],
            });
        }

        // Default to DENY for unknown permissions to enhance security
        return { result: AuthorizeResult.ALLOW };
    }
}

export default CustomPermissionPolicy;
