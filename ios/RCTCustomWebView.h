// CustomWebView.h
#import <WebKit/WebKit.h>

@interface RCTCustomWebView : WKWebView
@property (nonatomic, copy) NSString *url;
@end
