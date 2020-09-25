/****************************************************************************
Copyright (c) 2015-2016 Chukong Technologies Inc.
Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
package org.cocos2dx.javascript;

import org.cocos2dx.common.AppConfig;
import org.cocos2dx.javascript.advert.AdvertSDK;
import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;
import org.cocos2dx.statistics.LogTools;
import org.cocos2dx.statistics.ToolManager;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Bundle;

import android.content.Intent;
import android.content.res.Configuration;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;

import com.bytedance.applog.util.UriConfig;
import com.bytedance.embedapplog.AppLog;
import com.bytedance.embedapplog.InitConfig;
import com.nineton.ntadsdk.BuildConfig;
import com.nineton.ntadsdk.NTAdConfig;
import com.nineton.ntadsdk.NTAdSDK;

import java.util.ArrayList;

public class AppActivity extends Cocos2dxActivity {

    private boolean isInit=false;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Workaround in
        // https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
        if (!isTaskRoot()) {
            // Android launched another instance of the root activity into an existing task
            // so just quietly finish and go away, dropping the user back into the activity
            // at the top of the stack (ie: the last state of this task)
            // Don't need to finish it again since it's finished in super.onCreate .
            return;
        }

        AppConfig.isApkInDebug(this);
        // DO OTHER INITIALIZATION BELOW
        SDKWrapper.getInstance().init(this);
        //debug显示设置
        LogTools.getInstance().init(this);

        NTAdSDK.init(this
                , new NTAdConfig.Builder()
                        .appName(AppConfig.PackageName)
                        .appVersion(BuildConfig.VERSION_NAME)
                        .appId(AppConfig.App_ID)
                        .appChannel("default")
                        .TTAppKey(AppConfig.TT_AppID)
                        //.GDTAppKey(GDT_PlacementID)
                        .isDebug(AppConfig.getIsDebug())
                        .build());

        //工具类
        ToolManager.getInstance().init(this);

//        if (!isInit)
////        {
////            final InitConfig config = new InitConfig("196654", "TouTiao");
////            config.setUriConfig(UriConfig.DEFAULT);
////            AppLog.setEnableLog(true);
////            config.setEnablePlay(true);
////            Log.e("投放初始化","投放初始化进入");
////            AppLog.init(this, config);
////
////            /* 初始化结束 */
////            //内置事件: “注册” ，属性：注册方式，是否成功，属性值为：wechat ，true
////            GameReportHelper.onEventRegister("wechat",true);
////
////            //内置事件 “支付”，属性：商品类型，商品名称，商品ID，商品数量，支付渠道，币种，是否成功（必传），金额（必传）
////            GameReportHelper.onEventPurchase("gift","flower", "008",1,
////                    "wechat","¥", true, 1);
////            isInit=true;
////        }
        //申请权限
        OnCommonCallback oceanCallback = new OnCommonCallback() {
            @Override
            public void onResult(int result, String message) {
                if (result == 1) {
                    initOceanEngine();
                } else {
                    //弹出Toast提醒玩家去应用设置里打开该权限
                    //设置->应用->这个应用->权限->读取通讯录信息  打开
                    Log.e("权限申请错误", "无法获取READ PHONE STATE权限，需要用户手动操作。");
                }
            }
        };
        requestReadPhoneStatePermissionAsync(oceanCallback);
    }

    //-----------------------------------------------------------------------------------------------

    private void requestReadPhoneStatePermissionAsync(OnCommonCallback callback){
        if (!hasPermission(Manifest.permission.READ_PHONE_STATE)) {
            ArrayList<String> pmList = new ArrayList<>();
            pmList.add(Manifest.permission.READ_PHONE_STATE);
            requestPermissions(pmList, new RequirePermissionsCallback() {
                @Override
                public void onResult(String[] permissions, int[] requireResult) {
                    callback.onResult(hasPermission(Manifest.permission.READ_PHONE_STATE) ? 1 : 0, "");
                }
            });
        } else {
            callback.onResult(1, "已拥有权限了");
            Log.e("投放初始化跳过","已拥有权限了");
        }
    }

    private void initOceanEngine(){
        /* 初始化开始 */
        // appid和渠道，appid须保证与广告后台申请记录一致，渠道可自定义，如有多个马甲包建议设置渠道号唯一标识一个马甲包。
        final InitConfig config = new InitConfig("196654", "TouTiao");
         /*
         域名默认国内: DEFAULT, 新加坡:SINGAPORE, 美东:AMERICA
         注意：国内外不同vendor服务注册的did不一样。由DEFAULT切换到SINGAPORE或者AMERICA，会发生变化，
         切回来也会发生变化。因此vendor的切换一定要慎重，随意切换导致用户新增和统计的问题，需要自行评估。
         */
        config.setUriConfig(UriConfig.DEFAULT);
        // 是否在控制台输出日志，可用于观察用户行为日志上报情况，建议仅在调试时使用，release版本请设置为false ！
        AppLog.setEnableLog(false);
        Log.e("投放初始化","投放初始化获取权限进入");
        AppLog.init(this, config);

        /* 初始化结束 */
//        //内置事件: “注册” ，属性：注册方式，是否成功，属性值为：wechat ，true
//        GameReportHelper.onEventRegister("wechat",true);
//
//        //内置事件 “支付”，属性：商品类型，商品名称，商品ID，商品数量，支付渠道，币种，是否成功（必传），金额（必传）
//        GameReportHelper.onEventPurchase("gift","flower", "008",1,
//                "wechat","¥", true, 1);
    }

    //----------------------------------------- 权限申请相关 -----------------------------------------

    public interface OnCommonCallback
    {
        void onResult(int result, String message);
    }

    public interface RequirePermissionsCallback
    {
        void onResult(String[] permissions, int[] requireResult);
    }

    private final int REQUEST_CODE_REQUIRE_PERMISSION = 457342343;

    private static RequirePermissionsCallback lastRequirePermissionsCallback = null;

    public boolean hasPermission(String permission)
    {
        return ActivityCompat.checkSelfPermission(this, permission) == PackageManager.PERMISSION_GRANTED;
    }

    public void requestPermissions(ArrayList<String> permissions, RequirePermissionsCallback onResultCallback)
    {
        lastRequirePermissionsCallback = onResultCallback;

        for (int i = permissions.size() - 1; i >= 0; i--)
        {
            if (hasPermission(permissions.get(i))) {
                permissions.remove(i);
            }
        }

        if (permissions.isEmpty())
        {
            onRequestPermissionsResultInternal(new String[0], new int[0]);
            return;
        }

        String[] pms = new String[permissions.size()];
        ActivityCompat.requestPermissions(this, permissions.toArray(pms), REQUEST_CODE_REQUIRE_PERMISSION);
    }

    public void onRequestPermissionsResultInternal(String[] permissions, int[] grantResults)
    {
        if (lastRequirePermissionsCallback != null) {
            lastRequirePermissionsCallback.onResult(permissions, grantResults);
            lastRequirePermissionsCallback = null;
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults)
    {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQUEST_CODE_REQUIRE_PERMISSION) {
            onRequestPermissionsResultInternal(permissions, grantResults);
        }
    }

    //-----------------------------------------------------------------------------------------------

    @Override
    public Cocos2dxGLSurfaceView onCreateView() {
        Cocos2dxGLSurfaceView glSurfaceView = new Cocos2dxGLSurfaceView(this);
        // TestCpp should create stencil buffer
        glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8);
        SDKWrapper.getInstance().setGLSurfaceView(glSurfaceView, this);
        return glSurfaceView;
    }

    @Override
    protected void onResume() {
        super.onResume();
        SDKWrapper.getInstance().onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        SDKWrapper.getInstance().onPause();
    }

    @Override
    protected void onDestroy() {
        AdvertSDK.getInstance().onDestroy();
        super.onDestroy();
        // Workaround in https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
        if (!isTaskRoot()) {
            return;
        }
        SDKWrapper.getInstance().onDestroy();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        SDKWrapper.getInstance().onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        SDKWrapper.getInstance().onNewIntent(intent);
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        SDKWrapper.getInstance().onRestart();
    }

    @Override
    protected void onStop() {
        super.onStop();
        SDKWrapper.getInstance().onStop();
    }

    @Override
    public void onBackPressed() {
        SDKWrapper.getInstance().onBackPressed();
        super.onBackPressed();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        SDKWrapper.getInstance().onConfigurationChanged(newConfig);
        super.onConfigurationChanged(newConfig);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        SDKWrapper.getInstance().onRestoreInstanceState(savedInstanceState);
        super.onRestoreInstanceState(savedInstanceState);
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        SDKWrapper.getInstance().onSaveInstanceState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override
    protected void onStart() {
        SDKWrapper.getInstance().onStart();
        super.onStart();
    }

}
