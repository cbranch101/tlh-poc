import { useContext } from "react";

import RootProviderOptionsContext from "./root-provider-options-context";

export const useLocation = (...args) => {
  const { useLocation: baseFunction } = useContext(RootProviderOptionsContext);
  return baseFunction(...args);
};

export const useHistory = (...args) => {
  const { useHistory: baseFunction } = useContext(RootProviderOptionsContext);
  return baseFunction(...args);
};

export const useZIndexMax = () => {
  const { zIndexMax } = useContext(RootProviderOptionsContext);
  return zIndexMax;
};

export const getZIndexMap = (zIndexMax) => ({
  layerManager: zIndexMax + 3,
  toasts: zIndexMax + 2,
  mainNav: zIndexMax + 1,
});

export const useZIndexMap = () => {
  const zIndexMax = useZIndexMax();
  return getZIndexMap(zIndexMax);
};
