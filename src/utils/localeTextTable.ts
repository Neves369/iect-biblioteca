export const localizedTextsMap = {
     // Root
  noRowsLabel: 'Não há registros para serem mostrados',
  noResultsOverlayLabel: 'Nenhum resultado encontrado.',

  // Density selector toolbar button text
  toolbarDensity: 'Densidade',
  toolbarDensityLabel: 'Densidade',
  toolbarDensityCompact: 'Compacto',
  toolbarDensityStandard: 'Normal',
  toolbarDensityComfortable: 'Confortável',

  // Columns selector toolbar button text
  toolbarColumns: 'Colunas',
  toolbarColumnsLabel: 'Selecionar Colunas',

  // Filters toolbar button text
  toolbarFilters: 'Filtros',
  toolbarFiltersLabel: 'Monstrar Filtros',
  toolbarFiltersTooltipHide: 'Esconder Filtros',
  toolbarFiltersTooltipShow: 'Mostrar Filtros',
  toolbarFiltersTooltipActive: (count: any) =>
    count !== 1 ? `${count} filtros ativos` : `${count} filtro ativo`,

  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Pesquisar…',
  toolbarQuickFilterLabel: 'Pesquisar',
  toolbarQuickFilterDeleteIconLabel: 'Limpar',

  // Export selector toolbar button text
  toolbarExport: 'Exportar',
  toolbarExportLabel: 'Exportar',
  toolbarExportCSV: 'Baixar CSV',
  toolbarExportPrint: 'Imprimir',
  toolbarExportExcel: 'Baixar Excel',

  // Columns management text
  columnsManagementSearchTitle: 'Pesquisar',
  columnsManagementNoColumns: 'Nenhuma Coluna',
  columnsManagementShowHideAllText: 'Mostrar/Esconder Tudo',

  // Filter panel text
  filterPanelAddFilter: 'Adicionar Filtro',
  filterPanelRemoveAll: 'Remover Tudo',
  filterPanelDeleteIconLabel: 'Apagar',
  filterPanelLogicOperator: 'Operador Lógico',
  filterPanelOperator: 'Operador',
  filterPanelOperatorAnd: 'E',
  filterPanelOperatorOr: 'OU',
  filterPanelColumns: 'Colunas',
  filterPanelInputLabel: 'Valor',
  filterPanelInputPlaceholder: 'Filtrar valor',

  // Filter operators text
  filterOperatorContains: 'Contém',
  filterOperatorEquals: 'Igual',
  filterOperatorStartsWith: 'Começa com...',
  filterOperatorEndsWith: 'Termina com...',
  filterOperatorIs: 'É',
  filterOperatorNot: 'Não é',
  filterOperatorAfter: 'Está depois',
  filterOperatorOnOrAfter: 'Está ligado ou depois',
  filterOperatorBefore: 'Está antes',
  filterOperatorOnOrBefore: 'Está ligado ou antes',
  filterOperatorIsEmpty: 'Está vazio',
  filterOperatorIsNotEmpty: 'Não está vazio',
  filterOperatorIsAnyOf: 'É um valor quaquer',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',

  // Header filter operators text
  headerFilterOperatorContains: 'Contém',
  headerFilterOperatorEquals: 'Igual',
  headerFilterOperatorStartsWith: 'Começa com',
  headerFilterOperatorEndsWith: 'Termina com',
  headerFilterOperatorIs: 'É',
  headerFilterOperatorNot: 'Não é',
  headerFilterOperatorAfter: 'Está depois',
  headerFilterOperatorOnOrAfter: 'Está ligado ou depois',
  headerFilterOperatorBefore: 'Está antes',
  headerFilterOperatorOnOrBefore: 'Está ligado ou antes',
  headerFilterOperatorIsEmpty: 'Está vazio',
  headerFilterOperatorIsNotEmpty: 'Não está vazio',
  headerFilterOperatorIsAnyOf: 'É um valor qualquer',
  'headerFilterOperator=': 'Igual',
  'headerFilterOperator!=': 'Diferente',
  'headerFilterOperator>': 'Maior que',
  'headerFilterOperator>=': 'Maior que ou igua a',
  'headerFilterOperator<': 'Menor que',
  'headerFilterOperator<=': 'Menor que ou igual a',

  // Filter values text
  filterValueAny: 'qualquer',
  filterValueTrue: 'verdadeiro',
  filterValueFalse: 'falso',

  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Mostrar colunas',
  columnMenuManageColumns: 'Gerenciar colunas',
  columnMenuFilter: 'Filtrar',
  columnMenuHideColumn: 'Esconder colunas',
  columnMenuUnsort: 'Desordenar',
  columnMenuSortAsc: 'Ordem crescente',
  columnMenuSortDesc: 'Ordem decrescente',

  // Column header text
  columnHeaderFiltersTooltipActive: (count: any) =>
    count !== 1 ? `${count} filtros ativos` : `${count} filtro ativo`,
  columnHeaderFiltersLabel: 'Mostrar filtros',
  columnHeaderSortIconLabel: 'Ordenar',

  // Rows selected footer text
  footerRowSelected: (count: any) =>
    count !== 1
      ? `${count.toLocaleString()} Linhas selecionadas`
      : `${count.toLocaleString()} Linha selecionada`,

  // Total row amount footer text
  footerTotalRows: 'Total de Linhas:',

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount: any, totalCount: any) =>
    `${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: 'Checkbox selection',
  checkboxSelectionSelectAllRows: 'Select all rows',
  checkboxSelectionUnselectAllRows: 'Unselect all rows',
  checkboxSelectionSelectRow: 'Select row',
  checkboxSelectionUnselectRow: 'Unselect row',

  // Boolean cell text
  booleanCellTrueLabel: 'sim',
  booleanCellFalseLabel: 'não',

  // Actions cell more text
  actionsCellMore: 'mais',

  // Column pinning text
  pinToLeft: 'Pin to left',
  pinToRight: 'Pin to right',
  unpin: 'Unpin',

  // Tree Data
  treeDataGroupingHeaderName: 'Group',
  treeDataExpand: 'see children',
  treeDataCollapse: 'hide children',

  // Grouping columns
  groupingColumnHeaderName: 'Group',
  groupColumn: (name: any) => `Group by ${name}`,
  unGroupColumn: (name: any) => `Stop grouping by ${name}`,

  // Master/detail
  detailPanelToggle: 'Detail panel toggle',
  expandDetailPanel: 'Expand',
  collapseDetailPanel: 'Collapse',

  // Used core components translation keys
  MuiTablePagination: {},

  // Row reordering text
  rowReorderingHeaderName: 'Row reordering',

  // Aggregation
  aggregationMenuItemHeader: 'Aggregation',
  aggregationFunctionLabelSum: 'sum',
  aggregationFunctionLabelAvg: 'avg',
  aggregationFunctionLabelMin: 'min',
  aggregationFunctionLabelMax: 'max',
  aggregationFunctionLabelSize: 'size',
    
  };