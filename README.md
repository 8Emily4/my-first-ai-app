# AI 미니앱 스타터

바이브코딩 6회차 실습 스타터입니다. 다섯 가지 AI 미니앱 중 하나를 골라서, **Gemini API · `.env` · `.gitignore`** 한 사이클을 끝까지 돌려봅니다.

> **오늘의 약속.** 새로운 기능을 0개 추가합니다. 오늘은 **"AI 키 발급 → 비밀의 방 → 호출 → 배포"** 이 한 바퀴를 손에 익을 때까지 돌리는 게 전부예요.

---

## 만들 수 있는 다섯 가지

| # | 미니앱 | 무엇을 하나요 |
|---|---|---|
| ✨ | AI 자기소개 도우미 | 키워드 3개 → 자기소개 글 3문단 |
| 🌿 | 내 마음 위로 받기 | 오늘 마음 한 줄 → 따뜻한 위로 |
| 📔 | 한 줄 일기 펼치기 | 한 줄 메모 → 일기 한 페이지 |
| 💡 | AI 명언 생성기 | 주제 단어 → 명언 + 해설 |
| ✉️ | 메일 문구 다듬기 | 거친 초안 → 정중한 메일 |

다섯 가지 코드는 같아요. **프롬프트 한 줄씩만** 다릅니다. (`lib/prompts.ts` 참고)

---

## 한 사이클 — 9단계

### STEP 1. 이 저장소를 내 GitHub으로 가져오기

1. 위쪽 초록색 **"Use this template"** 버튼을 누르세요.
2. **Create a new repository** 선택.
3. 본인 GitHub 계정 아래에 새 저장소 이름을 짓고 만들어주세요.

> `Use this template` 은 fork 와 달리 **깨끗한 새 저장소**를 만들어줍니다. 본인 코드처럼 자유롭게 푸시할 수 있어요.

### STEP 2. 안티그래비티(Antigravity)에서 클론

1. 본인 GitHub 저장소 페이지 → **Code** 버튼 → HTTPS 주소 복사
2. 안티그래비티 실행 → **Clone Repository** → 주소 붙여넣기
3. 적당한 폴더를 골라 클론 완료

### STEP 3. 의존성 설치

안티그래비티의 터미널에서:

```bash
npm install
```

> 노드제이에스가 깔려 있어야 합니다 (5회차에 이미 설치했어요).

### STEP 4. Gemini API 키 받기

1. <https://aistudio.google.com/> 접속 → 구글 로그인
2. 왼쪽 메뉴 **"Get API key"** 클릭
3. **"Create API key"** → 생성된 키를 메모장에 복사

> 카드 등록 필요 없어요. 무료 할당량으로 수업은 충분합니다.

### STEP 5. 비밀의 방 만들기 — `.env`

`.env.example` 파일을 복제해서 이름을 `.env` 로 바꿉니다.

```bash
cp .env.example .env
```

`.env` 파일을 열어 `여기에_본인_키를_붙여넣으세요` 자리에 STEP 4의 키를 붙여넣습니다.

```env
GEMINI_API_KEY=AIzaSy...실제_본인_키...
```

> **이 파일은 GitHub에 절대 올라가지 않습니다.** `.gitignore` 안에 `.env*` 가 이미 들어 있어요. 터미널에서 `git status` 를 쳐서 `.env` 가 안 보이는 걸 확인해보세요.

### STEP 6. API 호출 코드 채우기 — TODO

`app/api/gemini/route.ts` 파일을 열면 큰 **TODO 자리**가 있습니다. 안티그래비티에게 이 문장을 그대로 부탁하세요:

```
이 route.ts 파일의 TODO 자리를 채워줘.
prompt 변수의 내용을 @google/generative-ai 의 gemini-2.0-flash 모델로 보내고,
답변 텍스트만 { text: '...' } JSON 형태로 NextResponse.json 으로 돌려줘.
API 키는 process.env.GEMINI_API_KEY 에서 읽어줘.
키가 없거나 호출이 실패하면 500 상태와 에러 메시지를 돌려줘.
```

안티그래비티가 코드를 만들어주면 그대로 적용합니다. 패키지 설치 명령(`npm install @google/generative-ai`)도 함께 알려줄 거예요.

### STEP 7. 로컬에서 작동 확인

```bash
npm run dev
```

브라우저에서 <http://localhost:3000> 열기 → 모드 한 개 골라보기 → 입력하고 버튼 → AI 답변이 뜨면 ✅

> **안 떠요!** 가 떠도 괜찮습니다. `.env` 가 잘 들어갔는지, `npm run dev` 를 재시작했는지(키 추가 후엔 재시작 필요), 터미널에 에러가 떴는지 확인해보세요.

### STEP 8. GitHub에 푸시

```bash
git add .
git commit -m "Gemini API 연결 완료"
git push
```

> `.env` 파일이 같이 올라가는지 다시 한번 확인하세요. `git status` 에 `.env` 가 보이면 안 됩니다.

### STEP 9. Vercel에 배포 + 환경변수 알려주기

1. <https://vercel.com/new> 접속 → 본인 GitHub 저장소 import
2. **Environment Variables** 칸에 추가:
   - Name: `GEMINI_API_KEY`
   - Value: STEP 4의 본인 키
3. **Deploy** 누르기
4. 배포가 끝나면 `https://your-app.vercel.app` 같은 주소가 생깁니다.

> **흔한 함정.** 배포 후에 키를 추가했다면 **Redeploy** 를 다시 한 번 눌러야 적용됩니다. Vercel은 `.env` 파일을 못 봐요 — 따로 알려줘야 해요.

---

## 폴더 구조

```
ai-mini-app-starter/
├── app/
│   ├── page.tsx              ← 5개 모드 UI (완성됨)
│   ├── layout.tsx            ← 메타 정보
│   ├── globals.css           ← 디자인 토큰
│   └── api/
│       └── gemini/
│           └── route.ts      ← TODO: 학생이 채울 자리
├── lib/
│   └── prompts.ts            ← 5가지 프롬프트 템플릿
├── .env.example              ← 환경변수 예시
├── .gitignore                ← .env 무시 설정
└── package.json
```

---

## 막혔을 때

| 증상 | 확인할 것 |
|---|---|
| `.env` 가 git에 올라간다 | `.gitignore` 에 `.env*` 한 줄 있는지 확인 |
| 로컬에서 키 못 읽음 | `npm run dev` 를 다시 시작했는지 (Ctrl+C 후 재실행) |
| Vercel 배포 후 500 에러 | Vercel 환경변수 등록 + **Redeploy** 했는지 |
| quota 초과 | 잠시 기다리거나 새 키 발급 |
| 다른 사람이 내 사이트에서 입력해도 됨? | 됩니다. 무료 quota 한도 안에서. |

---

## 다음 주(7회차) 미션

1. **내 도메인 사오기** — `.xyz` 1년 1,000원 정도면 OK (Namecheap·Porkbun)
2. **README.md 채워오기** — 본인 앱 자기소개. 무엇을 만들었는지, 어떻게 쓰는지

다음 시간에는 본인 도메인을 본인 사이트에 연결합니다.

---

스마택트 Smartact · 바이브코딩 6회차
