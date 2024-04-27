import React from 'react';
import XLSX from 'xlsx';

const ExportButton = ({ data, fileName, buttonText }) => {
  const convertToExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    const wbout = XLSX.write(wb, { type: 'blob', bookType: 'xlsx' });
    return URL.createObjectURL(wbout);
  };

  const handleDownload = () => {
    const excelData = convertToExcel(data);
    const link = document.createElement('a');
    link.href = excelData;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={handleDownload}>{buttonText}</button>
  );
};

export default ExportButton;