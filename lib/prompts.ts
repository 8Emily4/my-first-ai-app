export type ModeId = "intro" | "comfort" | "diary" | "quote" | "email";

export interface Mode {
  id: ModeId;
  emoji: string;
  title: string;
  subtitle: string;
  inputLabel: string;
  inputPlaceholder: string;
  buttonText: string;
  buildPrompt: (userInput: string) => string;
}

export const MODES: Mode[] = [
  {
    id: "intro",
    emoji: "✨",
    title: "AI 자기소개 도우미",
    subtitle: "키워드 3개로 따뜻한 자기소개 글을 만들어드려요",
    inputLabel: "나를 표현하는 키워드 3개",
    inputPlaceholder: "예: 다정함, 책 읽기, 김치찌개",
    buttonText: "자기소개 만들어줘",
    buildPrompt: (input) =>
      `다음 키워드를 가진 사람의 따뜻하고 진솔한 자기소개 글을 3문단으로 써주세요. 너무 거창하지 말고, 일상의 결을 살려주세요.\n\n키워드: ${input}`,
  },
  {
    id: "comfort",
    emoji: "🌿",
    title: "내 마음 위로 받기",
    subtitle: "오늘 마음 한 줄 적으면 AI가 곁에서 위로해드려요",
    inputLabel: "오늘 마음",
    inputPlaceholder: "예: 오늘 회사에서 혼나서 마음이 무거워요",
    buttonText: "위로받기",
    buildPrompt: (input) =>
      `사용자가 다음과 같은 마음을 털어놓았어요. 판단하거나 충고하지 말고, 그 감정을 먼저 받아주는 따뜻한 위로 메시지를 3~4문장으로 써주세요. 한국어로, 다정한 친구의 톤으로.\n\n사용자의 마음: ${input}`,
  },
  {
    id: "diary",
    emoji: "📔",
    title: "한 줄 일기 펼치기",
    subtitle: "한 줄만 적으면 일기 한 페이지로 펼쳐드려요",
    inputLabel: "오늘 한 줄",
    inputPlaceholder: "예: 오늘 김치찌개 먹었다",
    buttonText: "펼치기",
    buildPrompt: (input) =>
      `다음의 짧은 메모를 일기 한 페이지(5~7문장)로 잔잔하게 펼쳐주세요. 그 순간의 감각·풍경·생각을 상상해서 채워주되, 과장하지 말고, 1인칭으로.\n\n메모: ${input}`,
  },
  {
    id: "quote",
    emoji: "💡",
    title: "AI 명언 생성기",
    subtitle: "주제 단어 하나로 명언과 해설을 만들어요",
    inputLabel: "주제",
    inputPlaceholder: "예: 용기, 인내, 시작",
    buttonText: "명언 만들기",
    buildPrompt: (input) =>
      `다음 주제에 대한 짧고 강렬한 한국어 명언 하나(25자 이내)와, 그 명언이 왜 의미 있는지 2~3문장 해설을 만들어주세요.\n\n주제: ${input}\n\n형식:\n명언: (한 줄)\n해설: (2~3문장)`,
  },
  {
    id: "email",
    emoji: "✉️",
    title: "메일 문구 다듬기",
    subtitle: "거친 초안을 정중한 메일로 바꿔드려요",
    inputLabel: "초안",
    inputPlaceholder: "예: 그거 언제 보내줌? 빨리 좀",
    buttonText: "다듬어줘",
    buildPrompt: (input) =>
      `다음 거친 초안을 한국어 비즈니스 메일 톤으로 정중하게 다듬어주세요. 인사 → 본문 → 맺음말 구조로, 너무 딱딱하지 않고 자연스럽게.\n\n초안: ${input}`,
  },
];

export function getMode(id: string): Mode | undefined {
  return MODES.find((m) => m.id === id);
}
