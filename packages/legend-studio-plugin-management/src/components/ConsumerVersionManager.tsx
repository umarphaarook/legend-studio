/**
 * Copyright (c) 2020-present, Goldman Sachs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useEffect, useRef } from 'react';
import { flowResult } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';
import {
  AppHeader,
  AppHeaderMenu,
  ProjectSelector,
  SetupStoreProvider,
  useSetupStore,
} from '@finos/legend-studio';
import {
  useApplicationStore,
  NotificationSnackbar,
} from '@finos/legend-application';
import type { SelectComponent } from '@finos/legend-art';

const ConsumerVersionManagerComponent = observer(() => {
  const setupStore = useSetupStore();
  const projectSelectorRef = useRef<SelectComponent>(null);
  return (
    <div className="app__page">
      <AppHeader>
        <AppHeaderMenu />
      </AppHeader>
      <div className="app__content">
        <div className="plugin__consumer-version-manager">
          <div className="plugin__consumer-version-manager__selectors">
            <div className="plugin__consumer-version-manager__selectors__project">
              <ProjectSelector
                ref={projectSelectorRef}
                onChange={(): string => ''}
                create={(): string => ''}
                externalUse={true}
              />
            </div>
          </div>
          <div className="plugin__consumer-version-manager__title-and-buttons">
            {setupStore.currentProjectId && (
              <>
                <div className="plugin__consumer-version-manager__title-and-buttons__title">
                  Consumer Version Management
                </div>
                <div className="plugin__consumer-version-manager__title-and-buttons__buttons">
                  <button>Test Compatibility</button>
                  <button>Bulk Update</button>
                </div>
              </>
            )}
          </div>
          <div className="plugin__consumer-version-manager__table">
            {setupStore.currentProjectId ? (
              <table>
                <caption>{`All Consumers of this project are shown here.
                  Click update to force them to migrate to latest version.`}</caption>
                <thead>
                  <tr>
                    <th>Consumer Project</th>
                    <th>Consumer Gitlab ID</th>
                    <th>Consumer Owner</th>
                    <th>Dependent Upon</th>
                    <th>Consumer Platform Version</th>
                    <th>Latest Version</th>
                    <th>Last Update</th>
                    <th>Consumer Compatibility with Local</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>data-model-ops-tax</td>
                    <td>PROD-1234</td>
                    <td>Jeanie</td>
                    <td>Version 1.1</td>
                    <td>1.0</td>
                    <td>No</td>
                    <td>March 8, 2021</td>
                    <td className="plugin__consumer-version-manager__table__cell--incompatible">
                      Incompatible (INFO)
                    </td>
                    <td className="plugin__consumer-version-manager__table__cell--center">
                      <button>Update</button>
                    </td>
                  </tr>
                  <tr>
                    <td>data-model-ops-tax</td>
                    <td>PROD-1234</td>
                    <td>Jeanie</td>
                    <td>Version 1.1</td>
                    <td>1.0</td>
                    <td>No</td>
                    <td>March 8, 2021</td>
                    <td>Compatible</td>
                    <td className="plugin__consumer-version-manager__table__cell--center">
                      <button>Update</button>
                    </td>
                  </tr>
                  <tr>
                    <td>data-model-ops-tax</td>
                    <td>PROD-1234</td>
                    <td>Jeanie</td>
                    <td>Version 1.1</td>
                    <td>{''}</td>
                    <td>No</td>
                    <td>March 8, 2021</td>
                    <td className="plugin__consumer-version-manager__table__cell--incompatible">
                      Incompatible
                    </td>
                    <td className="plugin__consumer-version-manager__table__cell--center">
                      <button>Update</button>
                    </td>
                  </tr>
                  <tr>
                    <td>data-model-ops-tax</td>
                    <td>PROD-1234</td>
                    <td>Jeanie</td>
                    <td>Version 1.1</td>
                    <td className="plugin__consumer-version-manager__table__cell--center">
                      <input type="checkbox" />
                    </td>
                    <td>{''}</td>
                    <td>March 8, 2021</td>
                    <td>Compatible</td>
                    <td className="plugin__consumer-version-manager__table__cell--center">
                      <input type="checkbox" />
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <td className="plugin__consumer-version-manager__no-data">
                <h1>Select Project</h1>
              </td>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export const WithProjects = observer(() => {
  const setupStore = useSetupStore();
  const applicationStore = useApplicationStore();

  useEffect(() => {
    flowResult(setupStore.fetchProjects()).catch(
      applicationStore.alertIllegalUnhandledError,
    );
    if (setupStore.currentProjectId) {
      flowResult(setupStore.fetchWorkspaces(setupStore.currentProjectId)).catch(
        applicationStore.alertIllegalUnhandledError,
      );
    }
  }, [applicationStore, setupStore]);

  return <ConsumerVersionManagerComponent />;
});

export const ConsumerVersionManager: React.FC = () => (
  <SetupStoreProvider>
    <WithProjects />
  </SetupStoreProvider>
);
