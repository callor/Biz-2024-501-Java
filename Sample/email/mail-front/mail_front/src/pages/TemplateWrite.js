import { getUserDetail } from "@/module/user/user";
import { useCallback, useEffect, useRef, useState } from "react";

export default function EditPage({ onEditorContentChange, initialContent }) {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const editorRef = useRef(null); // editor 상태를 useRef로 관리
  const apiKey = process.env.REQUEST_API_KEY;
  const { userInfo } = getUserDetail();
  const isEditorInitialized = useRef(false); // 에디터 초기화 여부 추적

  const setEditorInstance = useCallback(() => {
    if (typeof Jodit === "undefined") {
      console.error("Jodit 라이브러리가 로드되지 않았습니다.");
      return;
    }

    const editorInstance = Jodit.make("#editor", {
      height: 360,
      allowResizeX: false,
      allowResizeY: true,
      toolbarSticky: false,
      toolbarButtonSize: "small",
      removeButtons: [
        "video",
        "find",
        "superscript",
        "subscript",
        "spellcheck",
        "ai-commands",
        "ai-assistant",
        "about",
        "fullsize",
        "preview",
      ],
      hidePoweredByJodit: true,
      placeholder: "",
      buttons: [
        ...Jodit.defaultOptions.buttons.slice(0, 16),
        // {
        //   name: "json",
        //   tooltip: "JSON 테이블 생성",
        //   exec: (editor) => {
        //     editor.s.insertHTML("<ace-edit-table></ace-edit-table>");
        //   },
        // },
      ],
      uploader: {
        insertImageAsBase64URI: false,
        url: "https://api.kbz.co.kr/email/addTempImage",
        // url: "http://localhost:8080/email/addTempImage",
        format: "json",
        method: "POST",
        headers: {
          apiKey: apiKey,
          Authorization: userInfo?.auth_key,
          userNm: userInfo?.userid,
        },
        isSuccess: (resp) => {
          // console.log("isSuccess response:", resp);
          if (resp.code === "S") {
            // console.log("업로드 성공!");
            return true;
          } else {
            // console.error("업로드 실패: ", resp);
            return false;
          }
        },
        prepareData: function (formData) {
          formData.append("mode", "My Files");
          formData.append("name", "image");
          formData.append("image", formData.get("files[0]"));
          formData.delete("files[0]");
          return formData;
        },
        process: (resp) => {
          // console.log("응답:", resp);
          const fileUrl = resp && resp.url ? resp.url : "";

          if (!fileUrl) {
            // console.error("URL이 응답에 포함되지 않음");
            return { files: [], error: 1 };
          }

          return {
            files: [fileUrl],
            path: resp.path,
            baseurl: fileUrl,
            error: resp.error ? 1 : 0,
          };
        },

        // 업로드 후 성공적인 처리
        defaultHandlerSuccess: (resp) => {
          // console.log("Image uploaded successfully:", resp);

          const fileUrl = resp.baseurl || "";

          // editorRef에서 최신 editor 인스턴스를 가져옴
          const editorInstance = editorRef.current;
          // console.log("editor : ", editorInstance);

          if (editorInstance && editorInstance.selection) {
            const imgElement = document.createElement("img");
            imgElement.setAttribute("src", fileUrl);

            // 에디터에 이미지 삽입
            editorInstance.selection.insertImage(imgElement);
            // console.log("이미지 삽입 성공:", imgElement);
          } else {
            // console.error("Editor가 초기화되지 않았거나 editor.selection이 없음");
          }
        },
      },
    });

    // 초기 콘텐츠 설정
    if (initialContent && !isEditorInitialized.current) {
      // 최초 한 번만 초기 콘텐츠 설정
      editorInstance.setEditorValue(initialContent);
      isEditorInitialized.current = true;

      const content = editorInstance.value;
      onEditorContentChange(content);
    }

    // keydown, keyup, input 모두 사용하여 내용 변화 추적
    editorInstance.events.on("keydown", () => {
      const content = editorInstance.value;
      if (onEditorContentChange) {
        onEditorContentChange(content);
      }
    });

    editorInstance.events.on("keyup", () => {
      const content = editorInstance.value;
      if (onEditorContentChange) {
        onEditorContentChange(content);
      }
    });
    editorInstance.events.on("input", () => {
      const content = editorInstance.value;
      if (onEditorContentChange) {
        onEditorContentChange(content); // 상위 컴포넌트로 내용 전달
      }
    });

    editorRef.current = editorInstance; // 최신 에디터 인스턴스를 ref에 저장

    return () => {
      editorInstance?.destroy(); // 컴포넌트가 언마운트되면 에디터 인스턴스 해제
    };
  }, [apiKey, onEditorContentChange, userInfo?.auth_key, userInfo?.userid, initialContent]);

  useEffect(() => {
    if (scriptsLoaded) {
      // console.log("스크립트 로드 완료 후 에디터 초기화");
      setEditorInstance(); // 스크립트 로드 후 에디터 초기화
    }
  }, [scriptsLoaded, setEditorInstance]);

  useEffect(() => {
    if (!scriptsLoaded) {
      const loadScript = (src) => {
        return new Promise((resolve, reject) => {
          const existingScript = document.querySelector(`script[src="${src}"]`);
          if (existingScript) {
            resolve(); // 이미 로드된 스크립트가 있을 경우
          } else {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
            document.body.appendChild(script);
          }
        });
      };

      const loadScripts = async () => {
        try {
          await loadScript("/resources/js/jquery-1.8.3.min.js");
          await loadScript("/resources/js/jodit.def.js");
          await loadScript("/resources/js/component.js");
          setScriptsLoaded(true);
        } catch (error) {
          console.error(error);
        }
      };

      loadScripts();
    }

    return () => {
      const existingScripts = [
        "/resources/js/jquery-1.8.3.min.js",
        "/resources/js/jodit.def.js",
        "/resources/js/component.js",
      ];

      existingScripts.forEach((src) => {
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          existingScript.remove();
        }
      });
    };
  }, [scriptsLoaded]);

  return (
    <div id="post_write_box" style={{ width: "100%" }}>
      <label>
        <textarea id="editor" name="editor" style={{ width: "100%", maxHeight: "60px" }}></textarea>
      </label>
    </div>
  );
}
