import {
  Button,
  ClassroomGroup,
  Container,
  DateGroup,
  DateInput,
  Divider,
  ErrorText,
  FieldSet,
  FormContainer,
  FormGroup,
  FormHeader,
  FormSection,
  Input,
  InputGroup,
  JoinButtonGroup,
  Label,
  Required,
  Select,
  SelectGroup,
  Title
} from '../common/UserStyledComponents.js';

const OAuthUserJoinForm = ({
                             errors,
                             form,
                             getInputHandler,
                             handleSchoolSearch,
                             selectedSchool,
                             handleSubmit,
                             handleCreateClassroom,
                             classroom,
                             lastDay
                           }) => {
  return (
    <Container>
      <FormSection>
        <FormHeader>
          <Title>추가 정보 입력</Title>
        </FormHeader>

        <FormContainer>
          <FieldSet>
            <FormGroup>
              <Label htmlFor="phoneNum">
                휴대폰<Required>*</Required>
              </Label>
              <SelectGroup>
                <Select
                  name="phoneFirst"
                  value={form.phoneFirst}
                  onChange={getInputHandler}
                >
                  <option value="010">010</option>
                  <option value="011">011</option>
                  <option value="016">016</option>
                </Select>
                <Divider>-</Divider>
                <Input
                  name="phoneMiddle"
                  maxLength="4"
                  value={form.phoneMiddle}
                  onChange={getInputHandler}
                  $hasError={errors.phoneMiddle}
                  $isFilled={form.phoneMiddle.length === 4}
                />
                <Divider>-</Divider>
                <Input
                  name="phoneLast"
                  maxLength="4"
                  value={form.phoneLast}
                  onChange={getInputHandler}
                  $hasError={errors.phoneLast}
                  $isFilled={form.phoneLast.length === 4}
                />
              </SelectGroup>
              {(errors.phoneMiddle || errors.phoneLast) && (
                <ErrorText>숫자만 입력 가능합니다.</ErrorText>
              )}
            </FormGroup>

            <FormGroup>
              <Label>
                생년월일<Required>*</Required>
              </Label>
              <DateGroup>
                <DateInput
                  type="text"
                  name="birthYear"
                  maxLength="4"
                  placeholder="YYYY"
                  value={form.birthYear}
                  onChange={getInputHandler}
                  $hasError={errors.birthYear || errors.birthYearInvalid}
                  $isFilled={form.birthYear.length === 4}
                />
                <Divider>년</Divider>
                <DateInput
                  type="text"
                  name="birthMonth"
                  maxLength="2"
                  placeholder="MM"
                  value={form.birthMonth}
                  onChange={getInputHandler}
                  $hasError={errors.birthMonth || errors.birthMonthInvalid}
                  $isFilled={form.birthMonth.length === 2}
                />
                <Divider>월</Divider>
                <DateInput
                  type="text"
                  name="birthDay"
                  maxLength="2"
                  placeholder="DD"
                  value={form.birthDay}
                  onChange={getInputHandler}
                  $hasError={errors.birthDay || errors.birthDayInvalid}
                  $isFilled={form.birthDay.length === 2}
                />
                <Divider>일</Divider>
              </DateGroup>
              {(errors.birthYear || errors.birthMonth || errors.birthDay) && (
                <ErrorText>숫자만 입력 가능합니다.</ErrorText>
              )}
              {(errors.birthYearInvalid || errors.birthMonthInvalid || errors.birthDayInvalid) && (
                <>
                  <ErrorText>{errors.birthYearInvalid && '올바른 연도를 입력해주세요. (1900~)'}</ErrorText>
                  <ErrorText>{errors.birthMonthInvalid && '올바른 월을 입력해주세요. (1-12)'}</ErrorText>
                  <ErrorText>{errors.birthDayInvalid && `올바른 일을 입력해주세요. (${lastDay})`}</ErrorText>
                </>
              )}
            </FormGroup>

            {/* 학교명 검색 - InputGroup 활용 */}
            <FormGroup>
              <Label htmlFor="schoolName">
                학교명<Required>*</Required>
              </Label>
              <InputGroup>
                <Input
                  id="schoolName"
                  name="schoolName"
                  value={selectedSchool.name}
                  placeholder="학교를 검색해주세요"
                  readOnly
                />
                <Button type="button" $primary onClick={handleSchoolSearch}>
                  학교검색
                </Button>
              </InputGroup>
            </FormGroup>

            {/* 학교 주소 - 기본 Input 활용 */}
            <FormGroup>
              <Label>주소</Label>
              <Input
                id="schoolAddress"
                name="schoolAddress"
                value={selectedSchool.address}
                readOnly
                placeholder="학교 주소"
              />
            </FormGroup>

            {/* 반 정보 입력 */}
            <FormGroup>
              <Label>연도/학년/반<Required>*</Required></Label>
              <ClassroomGroup>
                {/* 연도 선택 */}
                <Select name="year" value={classroom.year} onChange={handleCreateClassroom}>
                  <option value="">연도</option>
                  {Array.from(
                    { length: new Date().getFullYear() - 1999 },
                    (_, i) => new Date().getFullYear() - i
                  ).map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Select>

                {/* 학년 선택 */}
                <Select name="grade" value={classroom.grade} onChange={handleCreateClassroom}
                        disabled={!selectedSchool.type}>
                  <option value="">학년</option>
                  {selectedSchool.type && Array.from(
                    { length: selectedSchool.type.includes('초등') ? 6 : 3 },
                    (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}학년
                      </option>
                    )
                  )}
                </Select>

                {/* 반 이름 입력 */}
                <Input name="classroomName" value={classroom.classroomName} onChange={handleCreateClassroom}
                       placeholder="반 이름 입력 (최대 10자, 반 빼고 ex. 갱스터 o)"
                       maxLength={10}
                       style={{ width: '200px' }}
                />
              </ClassroomGroup>
            </FormGroup>

            {/* 이전/가입하기 버튼 - InputGroup 스타일 활용 */}
            <JoinButtonGroup>
              <Button type="button" style={{ width: '50%' }}>이전</Button>
              <Button type="submit" style={{ width: '50%' }} $primary onClick={handleSubmit}>가입하기</Button>
            </JoinButtonGroup>

          </FieldSet>
        </FormContainer>
      </FormSection>
    </Container>
  );
};


export default OAuthUserJoinForm;