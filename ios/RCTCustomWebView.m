// CustomWebView.m
#import "RCTCustomWebView.h"

@implementation RCTCustomWebView
- (void)setUrl:(NSString *)url {
  url = [url copy];
  
  if (url != nil) {
    NSURL *nsUrl = [NSURL URLWithString:url];
    NSURLRequest *request = [NSURLRequest requestWithURL:nsUrl];
    [self loadRequest:request];
  }
}
@end
