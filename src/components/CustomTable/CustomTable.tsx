import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

interface TableRow {
  cells: string[]
  isSectionHeader?: boolean
}

interface TableDataItem {
  category: string
  items: [string, string][]
}

interface CustomTableProps {
  headers?: string[]
  rows?: TableRow[]
  tableData?: TableDataItem[]
  skipFirstCategory?: boolean
  headerStyle?: object
  cellStyle?: object
  containerStyle?: object
  sectionHeaderStyle?: object
}

const CustomTable = ({ 
  headers, 
  rows, 
  tableData,
  skipFirstCategory = false,
  headerStyle = {},
  cellStyle = {},
  containerStyle = {},
  sectionHeaderStyle = {}
}: CustomTableProps) => {
  const transformedRows = tableData?.flatMap((section, index) => {
    const shouldSkipHeader = skipFirstCategory && index === 0
    const sectionRows: TableRow[] = section.items.map(item => ({ cells: item }))
    
    return shouldSkipHeader 
      ? sectionRows 
      : [{ cells: [section.category], isSectionHeader: true } as TableRow, ...sectionRows]
  }) || rows || []

  const maxColumns = Math.max(...transformedRows.map(row => row.cells.length))
  
  const styles = {
    header: { fontWeight: 600, fontSize: '18px', backgroundColor: '#2D7A84', color: 'white', border: '1px solid #ddd', ...headerStyle },
    cell: { fontSize: '18px', lineHeight: 1.5, border: '1px solid #ddd', whiteSpace: 'pre-line', ...cellStyle },
    container: { mt: '30px', mb: '30px', border: '1px solid #ddd', ...containerStyle },
    sectionHeader: { textAlign: 'center', ...headerStyle, ...sectionHeaderStyle }
  }

  return (
    <TableContainer sx={styles.container}>
      <Table sx={{ border: '1px solid #ddd' }}>
        {headers?.length && (
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell 
                  key={index} 
                  sx={styles.header}
                  colSpan={headers.length === 1 ? maxColumns : 1}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {transformedRows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.isSectionHeader ? (
                <TableCell sx={styles.sectionHeader} colSpan={maxColumns}>
                  {row.cells[0]}
                </TableCell>
              ) : (
                row.cells.map((cell, cellIndex) => (
                  <TableCell 
                    key={cellIndex} 
                    sx={{
                      ...styles.cell,
                      ...(cellIndex === 0 && { verticalAlign: 'top', fontWeight: 500 })
                    }}
                  >
                    {cell}
                  </TableCell>
                ))
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CustomTable
