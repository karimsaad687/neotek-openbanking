// CustomWebViewManager.m
#import "RCTCustomWebViewManager.h"
#import "RCTCustomWebView.h"

@implementation RCTCustomWebViewManager

RCT_EXPORT_MODULE(RCTCustomWebView)

- (UIView *)view
{
  // Create and return an instance of your custom WKWebView
  WKWebViewConfiguration *config = [WKWebViewConfiguration new];
  RCTCustomWebView *webView = [[RCTCustomWebView alloc] initWithFrame:CGRectZero configuration:config];
  return webView;
}

// Allow JS to pass a "url" prop and load it
RCT_EXPORT_VIEW_PROPERTY(url, NSString)

- (void)setUrl:(NSString *)url forCustomWebView:(RCTCustomWebView *)view
{
  if (url != nil) {
    NSURL *nsUrl = [NSURL URLWithString:url];
    NSURLRequest *request = [NSURLRequest requestWithURL:nsUrl];
    [view loadRequest:request];
  }
}

@end
