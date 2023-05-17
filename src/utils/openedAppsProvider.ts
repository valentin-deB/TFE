// openedAppsProvider.ts
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { FileItem } from '../components/global/file/file';

export interface OpenedApp {
  id: string;
  component: any;
  uuid: string;
  filelink?: string;
  childItems?: FileItem[];
}

export const openedAppsSubject = new BehaviorSubject<OpenedApp[]>([]);
export const focusedAppUuidSubject = new BehaviorSubject<string>('');


export function addNewOpenedApp(id: string, component: any, filelink?: string, childItems?: FileItem[]) {
  const currentApps = openedAppsSubject.getValue();
  const newApp = { id, component, uuid: uuidv4(), filelink, childItems };
  openedAppsSubject.next([...currentApps, newApp]);
  focusedAppUuidSubject.next(newApp.uuid);  // update the focused app
}

export function removeOpenedApp(uuid: string) {
  const currentApps = openedAppsSubject.getValue();
  const appToRemove = currentApps.find(app => app.uuid === uuid);
  
  if (!appToRemove) {
    console.error(`No app with uuid ${uuid} found`);
    return;
  }
  
  openedAppsSubject.next(currentApps.filter((app) => app.uuid !== uuid));
}

export const openedAppsProvider = {  
  handleAddOpenedApp(e: CustomEvent<{ id: string; component: any; filelink: string; childItems?: FileItem[] }>) {
    addNewOpenedApp(e.detail.id, e.detail.component, e.detail.filelink, e.detail.childItems);
  },
};

window.addEventListener('addOpenedApp', openedAppsProvider.handleAddOpenedApp as EventListener);
