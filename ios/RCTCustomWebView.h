#import <WebKit/WebKit.h>
#import <React/RCTComponent.h>   // Import for event properties

@interface RCTCustomWebView : WKWebView <WKNavigationDelegate>

@property (nonatomic, copy) NSString *url;
@property (nonatomic, copy) RCTBubblingEventBlock onUrlChange;

@end
