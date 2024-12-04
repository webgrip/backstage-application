import { createExtensionPoint } from '@backstage/backend-plugin-api';
// import {LibraryCheckProcessor, LibraryCheckUpdaterProcessor} from "./processors";
import {MyCustomProcessor} from "./MyCustomProcessor";

export interface LibraryCheckExtensionPoint {
  addProcessor(
    ...processors: Array<MyCustomProcessor | Array<MyCustomProcessor>>
  ): void;
}

export const libraryCheckExtensionPoint =
  createExtensionPoint<LibraryCheckExtensionPoint>({
    id: 'library-check'
  })
