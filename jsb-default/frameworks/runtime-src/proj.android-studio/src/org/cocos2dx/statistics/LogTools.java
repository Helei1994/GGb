package org.cocos2dx.statistics;

import android.util.Log;
import android.widget.Toast;

import org.cocos2dx.common.AppConfig;
import org.cocos2dx.lib.Cocos2dxActivity;

public class LogTools {
    static boolean isdebug = false;
    public Cocos2dxActivity activity;
    public LogTools(){};
    private  static class GetSingleHolder{
        private static final LogTools instance = new LogTools();
    }
    public  static LogTools getInstance(){
        return LogTools.GetSingleHolder.instance;
    }

    public void init (Cocos2dxActivity activity)
    {
        this.activity = activity;
        LogTools.isdebug = AppConfig.getIsDebug();
    }

    public boolean isDebug()
    {
        return LogTools.isdebug;
    }

    public static  void  LogE(String Tag,String content)
    {
        if (LogTools.isdebug) Log.e(Tag,content);
    }
    public static void  LogD(String Tag,String content)
    {
        if (LogTools.isdebug) Log.d(Tag,content);
    }
    public static void showToast(final String content)
    {
        if (LogTools.isdebug) {

            LogTools.getInstance().activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Toast.makeText(LogTools.getInstance().activity, content, Toast.LENGTH_SHORT).show();
                }
            });
        }
    }
}
