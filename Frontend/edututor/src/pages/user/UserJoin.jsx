import { useState } from 'react';
import { getSchool } from '../../api/user/school.js';
import UserJoinForm from '../../components/user/UserJoinForm.jsx';


const formData = {
  fullName         : '',
  loginId          : '',
  password         : '',
  passwordCheck    : '',
  email            : '',
  emailDomain      : '',
  emailDomainSelect: '직접 입력', // 기본값 설정
  phoneFirst       : '010',
  phoneMiddle      : '',
  phoneLast        : '',
  birthYear        : '',
  birthMonth       : '',
  birthDay         : '',
  schoolType       : '초등'
};

const schoolInfo = {
  id        : 'SD_SCHUL_CODE',
  type      : 'SCHUL_KND_SC_NM',
  name      : 'SCHUL_NM',
  officeCode: 'ATPT_OFCDC_SC_CODE',
  address   : 'ORG_RDNMA'
};

const inputError = {
  phoneMiddle: false,
  phoneLast  : false,
  birthYear  : false,
  birthMonth : false,
  birthDay   : false
};
/*
* "ATPT_OFCDC_SC_CODE": "N10",
          "ATPT_OFCDC_SC_NM": "충청남도교육청",
          "SD_SCHUL_CODE": "8171042",
          "SCHUL_NM": "주포초등학교",
          "ENG_SCHUL_NM": "Jupo Elementary School",
          "SCHUL_KND_SC_NM": "초등학교",
          "LCTN_SC_NM": "충청남도",
          "JU_ORG_NM": "충청남도보령교육지원청",
          "FOND_SC_NM": "공립",
          "ORG_RDNZC": "33414 ",
          "ORG_RDNMA": "충청남도 보령시 주포면 보령읍성길 87-22",
          "ORG_RDNDA": "(주포면)",
          "ORG_TELNO": "041-932-7006",
          "HMPG_ADRES": "http://jupo.cnees.kr",
          "COEDU_SC_NM": "남여공학",
          "ORG_FAXNO": "041-934-5253",
          "HS_SC_NM": null,
          "INDST_SPECL_CCCCL_EXST_YN": "N",
          "HS_GNRL_BUSNS_SC_NM": "해당없음",
          "SPCLY_PURPS_HS_ORD_NM": null,
          "ENE_BFE_SEHF_SC_NM": "전기",
          "DGHT_SC_NM": "주간",
          "FOND_YMD": "19110705",
          "FOAS_MEMRD": "19111205",
          "LOAD_DTM": "20240310"
* */


const UserJoin = () => {
  const [form, setForm] = useState(formData);
  const [school, setSchool] = useState(schoolInfo);
  const [isSearching, setIsSearching] = useState(false);
  const [errors, setErrors] = useState(inputError);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (['phoneMiddle', 'phoneLast', 'birthYear', 'birthMonth', 'birthDay'].includes(name)) {
      const hasNonNumber = /[^0-9]/.test(value);
      const numberOnly = value.replace(/[^0-9]/g, '');

      setErrors(prev => ({
        ...prev,
        [name]: hasNonNumber
      }));

      setForm(prev => ({
        ...prev,
        [name]: numberOnly
      }));
      return;
    }

    if (name === 'emailDomainSelect') {
      setForm(prev => ({
        ...prev,
        emailDomainSelect: value,
        emailDomain      : value
      }));
      return;
    }

    if (name === 'emailDomain') {
      setForm(prev => ({
        ...prev,
        emailDomain      : value,
        emailDomainSelect: ''
      }));
    }

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSchoolSearch = (e) => {
    setIsSearching(true);

    // 학교 검색 API 호출
    getSchool(e.target.value);
  };

  return (
    <>
      <UserJoinForm errors={errors} form={form} school={school} handleInputChange={handleInputChange}
                    handleSchoolSearch={handleSchoolSearch} />
    </>
  );
};

export default UserJoin;