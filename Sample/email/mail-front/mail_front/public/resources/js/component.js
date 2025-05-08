// 첨부파일
class fileBox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // 이미 생성되어 있는 요소라면 렌더링 중지 및 현재 상태 유지
    if (!!this.shadowRoot) return false;

    const thisObj = $(this),
      shadowObj = $(this.attachShadow({ mode: "open" })),
      mainObj = $(`<style>
                                 .file_box{position:relative; width:200px; margin:5px 5px 0 0; border:1px solid #7f7f7f; border-radius:5px; display:flex; justify-content:space-between; align-items:center; padding:10px; background-color:white; user-select:none; cursor:pointer;}
                                 .file_box .file_icon {margin-bottom: -12px;}
                                 .file_box .file_icon svg{position: relative; bottom: 6px;}
                                 .file_box .file_name span{display: inline-block; width:150px; margin-right:20px; border:none; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:black; cursor:pointer;}
                                 .file_box .file_close_btn{position:absolute; right:0; height:100%; width:20px; display:flex; align-items:center; cursor:pointer;}
                                 .jodit__preview-box .file_close_btn{display:none;}
                             </style>
                             <div class="file_box">
                                 <div class="file_icon">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 39 35" fill="none">
                                         <path d="M19.3636 24.3182V2.5M19.3636 24.3182L9.81818 16.1364M19.3636 24.3182L28.9091 16.1364M3 21.5909V32.5H35.7273V21.518" stroke="#121838" stroke-width="5" stroke-linecap="round"/>
                                     </svg>
                                 </div>
                                 <div class="file_name">
                                     <span>${thisObj.data("text")}</span>
                                 </div>
                                 <div class="file_close_btn">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none">
                                         <g clip-path="url(#clip0_154_31)">
                                             <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2936 3.48241C15.6503 2.8392 14.6075 2.8392 13.9643 3.48241L9.88798 7.5587L5.8117 3.48242C5.16849 2.8392 4.12563 2.8392 3.48241 3.48242C2.8392 4.12563 2.8392 5.16849 3.48241 5.81171L7.5587 9.88799L3.48245 13.9642C2.83923 14.6075 2.83923 15.6503 3.48245 16.2935C4.12567 16.9368 5.16853 16.9368 5.81174 16.2935L9.88798 12.2173L13.9642 16.2935C14.6075 16.9368 15.6503 16.9368 16.2935 16.2935C16.9368 15.6503 16.9368 14.6075 16.2935 13.9642L12.2173 9.88799L16.2936 5.8117C16.9368 5.16849 16.9368 4.12563 16.2936 3.48241Z" fill="#111A37"/>
                                         </g>
                                         <defs>
                                             <clipPath id="clip0_154_31"><rect width="14" height="14" fill="white" transform="translate(3 3)"/></clipPath>
                                         </defs>
                                     </svg>
                                 </div>
                             </div>`);

    // 파일 다운로드 이벤트 추가
    mainObj.on("click", () => {
      const text = thisObj.data("text"),
        href = thisObj.data("href");

      loadingBarOpen();

      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          const data = this.response,
            blob = new Blob([data], { type: data["type"] });

          if (blob.type.includes("text")) {
            blob.text().then((value) => {
              alert(value);
            });
          } else {
            const fileName = text,
              fileNm = decodeURIComponent(fileName ? fileName : null),
              link = document.createElement("a");

            link.href = window.URL.createObjectURL(blob);
            link.download = fileNm;

            link.click();

            setTimeout(function () {
              URL.revokeObjectURL(link.href);
            }, 100);
          }
        }
      };

      xhr.onloadend = function () {
        loadingBarClose();
      };

      xhr.open("GET", href);
      xhr.responseType = "blob";
      xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

      xhr.send();
    });

    const delBtn = mainObj.find(".file_close_btn");

    // 삭제 버튼 출력 여부 확인
    if (thisObj.closest("#post_view_box").length) {
      delBtn.remove();

      // 첨부파일 제거 이벤트 추가
    } else {
      delBtn.on("click", (e) => {
        thisObj.remove();

        e.stopPropagation();
      });
    }

    // 쉐도우 돔에 추가
    shadowObj.append(mainObj);

    thisObj.css({ display: "inline-block" });
  }
}

customElements.define("file-box", fileBox);

// 코드 편집기
class aceEditBox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // 이미 생성되어 있는 요소라면 렌더링 중지 및 현재 상태 유지
    if (!!this.shadowRoot) return false;

    const thisObj = $(this),
      shadowObj = $(this.attachShadow({ mode: "open" })),
      styleObj = $("<style>pre{margin:0;}</style>"),
      preObj = $("<pre></pre>");

    thisObj.css({
      display: "inline-block",
      width: "100%",
    });

    shadowObj.append(styleObj);
    shadowObj.append(preObj);

    // 에디터 세팅
    const aceEditor = ace.edit(preObj[0]);

    // 에디터 쉐도움 돔 세팅
    aceEditor.renderer.attachToShadowRoot();
    aceEditor.session.setMode("ace/mode/json");

    // 에디터 기본 옵션
    aceEditor.setOptions({
      showGutter: true, // 줄 번호 출력
      maxLines: Infinity, // 최대 줄 번호
      minLines: 3, // 최소 줄 번호
    });

    const lines = thisObj.data("lines");

    // 라인수가 있는 경우 라인 생성
    if (lines) {
      for (let i = 1; i < $(this).data("lines"); i++) {
        aceEditor.session.insert({ row: i, column: 0 }, "\n");
      }

      // 라인수 초기화
    } else {
      aceEditor.session.insert({ row: 1, column: 0 }, "\n");
      aceEditor.session.insert({ row: 2, column: 0 }, "\n");

      thisObj.data("lines", 3);
    }

    // 출력할 데이터가 있는 경우 출력
    const dataValue = thisObj.attr("data-value");

    if (dataValue) aceEditor.getSession().setValue(dataValue);

    // 요소에 편집기 객체 저장
    thisObj.data("aceEditor", aceEditor);

    // 이벤트 처리
    thisObj.on("input", function (event) {
      // 현재 정보 저장
      thisObj.attr("data-value", aceEditor.getSession().getValue());

      // 라인수 확인
      const newLines = aceEditor.getSession().getDocument().getAllLines().length,
        prevLines = thisObj.data("lines");

      // 라인수가 달라진 경우
      if (newLines !== prevLines) {
        thisObj.attr("data-lines", newLines).data("lines", newLines);

        // 라인 수 동기화
        thisObj.trigger("change_lines");
      }

      event.stopPropagation();
    });

    const jsonEditList = thisObj.closest("table").find(".json_edit");

    // 라인수 동기화 이벤트 할당 (첫번째 에디터 처리시)
    if (jsonEditList.eq(0)[0] === this) {
      jsonEditList.on("change_lines", function () {
        const aEditBox = jsonEditList.eq(0),
          bEditBox = jsonEditList.eq(1),
          aLines = aEditBox.data("lines"),
          bLines = bEditBox.data("lines"),
          aEditor = aEditBox.data("aceEditor"),
          bEditor = bEditBox.data("aceEditor"),
          isAFocus = aEditBox[0].contains(document.activeElement);

        // 놉이가 다르면 처리 (라인수 변경, 텍스트 변경)
        if (aLines > bLines) {
          if (isAFocus) {
            for (let i = 0; i < aLines - bLines; i++) {
              bEditor.session.insert({ row: bLines + 1 + i, column: 0 }, "\n");
            }

            bEditBox.attr("data-lines", aLines).data("lines", aLines);

            bEditBox.attr("data-value", bEditor.getSession().getValue());
          } else {
            aEditor.session.removeFullLines(bLines, aLines);

            aEditBox.attr("data-lines", bLines).data("lines", bLines);

            aEditBox.attr("data-value", aEditor.getSession().getValue());
          }
        } else if (aLines < bLines) {
          if (isAFocus) {
            bEditor.session.removeFullLines(aLines, bLines);

            bEditBox.attr("data-lines", aLines).data("lines", aLines);

            bEditBox.attr("data-value", bEditor.getSession().getValue());
          } else {
            for (let i = 0; i < bLines - aLines; i++) {
              aEditor.session.insert({ row: aLines + 1 + i, column: 0 }, "\n");
            }

            aEditBox.attr("data-lines", bLines).data("lines", bLines);

            aEditBox.attr("data-value", aEditor.getSession().getValue());
          }
        }
      });
    }

    // 상위 에디터로 이벤트 전파 중지
    thisObj.on("copy paste cut keyup keydown", function (event) {
      $(this).trigger("input");

      event.stopPropagation();
    });
  }
}

customElements.define("ace-edit-box", aceEditBox);

class aceEditTable extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const tagObj = $(this),
      thisObj = $(`<table style="border-collapse:collapse;width: 100%;">
                               <tbody>
                                   <tr style="height: 30px;">
                                       <td style="width: 50%; background-color: rgb(67, 67, 67);">
                                           <span style="color: rgb(255, 255, 255); font-size: 12px;">파라미터명</span>
                                       </td>
                                       <td style="width: 50%; background-color: rgb(67, 67, 67);">
                                           <span style="color: rgb(255, 255, 255); font-size: 12px;">설명</span>
                                       </td>
                                   </tr>
                                   <tr contenteditable="false">
                                       <td style="width: 50%; padding: 0;">
                                           <ace-edit-box class="json_edit" style="display: inline-block; width: 100%;"></ace-edit-box>
                                       </td>
                                       <td style="width: 50%; padding: 0;">
                                           <ace-edit-box class="json_edit" style="display: inline-block; width: 100%;"></ace-edit-box>
                                       </td>
                                   </tr>
                               </tbody>
                           </table>`);

    tagObj.after(thisObj);

    // 커스텀 테그는 재거 (랜더링 용도 제거);
    tagObj.remove();
  }
}

customElements.define("ace-edit-table", aceEditTable);

// 코드 블럭
class aceEditBlack extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const tagObj = $(this),
      thisObj = $(`<table style="border-collapse:collapse;width: 100%;">
                                <tbody>
                                    <tr style="height: 30px;">
                                        <td style="width: 80%; background-color: rgb(67, 67, 67);">
                                            <span style="color: rgb(255, 255, 255); font-size: 12px;">제목</span>
                                        </td>
                                        <td style="width: 20%; background-color: rgb(67, 67, 67);" onmousedown="stopEvent(event);" onclick="stopEvent(event);">
                                            <select onload="console.log(77777)" class="theme" style="width: 50%;" title="테마" onchange="chgCodeBoxTheme(this);">
                                                <option value="">default</option>
                                                <option value="github">github</option>
                                                <option value="github_dark">github_dark</option>
                                                <option value="terminal">terminal</option>
                                            </select>
                                            <select class="mode" style="width: calc(50% - .4em);" title="포멧"  onchange="chgCodeBoxFormat(this);">
                                                <option value="sh">.sh</option>
                                                <option value="powershell">.powershell</option>
                                                <option value="javascript">.javascript</option>
                                                <option value="html">.html</option>
                                                <option value="jsp">.jsp</option>
                                                <option value="php">.php</option>
                                                <option value="java">.java</option>
                                                <option value="dart">.dart</option>
                                                <option value="sql">.sql</option>
                                                <option value="xml">.xml</option>
                                                <option value="yaml">.yaml</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr contenteditable="false">
                                        <td style="width: 50%; padding: 0;" colspan="2">
                                            <ace-edit-box style="display: inline-block; width: 100%;"></ace-edit-box>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>`);

    tagObj.after(thisObj);

    // 커스텀 테그는 재거 (랜더링 용도);
    tagObj.remove();

    // 테마 변경 이벤트
    thisObj.find(".theme").trigger("change");

    // 포멧 변경 이벤트
    thisObj.find(".mode").trigger("change");
  }
}

customElements.define("ace-edit-black", aceEditBlack);

// 코드 블럭
class testTemplate extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const tagObj = $(this),
      thisObj =
        $(`<div>#{건설사명}에서 이용하시는 #{서비스명} #{징수년도}년 #{징수월}월 이용요금 안내드립니다.<br><br>
[서비스 이용내역]<br>
서비스명 : #{서비스명}<br>
이용기간 : #{징수년도}년 #{징수월}<br>
청구요금 : #{징수금액}원<br>
납부기한 : #{납부기한}<br>
납부방법 : #{납부방법}<br><br><br>
#{서비스명} 이용에 감사드리며 첨부된 안내장에서 세부내역을 확인하실 수 있습니다.</div>`);

    tagObj.after(thisObj);

    // 커스텀 테그는 재거 (랜더링 용도);
    tagObj.remove();

    // 테마 변경 이벤트
    thisObj.find(".theme").trigger("change");

    // 포멧 변경 이벤트
    thisObj.find(".mode").trigger("change");
  }
}

customElements.define("test-template", testTemplate);

// 코드 블럭
class testTemplate2 extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const tagObj = $(this),
      thisObj = $(`<div>안녕하세요. #{건설사명} 담당자님 #{계약법인}입니다.<br/><br/>
#{건설사명}에서 이용하시는 #{서비스명} 이용요금 안내드립니다.<br/><br/>
[서비스 이용내역]<br/>
서비스명 : #{서비스명}<br/>
이용기간 : #{계약기간}<br/>
청구요금 : #{징수금액}원<br/>
납부기한 : #{납부기한}<br/>
납부방법 : #{납부방법}<br/><br/><br/>
#{서비스명} 이용에 감사드리며 첨부된 안내장에서 세부내역을 확인하실 수 있습니다.</div>`);

    tagObj.after(thisObj);

    // 커스텀 테그는 재거 (랜더링 용도);
    tagObj.remove();

    // 테마 변경 이벤트
    thisObj.find(".theme").trigger("change");

    // 포멧 변경 이벤트
    thisObj.find(".mode").trigger("change");
  }
}

customElements.define("template-two", testTemplate2);

// 테마 변경 이벤트
function chgCodeBoxTheme(obj) {
  const thisOpt = $(obj),
    option = thisOpt.val(),
    optionList = thisOpt.find("option"),
    theme = option ? "ace/theme/" + option : "",
    aceEditor = ace.edit(
      thisOpt.closest("table").find("ace-edit-box")[0].shadowRoot.querySelector("pre"),
    );

  optionList.removeAttr("selected");
  optionList.filter(`[value=${option}]`).attr("selected", true);

  aceEditor.setTheme(theme);
}

// 코드 포멧 변경
function chgCodeBoxFormat(obj) {
  const thisOpt = $(obj),
    option = thisOpt.val(),
    optionList = thisOpt.find("option"),
    mode = "ace/mode/" + option,
    aceEditor = ace.edit(
      thisOpt.closest("table").find("ace-edit-box")[0].shadowRoot.querySelector("pre"),
    );

  optionList.removeAttr("selected");
  optionList.filter(`[value=${option}]`).attr("selected", true);

  aceEditor.session.setMode(mode);
}

// 옵션 선택 시 편집기 이벤트 금지
function stopEvent(event) {
  event.stopPropagation();
}
