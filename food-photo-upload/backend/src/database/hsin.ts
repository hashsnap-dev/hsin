export interface IntegrationFoodList {
  type: 'domestic' | 'foreign';
  report_no: string;
  name: string;
  company: string;
  materials: string[];
  functionaliites: string[];
  warn: string[];
  thumbnail: string;
}

export interface DomesticFoodList {
  prdlst_report_ledg_no: string;
  prdlst_nm: string;
  prms_dt: string;
  prdlst_report_no: string;
  bssh_nm: string;
  total_count: string;
  no: string;
}

export interface DomesticFoodDetail {
  maker: string;
  food_name: string;
  report_number: string;
  registration_date: string;
  expiration: string;
  properties: string;
  how_to_eat: string;
  package: string;
  storage_precautions: string;
  ingestion_precautions: string;
  functionality: string;
  standard: string;
  prdlst_report_no: string;
}

export interface I0030 {
  NTK_MTHD: string;
  PRDLST_NM: string;
  RAWMTRL_NM: string;
  PRMS_DT: string;
  POG_DAYCNT: string;
  PRDLST_REPORT_NO: string;
  PRIMARY_FNCLTY: string;
  PRODUCTION: string;
  CSTDY_MTHD: string;
  HIENG_LNTRT_DVS_NM: string;
  BSSH_NM: string;
  LCNS_NO: string;
  FRMLC_MTRQLT: string;
  LAST_UPDT_DTM: string;
  IFTKN_ATNT_MATR_CN: string;
  STDR_STND: string;
  INDUTY_CD_NM: string;
  CHILD_CRTFC_YN: string;
  DISPOS: string;
  PRDT_SHAP_CD_NM: string;
  PRDLST_CDNM: string;
}
export interface C003 {
  NTK_MTHD: string;
  PRDLST_NM: string;
  RAWMTRL_NM: string;
  PRMS_DT: string;
  CRET_DTM: string;
  POG_DAYCNT: string;
  PRDLST_REPORT_NO: string;
  PRIMARY_FNCLTY: string;
  CSTDY_MTHD: string;
  BSSH_NM: string;
  LAST_UPDT_DTM: string;
  LCNS_NO: string;
  IFTKN_ATNT_MATR_CN: string;
  STDR_STND: string;
  DISPOS: string;
  SHAP: string;
}
export interface DomesticFoodMaterials {
  report_number: string;
  materials: string[];
}

export interface FunctionalityMaterials {
  no: string[];
  name: string;
  type: string;
  company: string;
  functionality: string[];
  amount: string;
  warn: string[];
  abolished: boolean;
  canceled: boolean;
  eatTogether: string;
}

export interface CrawlMaterials {
  ans_yn: string;
  atch_file_no: string;
  atch_file_posbl_yn: string;
  bbs_nm: string;
  bbs_no: string;
  bbs_templet_nm: string;
  bbs_templet_url: string;
  bbs_type_cd: string;
  bdt: string;
  boardList: string[];
  board_code: string;
  board_file_down: string;
  clmn01: string;
  clmn02: string;
  clmn03: string;
  clmn04: string;
  clmn05: string;
  clmn06: string;
  clmn07: string;
  clmn08: string;
  cmt_no: string;
  cmt_yn: string;
  cn: string;
  cret_dtm: string;
  cret_end_dtm: string;
  cret_start_dtm: string;
  cretr_id: string;
  cretr_nickname: string;
  cretr_nm: string;
  ctgry_col_nm: string;
  ctgry_no: string;
  ctgry_type_cd: string;
  ctgrynm: string;
  del_yn: string;
  depth_titl: string;
  ecm_file_no: string;
  faq_inquiry_content: string;
  fileList: string[];
  file_mg: string;
  file_path: string;
  file_type_cd: string;
  file_yn: string;
  flag: string;
  front_exps_yn: string;
  head_info: string;
  hrnk_cretr_id: string;
  hrnk_ctgryno: string;
  hrnk_menu_no: string;
  hrnk_ntctxt_no: string;
  img_link_url: string;
  img_ori: string;
  inqry_cnd_use_yn: string;
  inqry_cnt: string;
  issue_occrnc_yn: string;
  keyword: string;
  kword_use_yn: string;
  last_updt_dtm: string;
  last_updtr_id: string;
  list_img: string;
  list_img_link_yn: string;
  list_img_use_yn: string;
  logic_file_nm: string;
  menu_grp_cd: string;
  menu_nm: string;
  menu_no: string;
  meta_cd: string;
  meta_dvs: string;
  meta_use_yn: string;
  mxmm_file_size: string;
  natn_cd: string;
  natn_cd_use_yn: string;
  natn_nm: string;
  new_flag: string;
  no: string;
  ntctxt_no: string;
  nticmatr_yn: string;
  openType: string;
  order_type: string;
  ordtm_ntic_yn: string;
  orgnl_sorcnm: string;
  orgnl_url: string;
  orgnl_view_use_yn: string;
  ori_file_nm: string;
  outpt_hg: string;
  outpt_type_cd: string;
  outpt_wdt: string;
  perm_extnm: string;
  physic_file_nm: string;
  post_ntctxt_no: string;
  pre_ntctxt_no: string;
  rm: string;
  rprsnt_img_file_no: string;
  rprsnt_img_nm: string;
  rprsnt_img_yn: string;
  rtrvl_cnt: string;
  search_keyword: string;
  search_type: string;
  show_cnt: string;
  start_idx: string;
  sys_dvs_cd: string;
  tab_pdcnt: string;
  tab_use_yn: string;
  tag_info: string;
  tag_use_yn: string;
  titl: string;
  total_cnt: string;
  user_txt_del_yn: string;
  user_txt_lock_yn: string;
  user_txt_write_yn: string;
  view_img: string;
}

export interface ForeignFoodList {
  rcno: string;
  bsnOfcName: string;
  prductKoreanNm: string;
  prductNm: string;
  ovsmnfstNm: string;
  procsDtm: string;
  mnfNtnnm: string;
  xportNtnnm: string;
}

export interface MapFoodMatNameToFunctionalityMatName {
  type: 'target' | 'search';
  foodMatName: string;
  functionalityMatName: string;
}

export interface ForeignFoodDetail {
  rcno: string;
  rtrvldsuseList: [];
  foodHistInfo: {
    histNo: string;
    histCnt: number;
    histList: [];
  };
  itmList: {
    sn: number;
    itmCd: string;
    itmNm: string;
  }[];
  irdntList: {
    koreanNm: string;
    rcno: string;
    irdntCd: string;
    sn: number;
    engNm: string;
  }[];
  refrigcnvrsList: [];
  foodDetailInfo: {
    rpsntItmNm: string;
    ovsmnfstCd: string;
    prductKoreanNm: string;
    ovsmnfstNm: string;
    expirdeBeginDtm: null;
    ovsmnfstAddr: string;
    rcno: string;
    jdgmntManagtSeCd: string;
    xportNtncd: string;
    ceimdecDtm: string;
    prcssEndDtm: string;
    ovsmnfstAreaNm: null;
    prductNm: string;
    expirdeEndDtm: string;
    rpsntItmCd: string;
    dclPrductSeNm: string;
    impOwrLcsno: string;
    xportNtnnm: string;
    dclPrductSeCd: string;
    mnfNtncd: string;
    procsDtm: string;
    impdclProgrsSttusCd: string;
    ovsmnfstCmpnyNm: string;
    mnfNtnnm: string;
  };
  bsnOfcName: string;
}

export interface MapFoodMatsToMats {
  nameInFood: string;
  no: string[];
}

export interface Functionalities {
  type: '질병발생위험감소기능' | '영양소 기능' | '생리활성기능';
  id: string;
  functionality: string;
}

export interface ProcessedMaterials {
  no: string[];
  type:
    | '고시형원료-영양소'
    | '고시형원료-기능성원료'
    | '개별인정원료'
    | '사용불가원료';
  titl: string;
  company: string;
  abolished: boolean;
  canceled: boolean;
}

export interface I0040 {
  PRMS_DT: string;
  BSSH_NM: string;
  APLC_RAWMTRL_NM: string;
  HF_FNCLTY_MTRAL_RCOGN_NO: string;
  INDUTY_NM: string;
  IFTKN_ATNT_MATR_CN: string;
  ADDR: string;
  FNCLTY_CN: string;
  DAY_INTK_CN: string;
}

export interface FalseAdvertising {
  thumbnail: string;
  category: string;
  title: string;
  violation_category: string;
  violation_contents: string;
  media: string;
  phrase: string;
  result: string;
}

export interface EatTogether {
  name: string;
  name_eng: string;
  thumbnail: string;
  descriptions: {
    title?: string;
    body: string;
    medicines: {
      ingredient: string;
      names: string;
      category: string;
      specialized: boolean;
    }[];
  };
}
