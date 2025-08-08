package com.neotekopenbanking

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager

class NeotekOpenbankingPackage : ReactPackage {

    // ✅ هنا بنرجع الـ Native Modules
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(NeotekOpenbankingModule(reactContext))
    }

    // ✅ هنا بنرجع الـ ViewManagers (لو فيه)
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(CustomWebViewManager())
    }

    // ✅ دعم Turbo Module (React Native 0.72+)
    fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider {
            val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
            moduleInfos[NeotekOpenbankingModule.NAME] = ReactModuleInfo(
                NeotekOpenbankingModule.NAME,   // name
                NeotekOpenbankingModule.NAME,   // className
                false,  // canOverrideExistingModule
                false,  // needsEagerInit
                true,   // hasConstants (غيرها لـ false لو مفيش getConstants)
                false,  // isCxxModule
                true    // isTurboModule
            )
            moduleInfos
        }
    }
}
