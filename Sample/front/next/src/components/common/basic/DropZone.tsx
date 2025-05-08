import styled from "@emotion/styled";
import { axios } from "@utils/network.util";
import React, { useCallback, useRef } from "react";

//#region styled
const Container = styled.div`
  width: 100%;
  transform: translateY(-10%);
`;
const DropContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
  height: 100px;
  border: 2px dashed #4aa1f3;
  cursor: pointer;
  font-style: italic;
  letter-spacing: 0px;
`;

const FileInput = styled.input`
  display: none;
`;

const PrimaryText = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 5px;
`;
//#endregion

type Files = { fileId: string; name: string; size: number }[];
const DropZone = ({
  onUploadFiles,
}: {
  onUploadFiles: (files: Files) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>();

  const onFileDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length > 0) {
      handleFiles(fileInputRef.current.files);
    }
    e.target.value = "";
  }, []);

  const onFileAddClick = () => {
    fileInputRef.current.click();
  };

  const handleFiles = async (fileList: FileList) => {
    const files: Files = [];
    for await (const file of fileList) {
      const { name, size } = file;
      const formData = new FormData();
      formData.append("file", file);
      try {
        const { data: fileId } = await axios.post("/file", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        files.push({ fileId, name, size });
      } catch (error) {
        alert("파일 추가 중 에러가 발생하였습니다.");
        return;
      }
    }
    onUploadFiles(files);
  };

  return (
    <>
      <Container>
        <DropContainer
          onDragOver={onFileDragOver}
          onDrop={onFileDrop}
          onClick={onFileAddClick}
        >
          파일을 이곳에 드래그 하시거나<PrimaryText>클릭</PrimaryText>하여
          첨부해주세요
        </DropContainer>
      </Container>
      <FileInput
        ref={fileInputRef}
        type="file"
        multiple
        onChange={onFileChange}
      />
    </>
  );
};

export default DropZone;
