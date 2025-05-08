import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const EditorComponent = ({ onCreateData, name }: { onCreateData(value); name: string }) => {
  const [value, setValue] = useState<string>('');
  const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <span>loading...</span>,
  });

  var toolbarOptions = [
    [{ font: [] }, { size: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    ['image'],
    ['clean'],
  ];

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'background',
    'font',
    'size',
    'image',
  ];

  const handleEditor = (value: string) => {
    setValue(value);
    onCreateData(value);
  };

  useEffect(() => {
    setValue(name);
  });

  return (
    <>
      <div className="text-editor">
        <ReactQuill defaultValue={name} onChange={handleEditor} theme="snow" modules={modules} formats={formats} />
      </div>
    </>
  );
};
export default EditorComponent;
