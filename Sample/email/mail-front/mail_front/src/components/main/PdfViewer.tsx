import axios from "@/utils/axios";
import { Button } from "@mui/material";
import Image from "next/image";
import * as pdfjsLib from "pdfjs-dist";
import { GlobalWorkerOptions } from "pdfjs-dist";
import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";

// PDF.js 최신 버전의 워커 경로를 설정
GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

interface PdfPreviewProps {
  fileCD: number;
  mailType: any;
  fileType: string; // 확장자만 명시 (pdf, png, jpg, xls, xlsx 등)
}

const PdfPreview: React.FC<PdfPreviewProps> = ({ fileCD, mailType, fileType }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0); // PDF 페이지 수 저장
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]); // 여러 페이지용 canvas를 위한 refs
  const [imageUrl, setImageUrl] = useState<string | null>(null); // 이미지 URL 저장
  const [excelData, setExcelData] = useState<any[][] | null>(null); // 엑셀 데이터 상태

  // 파일을 가져오고 렌더링하는 함수
  const fetchAndRenderFile = async () => {
    if (!fileCD || !mailType || !fileType) {
      setError("유효하지 않은 요청입니다.");
      return;
    }

    setLoading(true);
    setError(null);
    setNumPages(0);
    setExcelData(null);

    try {
      const response = await axios.post(
        "/download",
        JSON.stringify({
          fileCD,
          mailType,
        }),
        {
          headers: { "Content-Type": "application/json" },
          responseType: "arraybuffer", // 바이너리 데이터로 응답받음
        },
      );

      // PDF 파일 처리
      if (fileType.toLowerCase() === "pdf") {
        const pdfData = new Uint8Array(response.data);
        const pdf = await pdfjsLib.getDocument(pdfData).promise;
        setNumPages(pdf.numPages);

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const canvas = canvasRefs.current[pageNum - 1];
          if (!canvas) throw new Error("Canvas not found");

          const context = canvas.getContext("2d");
          if (!context) throw new Error("Canvas context not found");

          const scale = 0.5; // PDF 뷰포트 스케일 설정
          const viewport = page.getViewport({ scale });
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;
        }
      }
      // 이미지 파일 처리
      else if (["png", "jpg", "jpeg", "gif"].includes(fileType.toLowerCase())) {
        const imageUrl = URL.createObjectURL(new Blob([response.data]));
        setImageUrl(imageUrl);
      }
      // 엑셀 파일 처리
      else if (["xls", "xlsx", "xlsm", "xlsb"].includes(fileType.toLowerCase())) {
        const data = new Uint8Array(response.data);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];
        setExcelData(sheetData);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching or rendering file:", err);
      setError("파일을 가져오거나 렌더링하는 데 실패했습니다.");
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant="outlined" disabled={loading} onClick={fetchAndRenderFile}>
        {loading ? "로딩 중..." : "미리보기"}
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* PDF 미리보기 */}
      {fileType.toLowerCase() === "pdf" && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            overflowX: "auto",
            paddingBottom: "20px",
          }}
        >
          {Array.from({ length: numPages }).map((_, index) => (
            <canvas
              key={index}
              ref={(el) => {
                if (el) canvasRefs.current[index] = el;
              }}
              style={{
                border: "1px solid #ccc",
                marginRight: "10px",
                maxHeight: "500px",
              }}
            ></canvas>
          ))}
        </div>
      )}

      {/* 이미지 미리보기 */}
      {["png", "jpg", "jpeg", "gif"].includes(fileType.toLowerCase()) && imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <Image
            src={imageUrl}
            alt="미리보기"
            width={500}
            height={500}
            style={{ objectFit: "contain" }}
          />
        </div>
      )}

      {/* 엑셀 미리보기 */}
      {["xls", "xlsx", "xlsm", "xlsb"].includes(fileType.toLowerCase()) && excelData && (
        <div style={{ marginTop: "20px", maxHeight: "400px", overflowY: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {excelData[0]?.map((header, index) => (
                  <th key={index} style={{ border: "1px solid black", padding: "8px" }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} style={{ border: "1px solid black", padding: "8px" }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PdfPreview;
