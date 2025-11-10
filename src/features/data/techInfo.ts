import type { TechInfo } from '../types/interactiveIcon';
import { frontendTech } from './tech-categories/frontend';
import { backendTech } from './tech-categories/backend';
import { frameworksTech } from './tech-categories/frameworks';
import { databaseCloudTech } from './tech-categories/databases';
import { testingTech } from './tech-categories/testing';
import { toolsTech } from './tech-categories/tools';
import { mobileTech } from './tech-categories/mobile';

export const techInfoData: Record<string, TechInfo> = {
  ...frontendTech,
  ...backendTech,
  ...frameworksTech,
  ...databaseCloudTech,
  ...testingTech,
  ...toolsTech,
  ...mobileTech,
};