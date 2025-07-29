package com.neotekopenbanking;

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class CustomWebViewManager : SimpleViewManager<CustomWebView>() {

    companion object {
        const val REACT_CLASS = "RCTCustomWebView"
    }

    override fun getName(): String = REACT_CLASS

    override fun createViewInstance(reactContext: ThemedReactContext): CustomWebView {
        return CustomWebView(reactContext)
    }

    @ReactProp(name = "url")
    fun setUrl(view: CustomWebView, url: String?) {
        url?.let {
            view.loadUrl(it)
        }
    }
}