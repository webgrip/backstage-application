import { createBackendModule } from '@backstage/backend-plugin-api';
import { policyExtensionPoint } from '@backstage/plugin-permission-node/alpha';

import CustomPermissionPolicy from "../policies/CustomPermissionPolicy";

export default createBackendModule({
    pluginId: 'permission',
    moduleId: 'permission-policy',
    register(reg) {
        reg.registerInit({
            deps: { policy: policyExtensionPoint },
            async init({ policy }) {
                policy.setPolicy(new CustomPermissionPolicy());
            },
        });
    },
});