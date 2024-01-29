import * as fs from 'fs';

import { Memoize } from 'typescript-memoize';

import { BooleanUtils } from '../common/domain/BooleanUtils';

export class ArchConfiguration {
  private static readonly ARCHUNIT_TS_PROPERTIES_RESOURCE_NAME: string = 'arch-unit-ts.json';

  readonly showImportsWarning: boolean;

  constructor(showImportsWarning: boolean) {
    this.showImportsWarning = showImportsWarning;
  }

  @Memoize()
  public static get(): ArchConfiguration {
    return this.getFromPath(ArchConfiguration.ARCHUNIT_TS_PROPERTIES_RESOURCE_NAME);
  }

  static getFromPath(configPath: string): ArchConfiguration {
    if (!fs.existsSync(configPath)) {
      console.warn(`No configuration found in classpath at ${configPath} => Using default configuration`);
      return new ArchConfiguration(true);
    }

    const jsonData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    return new ArchConfiguration(BooleanUtils.falseIfUndefined(jsonData.showImportsWarning));
  }
}
