export interface DictionaryEntry {
  id: string;
  letter: string;
  imagePath: string;
  altText?: string;
}

export interface ModalConfig {
  id: string;
  imagePath: string;
  title?: string;
}

export interface CappelliConfig {
  title: string;
  baseImagePath?: string;
}