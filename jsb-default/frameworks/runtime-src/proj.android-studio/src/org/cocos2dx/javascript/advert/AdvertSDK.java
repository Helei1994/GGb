package org.cocos2dx.javascript.advert;
import org.cocos2dx.common.AppConfig;
import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.statistics.LogTools;

public class AdvertSDK {

    Cocos2dxActivity main_Activity;
    public AdvertSDK(){};
    SuperAdvert advertobj = null;
    private  static class GetSingleHolder{
        private static final AdvertSDK instance = new AdvertSDK();
    }

    public  static AdvertSDK getInstance(){
        return GetSingleHolder.instance;
    }
    /**
     * 广告sdk初始化
     * */
    public  void init(Cocos2dxActivity activity)
    {
        this.main_Activity = activity;
        String adtype = AppConfig.getAdvertType();
        switch (adtype)
        {
            case  "NTAdSDK":
                advertobj = new NT_Advert(activity);
                break;
        }
    }

    public static void showAdvert(String ad_config){
        if (AdvertSDK.getInstance().advertobj != null){
            LogTools.LogE("showAdvert","*******调用显示视频");
            AdvertSDK.getInstance().advertobj.runable_Ad(ad_config);
        }
    }

    public void RewardedAdListener()
    {
        if (advertobj != null)
            advertobj.RewardedAdListener();
    }

    public void onDestroy()
    {
        if (advertobj != null)
            advertobj.onDestroy();
    }
}
