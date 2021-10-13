import type { PlaywrightTestConfig } from '@playwright/test';

type VoidResolve = Promise<void>;
type TearDown = Promise<() => VoidResolve>;

async function globalSetup(config: PlaywrightTestConfig): TearDown {
  // e.g. Project creation

  return async (): VoidResolve => {
    // // e.g. Project deletion
  };
}

// eslint-disable-next-line import/no-default-export
export default globalSetup;
