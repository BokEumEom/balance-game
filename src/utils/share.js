export const shareResults = async (results) => {
  try {
    const currentUrl = `${window.location.origin}/summary?results=${encodeURIComponent(
      JSON.stringify(results)
    )}`;

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
    alert("공유 중 오류가 발생했습니다.");
    console.error(err);
  }
};
