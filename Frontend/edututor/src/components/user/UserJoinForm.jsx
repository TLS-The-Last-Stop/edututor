import {
  Button,
  ClassroomGroup,
  Container,
  DateGroup,
  DateInput,
  Divider,
  EmailGroup,
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
  SuccessText,
  Title
} from '../common/UserStyledComponents.js';

const UserJoinForm = ({
                        errors,
                        form,
                        getInputHandler,
                        handleSchoolSearch,
                        selectedSchool,
                        handleCheckDuplicatedId,
                        handleSubmit,
                        isIdChecked,
                        idCheckMessage,
                        handleCreateClassroom,
                        classroom
                      }) => {

  return (
    <Container>
      <FormSection>
        <FormHeader>
          <Title>회원가입</Title>
        </FormHeader>

        <FormContainer>
          <FieldSet>
            <FormGroup>
              <Label htmlFor="fullName">
                이름<Required>*</Required>
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={getInputHandler}
                placeholder="이름을 입력해주세요."
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="loginId">
                아이디<Required>*</Required>
              </Label>
              <InputGroup>
                <Input
                  id="loginId"
                  name="loginId"
                  value={form.loginId}
                  onChange={getInputHandler}
                  placeholder="영문 대/소문자+숫자조합 (6~20자 이내)"
                  $hasError={errors.loginId}
                />
                <Button type="button" onClick={handleCheckDuplicatedId}
                        disabled={!form.loginId || form.loginId.length < 6 || errors.loginId}>
                  중복 확인
                </Button>
              </InputGroup>
              {errors.loginId && (
                <ErrorText>영문 대/소문자 + 숫자조합 (6~20자 이내)</ErrorText>
              )}
              {idCheckMessage && (
                <SuccessText $isSuccess={isIdChecked}>{idCheckMessage}</SuccessText>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">
                비밀번호<Required>*</Required>
              </Label>
              <Input
                id="password"
                name="password"
                value={form.password}
                onChange={getInputHandler}
                placeholder="영문 대/소문자+특수문자조합(9~20자 이내)"
                $hasError={errors.password}
              />
              {errors.password && (
                <ErrorText>영문 대/소문자, 숫자, 특수문자(!@#$%^&*)를 모두 포함하여 9-20자로 입력해주세요.</ErrorText>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirmPassword">
                비밀번호 확인<Required>*</Required>
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={getInputHandler}
                placeholder="비밀번호 확인을 위해 다시 한번 입력해주세요"
                $hasError={errors.passwordMatch}
              />
              {errors.passwordMatch && (
                <ErrorText>
                  {!errors.password ? '비밀번호가 일치하지 않습니다.' : '비밀번호가 형식에 맞지 않습니다.'}
                </ErrorText>
              )}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">
                이메일<Required>*</Required>
              </Label>
              <EmailGroup>
                <Input
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={getInputHandler}
                  placeholder="이메일"
                />
                <Divider>@</Divider>
                <Input
                  id="emailDomain"
                  name="emailDomain"
                  value={form.emailDomain || form.emailDomainSelect}
                  onChange={getInputHandler}
                />
                <Select
                  name="emailDomainSelect"
                  value={form.emailDomainSelect}
                  onChange={getInputHandler}
                >
                  <option value="">직접입력</option>
                  <option value="naver.com">naver.com</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="daum.net">daum.net</option>
                </Select>
              </EmailGroup>
            </FormGroup>

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
                  $hasError={errors.birthYear}
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
                  $hasError={errors.birthMonth}
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
                  $hasError={errors.birthDay}
                  $isFilled={form.birthDay.length === 2}
                />
                <Divider>일</Divider>
              </DateGroup>
              {(errors.birthYear || errors.birthMonth || errors.birthDay) && (
                <ErrorText>숫자만 입력 가능합니다.</ErrorText>
              )}
            </FormGroup>

            {/* 학교 유형 선택 - RadioGroup 활용 */}
            {/*<FormGroup>
              <Label>학교 유형</Label>
              <RadioGroup>
                <RadioLabel>
                  <RadioInput
                    type="radio"
                    name="schoolType"
                    value="초등"
                    checked={form.schoolType === '초등'}
                    onChange={getInputHandler}
                  />
                  초등
                </RadioLabel>
                <RadioLabel>
                  <RadioInput
                    type="radio"
                    name="schoolType"
                    value="중등"
                    checked={form.schoolType === '중등'}
                    onChange={getInputHandler}
                  />
                  중등
                </RadioLabel>
                <RadioLabel>
                  <RadioInput
                    type="radio"
                    name="schoolType"
                    value="고등"
                    checked={form.schoolType === '고등'}
                    onChange={getInputHandler}
                  />
                  고등
                </RadioLabel>
              </RadioGroup>
            </FormGroup>*/}

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

export default UserJoinForm;