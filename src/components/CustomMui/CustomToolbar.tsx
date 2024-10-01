import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

const CustomToolbar: any = (props: any) => {
  const columns = props
    .filter(
      (column: any) =>
        !["visualizar", "editar", "ativar_inativar"].includes(column.field)
    )
    .map((column: any) => column.field);

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport
        csvOptions={{
          allColumns: false,
          fields: columns,
        }}
        printOptions={{
          allColumns: false,
          fields: columns,
        }}
      />
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
