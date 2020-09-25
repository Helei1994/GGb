# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in E:\developSoftware\Android\SDK/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Proguard Cocos2d-x-lite for release
-keep public class org.cocos2dx.** { *; }
-dontwarn org.cocos2dx.**

# Proguard Apache HTTP for release
-keep class org.apache.http.** { *; }
-dontwarn org.apache.http.**

# Proguard okhttp for release
-keep class okhttp3.** { *; }
-dontwarn okhttp3.**

-keep class okio.** { *; }
-dontwarn okio.**


# Proguard Android Webivew for release. you can comment if you are not using a webview
-keep public class android.net.http.SslError
-keep public class android.webkit.WebViewClient

-dontwarn android.webkit.WebView
-dontwarn android.net.http.SslError
-dontwarn android.webkit.WebViewClient

# keep anysdk for release. you can comment if you are not using anysdk
-keep public class com.anysdk.** { *; }
-dontwarn com.anysdk.**

# 设置自家封装的广告NTSDK
 -keep class NTSDK{*;}
 -keep class NTAdConfig{*;}
 -keep class com.nineton.ntadsdk.** {*;}
 # 设置穿山甲广告联盟SDK
 -keep class com.bytedance.sdk.openadsdk.** { *; }
 -keep class com.androidquery.callback.** {*;}
 -keep public interface com.bytedance.sdk.openadsdk.downloadnew.** {*;}
 -keep class com.pgl.sys.ces.* {*;}
 # 设置广点通广告联盟SDK
 -keep class com.qq.e.** {
 public protected *;
}
 # 设置百度广告联盟SDK
 -keepclassmembers class * extends android.app.Activity {
     public void *(android.view.View);
 }
 -keepclassmembers enum * {
     public static **[] values();
     public static ** valueOf(java.lang.String);
 }
 -keep class com.baidu.mobads.*.** { *; }
  # 设置快手广告联盟SDK
-keep class org.chromium.** {*;}
-keep class org.chromium.** { *; }
-keep class aegon.chrome.** { *; }
-keep class com.kwai.**{ *; }
-dontwarn com.kwai.**
-dontwarn com.kwad.**
-dontwarn com.ksad.**
-dontwarn aegon.chrome.**

 # 设置OPPO SDK开始
 -keep class com.bytedance.sdk.openadsdk.** { *; }
 -keep class com.androidquery.callback.** {*;}
 -keep public interface com.bytedance.sdk.openadsdk.downloadnew.** {*;}
 -keep class com.ss.sys.ces.* {*;}
 -keep class com.pgl.sys.ces.* {*;}

 -keep class com.opos.** { *;}
 -keep class com.heytap.msp.mobad.api.** {*;}
 -keep class com.heytap.openid.** {*;}

 -keep class com.qq.e.** {
       public protected *;
 }
 -keep class android.support.v4.**{
       public *;
 }
 -keep class android.support.v7.**{
       public *;
 }
 # 设置OPPO SDK结束
-keep class com.uc.** {*;}
-keep class com.umeng.** {*;}
-keepclassmembers class * {
   public <init> (org.json.JSONObject);
}
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}


-keep class com.zui.** {*;}
-keep class com.miui.** {*;}
-keep class com.heytap.** {*;}
-keep class a.** {*;}
-keep class com.vivo.** {*;}

-keep public class [com.ourgame23.killHappyEmoji].R$*{
public static final int *;
}

#-keep public class [com.nineton.weatherforecast].R$*{
#public static final int *;
#}
-dontwarn com.tencent.bugly.**
-keep public class com.tencent.bugly.**{*;}

 -dontpreverify
 -ignorewarnings
