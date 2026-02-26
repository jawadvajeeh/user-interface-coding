import type { FileSystemItemType, FileType, FolderType } from "@/types";
import "./styles.css";
import { useState } from "react";
import { File, FolderClosed, FolderOpen, Pencil, X } from "lucide-react";
import { useRef } from "react";
import { useEffect } from "react";

type FilesystemProps = {
  data: FileSystemItemType[];
};

const Filesystem = ({ data }: FilesystemProps) => {
  const [nodes, setNodes] = useState(data);

  function toggleFolder(isExpanded: boolean, indices: number[]) {
    const newNodes = JSON.parse(JSON.stringify(nodes));

    const nonFirstLevelIndices = indices.slice(1);

    const nodeToUpdate = nonFirstLevelIndices.reduce(
      (node, idx) => node.files[idx],
      newNodes[indices[0]],
    ) as FolderType;

    nodeToUpdate.isExpanded = !isExpanded;

    setNodes(newNodes);
  }

  function handleRename(name: string, indices: number[]) {
    console.log(indices);
    const newNodes = JSON.parse(JSON.stringify(nodes));

    const nonFirstLevelIndices = indices.slice(1);

    const nodeToUpdate = nonFirstLevelIndices.reduce(
      (node, idx) => node.files[idx],
      newNodes[indices[0]],
    ) as FolderType | FileType;

    nodeToUpdate.name = name;

    setNodes(newNodes);
  }

  return (
    <div className="filesystem">
      <FilesystemList
        onRenameFileOrFolder={handleRename}
        toggleFolder={toggleFolder}
        nodes={nodes}
      />
    </div>
  );
};

type FilesystemListProps = {
  nodes: FileSystemItemType[];
  toggleFolder: (isExpanded: boolean, indices: number[]) => void;
  onRenameFileOrFolder: (fileName: string, indices: number[]) => void;
};
const FilesystemList = ({
  nodes,
  toggleFolder = () => {},
  onRenameFileOrFolder = () => {},
}: FilesystemListProps) => {
  return (
    <ul>
      {nodes.map((node, idx) => {
        if (node.type === "file") {
          return (
            <li key={idx}>
              <FileNode
                nodeType={node.type}
                nodeName={node.name}
                rename={(nodeName) => onRenameFileOrFolder(nodeName, [idx])}
              />
            </li>
          );
        }
        return (
          <li key={idx}>
            <FileNode
              onClick={() => toggleFolder(node.isExpanded, [idx])}
              isExpanded={node.isExpanded}
              nodeType={node.type}
              nodeName={node.name}
              rename={(nodeName) => onRenameFileOrFolder(nodeName, [idx])}
            />
            {node.files && node.files.length > 0 && node.isExpanded && (
              <FilesystemList
                toggleFolder={(isExpanded, indices) =>
                  toggleFolder(isExpanded, [idx, ...indices])
                }
                onRenameFileOrFolder={(fileName, indices) => {
                  console.log(node.name, indices);
                  onRenameFileOrFolder(fileName, [idx, ...indices]);
                }}
                nodes={node.files}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

type FileNodeBaseProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> & {
  nodeName: string;
  rename: (nodeName: string) => void;
};

type FileNodeProps =
  | (FileNodeBaseProps & {
      nodeType: "file";
    })
  | (FileNodeBaseProps & {
      nodeType: "folder";
      isExpanded: boolean;
    });

function FileNode(props: FileNodeProps) {
  const { nodeType, nodeName, rename, ...buttonProps } = props;
  const isExpanded = nodeType === "folder" ? props.isExpanded : undefined;

  const [isEdit, setIsEdit] = useState(false);
  const [fileNameValue, setFileNameValue] = useState(nodeName);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (!inputRef.current) return;
    if (isEdit) {
      inputRef.current.focus();
    }
  }, [isEdit]);
  return (
    <div className="file">
      {nodeType === "folder" ? (
        isExpanded ? (
          <FolderOpen size={16} style={{ flexShrink: 0 }} />
        ) : (
          <FolderClosed size={16} style={{ flexShrink: 0 }} />
        )
      ) : (
        <File size={16} style={{ flexShrink: 0 }} />
      )}
      <button className="filename" {...buttonProps}>
        {isEdit ? (
          <input
            ref={inputRef}
            style={{ fontSize: "inherit", background: "transparent" }}
            onBlur={() => {
              setIsEdit(false);
              // setFileNameValue(fileName);
              rename(fileNameValue);
            }}
            type="text"
            value={fileNameValue}
            onChange={(e) => setFileNameValue(e.target.value)}
          />
        ) : (
          <div>{nodeName}</div>
        )}
      </button>
      <div className="actions">
        <button
          onClick={() => setIsEdit(true)}
          style={{ background: "transparent", border: "none" }}
        >
          <Pencil size={16} />
        </button>
      </div>
    </div>
  );
}

export { Filesystem };
