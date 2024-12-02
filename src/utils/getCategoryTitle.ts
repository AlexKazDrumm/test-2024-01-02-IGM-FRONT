import catalogSettings from "@/config/catalogConfig";
import { CatalogType } from "@/types";

export const getCategoryTitle = (type: CatalogType): string => {
  return catalogSettings[type]?.search.title || 'Категория';
};