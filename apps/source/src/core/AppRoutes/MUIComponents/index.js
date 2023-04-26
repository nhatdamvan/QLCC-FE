import { inputsConfigs } from "./InputRoutes";
import { navigationConfigs } from "./NavigationRoutes";
import { surfaceConfigs } from "./SurfaceRoutes";
import { utilConfigs } from "./UtillRoutes";
import { labConfigs } from "./LabRoutes";

export const muiComponentConfigs = [
  ...inputsConfigs,
  ...navigationConfigs,
  ...surfaceConfigs,
  ...utilConfigs,
  ...labConfigs,
];
