export const shareResults = async (results, questions) => {
  try {
    // 고유 키 생성 (시간 기반으로 유니크 보장)
    const shareKey = `share_${Date.now()}`;
    // 세션 스토리지에 데이터 저장
    sessionStorage.setItem(
      shareKey,
      JSON.stringify({ results, questions })
    );

    // URL 생성 (키만 포함)
    const currentUrl = `${window.location.origin}/summary?key=${shareKey}`;

    if (navigator.share) {
      await navigator.share({
        title: "밸런스 게임 결과",
        text: "내 밸런스 게임 결과를 확인하세요!",
        url: currentUrl,
      });
    } else {
      await navigator.clipboard.writeText(currentUrl);
      alert("결과 링크가 복사되었습니다. 공유해보세요!");
    }
  } catch (err) {
    alert("결과를 공유하는 중 오류가 발생했습니다.");
    console.error(err);
  }
};
