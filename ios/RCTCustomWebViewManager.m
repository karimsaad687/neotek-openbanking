#import "RCTCustomWebViewManager.h"
#import "RCTCustomWebView.h"
#import <React/RCTUIManager.h>

@implementation RCTCustomWebViewManager

RCT_EXPORT_MODULE(RCTCustomWebView)

- (UIView *)view
{
  WKWebViewConfiguration *config = [WKWebViewConfiguration new];
  RCTCustomWebView *webView = [[RCTCustomWebView alloc] initWithFrame:CGRectZero configuration:config];
  return webView;
}

// Export 'url' prop and the 'onUrlChange' event
RCT_EXPORT_VIEW_PROPERTY(url, NSString)
RCT_EXPORT_VIEW_PROPERTY(onUrlChange, RCTBubblingEventBlock)

@end
