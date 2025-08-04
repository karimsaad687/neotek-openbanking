package com.neotekopenbanking

import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.Arguments
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.events.RCTEventEmitter

class CustomWebViewManager : SimpleViewManager<CustomWebView>() {

    companion object {
        const val REACT_CLASS = "RCTCustomWebView"
    }

    override fun getName(): String = REACT_CLASS

    override fun createViewInstance(reactContext: ThemedReactContext): CustomWebView {
        val view = CustomWebView(reactContext)

        view.onUrlChangedListener = { url ->
            val event = Arguments.createMap().apply {
                putString("url", url)
            }
            // Use main thread for event emission
            Handler(Looper.getMainLooper()).post {
                reactContext.getJSModule(RCTEventEmitter::class.java)
                    .receiveEvent(view.id, "onUrlChange", event)
            }
        }

        return view
    }

    @ReactProp(name = "url")
    fun setUrl(view: CustomWebView, url: String?) {
        url?.let {
            view.loadUrl(it)
        }
    }
    override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any> {
    return mutableMapOf(
        "onUrlChange" to mutableMapOf("registrationName" to "onUrlChange")
    )
}
}

