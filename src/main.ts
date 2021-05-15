// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "@nativescript/angular/platform";
import * as application from "tns-core-modules/application";
import { AppModule } from "./app/app.module";
import { Frame} from "tns-core-modules/ui/frame";
// A traditional NativeScript application starts by initializing global objects,
// setting up global CSS rules, creating, and navigating to the main page.
// Angular applications need to take care of their own initialization:
// modules, components, directives, routes, DI providers.
// A NativeScript Angular app needs to make both paradigms work together,
// so we provide a wrapper platform object, platformNativeScriptDynamic,
// that sets up a NativeScript application and can bootstrap the Angular framework.
application.android.on(application.AndroidApplication.activityBackPressedEvent,
    (args: application.AndroidActivityBackPressedEventData) => {
        const page = Frame.topmost().currentPage;
        if (page.hasListeners(application.AndroidApplication.activityBackPressedEvent)) {
            args.cancel = true;
            page.notify({
                eventName: application.AndroidApplication.activityBackPressedEvent,
                object: page
            });
        }
    });
platformNativeScriptDynamic().bootstrapModule(AppModule);
require( "nativescript-platform-css" );