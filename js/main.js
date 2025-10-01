$(function () {
  /*=================================================
    ヘッダーメニュー
  ===================================================*/
  $(function() {
    // すべてのドロップダウンを持つナビゲーションアイテム
    const $dropdownItems = $(".nav-pc__item--has-dropdown");
    let hideTimer; // slideUpを遅延させるためのタイマーIDを保持

    $dropdownItems.hover(
        // 1. マウスが乗った時 (mouseenter)
        function() {
            const $currentDropdown = $(this).find(".dropdown");
            const $currentTrigger = $(this).find(".nav-pc__trigger");

            // ① 他の開いているドロップダウンを閉じる処理
            // 現在ホバーしている要素以外のすべての .dropdown を選択
            $dropdownItems.not(this).each(function() {
                const $otherDropdown = $(this).find(".dropdown");
                const $otherTrigger = $(this).find(".nav-pc__trigger");

                // 他のメニューが現在表示されている、またはアニメーション中であれば
                if ($otherDropdown.is(':visible') || $otherDropdown.queue('fx').length) {
                    // アニメーションを停止し、即座にslideUpで閉じる
                    $otherDropdown.stop(true, true).slideUp(300);
                    $otherTrigger.attr("aria-expanded", "false");
                }
            });

            // タイマーが設定されていたらクリアし、slideUpが実行されるのを防ぐ（点滅防止用）
            clearTimeout(hideTimer); 

            // ② 現在のドロップダウンを開く
            // 実行中のアニメーションを停止・クリアし、slideDownを開始
            $currentDropdown.stop(true, true).slideDown(300);
            $currentTrigger.attr("aria-expanded", "true");
        },
        // 2. マウスが外れた時 (mouseleave)
        function() {
            const $this = $(this);
            
            // slideUpの実行をわずかに遅延させる（点滅防止用）
            hideTimer = setTimeout(function() {
                // 遅延時間が経過したら slideUp を実行
                $this.find(".dropdown").stop(true, true).slideUp(300);
                $this.find(".nav-pc__trigger").attr("aria-expanded", "false");
            }, 200); // 遅延時間（200ms）を設定
        }
    );
});

  /*=================================================
      ハンバーガ―メニュー
  ===================================================*/
    // ハンバーガーメニューをクリックした時
    $(".toggle-btn").on("click", function () {
      $("header").toggleClass("open");
      
      // 閉じたときだけアコーディオンリセット
      if (!$("header").hasClass("open")) {
        $(".dropdown .true").removeClass("close");      // closeクラス削除
        $(".dropdown__list").slideUp(0);                // 一瞬で全部閉じる
      }
  });

  // メニューのリンクをクリックした時、ナビ非表示
  $(".dropdown a").on("click", function () {
      $("header").removeClass("open");

      // アコーディオンリセット
      $(".dropdown .true").removeClass("close");
      $(".dropdown__list").slideUp(0);
  });
    

  /*=================================================
      ナビゲーションアコーディオン
  ===================================================*/
    //アコーディオンをクリックした時の動作
$('.dropdown .true').on('click', function() {//タイトル要素をクリックしたら
	var findElm = $(this).next(".dropdown__list");//直後のアコーディオンを行うエリアを取得し
	$(findElm).slideToggle();//アコーディオンの上下動作
    
	if($(this).hasClass('close')){//タイトル要素にクラス名closeがあれば
		$(this).removeClass('close');//クラス名を除去し
    findElm.slideUp();
	}else{//それ以外は
		$(this).addClass('close');//クラス名closeを付与
	}
});

//ページが読み込まれた際にopenクラスをつけ、openがついていたら開く動作※不必要なら下記全て削除
$(window).on('load', function(){
	$(".is-open").each(function(index, element){	//openクラスを取得
		var Title =$(element).children('.title');	//openクラスの子要素のtitleクラスを取得
		$(Title).addClass('close');				//タイトルにクラス名closeを付与し
		var Box =$(element).children('.dropdown__list');	//openクラスの子要素boxクラスを取得
		$(Box).slideDown(500);					//アコーディオンを開く
	});
});

  /*=================================================
  PICK UP スライダー
  ===================================================*/
  // カルーセル用 jQueryプラグイン「slick」の設定
  // マニュアル：https://kenwheeler.github.io/slick/
  $(".slick").slick({
    centerMode: false,                 //両端見切れ状態の有無
    // centerPadding: "100px",           //見切れコンテンツの幅サイズ
    slidesToShow: 1,                  //1スライダーの表示数
    autoplay: true,                   //自動再生の有無
    autoplaySpeed: 3000,              //再生速度（1000=1秒）
    prevArrow: '<div class="slick-arrow slick-prev"></div>',
    nextArrow: '<div class="slick-arrow slick-next"></div>',
    responsive: [
      {
        breakpoint: 920,
        settings: {
          centerPadding: "50px",
          slidesToShow: 1,
        },
      },
    ],
  });

    // カスタムボタンで操作
    $('.slick-prev').on('click', function () {
      $('.slick').slick('slickPrev');
  });

  $('.slick-next').on('click', function () {
      $('.slick').slick('slickNext');
  });
  

/*=================================================
    FAQ
===================================================*/
  //アコーディオンをクリックした時の動作
$('.accordion-area .title').on('click', function() {//タイトル要素をクリックしたら
	var findElm = $(this).next(".box");//直後のアコーディオンを行うエリアを取得し
	$(findElm).slideToggle();//アコーディオンの上下動作
    
	if($(this).hasClass('close')){//タイトル要素にクラス名closeがあれば
		$(this).removeClass('close');//クラス名を除去し
    findElm.slideUp();
	}else{//それ以外は
		$(this).addClass('close');//クラス名closeを付与
    findElm.slideDown().css('display','flex');

	}
});

//ページが読み込まれた際にopenクラスをつけ、openがついていたら開く動作※不必要なら下記全て削除
$(window).on('load', function(){
	$(".open").each(function(index, element){	//openクラスを取得
		var Title =$(element).children('.title');	//openクラスの子要素のtitleクラスを取得
		$(Title).addClass('close');				//タイトルにクラス名closeを付与し
		var Box =$(element).children('.box');	//openクラスの子要素boxクラスを取得
		$(Box).slideDown(500);					//アコーディオンを開く
	});
});

/*=================================================
    TOPへ戻る
===================================================*/
const $backToTop = $('#js-back-to-top');

// スクロールイベント
$(window).on('scroll', function () {
    if ($(this).scrollTop() > 700) {
        $backToTop.addClass('is-show');
    } else {
        $backToTop.removeClass('is-show');
    }
});

// スムーススクロール
$backToTop.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 600);
});






});
