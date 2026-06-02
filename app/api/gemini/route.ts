import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json(
      { error: "prompt를 보내주세요." },
      { status: 400 }
    );
  }

  // ============================================================
  //  TODO  —  여기에 Gemini API 호출 코드를 작성하세요
  // ============================================================
  //
  //  ▶ 힌트 1.  API 키 읽기
  //      .env 파일에 넣은 키를 process.env.GEMINI_API_KEY 로 불러올 수 있어요.
  //      코드에 직접 키를 박지 마세요. (GitHub에 올라가면 누구나 훔쳐 씁니다.)
  //
  //  ▶ 힌트 2.  필요한 패키지 설치
  //      터미널에서:   npm install @google/generative-ai
  //
  //  ▶ 힌트 3.  안티그래비티에게 이 문장을 그대로 부탁해보세요
  //      ─────────────────────────────────────────────────────
  //      "이 route.ts 파일의 TODO 자리를 채워줘.
  //       prompt 변수의 내용을 @google/generative-ai 의 gemini-2.0-flash 모델로 보내고,
  //       답변 텍스트만 { text: '...' } JSON 형태로 NextResponse.json 으로 돌려줘.
  //       API 키는 process.env.GEMINI_API_KEY 에서 읽어줘.
  //       키가 없거나 호출이 실패하면 500 상태와 에러 메시지를 돌려줘."
  //      ─────────────────────────────────────────────────────
  //
  //  ▶ 힌트 4.  로컬에서 작동 확인
  //      터미널에서:   npm run dev
  //      브라우저에서: http://localhost:3000
  //
  // ============================================================

  return NextResponse.json({
    text:
      "아직 Gemini API가 연결되지 않았어요!\n\n" +
      "app/api/gemini/route.ts 파일을 열어보면 TODO 자리가 있어요.\n" +
      "안티그래비티에게 힌트 3번의 문장을 그대로 부탁해보세요. ✨",
  });
}
