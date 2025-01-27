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

  const handleMoveColumn = (dragIndex, hoverIndex, isFrozen) => {
    const updatedColumns = isFrozen ? [...frozenColumns] : [...unfrozenColumns];
    const [movedColumn] = updatedColumns.splice(dragIndex, 1);
    updatedColumns.splice(hoverIndex, 0, movedColumn);

    if (isFrozen) {
      setFrozenColumns(updatedColumns);
    } else {
      setUnfrozenColumns(updatedColumns);
    }

    // Update the new column order
    const newOrder = [...frozenColumns, ...unfrozenColumns].map(
      (col) => col.id
    );
    onColumnReorder(newOrder);
  };

  const handleDrop = (item, isFrozen) => {
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
      <DropZone onDrop={(item) => handleDrop(item, true)}>
        <h4>Frozen Columns</h4>
        {frozenColumns.map((column, index) => (
          <DraggableColumn
            key={column.id}
            column={column}
            index={index}
            moveColumn={(dragIndex, hoverIndex) =>
              handleMoveColumn(dragIndex, hoverIndex, true)
            }
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={onColumnVisibilityChange}
          />
        ))}
      </DropZone>

      <DropZone onDrop={(item) => handleDrop(item, false)}>
        <h4>Unfrozen Columns</h4>
        {unfrozenColumns.map((column, index) => (
          <DraggableColumn
            key={column.id}
            column={column}
            index={index}
            moveColumn={(dragIndex, hoverIndex) =>
              handleMoveColumn(dragIndex, hoverIndex, false)
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

      moveColumn(dragIndex, hoverIndex, false);

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
