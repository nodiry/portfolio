export default function ProjectsTab({ lang }: { lang: "en" | "ko" }) {
  return (
    <div>
      {lang === "en" ? (
        <div>
          <p className="text-xl">Welcome to Robert's Terminal Resume</p>
          <p className="mt-2">Use ← → to navigate tabs.</p>
        </div>
      ) : (
        <div>
          <p className="text-xl">로버트의 터미널 이력서에 오신 것을 환영합니다.</p>
          <p className="mt-2">← → 키로 탭을 이동하세요.</p>
        </div>
      )}
    </div>
  );
}
