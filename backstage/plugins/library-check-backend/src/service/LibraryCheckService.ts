import { RegistryService } from './RegistryService';
import { Library, LibraryUpdateRecord } from '../types';
import axios from 'axios';

// TODO: Get rid of console logs
export class LibraryCheckService {
  private readonly registryService: RegistryService;

  constructor() {
    this.registryService = new RegistryService();
  }

  async getLastChecked(
    url: string,
    timeString: string | null,
  ): Promise<Library[]> {
    let libraries: Library[] = [];

    try {
      // TODO: Check by date of last change on entity
      const response = await axios.get(
        `${url}/libraries/search?registry_last_check=${timeString}`,
      );
      libraries = response.data;
    } catch (error) {
      console.log(
        'LibraryCheckService: Error trying to search for pending libraries to check on registry',
      );
    }

    return libraries;
  }

  async saveLibraries(libraries: Library[], endpoint: string): Promise<void> {
    try {
      await axios.post(endpoint, libraries);
    } catch (error) {
      console.log(
        `LibraryCheckService: Error trying to save libraries on database`,
      );
    }
  }

  async updateLibraries(response: Library[], baseUrl: string): Promise<any> {
    const cleanResults = response.filter(obj => obj.name.length !== 0);

    for (const dep of cleanResults) {
      try {
        // Fetch data on the official registries
        const data = await this.registryService.fetchRegistryData(dep);
        // Update libraries table with latest_version from oficial registry
        await axios.put(`${baseUrl}/libraries/update`, data);
      } catch (error) {
        console.log(
          `LibraryCheckService: Error trying to update ${dep.name} on database`,
        );
      }
    }
  }

  async getLibrariesData(
    baseUrl: string,
    payload: string[],
  ): Promise<Library[]> {
    let libraries: Library[] = [];

    try {
      const res = await axios.post(`${baseUrl}/libraries/search`, payload);

      libraries = res.data;
    } catch (error) {
      console.log(
        'LibraryCheckService: Error trying to search for libraries on database',
      );
    }

    return libraries;
  }

  async saveLibraryUpdateRegistry(
    baseUrl: string,
    payload: LibraryUpdateRecord[],
  ): Promise<any> {
    let response: string = '';

    try {
      const res = await axios.post(`${baseUrl}/libraries-updates`, payload);

      response = res.statusText;
    } catch (error) {
      console.log(
        'LibraryCheckService: Error trying to update libraries occurrences records on entities_libraries table',
        error,
      );
    }

    return response;
  }
}
