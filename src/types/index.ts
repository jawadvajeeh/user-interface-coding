export type FileType = {
  type: "file";
  name: string;
};

export type FolderType = {
  type: "folder";
  name: string;
  isExpanded: boolean;
  files?: FileSystemItemType[];
};

export type FileSystemItemType = FileType | FolderType;
