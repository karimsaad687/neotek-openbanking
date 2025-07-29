package com.neotekopenbanking

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager
import java.util.*

class NeotekOpenbankingPackage : ReactPackage {

    // Return list of Native Modules (your existing modules)
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(NeotekOpenbankingModule(reactContext))
    }

    // Return list of ViewManagers (your custom views)
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(CustomWebViewManager())  // Add your custom view managers here
    }

    // Provide module metadata for TurboModule support (if applicable)
    // This is optional if you are not using TurboModules.
    fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider {
            val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
            moduleInfos[NeotekOpenbankingModule.NAME] = ReactModuleInfo(
                NeotekOpenbankingModule.NAME,
                NeotekOpenbankingModule.NAME,
                false,  // canOverrideExistingModule
                false,  // needsEagerInit
                false,  // isCxxModule
                true    // isTurboModule
            )
            // You can add view managers info here if needed (usually not necessary)
            moduleInfos
        }
    }
}