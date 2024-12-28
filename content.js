let currentIndex = 0;
const SELECTED_CLASS = 'selected-result';

/**
 * 検索結果のリンクを移動
 * @param {number} direction - 移動する方向（1: 次, -1: 前）
 */
const navigateLinks = (direction) => {
  const links = Array.from(document.querySelectorAll('a'));

  // 検索結果リンク（.tF2Cxc クラス内）だけをフィルタリング
  const searchResults = links.filter((link) => link.closest('.tF2Cxc'));

  if (searchResults.length === 0) return;

  // 現在の選択をリセット
  if (searchResults[currentIndex]) {
    searchResults[currentIndex].classList.remove(SELECTED_CLASS);
  }

  // インデックスを更新
  currentIndex = (currentIndex + direction + searchResults.length) % searchResults.length;

  // 新しいリンクを選択状態に
  const selectedLink = searchResults[currentIndex];
  selectedLink.classList.add(SELECTED_CLASS);
  selectedLink.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

/**
 * 次または前の検索ページに移動
 * @param {boolean} isNext - 次のページならtrue、前のページならfalse
 */
const moveToNextPage = (isNext) => {
  const navLinks = document.querySelectorAll('#pnnext, #pnprev');
  const link = isNext ? navLinks[0] : navLinks[1];
  if (link) link.click();
};

/**
 * 検索直後に最初のリンクを選択状態にする
 */
const selectFirstResult = () => {
  const firstLink = document.querySelectorAll('.tF2Cxc a')[0];
  if (firstLink) {
    firstLink.classList.add(SELECTED_CLASS);
    currentIndex = 0;
  }
};

// 検索結果が読み込まれた後に最初のリンクを選択状態に
window.addEventListener('load', () => {
  setTimeout(selectFirstResult, 50); // 少し遅延して選択（ページロードの安定化のため）
});

// キーボードイベントを監視
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'j':
    case 'ArrowDown':
      navigateLinks(1);
      break;
    case 'k':
    case 'ArrowUp':
      navigateLinks(-1);
      break;
    case 'l':
    case 'ArrowRight':
      moveToNextPage(true);
      break;
    case 'h':
    case 'ArrowLeft':
      moveToNextPage(false);
      break;
    case 'Enter':
      // 現在選択されているリンクをクリック
      const selectedLink = document.querySelector(`.${SELECTED_CLASS}`);
      if (selectedLink) selectedLink.click();
      break;
  }
});

