import { useMaterialReactTable } from 'material-react-table';

const columns = useMemo(() => [
  {
    accessorFn: (row) => `${row.updatedby} ${row.updatedat}`, // show both updatedby and updatedat in column
    header: 'Updated By',
    filterVariant: 'autocomplete',
    filterSelectOptions: ({ table }) => {
      const uniqueUpdatedByValues = Array.from(
        new Set(table.getFilteredRowModel().flatMap((row) => row.updatedby))
      );
      return uniqueUpdatedByValues.map((value) => ({ label: value, value }));
    },
  },
], []);