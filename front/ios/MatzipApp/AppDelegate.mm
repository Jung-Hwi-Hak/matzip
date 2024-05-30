#import "AppDelegate.h"

#import <GoogleMaps/GoogleMaps.h>
#import <React/RCTBundleURLProvider.h>
#import "RNSplashScreen.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GMSServices provideAPIKey:@"AIzaSyB2BCybyPlZ_IPzYeGYofeKFy5cEtBBVMQ"]; // add this line using the api key obtained from Google Console
  self.moduleName = @"MatzipApp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  [super application:application didFinishLaunchingWithOptions:launchOptions];
   [RNSplashScreen show];  // hereﬁ
    // or
    //[RNSplashScreen showSplash:@"LaunchScreen" inRootView:rootView];
   return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
