document.addEventListener('DOMContentLoaded', function() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const fallbackLink = document.getElementById('fallback-link');
    const fallbackMessage = document.getElementById('fallback-message');
    const heading = document.querySelector('.container h1');
    const paragraph = document.querySelector('.container p');

    // ★★★ ご提供いただいたURLをここに設定 ★★★
    const appInfo = {
        ios: {
            // iPhoneアプリのApp Store URL
            appStoreLink: 'https://apps.apple.com/jp/app/%E3%81%A4%E3%82%8B%E3%82%BF%E3%82%AF-%E9%B6%B4%E4%B8%B8%E4%BA%A4%E9%80%9A-%E6%A0%AA/id1373131993?ign-itscg=30200&ign-itsct=apps_box'
            // ユニバーサルリンクを設定している場合は、ここにuniversalLink: 'https://your-domain.com/app/path' を追加
            // その場合、redirectUrl = appInfo.ios.universalLink; と設定し、下のsetTimeout内でアプリが起動しない場合のフォールバックとしてappStoreLinkを使います
        },
        android: {
            // AndroidアプリのGoogle Play Store URL
            playStoreLink: 'https://play.google.com/store/apps/details?id=jp.system_origin.yubitaku.tsurumaru&hl=ja&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1&pli=1'
            // Android App Linksを設定している場合は、ここにappLink: 'https://your-domain.com/app/path' を追加
            // その場合、redirectUrl = appInfo.android.appLink; と設定し、下のsetTimeout内でアプリが起動しない場合のフォールバックとしてplayStoreLinkを使います
        }
    };

    let redirectUrl = null;
    let storeLink = null;
    let osName = ''; // 判別されたOS名

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        // iOSデバイスの場合 (iPhone/iPad/iPod)
        redirectUrl = appInfo.ios.appStoreLink; // 今回は直接ストアへリダイレクト
        storeLink = appInfo.ios.appStoreLink;
        osName = 'iOS';
    } else if (/android/i.test(userAgent)) {
        // Androidデバイスの場合
        redirectUrl = appInfo.android.playStoreLink; // 今回は直接ストアへリダイレクト
        storeLink = appInfo.android.playStoreLink;
        osName = 'Android';
    }

    if (redirectUrl) {
        // リダイレクトを実行
        window.location.href = redirectUrl;

        // アプリが起動しない（ストアが開かない）場合のフォールバックメッセージを表示
        // アプリ起動成功の正確な検知は難しいため、一定時間後に表示
        setTimeout(() => {
            heading.textContent = 'アプリが開けませんでした';
            paragraph.textContent = '直接アプリストアでダウンロードをお願いします。';
            fallbackLink.href = storeLink;
            fallbackLink.textContent = osName === 'iOS' ? 'App Storeでダウンロード' : 'Google Playでダウンロード';
            fallbackMessage.style.display = 'block'; // フォールバックメッセージを表示
        }, 2000); // 2秒後にフォールバックを表示
    } else {
        // 判別できないデバイスの場合
        heading.textContent = 'デバイスを判別できませんでした';
        paragraph.textContent = 'お使いのデバイスからは自動でアプリを起動できません。';
        fallbackLink.href = 'https://tsurutaxi.com/'; // 鶴丸交通様のトップページなど、汎用的なリンク
        fallbackLink.textContent = '鶴丸交通のウェブサイトへ';
        fallbackMessage.style.display = 'block';
    }
});