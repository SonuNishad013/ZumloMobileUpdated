package com.zumlo.app

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import org.devio.rn.splashscreen.SplashScreen // Import SplashScreen
import dev.matinzd.healthconnect.permissions.HealthConnectPermissionDelegate
import com.newrelic.agent.android.NewRelic

class MainActivity : ReactActivity() {

   override fun onCreate(savedInstanceState: Bundle?) {
        SplashScreen.show(this) // Ensure SplashScreen is imported and recognized
        super.onCreate(savedInstanceState)
        NewRelic.withApplicationToken("GENERATED_TOKEN").start(this.getApplicationContext());
        HealthConnectPermissionDelegate.setPermissionDelegate(this)
    }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.  com.zumlomobilelts
   */
  override fun getMainComponentName(): String = "ZumloMobileLts"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
