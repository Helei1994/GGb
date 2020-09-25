package org.cocos2dx.common;

import android.content.Context;
import android.content.pm.ApplicationInfo;

import java.sql.Struct;

public class AppConfig {
    /********************************************************/
    /**
     * 修改配置
     * */
    /********************************************************/


    //是否是调试模式
    private static Boolean isDebug = true;

    //bugly
    public static String buglyID = "b9b44b2529";
    public static String buglyID_HYKB = "87ded19c94";

    //UMengID
    public static String UmengID = "5f155ac7978eea08cad1f032";
    //Umeng渠道ID
    public static String UmengChannel_Test = "Android_JumPBallX";
    public static String UmengChannel_GoogleFB = "Android_GoogleFB";
    public static String UmengChannel_HYKB = "haoyoukuaibao";//好游快爆


    //广告类型
    public static String FacebookSDK = "FacebookSDK";
    public static String NTAdSDK = "NTAdSDK";

    //FB廣告位ID
    public static String FB_PlacementID = "773843346753616_776613333143284";

    //九吨广告sdk相关
    public static String PackageName = "com.ourgame23.killHappyEmoji";//"com.nineton.weatherforecast";
    public static String App_ID = "bbf18dfdf26a3ce7ed2dbec48fcbdb24";//"25ec9b73d90cd9b4588397e4fe391135";
    public static String TT_PlacementID = "498";//"198";
    public static String TT_AppID = "5101273";//"5001478";

    public static String GDT_PlacementID = "";

    public static String getBuglyID()
    {
        return buglyID_HYKB;
    }

    /**
     * 返回广告类型
     * */
    public static String getAdvertType()
    {
        return NTAdSDK;
    }

    /**
     * 返回Umeng检测渠道
     * */
    public static String getUmengChannel()
    {
        if (isDebug)
        {
            return UmengChannel_Test;
        }
        else
        {
            return UmengChannel_HYKB;
        }
    }

    public static void isApkInDebug(Context context) {
        try {
            ApplicationInfo info = context.getApplicationInfo();
            isDebug = (info.flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0;
        } catch (Exception e) {
            isDebug = false;
        }
    }

    public static Boolean getIsDebug()
    {
        return false;
    }
}
