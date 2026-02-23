import type { FileSystemItemType } from "@/types";
import "./styles.css";

type FilesystemProps = {
  data: FileSystemItemType[];
};

const Filesystem = ({ data }: FilesystemProps) => {
  return <FilesystemList nodes={data} />;
};

type FilesystemListProps = {
  nodes: FileSystemItemType[];
};
const FilesystemList = ({ nodes }: FilesystemListProps) => {
  return (
    <ul>
      {nodes.map((node, idx) => {
        if (node.type === "file") {
          return (
            <li key={idx}>
              <FileUI fileName={node.name} />
            </li>
          );
        }
        return (
          <li key={idx}>
            <FolderUI />
            {node.files && node.files.length > 0 && (
              <FilesystemList nodes={nodes} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

type FileUIProps = {
  fileName: string;
};
const FileUI = ({ fileName }: FileUIProps) => {
  return (
    <div>
      <div>{fileName}</div>
    </div>
  );
};

const FolderUI = () => {
  return null;
};

export { Filesystem };
