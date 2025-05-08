const notOnlineUploadDocQuery = `
SELECT SCD_ID AS SCD_ID
  , COOP_COID AS COID
  , LISTAGG(TYPE, ',') WITHIN GROUP (ORDER BY TYPE) AS NOT_UPLOAD_DOC
FROM (
    SELECT S.SCD_ID
         , MAX(S.STDT) AS STDT
         , P.COOP_COID
         , '가입증명원'     AS type
    FROM TO_COURSE_SCD S
       , TO_PTPT_REQ P
    WHERE S.SCD_ID = P.SCD_ID
      AND S.TRT IN ('3', '4')
      AND S.STS <'9'
      AND P.JOIN_PROOF_DOC_FILE_ID IS NULL
      AND S.STDT = (TRUNC(SYSDATE) + :checkDay)
      AND S.SCD_ID NOT IN ('5470' , '5471')
    GROUP BY S.SCD_ID, P.WONDO_COID, P.COOP_COID
    UNION
    SELECT
        S.SCD_ID
            , S.STDT
            , R.HADO_COID AS COOP_COID
            , '통장사본' AS TYPE
    FROM
        TO_HADO_REQ R
            , TO_COURSE_SCD S
    WHERE R.SCD_ID = S.SCD_ID
      AND R.REFUND_BANKBOOK IS NULL
      AND S.TRT IN ('3')
      AND S.STS < '9'
      AND S.STDT = (TRUNC(SYSDATE) + :checkDay)
      AND S.SCD_ID NOT IN ('5470', '5471', '8914', '8974', '8975', '8575','8853', '8996','8997','8998','8999', '9005', '9010', '9016','9015','9018','9020')
      AND S.DANDOK_YN = 'N'
      AND EXISTS (
        SELECT
        *
        FROM
        TO_PTPT_REQ REQ
        WHERE REQ.COOP_COID = R.HADO_COID
      AND R.SCD_ID = REQ.SCD_ID
        )
    UNION
    SELECT
        S.SCD_ID
            , S.STDT
            , R.HADO_COID AS COOP_COID
            , '전자서명' AS TYPE
    FROM
        TO_HADO_REQ R
            , TO_COURSE_SCD S
    WHERE R.SCD_ID = S.SCD_ID
      AND R.LAST_SIGN_YN = 'N'
      AND S.TRT IN ('3', '4')
      AND S.STS < '9'
      AND S.STDT = (TRUNC(SYSDATE) + :checkDay)
      AND S.SCD_ID NOT IN ('5470', '5471', '8914', '8974', '8975', '9151')
      AND EXISTS (
        SELECT
        *
        FROM
        TO_PTPT_REQ REQ
        WHERE REQ.COOP_COID = R.HADO_COID
      AND R.SCD_ID = REQ.SCD_ID
        )
)
GROUP BY SCD_ID, COOP_COID
`;

export default notOnlineUploadDocQuery;
