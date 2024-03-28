// 메모 - STEP 1
// const cards = document.querySelectorAll(".card");

// // callback 함수가 필수이다 - (entries) => {} 부분이 callback함수임
// // entries는 무엇을 뜻하는가?
// // 아래 observer.observe(card[0])으로 옵저버에 주시 대상으로 cards[0]를 등록해주었으니 entries는 cards[0]인 주시 대상을 뜻한다
// const observer = new IntersectionObserver((entries) => {
//   console.log(entries);
//   // entries 콘솔에 찍힌 내용을 보고 어떤 것들이 들어있는지 파악해보자
// });

// // IntersectionObserver.observe() 공식 문서 : https://developer.mozilla.org/ko/docs/Web/API/IntersectionObserver/observe
// // 여기서 cards[0]가 가시성 변화를 감지할 element임
// observer.observe(cards[0]);

// ----------------------------

// 메모 - STEP 2
const cards = document.querySelectorAll(".card");

// toggle() : test라는 클래스가 존재하면 제거되고, 없으면 추가됩니다.
// toggle() 관련 아티클 추천 : https://everyshare.co.kr/javascript%EC%9D%98-toggle-%EB%A9%94%EC%84%9C%EB%93%9C%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%9A%94%EC%86%8C-%ED%91%9C%EC%8B%9C-%EC%88%A8%EA%B9%80-%EC%A0%84%ED%99%98/
// cards[0].addEventListener("click", (e) => e.target.classList.toggle("test"));

// 천천히 스크롤하면서 개발자도구-요소에서 show 클래스가 어디 추가되는지 같이 확인하고
// 화면에 감지될 때 애니메이션으로 card가 생기는 것을 확인하자
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // 스크롤해서 확인해보면 화면에 없어지는 순간 show클래스명이 사라지게 되고
      // 화면에 표출되는 순간 show클래스명이 생긴다
      entry.target.classList.toggle("show", entry.isIntersecting); // entry.isIntersecting이 true일 때 toggle함수가 실행된다
      // 메모 - STEP 3
      // 공식 문서 왈 : 요소의 주시를 중단하려면 IntersectionObserver.unobserve()를 호출하세요.
      // console.log(entry.target); // 처음에 card 클래스를 가진 애들을 다 주시하라고 아래에 지정해줬으니 콘솔에 다 찍히는 것을 확인할 수 있음, 다 제거하고 천천히 스크롤해보면 변화가 있는 주시 대상이 콘솔에 찍히는 것을 확인할 수 있음
      // 요걸 걸어주니까 한번 화면에 노출되어 변화가 감지되서 화면에 그려지고 나면 observer.unobserve()를 통해 더이상 주시하지 않도록 감시를 끊어주는 것이다
      // 스크롤 해보면 한번 생긴 card div들이 없어지지 않고 show클래스명을 가진 채로 유지된다
      if (entry.isIntersecting) cardObserver.unobserve(entry.target);
    });
  }

  // {
  //   // 메모 - STEP 4
  //   // 0, 0.5, 1의 차이점을 직접 눈으로 확인해보자
  //   // 기본 세팅 값은 0이당
  //   threshold: 0,
  //   // 메모 - STEP 5
  //   // 음수일 경우 - 화면 안쪽으로 100px 올라온다고 생각하면 될듯 = like padding ?!
  //   // 양수일 경우 - 화면 바깥쪽으로 100px 더 잡힌다고 생각하면 될듯 = 위아래로 높이가 100px만큼 늘어나는 거라고 생각하면 됨
  //   // 개발자 도구에서 요소 보면서 눈으로 확인해보면 될 듯
  //   rootMargin: "100px",
  // }
);

// 메모 - STEP 6
const lastCardObserver = new IntersectionObserver((entries) => {
  const lastCard = entries[0];
  if (!lastCard.isIntersecting) return;
  loadNewCards();
  lastCardObserver.unobserve(lastCard.target);
  // 무한대로 계속 만들고 싶다면 다시 lastCardObserver에 주시 대상을 명시해주면 됨 -> 아래 코드 주석을 풀어보자!
  // lastCardObserver.observe(document.querySelector(".card:last-child"));
});

lastCardObserver.observe(document.querySelector(".card:last-child"));

// card클래스명을 가진 element들에 전부 옵져버를 붙혀주는 것이다 => 즉, 주시 대상으로 다 걸어주는것임
cards.forEach((card) => {
  cardObserver.observe(card);
});

// 메모 - STEP 6
const cardContainer = document.querySelector(".card-container");

function loadNewCards() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement("div");
    card.textContent = "New Card";
    card.classList.add("card");
    cardObserver.observe(card);
    cardContainer.append(card);
  }
}
