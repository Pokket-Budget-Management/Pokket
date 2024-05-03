import React from "react";
import * as XLSX from "xlsx";
import { Button } from "react-bootstrap";

const ExportButton = ({ data, fileName, buttonText }) => {
	const convertToExcel = (data) => {
		const ws = XLSX.utils.json_to_sheet(data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "Data");
		const wbout = XLSX.write(wb, { type: "blob", bookType: "xlsx" });
		return URL.createObjectURL(wbout);
	};

	const handleDownload = () => {
		if (!data) {
			return;
		}
		const excelData = convertToExcel(data);
		const link = document.createElement("a");
		link.href = excelData;
		link.download = fileName;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return <Button onClick={handleDownload}>{buttonText}</Button>;
};

export default ExportButton;
