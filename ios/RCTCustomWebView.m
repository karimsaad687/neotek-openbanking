#import "RCTCustomWebView.h"

@implementation RCTCustomWebView

- (instancetype)initWithFrame:(CGRect)frame configuration:(WKWebViewConfiguration *)configuration
{
  self = [super initWithFrame:frame configuration:configuration];
  if (self) {
    self.navigationDelegate = self;
  }
  return self;
}

- (void)setUrl:(NSString *)url {
  if (![_url isEqualToString:url]) {
    _url = [url copy];

    if (_url != nil) {
      NSURL *nsUrl = [NSURL URLWithString:_url];
      NSURLRequest *request = [NSURLRequest requestWithURL:nsUrl];
      [self loadRequest:request];
    }
  }
}

// WKNavigationDelegate method called when URL changes or finishes loading
- (void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation {
  if (self.onUrlChange) {
    // Send the current URL to JS
    self.onUrlChange(@{ @"url": webView.URL.absoluteString ?: @"" });
  }
}

@end
