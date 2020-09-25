package org.cocos2dx.statistics;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Vibrator;
import android.telephony.TelephonyManager;
import android.text.TextUtils;
import android.util.Base64;
import android.view.View;
import android.view.WindowManager;

import androidx.annotation.RequiresApi;
import androidx.core.app.ActivityCompat;

import org.cocos2dx.lib.Cocos2dxActivity;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Locale;
import java.util.UUID;

import static android.text.TextUtils.isEmpty;


public class ToolManager {
    private static final String TAG = ToolManager.class.getSimpleName();
    private static Cocos2dxActivity activity;
    public static Vibrator myVibrator;//震动
    private  static class GetSingleHolder{
        private static final ToolManager instance = new ToolManager();
    }
    public  static ToolManager getInstance(){
        return ToolManager.GetSingleHolder.instance;
    }

    public void init(Cocos2dxActivity activity)
    {
        this.activity = activity;
        myVibrator = (Vibrator)activity.getSystemService(activity.VIBRATOR_SERVICE);
    }

    public static void showToast(String content)
    {
        LogTools.showToast(content);
    }
    /**
     * 获取手机系统语言
     * */
    public static String getSysLanguage(){
        Locale locale = activity.getResources().getConfiguration().locale;
        String language = locale.getLanguage();
        LogTools.LogE("ToolManager", "getSysLanguage: "+language);
        return language;
    }

    public static String getSysCountry(){
        String country =activity.getResources().getConfiguration().locale.getCountry();
        LogTools.LogE("ToolManager", "getSysCountry: "+country);
        return  country;
    }
    /**
     * 短震动
     * */
    public static void phoneShack(){
        ToolManager.myVibrator.vibrate(50);
        LogTools.LogE("ToolManager", "phoneShack: 短震动");
    }
    /**
     * 长震动
     * */
    public static void longPhoneShack(){
        ToolManager.myVibrator.vibrate(350);
        LogTools.LogE("ToolManager", "longPhoneShack: 长震动");
    }

    /**
     * 得到全局唯一UUID,有权限时
     * @return 返回UUID字符串
     */
    @SuppressLint("MissingPermission")
    @RequiresApi(api = Build.VERSION_CODES.M)
    public static String getUniqueID() {
        if (activity == null) {LogTools.LogE("getUniqueID",TAG+"还没初始化");return "undefine";}
//        if (ActivityCompat.checkSelfPermission(activity, Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {
//            LogTools.LogE("getUniqueID() : ", "没有获取到");
//            return UMConfigure.getUMIDString((Context)activity);
//        }
        final TelephonyManager tm = (TelephonyManager)activity.getSystemService(Context.TELEPHONY_SERVICE);
        final String tmDevice, tmSerial, androidId;
        tmDevice = "" + tm.getDeviceId();
        LogTools.LogE("tmDevice: ", tmDevice);
        tmSerial = "" + tm.getSimSerialNumber();
        LogTools.LogE("tmSerial : ", tmSerial);

        androidId = "" + android.provider.Settings.Secure.getString(activity.getContentResolver(), android.provider.Settings.Secure.ANDROID_ID);
        LogTools.LogE("androidId : ", androidId);
        UUID deviceUuid = new UUID(androidId.hashCode(), ((long)tmDevice.hashCode() << 32) | tmSerial.hashCode());
        LogTools.LogE(" deviceUuid: ", deviceUuid.toString().replace("-",""));
        return deviceUuid.toString().replace("-","");
    }

    //获取驱动id
    @RequiresApi(api = Build.VERSION_CODES.M)
    public static String getDeviceId() {
        if (activity == null) {LogTools.LogE("getDeviceId()",TAG+"还没初始化");return "undefine";}
        StringBuilder deviceId = new StringBuilder();
        // 渠道标志
        //deviceId.append("a");
        try {
            //IMEI（imei）
            TelephonyManager tm = (TelephonyManager) activity.getSystemService(Context.TELEPHONY_SERVICE);
            @SuppressLint("MissingPermission") String imei = tm.getDeviceId();
            if(!isEmpty(imei)){
                deviceId.append(imei);
                LogTools.LogE("imei getDeviceId : ", deviceId.toString());
                return deviceId.toString();
            }
            //序列号（sn）
            @SuppressLint("MissingPermission") String sn = tm.getSimSerialNumber();
            if(!isEmpty(sn)){
                deviceId.append(sn);
                LogTools.LogE("sn getDeviceId : ", deviceId.toString());
                return deviceId.toString();
            }
            //如果上面都没有， 则生成一个id：随机码
            String uuid = getUniqueID();
            if(!isEmpty(uuid)) {
                deviceId.append(uuid);
                LogTools.LogE("没有驱动id getDeviceId : ", deviceId.toString());
                return deviceId.toString();
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            String uuid = UUID.randomUUID().toString().replace("-", "");
            deviceId.append(uuid);
        }
        deviceId.append(ToolManager.getInstance().getUniqueID());
        LogTools.LogE("id getDeviceId : ", deviceId.toString());
        return deviceId.toString();
    }

    /**
     * 获取当前的网络状态是否可用
     */
    public static int getNetype() {
        if (activity == null) {LogTools.LogE("getNetype()",TAG+"还没初始化");return 0;}
        int netType = -1;
        ConnectivityManager connMgr = (ConnectivityManager) activity.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();
        if (networkInfo == null) {
            return netType;
        }
        int nType = networkInfo.getType();
        if (nType == ConnectivityManager.TYPE_MOBILE) {
            String netInfo = networkInfo.getExtraInfo();
            if (netInfo != null && netInfo.toLowerCase().equals("cmnet")) {
                netType = 3;
            } else {
                netType = 2;
            }
        } else if (nType == ConnectivityManager.TYPE_WIFI) {
            netType = 1;
        }
        LogTools.LogE("getNetype : ", String.valueOf(netType));
        return netType;
    }

    public static String printKeyHash() {
        if (activity == null) {LogTools.LogE("printKeyHash()",TAG+"还没初始化");return "undefine";}
        PackageInfo packageInfo;
        String key = null;
        try {
            //getting application package name, as defined in manifest
            String packageName = activity.getApplicationContext().getPackageName();

            //Retriving package info
            packageInfo = activity.getPackageManager().getPackageInfo(packageName,
                    PackageManager.GET_SIGNATURES);

            LogTools.LogE(TAG, "\n\n Package Name = " + activity.getApplicationContext().getPackageName());

            for (Signature signature : packageInfo.signatures) {
                MessageDigest md = MessageDigest.getInstance("SHA");
                md.update(signature.toByteArray());
                key = new String(Base64.encode(md.digest(), 0));

                // String key = new String(Base64.encodeBytes(md.digest()));
                LogTools.LogE(TAG, "Key Hash: " + key);
            }
        } catch (PackageManager.NameNotFoundException e1) {
            LogTools.LogE(TAG, "Name not found " +  e1.toString());
        }
        catch (NoSuchAlgorithmException e) {
            LogTools.LogE(TAG, "No such an algorithm " + e.toString());
        } catch (Exception e) {
            LogTools.LogE(TAG, "Exception " + e.toString());
        }
        return key;
    }

    /**
     * 获取版本号
     * @return 当前应用的版本号
     */
    public static String getVersion() {
        try {
            PackageManager manager = activity.getPackageManager();
            PackageInfo info = manager.getPackageInfo(activity.getPackageName(), 0);
            String version = info.versionName;
            LogTools.LogE(TAG, "getVersion " +  version.toString());
            return version;
        } catch (Exception e) {
            //e.printStackTrace();
            return "";
        }
    }
    /**
     * 隐藏虚拟按键，并且设置成全屏
     */
    public static void hideBottomUIMenu(){
        if (Build.VERSION.SDK_INT > 11 && Build.VERSION.SDK_INT < 19) { // lower api
            View v = activity.getWindow().getDecorView();
            v.setSystemUiVisibility(View.GONE);
        } else if (Build.VERSION.SDK_INT >= 19) {
            //for new api versions.
            View decorView = activity.getWindow().getDecorView();
            int uiOptions = View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav bar
                    | View.SYSTEM_UI_FLAG_FULLSCREEN // hide status bar
                    | View.SYSTEM_UI_FLAG_IMMERSIVE;            decorView.setSystemUiVisibility(uiOptions);
            activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
        }
    }

    /**
     * 启动到应用商店app详情界面
     */
    public static void launchAppDetail() {	//appPkg 是应用的包名
        final String GOOGLE_PLAY = "com.android.vending";//这里对应的是谷歌商店，跳转别的商店改成对应的即可
        try {
            if (TextUtils.isEmpty(activity.getPackageName()))
                return;
            Uri uri = Uri.parse("market://details?id=" + activity.getPackageName());
            Intent intent = new Intent(Intent.ACTION_VIEW, uri);
            intent.setPackage(GOOGLE_PLAY);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            activity.startActivity(intent);
        } catch (Exception e) {
//            T.fastToast(context, R.string.jump_googleplay_fail);	//跳转失败的处理
        }
    }
    public static void launchAppDetailByPackageName( String packageName) {	//appPkg 是应用的包名
        final String GOOGLE_PLAY = "com.android.vending";//这里对应的是谷歌商店，跳转别的商店改成对应的即可
        try {
            Uri uri = Uri.parse("market://details?id=" + packageName);
            Intent intent = new Intent(Intent.ACTION_VIEW, uri);
            intent.setPackage(GOOGLE_PLAY);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            activity.startActivity(intent);
        } catch (Exception e) {
//            T.fastToast(context, R.string.jump_googleplay_fail);	//跳转失败的处理
        }
    }
}
