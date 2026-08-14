const $ = id => document.getElementById(id);

let latest = null;
let garyuClicks = 0;
let garyuClickTimer = null;


/* =========================================================
   突撃プラン設定
   ========================================================= */

const PLAN_CAPITAL_KEY =
  "qldPlanCapital";

const PLAN_INVESTED_KEY =
  "qldPlanInvested";

const DEFAULT_PLAN_CAPITAL =
  700;


/* =========================================================
   格言
   ========================================================= */

const QUOTES = [

  [
    "相場が騒いでる時ほど、ブタは鼻息を整えるぶひ。",
    "臥龍㌧"
  ],

  [
    "現金もポジションぶひ。待てるブタは、それだけで少し強いぶひ。",
    "投資の定番教訓をぶひ語化"
  ],

  [
    "底値を当てるより、出陣条件を守るぶひ。",
    "臥龍㌧"
  ],

  [
    "焦って全部突撃すると、退路まで豚足で塞ぐぶひ。",
    "臥龍㌧"
  ],

  [
    "恐怖の時ほど数字を見るぶひ。強欲の時ほど財布を閉じるぶひ。",
    "著名な投資格言の趣旨をぶひ語化"
  ],

  [
    "生き残ったブタだけが、次の相場にも参加できるぶひ。",
    "市場の定番教訓をぶひ語化"
  ]

];


/* =========================================================
   Overlay
   ========================================================= */

function openOverlay(id){

  document
    .querySelectorAll(".overlay")
    .forEach(
      o => o.classList.remove("show")
    );

  $(id)
    .classList
    .add("show");

  $(id)
    .setAttribute(
      "aria-hidden",
      "false"
    );
}


function closeOverlay(id){

  $(id)
    .classList
    .remove("show");

  $(id)
    .setAttribute(
      "aria-hidden",
      "true"
    );
}


document
  .querySelectorAll(
    ".close-overlay"
  )
  .forEach(
    b => {

      b.onclick = () =>
        closeOverlay(
          b.dataset.target
        );

    }
  );


$("barnBtn").onclick =
  () =>
    openOverlay(
      "barnOverlay"
    );


$("quoteBtn").onclick =
  () => {

    setQuote();

    openOverlay(
      "quoteOverlay"
    );

  };


$("musicBtn").onclick =
  () =>
    openOverlay(
      "musicOverlay"
    );


$("mobileBarnBtn").onclick =
  () =>
    openOverlay(
      "barnOverlay"
    );


$("mobileQuoteBtn").onclick =
  () => {

    setQuote();

    openOverlay(
      "quoteOverlay"
    );

  };


$("mobileMusicBtn").onclick =
  () =>
    openOverlay(
      "musicOverlay"
    );


document.addEventListener(
  "keydown",
  e => {

    if(e.key === "Escape"){

      document
        .querySelectorAll(
          ".overlay"
        )
        .forEach(
          o =>
            o.classList.remove(
              "show"
            )
        );

    }

  }
);


/* =========================================================
   格言
   ========================================================= */

function setQuote(){

  const q =
    QUOTES[
      Math.floor(
        Math.random()
        *
        QUOTES.length
      )
    ];

  $("quoteText").textContent =
    `「${q[0]}」`;

  $("quoteSource").textContent =
    q[1];

}


$("nextQuoteBtn").onclick =
  setQuote;


setQuote();


/* =========================================================
   Utility
   ========================================================= */

function pick(
  o,
  ...keys
){

  for(
    const k
    of keys
  ){

    if(
      o &&
      o[k] !== undefined &&
      o[k] !== null
    ){

      return o[k];

    }

  }

  return null;

}


function yes(v){

  return (
    v === true
    ||
    String(v)
      .toLowerCase()
      === "true"
    ||
    String(v)
      .toUpperCase()
      === "ON"
  );

}


function pct(
  v,
  d = 2
){

  return (
    v == null
      ? "--"
      : `${Number(v).toFixed(d)}%`
  );

}


function signed(v){

  if(v == null){

    return {
      text:"--",
      cls:"flat"
    };

  }

  const n =
    Number(v);

  return {

    text:
      `${n > 0
        ? "▲ "
        : n < 0
          ? "▼ "
          : ""
      }${
        n > 0
          ? "+"
          : ""
      }${n.toFixed(2)}%`,

    cls:
      n > 0
        ? "up"
        : n < 0
          ? "down"
          : "flat"

  };

}


function money(v){

  if(
    v == null ||
    !Number.isFinite(
      Number(v)
    )
  ){

    return "--万円";

  }

  const n =
    Number(v);

  const digits =
    Math.abs(
      n -
      Math.round(n)
    ) < 0.05
      ? 0
      : 1;

  return (
    `${n.toFixed(digits)}万円`
  );

}


function readNumber(
  key,
  fallback = null
){

  const raw =
    localStorage.getItem(
      key
    );

  if(
    raw === null ||
    raw === ""
  ){

    return fallback;

  }

  const n =
    Number(raw);

  return (
    Number.isFinite(n)
      ? n
      : fallback
  );

}


function hasStoredValue(key){

  const raw =
    localStorage.getItem(
      key
    );

  return (
    raw !== null &&
    raw !== ""
  );

}


/* =========================================================
   市場コメント
   ========================================================= */

function moodFor(v){

  const n =
    Number(v);

  if(n >= 2){

    return (
      "元気に走り回ってるぶひ！"
    );

  }

  if(n <= -5){

    return (
      "柵に激突したぶひ💥"
    );

  }

  if(n <= -2){

    return (
      "ちょっとしょんぼりぶひ…"
    );

  }

  return (
    "草を食べて平常運転ぶひ。"
  );

}


function stylePig(
  card,
  v
){

  if(!card){
    return;
  }

  card
    .classList
    .remove(
      "up",
      "down",
      "crash"
    );

  const n =
    Number(v);

  if(n >= 2){

    card
      .classList
      .add("up");

  }else if(n <= -5){

    card
      .classList
      .add("crash");

  }else if(n <= -2){

    card
      .classList
      .add("down");

  }

}


function renderChange(
  id,
  v
){

  const s =
    signed(v);

  const el =
    $(id);

  el.textContent =
    s.text;

  el.className =
    `change ${s.cls}`;

}


/* =========================================================
   臥龍画像
   ========================================================= */

function chooseGaryu(
  deploy,
  crash,
  reversal,
  active
){

  if(
    reversal ||
    deploy >= 70
  ){

    return (
      "assets/garyu_heart.png"
    );

  }

  if(
    crash ||
    active
  ){

    return (
      "assets/garyu_angry.png"
    );

  }

  return (
    "assets/garyu.png"
  );

}


/* =========================================================
   調整レイヤー
   ========================================================= */

function adjustmentLayer(
  dd,
  vix
){

  /*
    -20% かつ VIX30以上
    → 最低70%
  */

  if(
    dd <= -20
    &&
    vix >= 30
  ){

    return 70;

  }


  /*
    -15%
    → 最低60%
  */

  if(dd <= -15){

    return 60;

  }


  /*
    -10%
    → 最低40%
  */

  if(dd <= -10){

    return 40;

  }


  return 0;

}


/* =========================================================
   次の突撃ライン
   ========================================================= */

function getNextTrigger(
  dd,
  vix
){

  const depth =
    Math.max(
      0,
      -dd
    );


  if(dd > -10){

    return {

      label:
        "NASDAQ100 -10%",

      detail:
        `あと ${(10 - depth).toFixed(2)}pt`

    };

  }


  if(dd > -15){

    return {

      label:
        "NASDAQ100 -15%",

      detail:
        `あと ${(15 - depth).toFixed(2)}pt`

    };

  }


  if(dd > -20){

    return {

      label:
        "NASDAQ100 -20% ＋ VIX30",

      detail:
        `下落率あと ${(20 - depth).toFixed(2)}pt`

    };

  }


  /*
    -20%は到達済みでも
    VIX30未満なら70%条件未達。
  */

  if(vix < 30){

    return {

      label:
        "VIX 30以上",

      detail:
        `NASDAQ100条件達成済み / VIXあと ${(30 - vix).toFixed(2)}`

    };

  }


  return {

    label:
      "調整レイヤー上限到達",

    detail:
      "70%ライン発動中。残り30%は研究上の予備弾。"

  };

}


/* =========================================================
   到達済みライン表示
   ========================================================= */

function updateStepStates(
  dd,
  vix
){

  const hit40 =
    dd <= -10;

  const hit60 =
    dd <= -15;

  const hit70 =
    (
      dd <= -20
      &&
      vix >= 30
    );


  [
    [
      "marker10",
      hit40
    ],
    [
      "marker15",
      hit60
    ],
    [
      "marker20",
      hit70
    ],
    [
      "step40",
      hit40
    ],
    [
      "step60",
      hit60
    ],
    [
      "step70",
      hit70
    ]
  ]
  .forEach(
    ([id,on]) => {

      const el =
        $(id);

      if(el){

        el
          .classList
          .toggle(
            "reached",
            on
          );

      }

    }
  );

}


/* =========================================================
   突撃プラン
   ========================================================= */

function renderAttackPlan(d){

  if(!$("planCapital")){
    return;
  }


  /*
    通常スコアによる投入率
  */

  const normalDeploy =
    Number(
      d.normal_deploy_pct
      ??
      d.suggested_deploy_pct
      ??
      0
    );


  /*
    現在の本番最終判定
  */

  const productionFinal =
    Number(
      d.final_deploy_pct
      ??
      d.suggested_deploy_pct
      ??
      0
    );


  const dd =
    Number(
      d.ndx_drawdown_252d_pct
      ??
      0
    );


  const vix =
    Number(
      d.vix
      ??
      0
    );


  /*
    研究レイヤー
  */

  const adjustDeploy =
    adjustmentLayer(
      dd,
      vix
    );


  /*
    現行メーターと
    研究レイヤーの高い方。
  */

  const planDeploy =
    Math.max(
      productionFinal,
      adjustDeploy
    );


  /*
    設定資金
  */

  const capital =
    Math.max(
      0,
      readNumber(
        PLAN_CAPITAL_KEY,
        DEFAULT_PLAN_CAPITAL
      )
    );


  const investedIsSet =
    hasStoredValue(
      PLAN_INVESTED_KEY
    );


  const invested =
    investedIsSet
      ? Math.max(
          0,
          readNumber(
            PLAN_INVESTED_KEY,
            0
          )
        )
      : null;


  /*
    目標投入額
  */

  const targetAmount =
    capital
    *
    planDeploy
    /
    100;


  /*
    追加投入額
  */

  const additional =
    invested == null
      ? null
      : Math.max(
          0,
          targetAmount
          -
          invested
        );


  /*
    研究ルール上の
    最終30%予備弾
  */

  const researchReserve =
    capital
    *
    0.30;


  /* -------------------------
     上段
     ------------------------- */

  $("planCapital")
    .textContent =
      money(capital);


  $("normalDeployView")
    .textContent =
      `${normalDeploy}%`;


  $("adjustDeployView")
    .textContent =
      `${adjustDeploy}%`;


  $("finalDeployView")
    .textContent =
      `${planDeploy}%`;


  /* -------------------------
     金額
     ------------------------- */

  $("targetAmount")
    .textContent =
      money(
        targetAmount
      );


  $("investedAmount")
    .textContent =
      invested == null
        ? "未設定"
        : money(invested);


  $("additionalAmount")
    .textContent =
      additional == null
        ? "投入済み額を設定"
        : money(additional);


  /* -------------------------
     NASDAQ100現在位置
     ------------------------- */

  $("drawdownNow")
    .textContent =
      `${dd.toFixed(2)}%`;


  const next =
    getNextTrigger(
      dd,
      vix
    );


  $("nextTrigger")
    .textContent =
      next.label;


  $("nextDistance")
    .textContent =
      next.detail;


  /* -------------------------
     各ライン金額
     ------------------------- */

  $("amount40")
    .textContent =
      money(
        capital
        *
        0.40
      );


  $("amount60")
    .textContent =
      money(
        capital
        *
        0.60
      );


  $("amount70")
    .textContent =
      money(
        capital
        *
        0.70
      );


  $("reserveAmount")
    .textContent =
      money(
        researchReserve
      );


  /* -------------------------
     下落ゲージ

     0% ～ -20%
     -20%以下は右端で停止。
     ------------------------- */

  const depth =
    Math.max(
      0,
      Math.min(
        20,
        -dd
      )
    );


  const position =
    4
    +
    (
      depth
      /
      20
    )
    *
    92;


  $("drawdownPig")
    .style
    .left =
      `${position}%`;


  updateStepStates(
    dd,
    vix
  );


  /* -------------------------
     設定欄
     ------------------------- */

  $("capitalInput")
    .value =
      String(capital);


  if(investedIsSet){

    $("investedInput")
      .value =
        String(invested);

  }

}


/* =========================================================
   突撃資金保存
   ========================================================= */

function savePlanSettings(){

  const capitalRaw =
    Number(
      $("capitalInput")
        .value
    );


  const capital =
    Number.isFinite(
      capitalRaw
    )
      ? Math.max(
          0,
          capitalRaw
        )
      : DEFAULT_PLAN_CAPITAL;


  const investedRaw =
    $("investedInput")
      .value
      .trim();


  localStorage.setItem(
    PLAN_CAPITAL_KEY,
    String(capital)
  );


  if(investedRaw === ""){

    localStorage.removeItem(
      PLAN_INVESTED_KEY
    );

  }else{

    const n =
      Number(
        investedRaw
      );


    if(
      Number.isFinite(n)
    ){

      localStorage.setItem(
        PLAN_INVESTED_KEY,
        String(
          Math.max(
            0,
            n
          )
        )
      );

    }

  }


  $("planSaveMessage")
    .textContent =
      "保存したぶひ。次回もこの端末では覚えてるぶひ🐽";


  if(latest){

    renderAttackPlan(
      latest
    );

  }


  setTimeout(
    () => {

      $("planSaveMessage")
        .textContent =
          "入力値はこの端末のブラウザだけに保存するぶひ。";

    },
    2600
  );

}


$("savePlanBtn").onclick =
  savePlanSettings;


/* =========================================================
   保存値初期化
   ========================================================= */

function initPlanSettings(){

  const capital =
    readNumber(
      PLAN_CAPITAL_KEY,
      DEFAULT_PLAN_CAPITAL
    );


  $("capitalInput")
    .value =
      String(capital);


  if(
    hasStoredValue(
      PLAN_INVESTED_KEY
    )
  ){

    $("investedInput")
      .value =
        String(
          readNumber(
            PLAN_INVESTED_KEY,
            0
          )
        );

  }

}


initPlanSettings();


/* =========================================================
   メイン描画
   ========================================================= */

function render(d){

  latest =
    d;


  const deploy =
    Number(
      d.final_deploy_pct
      ??
      d.suggested_deploy_pct
      ??
      0
    );


  const crash =
    yes(
      d.final_crash_signal
    );


  const rev =
    yes(
      d.final_reversal_signal
    );


  const active =
    yes(
      d.crash_active
    );


  /* -------------------------
     市場値
     ------------------------- */

  $("usdjpyValue")
    .textContent =
      d.usdjpy != null
        ? Number(
            d.usdjpy
          ).toFixed(3)
        : "--";


  $("qldValue")
    .textContent =
      d.qld_price != null
        ? `$${Number(
            d.qld_price
          ).toFixed(2)}`
        : "--";


  $("ndxValue")
    .textContent =
      d.ndx_price != null
        ? Number(
            d.ndx_price
          ).toFixed(2)
        : "--";


  /* -------------------------
     前日比 / 年初来
     ------------------------- */

  renderChange(
    "usdjpyDay",
    d.usdjpy_change_pct
  );

  renderChange(
    "usdjpyYtd",
    d.usdjpy_ytd_pct
  );

  renderChange(
    "qldDay",
    d.qld_change_pct
  );

  renderChange(
    "qldYtd",
    d.qld_ytd_pct
  );

  renderChange(
    "ndxDay",
    d.ndx_change_pct
  );

  renderChange(
    "ndxYtd",
    d.ndx_ytd_pct
  );


  /* -------------------------
     豚コメント
     ------------------------- */

  $("usdjpyMood")
    .textContent =
      moodFor(
        d.usdjpy_change_pct
      );


  $("qldMood")
    .textContent =
      moodFor(
        d.qld_change_pct
      );


  $("ndxMood")
    .textContent =
      moodFor(
        d.ndx_change_pct
      );


  stylePig(
    document.querySelector(
      '[data-market="usdjpy"]'
    ),
    d.usdjpy_change_pct
  );


  stylePig(
    document.querySelector(
      '[data-market="qld"]'
    ),
    d.qld_change_pct
  );


  stylePig(
    document.querySelector(
      '[data-market="ndx"]'
    ),
    d.ndx_change_pct
  );


  /* -------------------------
     QLD畑
     ------------------------- */

  const ytd =
    Number(
      d.qld_ytd_pct
      ??
      0
    );


  $("qldYtdBig")
    .textContent =
      `${
        ytd > 0
          ? "+"
          : ""
      }${ytd.toFixed(2)}%`;


  const fieldPos =
    Math.max(
      4,
      Math.min(
        88,
        (
          ytd
          +
          10
        )
        /
        60
        *
        84
        +
        4
      )
    );


  $("fieldFill")
    .style
    .width =
      `${fieldPos}%`;


  $("miniGaryu")
    .style
    .left =
      `${fieldPos}%`;


  $("miniGaryuPct")
    .textContent =
      `${
        ytd > 0
          ? "+"
          : ""
      }${ytd.toFixed(1)}%`;


  $("fieldComment")
    .textContent =

      ytd >= 30
        ? "今年はかなり育ったぶひ。豊作の匂いがするぶひ🌾"

      : ytd >= 15
        ? "順調に育ってるぶひ。鼻息はまだ抑えるぶひ。"

      : ytd >= 0
        ? "芽は出てるぶひ。焦らず育てるぶひ。"

      : "今年はまだ寒いぶひ。畑を守るぶひ。";


  /* -------------------------
     臥龍
     ------------------------- */

  const img =
    chooseGaryu(
      deploy,
      crash,
      rev,
      active
    );


  $("miniGaryuImg").src =
    img;


  $("routeGaryuImg").src =
    img;


  $("deployRate")
    .textContent =
      `${deploy}%`;


  $("deployText")
    .textContent =

      rev ||
      deploy >= 80
        ? "出陣ぶひ。ここからが豚の仕事。"

      : crash ||
        active
        ? "嵐の最中ぶひ。余力を守って機を待つ。"

      : deploy >= 60
        ? "買い場が見えてきたぶひ。"

      : deploy >= 40
        ? "少しずつ前へ。まだ全軍突撃ではないぶひ。"

      : "茶でも飲んで待つぶひ。";


  $("routeGaryu")
    .style
    .left =
      `${
        4
        +
        Math.max(
          0,
          Math.min(
            100,
            deploy
          )
        )
        *
        0.82
      }%`;


  /* -------------------------
     判定
     ------------------------- */

  $("labelBadge")
    .textContent =
      d.label
      ??
      "---";


  $("score")
    .textContent =
      d.score
      ??
      "--";


  $("asOf")
    .textContent =
      d.as_of
      ??
      "----";


  $("dma")
    .textContent =
      pct(
        d.ndx_vs_200dma_pct
      );


  $("drawdown")
    .textContent =
      pct(
        d.ndx_drawdown_252d_pct
      );


  $("vix")
    .textContent =
      d.vix != null
        ? Number(
            d.vix
          ).toFixed(2)
        : "--";


  $("dff")
    .textContent =
      pct(
        d.dff
      );


  $("crash")
    .textContent =
      crash
        ? "ON"
        : "OFF";


  $("crash")
    .className =
      crash
        ? "on"
        : "off";


  $("reversal")
    .textContent =
      rev
        ? "ON"
        : "OFF";


  $("reversal")
    .className =
      rev
        ? "on"
        : "off";


  $("crashState")
    .textContent =
      active
        ? "あり"
        : "なし";


  $("crashState")
    .className =
      active
        ? "on"
        : "off";


  /* -------------------------
     突撃プラン
     ------------------------- */

  renderAttackPlan(
    d
  );

}


/* =========================================================
   臥龍5回クリック
   ========================================================= */

$("miniGaryu").onclick =
  () => {

    garyuClicks++;


    clearTimeout(
      garyuClickTimer
    );


    garyuClickTimer =
      setTimeout(
        () =>
          garyuClicks = 0,
        1800
      );


    if(
      garyuClicks >= 5
    ){

      garyuClicks =
        0;


      $("miniGaryuImg").src =
        "assets/garyu_angry.png";


      $("miniGaryu")
        .classList
        .add(
          "rage"
        );


      $("fieldComment")
        .textContent =
          "💢 何回押すんだブタ野郎！！ 相場を見ろぶひ！！";


      setTimeout(
        () => {

          $("miniGaryu")
            .classList
            .remove(
              "rage"
            );


          if(latest){

            render(
              latest
            );

          }

        },
        3500
      );

    }

  };


/* =========================================================
   latest.json
   ========================================================= */

async function load(){

  try{

    const r =
      await fetch(`https://garyuton.github.io/qld-meter-data/latest.json?ts=${Date.now()}`,{cache:"no-store"});


    if(!r.ok){

      throw new Error(
        "latest.json load failed"
      );

    }


    const data =
      await r.json();


    render(
      data
    );

  }catch(e){

    console.error(
      "QLD meter load error:",
      e
    );

  }

}


load();


/* =========================================================
   BGM一覧
   ========================================================= */

async function loadTracks(){

  try{

    const r =
      await fetch(
        `assets/music/tracks.json?ts=${Date.now()}`,
        {
          cache:"no-store"
        }
      );


    if(!r.ok){

      return;

    }


    const tracks =
      await r.json();


    for(
      const t
      of tracks
    ){

      const o =
        document.createElement(
          "option"
        );


      o.value =
        t.src;


      o.textContent =
        t.title;


      $("songSelect")
        .appendChild(
          o
        );

    }

  }catch(e){

    console.error(
      "Track list load error:",
      e
    );

  }

}


loadTracks();


/* =========================================================
   BGM操作
   ========================================================= */

$("playBtn").onclick =
  () => {

    const src =
      $("songSelect")
        .value;


    if(!src){

      $("nowPlaying")
        .textContent =
          "先に曲を選ぶぶひ。";

      return;

    }


    const absoluteSrc =
      new URL(
        src,
        location.href
      ).href;


    if(
      $("audio").src
      !==
      absoluteSrc
    ){

      $("audio").src =
        src;

    }


    $("audio").volume =
      Number(
        $("volume").value
      );


    $("audio")
      .play()
      .catch(
        () => {

          $("nowPlaying")
            .textContent =
              "再生できなかったぶひ。もう一度タップするぶひ。";

        }
      );


    $("nowPlaying")
      .textContent =
        `再生中: ${
          $("songSelect")
            .selectedOptions[0]
            .textContent
        }`;

  };


$("pauseBtn").onclick =
  () => {

    $("audio").pause();

    $("nowPlaying")
      .textContent =
        "一時停止中ぶひ。";

  };


$("stopBtn").onclick =
  () => {

    $("audio").pause();

    $("audio")
      .currentTime =
        0;


    $("nowPlaying")
      .textContent =
        "停止中ぶひ。";

  };


$("volume").oninput =
  () => {

    $("audio").volume =
      Number(
        $("volume").value
      );

  };
