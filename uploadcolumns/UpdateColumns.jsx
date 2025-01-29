import React, { useState, useEffect } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const ItemType = "COLUMN";

const UpdateColumns = ({
  columns,
  columnVisibility,
  onColumnVisibilityChange,
  onColumnReorder,
  onColumnPin,
}) => {
  const [frozenColumns, setFrozenColumns] = useState([]);
  const [unfrozenColumns, setUnfrozenColumns] = useState(columns);

  useEffect(() => {
    setUnfrozenColumns(columns.filter((col) => !frozenColumns.includes(col)));
  }, [columns, frozenColumns]);

  const handleDrop = (draggedColumnId, targetZone, dropIndex) => {
    const column = columns.find((col) => col.id === item.id);
    if (isFrozen) {
      setFrozenColumns((prev) => [...prev, column]);
      setUnfrozenColumns((prev) => prev.filter((col) => col.id !== item.id));
      onColumnPin(item.id, true);
    } else {
      setFrozenColumns((prev) => prev.filter((col) => col.id !== item.id));
      setUnfrozenColumns((prev) => [...prev, column]);
      onColumnPin(item.id, false);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <DropZone
        onDrop={(item, index) => handleDrop(item, "pinned", index)}
        index={0}
      >
        <h4>Frozen Columns</h4>
        {frozenColumns.map((column, index) => (
          <DraggableColumn
            key={column.id}
            column={column}
            index={index}
            moveColumn={(dragIndex, hoverIndex) =>
              handleDrop(column.id, "pinned", hoverIndex)
            }
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={onColumnVisibilityChange}
          />
        ))}
      </DropZone>

      <DropZone
        onDrop={(item, index) => handleDrop(item, "unpinned", index)}
        index={1}
      >
        <h4>Unfrozen Columns</h4>
        {unfrozenColumns.map((column, index) => (
          <DraggableColumn
            key={column.id}
            column={column}
            index={index}
            moveColumn={(dragIndex, hoverIndex) =>
              handleDrop(column.id, "unpinned", hoverIndex)
            }
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={onColumnVisibilityChange}
          />
        ))}
      </DropZone>
    </DndProvider>
  );
};

const DropZone = ({ onDrop, children }) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item) => onDrop(item),
  });
  return (
    <div ref={drop} style={{ minHeight: "100px" }}>
      {children}
    </div>
  );
};

const DraggableColumn = ({
  column,
  index,
  moveColumn,
  columnVisibility,
  onColumnVisibilityChange,
}) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item) => {
      if (!ref.current || item.index === index) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      moveColumn(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id: column.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "8px 16px",
        margin: "4px 0",
        border: "1px solid #ddd",
        borderRadius: "4px",
        backgroundColor: isDragging ? "#f0f0f0" : "#fff",
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
      }}
    >
      {column.header}
      <span
        style={{ marginLeft: "auto", cursor: "pointer" }}
        onClick={() =>
          onColumnVisibilityChange(column.id, !columnVisibility[column.id])
        }
      >
        {columnVisibility[column.id] ? (
          <VisibilityIcon />
        ) : (
          <VisibilityOffIcon />
        )}
      </span>
    </div>
  );
};

export default UpdateColumns;
