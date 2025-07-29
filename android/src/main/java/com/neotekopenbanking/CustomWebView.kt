package com.neotekopenbanking

import android.content.Context
import android.util.Log
import android.view.ViewGroup.LayoutParams.MATCH_PARENT
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout

class CustomWebView(context: Context) : FrameLayout(context) {
    private val webView = WebView(context).apply {
        layoutParams = LayoutParams(MATCH_PARENT, MATCH_PARENT)
        settings.javaScriptEnabled = true

        webViewClient = object : WebViewClient() {
            override fun onPageStarted(view: WebView?, url: String?, favicon: android.graphics.Bitmap?) {
                super.onPageStarted(view, url, favicon)
                if (url != null) {
                    // You can trigger URL change listener here
                    Log.i("datadata", "URL changed to: $url")
                    onUrlChangedListener?.invoke(url)
                }
            }
        }
    }

    // Listener callback to notify on URL changes
    var onUrlChangedListener: ((String) -> Unit)? = null

    init {
        addView(webView)
    }

    fun loadUrl(url: String) = webView.loadUrl(url)
}
