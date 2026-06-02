"use client";

import { useState } from "react";
import { MODES, type Mode } from "@/lib/prompts";

export default function Home() {
  const [selected, setSelected] = useState<Mode | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  function pickMode(mode: Mode) {
    setSelected(mode);
    setInput("");
    setResult("");
    setError("");
  }

  function goBack() {
    setSelected(null);
    setInput("");
    setResult("");
    setError("");
  }

  async function ask() {
    if (!selected || !input.trim()) return;
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: selected.buildPrompt(input.trim()) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "호출에 실패했어요.");
      } else {
        setResult(data.text || "");
      }
    } catch {
      setError("네트워크에 문제가 있어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex-1 w-full">
      <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:py-16">
        {/* 표지 영역 */}
        <header className="border-t-[6px] border-teal pt-8 pb-6 border-b border-line mb-10">
          <div className="eyebrow mb-3">바이브코딩 · 6회차 스타터</div>
          <h1 className="cover-title text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-ink">
            내 사이트에 <em>AI 심장</em> 달기
          </h1>
          <p className="mt-4 text-muted text-base leading-relaxed">
            Gemini API · <code>.env</code> · <code>.gitignore</code> 의 첫 만남.
            오늘은 다섯 가지 AI 미니앱 중 하나를 골라, 한 사이클을 끝까지
            돌려봅니다.
          </p>
        </header>

        {!selected ? (
          // ========== 5개 모드 선택 화면 ==========
          <section>
            <h2 className="text-xl font-bold text-teal mb-2">
              오늘은 어떤 AI를 만들까요?
            </h2>
            <p className="text-muted mb-6 text-sm">
              하나만 골라도 충분합니다. 시간이 남으면 다른 것도 시도해보세요.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MODES.map((mode) => (
                <button
                  key={mode.id}
                  className="mode-card"
                  onClick={() => pickMode(mode)}
                >
                  <span className="mode-emoji">{mode.emoji}</span>
                  <span className="mode-title">{mode.title}</span>
                  <span className="mode-sub">{mode.subtitle}</span>
                </button>
              ))}
            </div>

            <div className="callout tip mt-8">
              <b>오늘 가장 중요한 한 줄.</b> 우리는 API 키를 코드에 박지 않습니다.{" "}
              <code>.env</code> 라는 비밀의 방을 만들고, GitHub에는 절대
              올라가지 않게 합니다.
            </div>
          </section>
        ) : (
          // ========== 선택된 모드 작업 화면 ==========
          <section>
            <button onClick={goBack} className="btn-ghost mb-6">
              ← 모드 다시 고르기
            </button>

            <div className="flex items-start gap-3 mb-1">
              <span className="text-3xl">{selected.emoji}</span>
              <div>
                <h2 className="text-2xl font-bold text-teal leading-tight">
                  {selected.title}
                </h2>
                <p className="text-muted text-sm mt-1">{selected.subtitle}</p>
              </div>
            </div>

            <div className="input-block mt-6">
              <label className="block font-semibold text-ink mb-2">
                {selected.inputLabel}
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={selected.inputPlaceholder}
                disabled={loading}
              />
              <div className="mt-4 flex items-center gap-3">
                <button
                  className="btn-primary"
                  onClick={ask}
                  disabled={loading || !input.trim()}
                >
                  {loading ? "생각하는 중…" : selected.buttonText}
                </button>
                {input.trim() && !loading && (
                  <button className="btn-ghost" onClick={() => setInput("")}>
                    지우기
                  </button>
                )}
              </div>
            </div>

            {error && (
              <div className="callout danger mt-6">
                <b>잠깐.</b> {error}
              </div>
            )}

            {result && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-teal mb-3">결과</h3>
                <div className="result-box">{result}</div>
              </div>
            )}

            {!result && !error && !loading && (
              <div className="todo-banner mt-8">
                <span className="todo-label">개발자 메모</span>
                <p className="text-sm leading-relaxed">
                  처음에는 결과가 안 나올 수 있어요.{" "}
                  <code>app/api/gemini/route.ts</code> 파일을 열어보면{" "}
                  <b>TODO</b> 자리가 있습니다. 안티그래비티에 힌트 3번 문장을
                  그대로 부탁하면 코드를 채워줍니다. ✨
                </p>
              </div>
            )}
          </section>
        )}

        {/* 푸터 */}
        <footer className="mt-16 pt-6 border-t border-line text-xs text-muted flex justify-between">
          <span>바이브코딩 6회차 스타터</span>
          <span>스마택트 Smartact</span>
        </footer>
      </div>
    </main>
  );
}
