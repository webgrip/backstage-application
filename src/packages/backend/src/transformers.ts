import {
  TeamTransformer,
  defaultOrganizationTeamTransformer, // https://github.com/backstage/backstage/blob/master/plugins/catalog-backend-module-github/src/lib/defaultTransformers.ts
  UserTransformer,
  defaultUserTransformer,
} from '@backstage/plugin-catalog-backend-module-github';

export const myTeamTransformer: TeamTransformer = async (team, ctx) => {
  const backstageTeam = await defaultOrganizationTeamTransformer(team, ctx);

  if (backstageTeam) {
    backstageTeam.metadata.namespace = 'webgrip';
    backstageTeam.metadata.description = team.description;
    backstageTeam.metadata.title = team.name;

    backstageTeam.metadata.annotations = backstageTeam.metadata.annotations || {};

    switch (team.name?.toLowerCase()) {
      case 'infrastructure':
        backstageTeam.metadata.annotations["simpleicons.org/icon-slug"] = 'rotaryinternational';
        break;
      case 'backstage':
        backstageTeam.metadata.annotations["simpleicons.org/icon-slug"] = 'backstage';
        break;
      case 'c-level':
        backstageTeam.metadata.annotations["simpleicons.org/icon-slug"] = 'protodotio';
        break;
    }
  }

  return backstageTeam;
};

export const myUserTransformer: UserTransformer = async (user, ctx) => {
  const backstageUser = await defaultUserTransformer(user, ctx);

  if (backstageUser) {
    backstageUser.metadata.namespace = 'webgrip';
    backstageUser.metadata.description = 'Loaded from GitHub Org Data';
  }

  return backstageUser;
};
