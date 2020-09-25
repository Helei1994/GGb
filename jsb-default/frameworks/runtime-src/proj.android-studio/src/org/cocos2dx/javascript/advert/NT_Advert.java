package org.cocos2dx.javascript.advert;

import android.util.Log;

import com.nineton.ntadsdk.BuildConfig;
import com.nineton.ntadsdk.NTAdConfig;
import com.nineton.ntadsdk.NTAdSDK;
import com.nineton.ntadsdk.itr.VideoAdCallBack;
import com.nineton.ntadsdk.manager.VideoAdManager;

import org.cocos2dx.common.AppConfig;
import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.statistics.LogTools;


public class NT_Advert extends SuperAdvert implements  VideoAdCallBack{
    public NT_Advert(Cocos2dxActivity activity)
    {
        super(activity);
    }

    @Override
    public void Init()
    {
        // 广告sdk初始化
        // appName:自家App的项目名称
        // appVersion:自家App的版本名称
        // appId:九吨广告平台上的appId（具体值请联系商务同事获取）
        // appChannel:渠道名
        // TTAppKey:穿山甲后台生成的appKey,用于注册穿山甲SDK（具体值请联系商务同事获取）
        // BaiduAppKey:百度后台生成的appKey,用于注册百度SDK（具体值请联系商务同事获取）
        // isDebug：是否是debug模式，在debug模式下会打印对应日志
        Log.e("ADSDK_Init","*******sdk初始化");
        NTAdSDK.init(activity
                , new NTAdConfig.Builder()
                        .appName(AppConfig.PackageName)
                        .appVersion(BuildConfig.VERSION_NAME)
                        .appId(AppConfig.App_ID)
                        .appChannel("default")
                        .TTAppKey(AppConfig.TT_AppID)
                        //.GDTAppKey(GDT_PlacementID)
                        .isDebug(AppConfig.getIsDebug())
                        .build());
    }

    @Override
    public  void runable_Ad(String ad_config)
    {
        LogTools.LogE("runable_Ad:","NT_Advert");
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                show_Ad(ad_config);
            }
        });
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }

    private void show_Ad(String ad_config){
        /**
         *    展示视频广告
         * 将imageAdId替换为自己项目的图片广告位ID即可
         */
        final VideoAdManager videoAdManager = new VideoAdManager();
        videoAdManager.showVideoAd(activity, AppConfig.TT_PlacementID, this);
    }

    @Override
    public void onVideoAdSuccess() {
        // 视频广告成功
        LogTools.LogE("ADSDK_Init", "*******视频广告成功");
        LogTools.getInstance().showToast("onVideoAdSuccess");
        VideoCallBack("onVideoAdSuccess");
    }

    @Override
    public void onVideoAdError(String s) {
        // 视频广告失败
        LogTools.LogE("ADSDK_Init","*******视频广告失败");
        LogTools.getInstance().showToast("onVideoAdError");
        VideoCallBack("onVideoAdError");
    }

    @Override
    public void onVideoAdClose() {
        // 视频广告点击关闭
        LogTools.LogE("ADSDK_Init","*******视频广告点击关闭");
        LogTools.getInstance().showToast("onVideoAdClose");
        VideoCallBack("onVideoAdClose");
    }

    @Override
    public void onVideoAdSkip() {
        // 视频广告点击跳过
        LogTools.LogE("ADSDK_Init","*******视频广告点击跳过");
        LogTools.getInstance().showToast("onVideoAdSkip");
        VideoCallBack("onVideoAdSkip");
    }

    @Override
    public void onVideoAdComplete() {
        // 视频广告播放结束
        LogTools.LogE("ADSDK_Init","*******视频广告播放结束");
        LogTools.getInstance().showToast("onVideoAdComplete");
        VideoCallBack("onVideoAdComplete");
    }

    @Override
    public void onVideoAdClicked() {
        // 视频广告点击
        LogTools.LogE("ADSDK_Init","*******视频广告点击");
        LogTools.getInstance().showToast("onVideoAdClicked");
        VideoCallBack("onVideoAdClicked");
    }

    public void  RewardedAdListener()
    {

    }
}
