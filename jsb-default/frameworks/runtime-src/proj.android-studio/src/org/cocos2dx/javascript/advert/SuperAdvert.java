package org.cocos2dx.javascript.advert;

import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
import org.cocos2dx.statistics.LogTools;

public abstract class SuperAdvert {
    public Cocos2dxActivity activity;
    public SuperAdvert(Cocos2dxActivity activity)
    {
        this.activity = activity;
        this.Init();
    }

    public void  Init()
    {

    }
    public void runable_Ad(String ad_config)
    {
        LogTools.LogE("SuperAdvert:","未初始化广告");
    }

    //回调到CocosCreator端
    public void VideoCallBack(final String calltype){
        activity.runOnGLThread(new Runnable() {
            @Override
            public void run() {
                LogTools.LogE("ADSDK_Init","*******广告回调函数");
                Cocos2dxJavascriptJavaBridge.evalString("window.Advert_Manager.videocallback('"+calltype+"')");
            }
        });
    }


    public void  RewardedAdListener()
    {

    }

    public void onDestroy()
    {

    }
}
