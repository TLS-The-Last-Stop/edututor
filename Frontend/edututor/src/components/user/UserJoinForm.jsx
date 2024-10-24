import {
  Button,
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
  RadioGroup,
  RadioInput,
  RadioLabel,
  Required,
  Select,
  SelectGroup,
  Title
} from '../common/UserStyledComponents.js';

const UserJoinForm = ({
                        errors,
                        form,
                        getInputHandler,
                        handleSchoolSearch,
                        selectedSchool,
                        handleCheckDuplicatedId,
                        handleSubmit
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
              <Label htmlFor="joinId">
                아이디<Required>*</Required>
              </Label>
              <InputGroup>
                <Input
                  id="joinId"
                  name="joinId"
                  value={form.joinId}
                  onChange={getInputHandler}
                  placeholder="영문 대/소문자+숫자조합 (6~20자 이내)"
                  $hasError={errors.joinId}
                />
                <Button type="button" onClick={handleCheckDuplicatedId}>
                  중복 확인
                </Button>
              </InputGroup>
              {errors.joinId && (
                <ErrorText>영문 대/소문자 + 숫자조합 (6~20자 이내)</ErrorText>
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
              {errors.passwordMatch && (
                <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="passwordCheck">
                비밀번호 확인<Required>*</Required>
              </Label>
              <Input
                id="passwordCheck"
                name="passwordCheck"
                value={form.passwordCheck}
                onChange={getInputHandler}
                placeholder="비밀번호 확인을 위해 다시 한번 입력해주세요"
                $hasError={errors.passwordMatch}
              />
              {errors.passwordMatch && (
                <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>
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
                />
                <Divider>-</Divider>
                <Input
                  name="phoneLast"
                  maxLength="4"
                  value={form.phoneLast}
                  onChange={getInputHandler}
                  $hasError={errors.phoneLast}
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
                />
                <Divider>일</Divider>
              </DateGroup>
              {(errors.birthYear || errors.birthMonth || errors.birthDay) && (
                <ErrorText>숫자만 입력 가능합니다.</ErrorText>
              )}
            </FormGroup>

            {/* 학교 유형 선택 - RadioGroup 활용 */}
            <FormGroup>
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